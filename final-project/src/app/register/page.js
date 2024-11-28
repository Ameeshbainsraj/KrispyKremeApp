'use client';

import { useState } from 'react';
import Navbar from './components/Navbar'; // Import Navbar
import './styles/Register.css'; // Import the CSS file for Register

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState({}); // Field-specific errors
  const [successMessage, setSuccessMessage] = useState(''); // Success message

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear errors on change
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Passwords do not match';
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.email !== formData.confirmEmail) {
      newErrors.email = 'Emails do not match';
      newErrors.confirmEmail = 'Emails do not match';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // Validate fields
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/setRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setSuccessMessage('Registration successful! 🎉');
      } else {
        setErrors({ general: result.message || 'An error occurred during registration' });
      }
    } catch (error) {
      setLoading(false);
      setErrors({ general: error.message || 'An unexpected error occurred' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        {errors.general && <div className="error-message">{errors.general}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
            aria-label="Full Name"
          />
          {errors.fullName && <div className="field-error">{errors.fullName}</div>}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            aria-label="Email"
          />
          {errors.email && <div className="field-error">{errors.email}</div>}

          <input
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleInputChange}
            placeholder="Confirm Email"
            required
            aria-label="Confirm Email"
          />
          {errors.confirmEmail && <div className="field-error">{errors.confirmEmail}</div>}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            aria-label="Password"
          />
          {errors.password && <div className="field-error">{errors.password}</div>}

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
            aria-label="Confirm Password"
          />
          {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>
      </div>
    </>
  );
}
