// Navbar.js

import React from 'react';
import '../styles/Navbar.css'; // Import Navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">KripsyKreme</div>
      <div className="nav-links">
        <a href="/" className="active">HOME</a>
        <a href="/login" className="login">LOGIN</a>
      </div>
    </nav>
  );
};

export default Navbar;
