// lib/dbConnect.js

import { MongoClient } from 'mongodb';

// MongoDB URI and Database Name
const MONGODB_URI = 'mongodb+srv://your-username:your-password@cluster0.mongodb.net';  // Replace with your actual MongoDB URI
const MONGODB_DB = 'KrispyKremeDB';  // Replace with your database name

let cachedDb = null;

export default async function dbConnect() {
  if (cachedDb) {
    return cachedDb; // Return cached DB if already connected
  }

  try {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();  // Connect to MongoDB
    const db = client.db(MONGODB_DB);  // Access the database
    cachedDb = db;  // Cache the DB instance
    return db;  // Return the database instance
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to the database');
  }
}
