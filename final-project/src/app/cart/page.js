'use client'; // Indicates this is a client-side rendered component

// Import React hooks and utilities
import { useState, useEffect } from "react";
import { getCart, addToCart, clearCart } from "../cart/utils/storage"; // Utility functions for cart management
import { IconButton, Typography, Grid, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"; // Material-UI components for styling and layout
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon for removing items
import Navbar from '../TEMPLATES/NAVBAR/Navbar'; // Navbar component
import styles from './style/cartPage.module.css'; // Import CSS module for styling
import { useRouter } from 'next/navigation'; // For navigating between pages

// Import utility functions for cart operations
import { handleRemoveItem, handleQuantityChange, goToCheckout } from './functions/functions';

// Main CartPage component
export default function CartPage() {

  const [cart, setCartState] = useState([]); // State to store the cart items
  const [openDialog, setOpenDialog] = useState(false); // State for controlling the empty cart dialog
  const router = useRouter(); // Next.js router for navigation


  // Load cart data from localStorage when the component mounts
  useEffect(() => {

    const savedCart = getCart(); // Retrieve cart from localStorage
    setCartState(savedCart || []); // Set cart state or default to an empty array
    
  }, []);

  // Set up handlers using utility functions
  const removeItem = handleRemoveItem(cart, setCartState, clearCart); // Remove an item from the cart
  const changeQuantity = handleQuantityChange(cart, setCartState, addToCart); // Change quantity of an item
  const redirectToCheckout = goToCheckout(router); // Redirect to checkout page
  

  // Calculate the cart subtotal
  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.PROD_PRICE || 0); // Parse item price
    const quantity = parseInt(item.quantity || 1, 10); // Parse item quantity
    return acc + price * quantity; // Add price * quantity to the subtotal
  }, 0);


  // Calculate shipping fee (flat fee if the cart has items, otherwise 0)
  const shippingFee = cart.length > 0 ? 5.99 : 0;

  // Calculate total cost (subtotal + shipping fee)
  const total = subtotal + shippingFee;

  // Handle the "Go to Checkout" button click
  const handleGoToCheckout = () => {
    if (cart.length === 0) {
      setOpenDialog(true); // Show dialog if the cart is empty
    } else {
      redirectToCheckout(); // Redirect to checkout if cart has items
    }
  };

  // Close the empty cart dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // JSX for the CartPage component
  return (
    <Box className={styles.checkoutFormContainer}>

      <Navbar /> {/* Display the navigation bar */}
      <Box className={styles.checkoutForm}>

        <Typography variant="h4" gutterBottom className={styles.cartTitle}>
          SHOPPING CART
        </Typography>

        <Grid container spacing={4} sx={{ marginTop: 3 }}>

          {/* Product Info Section */}
          <Grid item xs={12}>

            <div className={styles.productInfoForm}>

              {cart.length > 0 ? (

                <ul className={styles.productInfoList}>
                  {/* Iterate through cart items and display each */}
                  {cart.map((item, index) => (

                    <li key={index} className={styles.productInfoItem}>

                      <div className={styles.productImage}>

                        <img src={item.PROD_IMG} alt={item.PROD_NAME} /> {/* Product image */}

                      </div>

                      <div className={styles.productDetails}>

                        <Typography variant="body1">

                          <strong>{item.PROD_NAME}</strong> {/* Product name */}

                        </Typography>


                        <Typography variant="body2">

                          ${parseFloat(item.PROD_PRICE || 0).toFixed(2)} {/* Product price */}

                        </Typography>

                      </div>

                      {/*--------------------------------*/}
                      {/* REMOVE BUTTON & the quantity   */}
                      {/*--------------------------------*/}
                      <div className={styles.removeBtn}>
                        {/* Quantity input field */}
                        <TextField
                          type="number"
                          value={item.quantity || 1}
                          onChange={(e) => changeQuantity(index, parseInt(e.target.value, 10))}
                          inputProps={{ min: 1 }}
                          variant="outlined"
                          size="small"
                          sx={{ width: '70px', backgroundColor: '#f0f0f0' }}
                        />

                        {/* Remove button */}
                        <IconButton onClick={() => removeItem(index)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body1">Your cart is empty.</Typography> // Message if the cart is empty
              )}
            </div>
          </Grid>
        </Grid>

        {/* Button to go to Checkout */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGoToCheckout}
          className={styles.finalCheckoutBtn}
        >
          GO TO CHECKOUT
        </Button>
      </Box>

      {/* Dialog for when cart is empty */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cart is Empty</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please add items to your cart to proceed to checkout.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
