"use client"; // Mark the component as a client component, enabling interactivity in React.

// ** Import Dependencies and Styles **
import React, { useEffect, useState } from "react";
import { addToCart } from "../../cart/utils/storage"; // Import the addToCart utility function
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import productStyles from "../styles/productCardStyles.module.css"; // Import module-specific CSS styles




// ** ProductCard Component **
// Displays individual product details and provides an "Add to Cart" button.
const ProductCard = ({ product, onAddToCart }) => (


  <div className={productStyles.card}>
    {/* Product Image */}
    <img

      src={product.PROD_IMG} // Product image URL

      alt={product.PROD_NAME} // Alt text for accessibility
      
      className={productStyles.productImage}

    />



    {/* Product Details */}
    <div className={productStyles.productDetails}>

      <h3 className={productStyles.productName}>{product.PROD_NAME}</h3> {/* Product Name */}

      <p className={productStyles.productDescription}>{product.PROD_DESCRIP}</p> {/* Product Description */}

      <p className={productStyles.productPrice}>${product.PROD_PRICE}</p> {/* Product Price */}


      
      {/* Add to Cart Button */}
      <button

        className={productStyles.addToCartButton}

        onClick={() => onAddToCart(product)} // Trigger the onAddToCart function when clicked

      >
        Add to Cart
      </button>

    </div>
  </div>
);




// ** ProductPage Component **
// Main component to fetch and display all products, allowing users to add them to the cart.
const ProductPage = () => {
  const router = useRouter(); // Router instance for navigation
  const [products, setProducts] = useState([]); // State to store fetched products

  // ** Fetch Products on Component Mount **
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("../api/getProducts"); // API endpoint for fetching products
        if (!response.ok) throw new Error("Failed to fetch products"); // Handle non-200 responses
        const data = await response.json(); // Parse response as JSON

        // Filter out duplicate products based on their unique _id
        const uniqueProducts = [];
        const seenIds = new Set();

        data.forEach((product) => {
          if (!seenIds.has(product._id)) { // Check if the product _id is already seen
            seenIds.add(product._id); // Mark the _id as seen
            uniqueProducts.push(product); // Add unique product to the list
          }
        });

        setProducts(uniqueProducts); // Update state with unique products
      } catch (error) {
        console.error("Error fetching products:", error); // Log errors
      }
    };

    fetchProducts(); // Trigger product fetching
  }, []); // Empty dependency array ensures this runs once on mount





  // ** Handle Add to Cart **
  const handleAddToCart = (product) => {
    addToCart(product); // Use the imported addToCart utility to store the product in the cart
    alert(`${product.PROD_NAME} added to cart!`); // Notify the user
  };





  // ** Navigate to Cart Page **
  const goToCart = () => {
    router.push("../cart"); // Redirect the user to the cart page
  };





  // ** Render Component UI **
  return (
    <div style={{ padding: "2rem", backgroundColor: "transparent", color: "#333" }}>
      
      {products.length === 0 ? ( 
        // Show loading message if products are not yet loaded
        <p>Loading products...</p>
      ) : (
        // Display product cards in a flexible grid layout
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {products.map((product) => (
            <ProductCard
              key={product._id} // Use unique product _id as the key
              product={product} // Pass product details to the ProductCard
              onAddToCart={handleAddToCart} // Pass the add-to-cart handler
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage; // Export the main component as default
