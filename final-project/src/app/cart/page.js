"use client"; // Enable client-side rendering

import { getCart, clearCart } from "../mainCart/utils/storage";
import { useState, useEffect } from "react";
import Navbar from '../TEMPLATES/NAVBAR/Navbar'; // Import the Navbar component
import styles from './style/cartPage.module.css'; // Import the CSS file (make sure the path is correct)

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleCheckout = (e) => {
    e.preventDefault(); // Prevent default form submission
    alert("Checkout complete!");
    clearCart();
    setCart([]);
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  return (
    <div className={styles.cartContainer}>
      {/* Add Navbar Component here */}
      <Navbar />
      
      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      <div className={styles.cartFormsContainer}>
        {/* Product Info Form */}
        <div className={styles.productInfoForm}>
          <h2>Product Info</h2>
          {cart.length > 0 ? (
            <ul className={styles.productInfoList}>
              {cart.map((item, index) => (
                <li key={index} className={styles.productInfoItem}>
                  <img
                    src={item.PROD_IMG}
                    alt={item.PROD_NAME}
                    className={styles.productImage}
                  />
                  <div className={styles.productDetails}>
                    <strong>{item.PROD_NAME}</strong>
                    <p>${item.PROD_PRICE}</p>
                    <p>Quantity: 1</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Checkout Form */}
        <div className={styles.checkoutForm}>
          <h2>Checkout</h2>
          <form onSubmit={handleCheckout}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" required className={styles.inputField} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cardholder">Cardholder Name:</label>
              <input type="text" id="cardholder" required className={styles.inputField} />
            </div>
            <div className={styles.cvvExpirationContainer}>
              <div className={styles.formGroup}>
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" required className={styles.inputField} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="expiration">Expiration:</label>
                <input type="text" id="expiration" placeholder="MM/YY" required className={styles.inputField} />
              </div>
            </div>
            <button type="submit" className={styles.submitBtn}>Complete Checkout</button>
          </form>
          <button
            onClick={handleCheckout}
            className={styles.finalCheckoutBtn}
          >
            Final Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
