#!/usr/bin/env node

import { MongoClient, ObjectId } from 'mongodb';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// CLI argument parsing
interface CliArgs {
  uri: string;
  dbName: string;
  clear?: boolean;
  upsert?: boolean;
  help?: boolean;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const parsed: CliArgs = {
    uri: '',
    dbName: '',
    clear: false,
    upsert: false,
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
      case '--clear':
      case '-c':
        parsed.clear = true;
        break;
      case '--upsert':
        parsed.upsert = true;
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

  // Use environment variable as fallback for URI if not provided via CLI
  if (!parsed.uri) {
    parsed.uri = process.env.MONGO_SCRIPT_DB || '';
  }

  return parsed;
}

function showHelp() {
  console.log(`\nMongoDB Import CLI Tool\n\nUsage: npx tsx scripts/db/mongo-import-all.ts [options] <uri> <dbName>\n\nArguments:\n  uri                    MongoDB connection URI (or set MONGO_SCRIPT_DB env var)\n  dbName                 Database name to import into\n\nOptions:\n  -u, --uri <uri>        MongoDB connection URI\n  -d, --db <dbName>      Database name to import into\n  -c, --clear            Clear all collections before importing\n  --upsert               Update existing documents or insert new ones (handles duplicates)\n  -h, --help             Show this help message\n\nEnvironment Variables:\n  MONGO_SCRIPT_DB        MongoDB connection URI (used as fallback if not provided via CLI)\n\nExamples:\n  npx tsx scripts/db/mongo-import-all.ts mongodb://localhost:27017 mydb\n  npx tsx scripts/db/mongo-import-all.ts --uri mongodb://localhost:27017 --db mydb --clear\n  npx tsx scripts/db/mongo-import-all.ts -u mongodb://localhost:27017 -d mydb --upsert\n  npx tsx scripts/db/mongo-import-all.ts -u mongodb://localhost:27017 -d mydb -c --upsert\n  npx tsx scripts/db/mongo-import-all.ts mydb  # Uses MONGO_SCRIPT_DB env var for URI\n`);
}

/**
 * Converts typed document back to native MongoDB format
 * This handles the conversion of exported typed data back to MongoDB-compatible format
 */
function convertTypedDocumentToNative(typedDocument: any): any {
  const nativeDocument: any = {};

  for (const [fieldName, fieldData] of Object.entries(typedDocument)) {
    if (fieldData && typeof fieldData === 'object' && 'value' in fieldData && 'type' in fieldData) {
      // This is a typed field
      const { value, type, isArray } = fieldData as { value: any; type: string; isArray?: boolean };
      
      if (value === null || value === undefined) {
        nativeDocument[fieldName] = value;
        continue;
      }

      // Special handling for foreign key fields that should be ObjectIds
      if (fieldName.endsWith('Id') && fieldName !== '_id' && typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value)) {
        nativeDocument[fieldName] = new ObjectId(value);
        continue;
      }

      switch (type) {
        case 'ObjectId':
          if (typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value)) {
            nativeDocument[fieldName] = new ObjectId(value);
          } else {
            nativeDocument[fieldName] = value; // Keep as-is if not valid ObjectId
          }
          break;
        
        case 'DateTime':
          if (typeof value === 'string') {
            nativeDocument[fieldName] = new Date(value);
          } else if (value instanceof Date) {
            nativeDocument[fieldName] = value;
          } else {
            nativeDocument[fieldName] = value; // Keep as-is if not valid date
          }
          break;
        
        case 'Int':
          nativeDocument[fieldName] = typeof value === 'number' ? Math.floor(value) : value;
          break;
        
        case 'Float':
          nativeDocument[fieldName] = typeof value === 'number' ? value : parseFloat(value) || value;
          break;
        
        case 'Boolean':
          nativeDocument[fieldName] = Boolean(value);
          break;
        
        case 'String':
        case 'Unknown':
        default:
          nativeDocument[fieldName] = value;
          break;
      }
    } else {
      // This is not a typed field (fallback for old format)
      nativeDocument[fieldName] = convertMongoJsonToNative(fieldData);
    }
  }

  return nativeDocument;
}

/**
 * Recursively converts MongoDB JSON format back to native types
 * This handles the conversion of exported JSON data back to MongoDB-compatible format
 * (Legacy function for backward compatibility)
 */
