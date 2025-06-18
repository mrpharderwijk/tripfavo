#!/usr/bin/env node

import { MongoClient } from 'mongodb';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// CLI argument parsing
interface CliArgs {
  uri: string;
  dbName: string;
  outputDir?: string;
  help?: boolean;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const parsed: CliArgs = {
    uri: '',
    dbName: '',
    outputDir: undefined,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--uri':
      case '-u':
        parsed.uri = args[++i];
        break;
      case '--db':
      case '-d':
        parsed.dbName = args[++i];
        break;
      case '--output':
      case '-o':
        parsed.outputDir = args[++i];
        break;
      case '--help':
      case '-h':
        parsed.help = true;
        break;
      default:
        if (!parsed.uri && !arg.startsWith('-')) {
          parsed.uri = arg;
        } else if (!parsed.dbName && !arg.startsWith('-')) {
          parsed.dbName = arg;
        }
    }
  }

  // Use MONGO_SCRIPT_DB environment variable as fallback if no URI provided
  if (!parsed.uri) {
    parsed.uri = process.env.MONGO_SCRIPT_DB || '';
  }

  return parsed;
}

function showHelp() {
  console.log(`
MongoDB Export CLI Tool

Usage: npx tsx scripts/db/mongo-export-all.ts [options] <uri> <dbName>

Arguments:
  uri                    MongoDB connection URI
  dbName                 Database name to export

Options:
  -u, --uri <uri>        MongoDB connection URI
  -d, --db <dbName>      Database name to export
  -o, --output <dir>     Output directory for exports (default: ./exports)
  -h, --help             Show this help message

Environment Variables:
  MONGO_SCRIPT_DB        MongoDB connection URI (used as fallback if --uri not provided)

Examples:
  npx tsx scripts/db/mongo-export-all.ts mongodb://localhost:27017 mydb
  npx tsx scripts/db/mongo-export-all.ts --uri mongodb://localhost:27017 --db mydb --output ./data
  npx tsx scripts/db/mongo-export-all.ts -u mongodb://localhost:27017 -d mydb -o ./backup
  npx tsx scripts/db/mongo-export-all.ts mydb
`);
}

// Type definitions
interface FieldType {
  type: string;
  isArray?: boolean;
  isOptional?: boolean;
}

interface CollectionSchema {
  [fieldName: string]: FieldType;
}

/**
 * Parses Prisma schema and extracts model information
 */
async function parsePrismaSchema(): Promise<{ [modelName: string]: CollectionSchema }> {
  const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
  
  try {
    const schemaContent = await fs.readFile(schemaPath, 'utf-8');
    const models: { [modelName: string]: CollectionSchema } = {};
    
    // Split into lines and process
    const lines = schemaContent.split('\n');
    let currentModel: string | null = null;
    let currentSchema: CollectionSchema = {};
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check for model definition
      const modelMatch = trimmedLine.match(/^model\s+(\w+)\s*{/);
      if (modelMatch) {
        // Save previous model if exists
        if (currentModel && Object.keys(currentSchema).length > 0) {
          models[currentModel] = { ...currentSchema };
        }
        
        currentModel = modelMatch[1];
        currentSchema = {};
        continue;
      }
      
      // Check for field definition
      if (currentModel && trimmedLine.includes('@map("_id")')) {
        currentSchema['_id'] = { type: 'ObjectId' };
        continue;
      }
      
      const fieldMatch = trimmedLine.match(/^(\w+)\s+([^@\s]+)(\?)?(\[\])?/);
      if (fieldMatch && currentModel) {
        const [, fieldName, fieldType, optional, array] = fieldMatch;
        
        // Skip relation fields (they don't need to be stored)
        if (fieldType.includes('@relation') || fieldType.includes('@db.')) {
          continue;
        }
        
        // Map Prisma types to our types
        let mappedType = 'String'; // default
        if (fieldType.includes('ObjectId')) {
          mappedType = 'ObjectId';
        } else if (fieldType.includes('DateTime')) {
          mappedType = 'DateTime';
        } else if (fieldType.includes('Int')) {
          mappedType = 'Int';
        } else if (fieldType.includes('Float')) {
          mappedType = 'Float';
        } else if (fieldType.includes('Boolean')) {
          mappedType = 'Boolean';
        } else if (fieldType.includes('String')) {
          mappedType = 'String';
        }
        
        // Check if this is a foreign key field (ends with 'Id' and references another model)
        if (fieldName.endsWith('Id') && fieldName !== '_id') {
          mappedType = 'ObjectId';
        }
        
        // Check if this is an enum array (like UserRole[])
        const isEnumArray = Boolean(array) && !fieldType.includes('String') && !fieldType.includes('Int') && !fieldType.includes('Float') && !fieldType.includes('Boolean');
        
        currentSchema[fieldName] = {
          type: mappedType,
          isArray: Boolean(array) || isEnumArray || undefined,
          isOptional: !!optional
        };
      }
      
      // Check for end of model
      if (trimmedLine === '}') {
        if (currentModel && Object.keys(currentSchema).length > 0) {
          models[currentModel] = { ...currentSchema };
        }
        currentModel = null;
        currentSchema = {};
      }
    }
    
    console.log(`📋 Parsed ${Object.keys(models).length} models from Prisma schema`);
    return models;
    
  } catch (error) {
    console.error('❌ Error parsing Prisma schema:', error);
    return {};
  }
}

