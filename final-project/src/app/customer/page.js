"use client"; // Add this line to mark the component as a client component

import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ImageSlider from './components/ImageSlider';
import ProductCard from './components/ProductCard';
import styles from './styles.module.css'; // Correct CSS import

export default function CustomerPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the products from your database or API here
    // Example: 
    fetch('../api/getProducts')  // Make sure to replace this with the actual API endpoint
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <ImageSlider />

      <div className={styles.productPage}>
        <h2>Our Products</h2>

        <div className={styles.productGrid}>

          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
