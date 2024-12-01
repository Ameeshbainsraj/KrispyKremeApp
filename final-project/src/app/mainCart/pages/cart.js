"use client"; // Enable client-side rendering

import { getCart, clearCart } from "../utils/storage";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleCheckout = () => {
    alert("Checkout complete!");
    clearCart();
    setCart([]);
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", color: "#333" }}>
      <h1>Shopping Cart</h1>
      {cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li
                key={index}
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "1rem 0",
                  listStyle: "none",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px", marginRight: "1rem" }}
                />
                <strong>{item.name}</strong> - ${item.price}
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            style={{
              marginTop: "2rem",
              padding: "0.5rem 1rem",
              backgroundColor: "transparent",
              border: "2px solid #333",
              borderRadius: "4px",
              color: "#ff4081",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#333";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#ff4081";
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