function convertMongoJsonToNative(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle ObjectId conversion: { "$oid": "..." } -> ObjectId
  if (obj && typeof obj === 'object' && obj.$oid) {
    return new ObjectId(obj.$oid);
  }

  // Handle Date conversion: { "$date": "..." } -> Date
  if (obj && typeof obj === 'object' && obj.$date) {
    // Handle both string dates and numeric timestamps
    if (typeof obj.$date === 'string') {
      return new Date(obj.$date);
    } else if (typeof obj.$date === 'number') {
      return new Date(obj.$date);
    }
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(convertMongoJsonToNative);
  }

  // Handle objects (but not ObjectId or Date objects)
  if (typeof obj === 'object') {
    const converted: any = {};
    for (const [key, value] of Object.entries(obj)) {
      // Special handling for _id fields (primary keys)
      if (
        key === '_id' &&
        typeof value === 'string' &&
        /^[a-fA-F0-9]{24}$/.test(value)
      ) {
        converted[key] = new ObjectId(value);
      }
      // Special handling for ObjectId reference fields
      else if (
        typeof value === 'string' &&
        isObjectIdField(key) &&
        /^[a-fA-F0-9]{24}$/.test(value)
      ) {
        converted[key] = new ObjectId(value);
      }
      // Special handling for date fields that might be exported as strings
      else if (typeof value === 'string' && isDateField(key) && isValidDateString(value)) {
        converted[key] = new Date(value);
      } else {
        converted[key] = convertMongoJsonToNative(value);
      }
    }
    return converted;
  }

  // Return primitives as-is
  return obj;
}

/**
 * Check if a field name is likely to be a date field
 */
function isDateField(fieldName: string): boolean {
  const dateFieldPatterns = [
    /^createdAt$/i,
    /^updatedAt$/i,
    /^deletedAt$/i,
    /^date$/i,
    /.*Date$/i,
    /.*At$/i
  ];
  
  return dateFieldPatterns.some(pattern => pattern.test(fieldName));
}

/**
 * Check if a string is a valid date string
 */
function isValidDateString(dateString: string): boolean {
  // Check if it's an ISO date string
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
  if (isoDatePattern.test(dateString)) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
  
  return false;
}

/**
 * Check if a field name is likely to be a foreign key reference to an ObjectId
 */
function isObjectIdField(fieldName: string): boolean {
  // Add all foreign key fields here
  const objectIdFields = [
    'userId', 'listingId', 'reservationId', 'amenityId', 'imageId', 'priceDetailId', 'floorPlanId', 'guestsAmountId',
    // Add more as needed for your schema
  ];
  return objectIdFields.includes(fieldName);
}

/**
 * Validates that the data structure is valid for MongoDB insertion
 */
function validateDocument(doc: any): boolean {
  if (!doc || typeof doc !== 'object') {
    console.warn('⚠️ Skipping invalid document: not an object');
    return false;
  }

  // Check for required fields if needed (customize based on your schema)
  // Example: if (doc._id && !ObjectId.isValid(doc._id)) {
  //   console.warn('⚠️ Skipping document with invalid _id');
  //   return false;
  // }

  return true;
}

/**
 * Sort files to ensure proper import order (parent collections before child collections)
 * This helps maintain foreign key relationships
 */
function sortFilesForImport(files: string[]): string[] {
  // Define import order priority (lower index = imported first)
  const importOrder = [
    // Core user/authentication collections first
    'User.json',
    'Account.json',
    'Session.json',
    'VerificationToken.json',
    'UserVerifyToken.json',
    'UserVerifyTokens.json',
    'UserResetToken.json',
    'UserResetTokens.json',
    'UserProfileImage.json',
    'UserStatus.json',
    'Name.json',
    'Address.json',
    'Authenticator.json',
    
    // Listing-related collections
    'Listing.json',
    'ListingImage.json',
    'ListingLocation.json',
    'ListingAmenity.json',
    'ListingPriceDetail.json',
    'ListingFloorPlan.json',
    'ListingGuestsAmount.json',
    
    // Amenity collections
    'Amenity.json',
    'Room.json',
    
    // Reservation collections
    'Reservation.json',
    'ReservationPriceDetail.json',
    'ReservationGuestsAmount.json',
    
    // Other collections
    'GuestFavorite.json'
  ];

  // Sort files based on the defined order
  return files.sort((a, b) => {
    const aIndex = importOrder.indexOf(a);
    const bIndex = importOrder.indexOf(b);
    
    // If both files are in the order list, sort by their position
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    
    // If only one file is in the order list, prioritize it
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    
    // If neither file is in the order list, sort alphabetically
    return a.localeCompare(b);
  });
}

