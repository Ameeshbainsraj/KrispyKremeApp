'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './components/LoginForm';  // Import the LoginForm component
import Navbar from './components/Navbar'; // Import Navbar component

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
        <div style={styles.pageContainer}>
            {/* Navbar at the top */}
            <Navbar /> 

            {/* Content container with the login form */}
            <div style={styles.formWrapper}>
                <h2
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fff',
                        paddingBottom: '20px',
                        marginBottom: '20px',
                        borderBottom: '2px solid #D40076',
                    }}
                >
                    Login
                </h2>

                <LoginForm 
                    onResponseMessage={handleResponseMessage} 
                    onRedirect={handleRedirect} 
                />

                {responseMessage && (
                    <p
                        style={{
                            marginTop: '20px',
                            color: responseMessage.startsWith('Error') ? 'red' : 'green',
                        }}
                    >
                        {responseMessage}
                    </p>
                )}
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        backgroundImage: `url("https://i.pinimg.com/736x/09/f5/eb/09f5eb1d5ebb8d03ed612ff5098f8843.jpg")`, // Set the image URL
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center', // Center the image
        backgroundSize: 'cover', // Make the image cover the entire container
        position: 'relative', // To layer the overlay on top of the image
        minHeight: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column', // Vertical layout
        alignItems: 'center', // Center horizontally
        justifyContent: 'flex-start', // Align content at the top
    },
    formWrapper: {
        position: 'relative', // Ensure the form is above the background
        zIndex: 10, // Put the form above the background
        backdropFilter: 'blur(10px)', // Subtle blur effect on the background
        backgroundColor: '#1c1c1c', // Slightly transparent white background to enhance the blur
        width: '30%', // Adjust width as needed
        padding: '50px',
        borderRadius: '10px',
        marginTop: '160px', // Adjust the top margin to bring the form down
    },
};
