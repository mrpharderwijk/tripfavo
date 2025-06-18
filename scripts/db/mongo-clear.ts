#!/usr/bin/env node

import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// CLI argument parsing
interface CliArgs {
  uri: string;
  dbName: string;
  help?: boolean;
  force?: boolean;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const parsed: CliArgs = {
    uri: '',
    dbName: '',
    help: false,
    force: false
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
      case '--force':
      case '-f':
        parsed.force = true;
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
  console.log(`
MongoDB Clear CLI Tool

⚠️  WARNING: This tool will DELETE ALL DATA from the specified database!

Usage: npx tsx scripts/db/mongo-clear.ts [options] <uri> <dbName>

Arguments:
  uri                    MongoDB connection URI (or set MONGO_SCRIPT_DB env var)
  dbName                 Database name to clear

Options:
  -u, --uri <uri>        MongoDB connection URI
  -d, --db <dbName>      Database name to clear
  -f, --force            Skip confirmation prompt
  -h, --help             Show this help message

Environment Variables:
  MONGO_SCRIPT_DB        MongoDB connection URI (used as fallback if not provided via CLI)

Examples:
  npx tsx scripts/db/mongo-clear.ts mongodb://localhost:27017 mydb
  npx tsx scripts/db/mongo-clear.ts --uri mongodb://localhost:27017 --db mydb --force
  npx tsx scripts/db/mongo-clear.ts -u mongodb://localhost:27017 -d mydb -f
  npx tsx scripts/db/mongo-clear.ts mydb  # Uses MONGO_SCRIPT_DB env var for URI
`);
}

async function confirmClear(dbName: string): Promise<boolean> {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`⚠️  Are you sure you want to DELETE ALL DATA from database "${dbName}"? (yes/no): `, (answer: string) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
    });
  });
}

async function clearDatabase(uri: string, dbName: string, force: boolean = false) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    
    // Get all collections in the database
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('ℹ️  No collections found in database');
      return;
    }

    console.log(`📊 Found ${collections.length} collections in database "${dbName}":`);
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });

    // Ask for confirmation unless --force is used
    if (!force) {
      const confirmed = await confirmClear(dbName);
      if (!confirmed) {
        console.log('❌ Operation cancelled by user');
        return;
      }
    }

    console.log('\n🗑️  Clearing collections...');

    // Clear each collection
    for (const collection of collections) {
      const result = await db.collection(collection.name).deleteMany({});
      console.log(`✅ Cleared collection '${collection.name}': ${result.deletedCount} documents deleted`);
    }

    console.log('\n🎉 Database cleared successfully');

  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB');
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

  console.log(`🚀 Starting MongoDB clear operation...`);
  console.log(`📡 URI: ${args.uri}`);
  console.log(`🗄️ Database: ${args.dbName}`);
  if (args.force) {
    console.log(`⚠️ Force mode: skipping confirmation`);
  }
  console.log('');

  await clearDatabase(args.uri, args.dbName, args.force);
}

// Run the CLI
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}
