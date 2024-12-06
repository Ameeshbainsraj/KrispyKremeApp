"use client"; // Mark the component as a client component, enabling interactivity in React.

// ** Import Dependencies **
import React, { createContext, useContext, useState } from "react";

// ** Create Cart Context **
// Provides a global state for managing the cart.
const CartContext = createContext();

// ** Custom Hook: useCart **
// Makes it easier to access cart context anywhere in the app.
export const useCart = () => useContext(CartContext);

// ** CartProvider Component **
// Manages the cart state and provides cart-related functionality to child components.
export const CartProvider = ({ children }) => {
  // ** State: cartItems **
  // Stores all the items currently in the cart.
  const [cartItems, setCartItems] = useState([]);

  // ** Function: addToCart **
  // Adds a product to the cart or updates the quantity if the product already exists.
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingProduct = prev.find(
        (item) => item.PROD_NAME === product.PROD_NAME // Check if product is already in the cart by name
      );
      if (existingProduct) {
        // If the product exists, update its quantity
        return prev.map((item) =>
          item.PROD_NAME === product.PROD_NAME
            ? { ...item, quantity: item.quantity + 1 } // Increment quantity by 1
            : item // Leave other items unchanged
        );
      }
      // If the product doesn't exist, add it to the cart with an initial quantity of 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ** Function: removeFromCart **
  // Removes a product from the cart by its name.
  const removeFromCart = (productName) => {
    setCartItems((prev) =>
      prev.filter((item) => item.PROD_NAME !== productName) // Keep only items that don't match the product name
    );
  };

  // ** Function: updateQuantity **
  // Updates the quantity of a specific product in the cart.
  const updateQuantity = (productName, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.PROD_NAME === productName ? { ...item, quantity } : item // Update the item's quantity or leave it unchanged
      )
    );
  };

  // ** Provide Cart Context to Children **
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children} {/* Render the child components that need access to the cart */}
    </CartContext.Provider>
  );
};
