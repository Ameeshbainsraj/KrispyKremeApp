'use client';

// Importing necessary components from MUI
import { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Box, IconButton, CardMedia } from '@mui/material'; 
import MenuIcon from '@mui/icons-material/Menu';  
import Link from 'next/link';  
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const [currentIndex, setCurrentIndex] = useState(0);  // State to track the current image

  const images = [
    'img.jpeg'
  ];
  

  const handleMenuClick = () => {
    setOpen(!open); 
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop back to first image
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Loop to last image
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
                  fontWeight: 'bold',  
                  fontSize: '18px',  
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
                  fontWeight: 'bold',  
                  fontSize: '18px',  
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
                  fontWeight: 'bold',  
                  fontSize: '18px',  
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
                  fontWeight: 'bold',  
                  fontSize: '18px',  
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
                  fontWeight: 'bold',  
                  fontSize: '18px',  
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
      
      {/* Image Slider Section */}
      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        height: '610px', 
        backgroundColor: 'white', 
        padding: '0 20px', // Adding padding to avoid images being too close to the edge
      }}>
        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '2%', 
            transform: 'translateY(-50%)', 
            zIndex: 1, 
            backgroundColor: 'rgba(0,0,0,0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.7)',
            }
          }} 
          onClick={handlePrev}>
          <ArrowBackIcon sx={{ color: 'white' }} />
        </IconButton>

        <CardMedia 
          component="img" 
          sx={{ 
            width: 'calc(100% - 40px)', // Ensure the image is within the padding
            height: '100%', 
            objectFit: 'cover', 
            transition: 'transform 0.5s ease', 
            transform: `translateX(-${currentIndex * 100}%)` 
          }} 
          image={images[currentIndex]} 
          alt="Slider Image"
        />

        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            right: '2%', 
            transform: 'translateY(-50%)', 
            zIndex: 1, 
            backgroundColor: 'rgba(0,0,0,0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.7)',
            }
          }} 
          onClick={handleNext}>
          <ArrowForwardIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>

      <Box sx={{ padding: 3, color: theme.palette.text.primary }}>
        <Typography variant="h4">Welcome to KrispyKreme!</Typography>
      </Box>
    </Box>
  );
}
