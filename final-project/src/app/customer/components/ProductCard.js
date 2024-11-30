import React from 'react';
import styles from '../styles/productCardStyles.module.css'; // Adjust the path to your CSS file

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    console.log(`${product.name} added to cart!`);
  };

  return (
    <div className={styles.card}>
      {/* Product Image */}
      <img
        src={product.PROD_IMG}
        alt={product.name}
        className={styles.productImage}
      />

      {/* Product Details */}
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{product.PROD_NAME}</h3>
        <p className={styles.productDescription}>{product.PROD_DESCRIP}</p>
        <p className={styles.productPrice}>${product.PROD_PRICE}</p>
        <button
          className={styles.addToCartButton}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
