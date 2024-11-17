'use client';

// Importing necessary components from MUI
import { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material'; // Added IconButton here
import MenuIcon from '@mui/icons-material/Menu';  
import Link from 'next/link';  

// Custom theme for the page
const theme = {
  palette: {
    primary: {
      main: '#333333', // Charcoal color for the navbar
    },
    text: {
      primary: '#FFFFFF', // White for primary text (logo)
      secondary: '#FFFFFF', // White for links and text
      hover: '#C2185B', // Dark Pink color for hover effect
    },
    background: {
      default: '#F5F5DC', // Creamy off-white for the background
    },
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false); 

  const handleMenuClick = () => {
    setOpen(!open); 
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main, height: '80px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon sx={{ fontSize: '2rem' }} />
          </IconButton>

          <Typography 
            variant="h5" 
            sx={{
              flexGrow: 1, 
              color: theme.palette.text.primary, 
              fontWeight: 'bold', 
              fontSize: '30px',  // Larger text for logo
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            KrispyKreme
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <Link href="/customer" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  fontWeight: 'bold',  // Bold text for navbar links
                  fontSize: '18px',  // Larger text size
                  '&:hover': {
                    color: theme.palette.text.hover,
                  },
                }}
              >
                Home
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  fontWeight: 'bold',  // Bold text for navbar links
                  fontSize: '18px',  // Larger text size
                  '&:hover': {
                    color: theme.palette.text.hover,
                  },
                }}
              >
                Login
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  fontWeight: 'bold',  // Bold text for navbar links
                  fontSize: '18px',  // Larger text size
                  '&:hover': {
                    color: theme.palette.text.hover,
                  },
                }}
              >
                Register
              </Button>
            </Link>
            <Link href="/view-cart" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  fontWeight: 'bold',  // Bold text for navbar links
                  fontSize: '18px',  // Larger text size
                  '&:hover': {
                    color: theme.palette.text.hover,
                  },
                }}
              >
                View Cart
              </Button>
            </Link>
            <Link href="/checkout" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  fontWeight: 'bold',  // Bold text for navbar links
                  fontSize: '18px',  // Larger text size
                  '&:hover': {
                    color: theme.palette.text.hover,
                  },
                }}
              >
                Checkout
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3, color: theme.palette.text.primary }}>
        <Typography variant="h4">Welcome to KrispyKreme!</Typography>
      </Box>
    </Box>
  );
}
