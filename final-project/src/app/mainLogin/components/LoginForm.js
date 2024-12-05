'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Link } from '@mui/material'; // Import MUI components
import styles from '../style/loginForm.module.css';  // Import the CSS module

export default function LoginForm({ onResponseMessage, onRedirect }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData); // Log form data to check

    try {
      const response = await fetch('http://localhost:5000/api/setLogin', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        // Session has been set on the server, now store in localStorage for client side
        localStorage.setItem('sessionUser', formData.email);  // Storing email to localStorage
        onRedirect("../customer");
      } else {
        onResponseMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      onResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.formContainer}> {/* Apply the centering class */}
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          className={styles.input}
          margin="normal"
        />

        <label htmlFor="password" className={styles.label}>Password</label>
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          className={styles.input}
          margin="normal"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} className={styles.button}>
          Login
        </Button>

        <Box mt={2} textAlign="center" className={styles.registerLink}>
          <Link href="/mainRegister" underline="hover" className={styles.link}>
            Don't have an account? Register here
          </Link>
        </Box>
      </form>
    </div>
  );
}
