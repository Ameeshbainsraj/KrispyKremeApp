"use client"; // Mark the component as a client component, enabling interactivity for this component in React.

// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import Navbar from "../TEMPLATES/NAVBAR/Navbar";
import ProductCard from "./components/ProductCard";
import styles from "./styles/styles.module.css";
import { CartProvider } from "../customer/components/CartContext";

// ** Main Component: CustomerPage **
export default function CustomerPage() {
  // ** State Variables **
  const [products, setProducts] = useState([]); // State to store product data
  const [weather, setWeatherData] = useState(null); // State to store weather data




  // ** Fetch Weather Data **
  useEffect(() => {
    fetch("../api/getWeatherApi") // API endpoint for weather data
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => setWeatherData(data)) // Store the weather data in state
      .catch((err) => console.error("Error fetching weather data:", err)); // Log errors if fetching fails
  }, []); // Empty dependency array ensures this runs once on component mount




  // ** Fetch Product Data **
  useEffect(() => {
    fetch("../api/getProducts") // API endpoint for product data
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        console.log("Fetched Products:", data); // Debug: log the fetched data
        const uniqueProducts = Array.from(
          new Set(data.map((product) => product._id)) // Extract unique product IDs
        ).map((id) => {
          return data.find((product) => product._id === id); // Retrieve full product data for unique IDs
        });
        setProducts(uniqueProducts); // Store the unique products in state
      })
      .catch((error) => console.error("Error fetching products:", error)); // Log errors if fetching fails
  }, []); // Empty dependency array ensures this runs once on component mount




  // ** Render Component UI **
  return (
    <CartProvider> {/* Context provider for the shopping cart */}
      <div className={styles.pageContainer}>
        <Navbar /> {/* Navigation bar */}

        {/* ** Weather Section ** */}
        <div className={styles.weatherBox}>

          <h3>Today's Weather</h3>

          {weather ? (

            // Display weather information if data is available
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p>Temperature: {weather.temp}°C</p>
              {weather.icon && (
                <img
                  src={weather.icon} // Weather icon URL
                  alt="Weather Icon"
                  style={{ height: "40px" }}
                />
              )}
            </div>


          ) : (
            <p>Loading weather data...</p> // Display a loading message while fetching
          )}


        </div>





        {/* ** Product Section ** */}
        <div className={styles.productPage}>
          <h2></h2> {/* Placeholder heading (could be removed or updated) */}
          {products.length > 0 && (
            <div className={styles.productGrid}>
              {/* Render only the first product */}
              <ProductCard key={products[0]._id} product={products[0]} />
            </div>
          )}
        </div>
      </div>
    </CartProvider>
  );
}
