import React from 'react';
import { CartProvider } from './components/CartContext';
import ViewCart from './components/ViewCart';
import Navbar from './components/Navbar';  // Import Navbar component

const App = () => {
  return (
    <CartProvider>
      <Navbar /> {/* Add the Navbar here */}
      <ViewCart /> {/* Display the ViewCart component */}
    </CartProvider>
  );
};

export default App;
