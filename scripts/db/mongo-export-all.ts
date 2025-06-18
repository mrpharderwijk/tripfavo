import { MongoClient } from 'mongodb';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI!;
const dbName = process.env.DB_NAME!;

async function exportAllCollections() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const collections = await db.listCollections().toArray();

    if (collections.length === 0) {
      console.log(`⚠️ No collections found in database "${dbName}".`);
      return;
    }

    for (const { name: collectionName } of collections) {
      const collection = db.collection(collectionName);
      const documents = await collection.find({}).toArray();

      const safeName = collectionName.replace(/[^\w.-]/g, '_');
      const filePath = path.join(__dirname, `exports/${safeName}.json`);
      await fs.writeFile(filePath, JSON.stringify(documents, null, 2));

      console.log(`✅ Exported ${documents.length} documents from "${collectionName}" to ${filePath}`);
    }
  } catch (error) {
    console.error('❌ Error exporting collections:', error);
  } finally {
    await client.close();
  }
}

exportAllCollections();
