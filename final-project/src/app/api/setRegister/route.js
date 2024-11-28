const { MongoClient } = require("mongodb");

export async function GET(req) {
    console.log("In the API page for adding a new registration");

    const url = "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB";
    const client = new MongoClient(url, { serverSelectionTimeoutMS: 30000 });
    const dbName = "KK_DB";

    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        const pass = searchParams.get('password');
        const username = searchParams.get('username');

        console.log("Received data:", { username, email, pass });

        // Connect to the database
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        const db = client.db(dbName);
        const collection = db.collection("register");

        // Insert the new user
        const result = await collection.insertOne({ username, email, password: pass });
        console.log("Document inserted:", result);

        // Send a success response
        return new Response(JSON.stringify({ success: true, message: "User registered successfully!" }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Error occurred:", err.message);

        // Send an error response
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        await client.close(); // Ensure the client is always closed
    }
}