/**
 * Converts a MongoDB document to include type information
 */
function addTypeInfo(document: any, schema: CollectionSchema): any {
  const typedDocument: any = {};

  for (const [fieldName, value] of Object.entries(document)) {
    const fieldSchema = schema[fieldName];
    
    if (fieldSchema) {
      typedDocument[fieldName] = {
        value: value,
        type: fieldSchema.type,
        isArray: fieldSchema.isArray || false,
        isOptional: fieldSchema.isOptional || false
      };
    } else {
      // For fields not in schema, preserve as-is with unknown type
      typedDocument[fieldName] = {
        value: value,
        type: 'Unknown',
        isArray: Array.isArray(value),
        isOptional: true
      };
    }
  }

  return typedDocument;
}

async function exportAllCollections(uri: string, dbName: string, outputDir: string) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Parse Prisma schema first
    console.log('🔍 Parsing Prisma schema...');
    const schemas = await parsePrismaSchema();

    const collections = await db.listCollections().toArray();

    if (collections.length === 0) {
      console.log(`⚠️ No collections found in database "${dbName}".`);
      return;
    }

    console.log(`📊 Found ${collections.length} collections in database "${dbName}"`);

    for (const { name: collectionName } of collections) {
      const collection = db.collection(collectionName);
      const documents = await collection.find({}).toArray();

      const safeName = collectionName.replace(/[^\w.-]/g, '_');
      const filePath = path.join(outputDir, `${safeName}.json`);
      
      // Get schema for this collection
      const schema = schemas[collectionName] || {};
      
      // Add type information to documents
      const typedDocuments = documents.map(doc => addTypeInfo(doc, schema));
      
      // Include schema information in the export
      const exportData = {
        collectionName,
        schema,
        documents: typedDocuments,
        exportedAt: new Date().toISOString()
      };

      await fs.writeFile(filePath, JSON.stringify(exportData, null, 2));

      console.log(`✅ Exported ${documents.length} documents from "${collectionName}" to ${filePath}`);
      if (Object.keys(schema).length > 0) {
        console.log(`📋 Schema fields: ${Object.keys(schema).join(', ')}`);
      } else {
        console.log(`⚠️ No schema found for "${collectionName}"`);
      }
    }

    console.log(`\n🎉 Export completed! Files saved to: ${outputDir}`);
  } catch (error) {
    console.error('❌ Error exporting collections:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

async function main() {
  const args = parseArgs();

  if (args.help) {
    showHelp();
    return;
  }

  if (!args.uri || !args.dbName) {
    console.error('❌ Error: MongoDB URI and database name are required');
    console.error('   You can provide the URI via:');
    console.error('   - CLI argument: --uri <uri> or -u <uri>');
    console.error('   - Environment variable: MONGO_SCRIPT_DB');
    console.log('\nUse --help for usage information');
    process.exit(1);
  }

  const outputDir = args.outputDir || path.join(__dirname, 'exports');

  console.log(`🚀 Starting MongoDB export...`);
  console.log(`📡 URI: ${args.uri}`);
  console.log(`🗄️ Database: ${args.dbName}`);
  console.log(`📁 Output: ${outputDir}`);
  console.log('');

  await exportAllCollections(args.uri, args.dbName, outputDir);
}

// Run the CLI
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}
