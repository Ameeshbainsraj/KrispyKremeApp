import { MongoClient } from "mongodb"; // Import the MongoDB client for database operations

// ** MongoDB Connection URI and Client Setup **
const uri = 
  process.env.MONGODB_URI || // Use the environment variable if available
  "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB"; // Fallback to a default connection string
const client = new MongoClient(uri); // Create a new MongoDB client instance



// ** GET Handler Function **
// Handles GET requests to fetch all items from the 'PRODUCT' collection in the database
export async function GET(request) {

  try {
    // ** Connect to MongoDB **
    await client.connect(); // Establish connection to the database
    console.log("Database connected successfully!"); // Log successful connection


    const database = client.db("KK_DB"); // Access the database named 'KK_DB'
    const cartCollection = database.collection("PRODUCT"); // Access the 'PRODUCT' collection within the database


    // ** Fetch All Documents from the Collection **
    const cartItems = await cartCollection.find().toArray(); // Retrieve all items as an array


    // ** Respond with Retrieved Data **
    return new Response(JSON.stringify(cartItems), { 
      status: 200, // Success HTTP status
      headers: { "Content-Type": "application/json" } // Specify JSON content type
    });
  } catch (error) {

    // ** Handle Errors **
    console.error("Error fetching cart items:", error); // Log the error for debugging


    return new Response(
      JSON.stringify({ 
        message: "Error fetching cart items", // User-friendly error message
        error: error.message // Detailed error message
      }), 
      { 
        status: 500, // Internal Server Error HTTP status
        headers: { "Content-Type": "application/json" } // Specify JSON content type
      }
    );

    
  } finally {
    // ** Close the Database Connection **
    await client.close(); // Ensure the connection is closed after the operation
  }
}
