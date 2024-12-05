'use client';  // <-- Add this directive at the very top

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './components/LoginForm';  // Import the LoginForm component
import Navbar from '../TEMPLATES/NAVBAR/Navbar'; // Import Navbar component
import { Container, Typography, Box } from '@mui/material';  // Import MUI components
import styles from './style/style.module.css'; // Import the CSS Module

export default function LoginPage() {
    const [responseMessage, setResponseMessage] = useState('');
    const router = useRouter();

    const handleResponseMessage = (message) => {
        setResponseMessage(message);
    };

    const handleRedirect = (url) => {
        router.push(url);
    };

    return (
        <div className={styles.pageContainer}>
            {/* Navbar at the top */}
            <Navbar /> 

            {/* Content container with the login form */}
            <Container component="main" maxWidth="xs">
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h5" className={styles.loginHeader}>
                        Login
                    </Typography>

                    <LoginForm 
                        onResponseMessage={handleResponseMessage} 
                        onRedirect={handleRedirect} 
                    />

                    {responseMessage && (
                        <Typography 
                            variant="body2" 
                            sx={{ mt: 2, color: responseMessage.startsWith('Error') ? 'red' : 'green' }}
                        >
                            {responseMessage}
                        </Typography>
                    )}
                </Box>
            </Container>
        </div>
    );
}
