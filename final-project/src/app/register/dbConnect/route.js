import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection URI and client setup
const uri = "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB";
const client = new MongoClient(uri);
const dbName = "KK_DB";

async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName); // Return the database instance
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection("register");

    // Check if the email already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered!" }, { status: 400 });
    }

    // Insert the new user
    const result = await usersCollection.insertOne({ fullName, email, password });

    if (result.acknowledged) {
      return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Registration failed!" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
