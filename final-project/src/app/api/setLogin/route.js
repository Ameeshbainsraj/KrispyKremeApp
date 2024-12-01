import { MongoClient } from 'mongodb';
import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';

// MongoDB URI and Database
const url = "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB";
const dbName = "KK_DB";

// MongoDB session store
const MongoStore = connectMongo(session);

// Create an Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use express-session to handle sessions
app.use(
  session({
    secret: 'your-secret-key',  // Change to a stronger key in production
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: url, dbName: dbName }),  // MongoDB session store
    cookie: { secure: false }  // Set to 'true' if you're using HTTPS
  })
);

// POST request handler for login
app.post('/api/setLogin', async (req, res) => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        const db = client.db(dbName);
        const collection = db.collection("register");

        const { email, password } = req.body;

        console.log('Request received:', req.body);  // Log request data

        // Query the user by email
        const user = await collection.findOne({ email: email });
        console.log('MongoDB query result:', user);  // Log the full user object

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }

        // Log the password to ensure it is accessed correctly
        console.log('Password from database:', user.password);  // Log password value

        // Check if the password matches
        if (user.password !== password) {
            return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }

        // Store user information in session after successful login
        req.session.user = { email: user.email };  // Store the user email in the session
        console.log('Session data:', req.session);

        return res.status(200).json({ success: true, message: 'Login successful!' });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: 'Something went wrong' });
    } finally {
        await client.close();
    }
});

// Route to check if a user is logged in
app.get('/api/checkSession', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ success: true, message: 'User is logged in', user: req.session.user });
    } else {
        return res.status(401).json({ success: false, error: 'Not logged in' });
    }
});

// Route to log out
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Failed to log out' });
        }
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
