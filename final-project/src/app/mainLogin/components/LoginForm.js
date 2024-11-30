'use client';

import React, { useState } from 'react';

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
      const response = await fetch('../api/setLogin', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        onRedirect("../customer");
      } else {
        onResponseMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      onResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#1c1c1c',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <label
        htmlFor="email"
        style={{
          fontWeight: 'bold',
          color: '#B0B0B0',
          marginBottom: '5px',
        }}
      >
        Email:
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #B0B0B0',
          backgroundColor: '#1c1c1c',
          color: '#fff',
        }}
      />

      <label
        htmlFor="password"
        style={{
          fontWeight: 'bold',
          color: '#B0B0B0',
          marginBottom: '5px',
        }}
      >
        Password:
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        required
        style={{
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '5px',
          border: '1px solid #B0B0B0',
          backgroundColor: '#1c1c1c',
          color: '#fff',
        }}
      />

      <button
        type="submit"
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#1c1c1c',
          color: '#D40076',
          border: '2px solid #D40076',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#1c1c1c'}
      >
        Login
      </button>
    </form>
  );
}
