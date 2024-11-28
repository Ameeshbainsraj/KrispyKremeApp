// src/lib/db.js

import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB';

let client;
let db;

export async function connectToDatabase() {
  if (db) {
    return { client, db };
  }
  
  client = new MongoClient(uri);
  await client.connect();
  
  // Choose the database you want to use
  db = client.db('KK_DB');
  console.log('Connected to MongoDB Atlas');
  
  return { client, db };
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    console.log('Database connection closed');
  }
}
