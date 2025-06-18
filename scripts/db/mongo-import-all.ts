// importAllCollections.ts
import { MongoClient } from 'mongodb';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI!;
const dbName = process.env.IMPORT_DB_NAME!;
const importDir = path.join(__dirname, 'exports');

async function importAllCollections() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const files = await fs.readdir(importDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log('⚠️ No JSON files found for import.');
      return;
    }

    for (const fileName of jsonFiles) {
      const filePath = path.join(importDir, fileName);
      const raw = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(raw);

      if (!Array.isArray(data)) {
        console.warn(`⚠️ Skipping ${fileName} — content is not a JSON array.`);
        continue;
      }

      const collectionName = path.basename(fileName, '.json');
      const collection = db.collection(collectionName);

      if (data.length > 0) {
        await collection.deleteMany({}); // Optional: clear existing data
        await collection.insertMany(data);
        console.log(`✅ Imported ${data.length} documents into "${collectionName}"`);
      } else {
        console.log(`ℹ️ Skipping "${collectionName}" — no documents to import.`);
      }
    }
  } catch (error) {
    console.error('❌ Error importing collections:', error);
  } finally {
    await client.close();
  }
}

importAllCollections()
