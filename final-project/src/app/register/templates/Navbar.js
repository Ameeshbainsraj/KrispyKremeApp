import React from 'react';
import Link from 'next/link';
import '../templates/Navbar.'; // Assuming a CSS file exists for styling

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/register">Register</Link></li>
        <li><Link href="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