async function importAllCollections(uri: string, dbName: string, shouldClearCollections: boolean, shouldUpsert: boolean) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Get the exports directory path
    const exportsDir = path.join(__dirname, 'exports');

    // Check if exports directory exists
    try {
      await fs.access(exportsDir);
    } catch {
      console.error(`❌ Exports directory not found: ${exportsDir}`);
      console.log('💡 Make sure to run the export script first to create JSON files.');
      return;
    }

    // Read all files in the exports directory
    const files = await fs.readdir(exportsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log('⚠️ No JSON files found in exports directory.');
      return;
    }

    // Sort files to ensure proper import order (parent collections first)
    const sortedJsonFiles = sortFilesForImport(jsonFiles);
    console.log(`📁 Found ${jsonFiles.length} JSON files to import`);
    console.log(`📋 Import order: ${sortedJsonFiles.map(f => f.replace('.json', '')).join(' → ')}`);

    // Clear all collections if requested
    if (shouldClearCollections) {
      console.log('\n🗑️ Clearing all collections before import...');
      const collections = await db.listCollections().toArray();
      
      for (const { name: collectionName } of collections) {
        try {
          const collection = db.collection(collectionName);
          const result = await collection.deleteMany({});
          console.log(`🗑️ Cleared ${result.deletedCount} documents from "${collectionName}"`);
        } catch (error) {
          console.error(`❌ Error clearing collection "${collectionName}":`, error);
        }
      }
      console.log('✅ All collections cleared\n');
    }

    for (const jsonFile of sortedJsonFiles) {
      const collectionName = jsonFile.replace('.json', '');
      const filePath = path.join(exportsDir, jsonFile);

      try {
        console.log(`\n🔄 Processing ${jsonFile}...`);

        // Read and parse the JSON file
        const fileContent = await fs.readFile(filePath, 'utf-8');
        let exportData: any;

        try {
          exportData = JSON.parse(fileContent);
        } catch (parseError) {
          console.error(`❌ Failed to parse JSON in ${jsonFile}:`, parseError);
          continue;
        }

        // Handle both new typed format and legacy format
        let documents: any[];
        let isTypedFormat = false;

        if (exportData.documents && Array.isArray(exportData.documents)) {
          // New typed format
          documents = exportData.documents;
          isTypedFormat = true;
          console.log(`📋 Using typed export format for ${jsonFile}`);
        } else if (Array.isArray(exportData)) {
          // Legacy format (direct array)
          documents = exportData;
          console.log(`📋 Using legacy export format for ${jsonFile}`);
        } else {
          console.error(`❌ Invalid format in ${jsonFile}: expected array of documents or typed export format`);
          continue;
        }

        // Validate that it's an array
        if (!Array.isArray(documents)) {
          console.error(`❌ Invalid format in ${jsonFile}: expected array of documents`);
          continue;
        }

        console.log(`📄 Found ${documents.length} documents in ${jsonFile}`);

        // Convert documents based on format
        let convertedDocuments: any[];
        
        if (isTypedFormat) {
          // Convert typed documents to native format
          convertedDocuments = documents
            .map(doc => convertTypedDocumentToNative(doc))
            .filter(validateDocument);
        } else {
          // Convert legacy format documents
          convertedDocuments = documents
            .map(doc => convertMongoJsonToNative(doc))
            .filter(validateDocument);
        }

        if (convertedDocuments.length === 0) {
          console.warn(`⚠️ No valid documents found in ${jsonFile}, skipping...`);
          continue;
        }

        // Get the collection
        const collection = db.collection(collectionName);
        
        // Insert the converted documents
        let result;
        
        if (shouldUpsert) {
          // Use upsert mode - update existing documents or insert new ones
          console.log(`🔄 Using upsert mode for ${collectionName}...`);
          const bulkOps = convertedDocuments.map(doc => ({
            updateOne: {
              filter: { _id: doc._id },
              update: { $set: doc },
              upsert: true
            }
          }));
          
          result = await collection.bulkWrite(bulkOps, { ordered: false });
          console.log(`✅ Upserted ${result.upsertedCount} new documents, updated ${result.modifiedCount} existing documents in "${collectionName}"`);
        } else {
          // Use regular insert mode
          try {
            result = await collection.insertMany(convertedDocuments, {
              // Continue inserting even if some documents fail
              ordered: false
            });
            console.log(`✅ Successfully imported ${result.insertedCount} documents into "${collectionName}"`);
          } catch (error: any) {
            if (error.code === 11000) {
              // Duplicate key error - some documents were inserted, some failed
              console.log(`⚠️ Duplicate key error in "${collectionName}": ${result?.insertedCount || 0} documents inserted, ${convertedDocuments.length - (result?.insertedCount || 0)} duplicates skipped`);
              
              if (result?.insertedCount && result.insertedCount > 0) {
                console.log(`✅ Successfully imported ${result.insertedCount} documents into "${collectionName}"`);
              }
            } else {
              throw error; // Re-throw other errors
            }
          }
        }
        
        if (result && result.insertedCount < convertedDocuments.length && !shouldUpsert) {
          console.warn(`⚠️ ${convertedDocuments.length - result.insertedCount} documents failed to insert`);
        }

      } catch (error) {
        console.error(`❌ Error processing ${jsonFile}:`, error);
      }
    }

    console.log('\n🎉 Import process completed!');

  } catch (error) {
    console.error('❌ Error connecting to database:', error);
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

  console.log(`🚀 Starting MongoDB import...`);
  console.log(`📡 URI: ${args.uri}`);
  console.log(`🗄️ Database: ${args.dbName}`);
  if (args.clear) {
    console.log(`🗑️ Will clear all collections before import`);
  }
  if (args.upsert) {
    console.log(`🔄 Upsert mode enabled`);
  }
  console.log('');

  await importAllCollections(args.uri, args.dbName, !!args.clear, !!args.upsert);
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}
