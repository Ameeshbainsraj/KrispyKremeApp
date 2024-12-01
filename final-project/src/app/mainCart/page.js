"use client"; // Enable client-side rendering

import { addToCart } from "../mainCart/utils/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("../api/getProducts");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const goToCart = () => {
    router.push("../cart");
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", color: "#333" }}>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
                maxWidth: "200px",
              }}
            >
              <img
                src={product.PROD_IMG}
                alt={product.PROD_NAME}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h2>{product.PROD_NAME}</h2>
              <p>{product.PROD_DESCRIP}</p>
              <p>${product.PROD_PRICE}</p>
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={goToCart}
        style={{
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Go to Cart
      </button>
    </div>
  );
}
