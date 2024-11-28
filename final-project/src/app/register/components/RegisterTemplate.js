// RegisterTemplate.js

import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

export const renderRegisterForm = ({ formData, handleInputChange, handleSubmit }) => (
  <Box className="register-form">
    <Box className="form-container">
      <Typography className="form-title">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="text-field"
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="text-field"
        />
        <TextField
          label="Confirm Email"
          variant="outlined"
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={handleInputChange}
          className="text-field"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="text-field"
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="text-field"
        />
        <Button type="submit" className="submit-button">
          Register
        </Button>
      </form>
    </Box>
  </Box>
);
