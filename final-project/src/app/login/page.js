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
    form: {
      background: '#000000', // Black color for form background
      text: '#C2185B', // Dark Pink for text and button color
    },
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [open, setOpen] = useState(false); // State for burger menu open/close

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (!email || !pass) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login (e.g., redirect user to the home page)
        alert('Login successful!');
        // Redirect or handle success logic here
      } else {
        // Handle error from the backend
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      // Handle network or server error
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
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
        <Paper elevation={3} sx={{ p: 4, backgroundColor: theme.palette.form.background, borderRadius: '16px' }}>
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.form.text }}>
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
                placeholder="Enter your email"
                sx={{
                  backgroundColor: theme.palette.background.grey,
                  borderRadius: '12px', // Rounded corners for the textfield
                  '& .MuiInputLabel-root': {
                    fontWeight: 'bold', // Bold label
                    color: theme.palette.form.text, // White label color when focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.form.text, // Dark pink border color
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.form.text, // Dark pink border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.form.text, // Dark pink border color when focused
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontWeight: 'bold', // Bold text inside the field
                    color: theme.palette.form.background, // Dark pink text inside the field
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: theme.palette.form.text, // Dark pink placeholder color
                  },
                }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={pass}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                sx={{
                  backgroundColor: theme.palette.background.grey,
                  borderRadius: '12px', // Rounded corners for the textfield
                  '& .MuiInputLabel-root': {
                    fontWeight: 'bold', // Bold label
                    color: theme.palette.form.text,
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.form.text, // Dark pink border color
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.form.text, // Dark pink border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.form.text, // Dark pink border color when focused
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontWeight: 'bold', // Bold text inside the field
                    color: theme.palette.form.background, // Dark pink text inside the field
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: theme.palette.form.text, // Dark pink placeholder color
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: theme.palette.form.text }}
            >
              Login
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#C2185B' }}>
              Don't have an account?{' '}
              <Link href="/register" passHref>
                <Button
                  variant="text"
                  sx={{
                    fontWeight: 'bold', // Bold text for "Register Here"
                    color: '#FFFFFF', // White text color by default
                    '&:hover': {
                      color: theme.palette.text.hover, // Dark pink color on hover
                    },
                  }}
                >
                  Register Here
                </Button>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
