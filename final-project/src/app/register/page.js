'use client';

import { useState } from 'react';
import { Button, TextField, AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const theme = {
  palette: {
    primary: {
      main: '#333333',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      hover: '#C2185B',
    },
    background: {
      default: '#F5F5DC',
    },
    form: {
      background: '#000000',
      text: '#C2185B',
      border: '#808080',
    },
  },
};

export default function Register() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (You can expand this based on your requirements)
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Send form data to the backend
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const result = await response.json();
      alert('Registration successful!');
      // Handle success (redirect to login page, for example)
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main, height: '80px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon sx={{ fontSize: '2rem' }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link href="/customer" passHref>
                <Button color="inherit" sx={{ color: theme.palette.text.secondary }}>
                  Home
                </Button>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/login" passHref>
                <Button color="inherit" sx={{ color: theme.palette.text.secondary }}>
                  Login
                </Button>
              </Link>
            </MenuItem>
          </Menu>

          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              fontSize: '25px',
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
                  fontSize: '18px',
                  fontWeight: 'bold',
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
                  fontSize: '18px',
                  fontWeight: 'bold',
                  '&:hover': {
                    color: theme.palette.text.hover,
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Register Form */}
      <Box sx={{ padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Box
          sx={{
            backgroundColor: theme.palette.form.background,
            padding: 3,
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ color: theme.palette.form.text, marginBottom: 2 }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#d3d3d3',
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFFFFF',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.form.text,
                  fontWeight: 'bold',
                },
                '& .MuiInputBase-input': {
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: '1.1rem',
                },
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#d3d3d3',
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFFFFF',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.form.text,
                  fontWeight: 'bold',
                },
                '& .MuiInputBase-input': {
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: '1.1rem',
                },
              }}
            />
            <TextField
              label="Confirm Email"
              variant="outlined"
              fullWidth
              required
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleInputChange}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#d3d3d3',
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFFFFF',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.form.text,
                  fontWeight: 'bold',
                },
                '& .MuiInputBase-input': {
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: '1.1rem',
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#d3d3d3',
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFFFFF',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.form.text,
                  fontWeight: 'bold',
                },
                '& .MuiInputBase-input': {
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: '1.1rem',
                },
              }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#d3d3d3',
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.form.border,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFFFFF',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.form.text,
                  fontWeight: 'bold',
                },
                '& .MuiInputBase-input': {
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: '1.1rem',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: theme.palette.text.hover,
                color: '#FFFFFF',
                padding: '14px',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#C2185B',
                },
              }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
