import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export async function connectDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  if (!uri || !dbName) {
    throw new Error("Please define MONGODB_URI and MONGODB_DB in your environment variables");
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
