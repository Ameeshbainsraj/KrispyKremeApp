"use client"; // Ensure this is the first line of your component file

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../view_cart/components/CartContext"; // Importing cart context
import styles from "../../customer/styles/styles.module.css"; // Ensure correct styles import
import productStyles from "../styles/productCardStyles.module.css"; // Adjusted for correct import

const ProductPage = () => {
  const { addToCart } = useCart(); // Access cart context
  const router = useRouter();
  const [products, setProducts] = useState([]); // State to manage products

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("../api/getProducts");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        // Remove duplicates based on unique identifiers like `_id`
        const uniqueProducts = data.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p._id === product._id)
        );

        setProducts(uniqueProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array ensures it runs only once

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.PROD_NAME} added to cart!`);
  };

  const goToCart = () => {
    router.push("../view_cart"); // Navigate to cart page
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.productList}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      )}
      <button className={styles.goToCartButton} onClick={goToCart}>
        Go to Cart
      </button>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }) => (
  <div className={productStyles.card}>
    <img
      src={product.PROD_IMG}
      alt={product.PROD_NAME}
      className={productStyles.productImage}
    />
    <div className={productStyles.productDetails}>
      <h3 className={productStyles.productName}>{product.PROD_NAME}</h3>
      <p className={productStyles.productDescription}>{product.PROD_DESCRIP}</p>
      <p className={productStyles.productPrice}>${product.PROD_PRICE}</p>
      <button
        className={productStyles.addToCartButton}
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductPage;
