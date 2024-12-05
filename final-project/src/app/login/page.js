'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './styles.css';
import NAVBAR from '../TEMPLATES/NAVBAR/Navbar'; // Import the Navbar component
import Link from 'next/link'; // Import Link for navigation

export default function Home() {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password'); // Ensure this matches the TextField name

    // Check if email or password is empty
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    console.log("Attempting login with:", email, password);

    // Send email and password as JSON in the request body
    const url = `http://localhost:3000/api/setLogin`;

    const body = JSON.stringify({ email, password });

    try {
      const res = await fetch(url, {
        method: 'POST', // Using POST here
        headers: {
          'Content-Type': 'application/json',
        },
        body, // Send the data in the body of the request
      });

      const result = await res.json();

      if (result.data === "valid") {
        console.log("Login successful!");

        if (result.role === "manager") {
          // Redirect to manager dashboard
          window.location.href = '/ManagerPage';
        } else {
          // Redirect to customer dashboard
          window.location.href = '/customer';
        }
      } else if (result.data === "invalid_email") {
        alert("Email not found. Please try again.");
      } else if (result.data === "invalid_password") {
        alert("Invalid password. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Unable to process login at this time.");
    }
  };

  return (
    <>
      <NAVBAR /> {/* Add the Navbar component here */}

      <Container maxWidth="sm">
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email" // Ensure name is "email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password" // Ensure name is "password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            {/* Register Button */}
            <Box textAlign="center" mt={2}>
              <Link href="/register" passHref>
                <Button
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                    },
                  }}
                >
                  Register
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
