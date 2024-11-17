'use client';

// Importing necessary components from MUI
import { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Box, TextField, Container, Paper, IconButton } from '@mui/material'; // Added IconButton here
import MenuIcon from '@mui/icons-material/Menu';  // Menu icon for the burger button
import Link from 'next/link';  // Link component to navigate between pages

// Custom theme for the login page
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
      grey: '#D3D3D3', // Grey for the login background
    },
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false); // State for burger menu open/close

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call)
    console.log('Login attempted with email:', email, 'and password:', password);
  };

  // Function to toggle the burger menu
  const handleMenuClick = () => {
    setOpen(!open); // Toggle menu open/close
  };

  return (
    // Outer Box for the full page background
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* AppBar (Navbar) */}
      <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main, height: '80px' }}>
        {/* Toolbar is the container for the navbar elements */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
          {/* Burger menu icon */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontSize: '28px', // Larger logo size
              fontWeight: 'bold', // Bold for a more pronounced look
              fontFamily: '"Comic Sans MS", cursive, sans-serif', // Rounded, bubbly font
              color: theme.palette.text.primary, // White text color
              textTransform: 'uppercase', // All caps
            }}
          >
            KrispyKreme
          </Typography>

          {/* Links */}
          <Box sx={{ display: 'flex' }}>
            <Link href="/customer" passHref>
              <Button
                color="inherit"
                sx={{
                  fontSize: '18px', // Larger text size
                  fontWeight: 'bold', // Bold text for links
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.text.hover,
                  },
                }}
              >
                Home
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button
                color="inherit"
                sx={{
                  fontSize: '18px', // Larger text size
                  fontWeight: 'bold', // Bold text for links
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.text.hover,
                  },
                }}
              >
                Register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: theme.palette.background.grey }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              Login
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body1">
              Don't have an account?{' '}
              <Link href="/register" passHref>
                <Button variant="text">Register Here</Button>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
