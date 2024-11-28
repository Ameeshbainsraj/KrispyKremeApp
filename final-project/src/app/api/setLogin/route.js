import { MongoClient } from 'mongodb';

export async function POST(req) {
    const url = "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB";
    const client = new MongoClient(url);
    const dbName = "KK_DB";

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        const db = client.db(dbName);
        const collection = db.collection("register");

        // Parse the JSON body from the POST request
        const body = await req.json();
        const { email, password } = body;

        console.log('Request received:', body);  // Log request data

        // Query the user by email
        const user = await collection.findOne({ email: email });
        console.log('MongoDB query result:', user);  // Log the full user object

        if (!user) {
            return new Response(
                JSON.stringify({ success: false, error: 'Invalid email or password' }),
                { status: 400 }
            );
        }

        // Log the password to ensure it is accessed correctly
        console.log('Password from database:', user.password);  // Log password value

        // Check if the password matches
        if (user.password !== password) {
            return new Response(
                JSON.stringify({ success: false, error: 'Invalid email or password' }),
                { status: 400 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: 'Login successful!' }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ success: false, error: 'Something went wrong' }),
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
