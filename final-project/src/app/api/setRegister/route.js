import dbConnect from '../../../lib/dbConnect';  // Ensure correct import path
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract fields from request body
      const { fullName, email, confirmEmail, password, confirmPassword } = req.body;

      // Validate input fields
      if (!fullName || !email || !confirmEmail || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: 'Please fill all fields.' });
      }

      // Validate email and confirm email match
      if (email !== confirmEmail) {
        return res.status(400).json({ success: false, message: 'Email and confirm email do not match.' });
      }

      // Validate password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Password and confirm password do not match.' });
      }

      // Connect to the database
      const db = await dbConnect();

      // Check if the email already exists
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists.' });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into 'users' collection
      const newUser = await db.collection('users').insertOne({
        fullName,  // Directly store the fullName
        email,  // Directly store the email
        password: hashedPassword,  // Store the hashed password
      });

      // Return success response
      return res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
