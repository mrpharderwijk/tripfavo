// exportMongo.ts
import { MongoClient } from 'mongodb';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI!;
const dbName = process.env.DB_NAME!;

const collectionsToExport = ['users', 'posts']; // Change to your actual collection names

async function exportCollections() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    for (const collectionName of collectionsToExport) {
      const collection = db.collection(collectionName);
      const documents = await collection.find({}).toArray();

      const filePath = path.join(__dirname, `${collectionName}.json`);
      await fs.writeFile(filePath, JSON.stringify(documents, null, 2));

      console.log(`✅ Exported ${documents.length} documents from "${collectionName}" to ${filePath}`);
    }
  } catch (error) {
    console.error('❌ Error exporting collections:', error);
  } finally {
    await client.close();
  }
}

exportCollections();
