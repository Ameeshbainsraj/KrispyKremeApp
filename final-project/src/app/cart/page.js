'use client';
import { useState, useEffect } from "react";
import { getCart, addToCart, clearCart } from "../cart/utils/storage";
import { IconButton, Typography, Grid, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from '../TEMPLATES/NAVBAR/Navbar';
import styles from './style/cartPage.module.css'; // Import the CSS module
import { useRouter } from 'next/navigation'; // For redirecting

// Import utility functions
import { handleRemoveItem, handleQuantityChange, goToCheckout } from './functions/functions';

export default function CartPage() {
  const [cart, setCartState] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog
  const router = useRouter();

  useEffect(() => {
    const savedCart = getCart();
    setCartState(savedCart || []);
  }, []);

  // Call the utility functions
  const removeItem = handleRemoveItem(cart, setCartState, clearCart);
  const changeQuantity = handleQuantityChange(cart, setCartState, addToCart);
  const redirectToCheckout = goToCheckout(router);

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.PROD_PRICE || 0);
    const quantity = parseInt(item.quantity || 1, 10);
    return acc + price * quantity;
  }, 0);

  const shippingFee = cart.length > 0 ? 5.99 : 0;
  const total = subtotal + shippingFee;

  // Handle the click on "Go to Checkout" button
  const handleGoToCheckout = () => {
    if (cart.length === 0) {
      setOpenDialog(true); // Show dialog if cart is empty
    } else {
      redirectToCheckout(); // Proceed to checkout if cart has items
    }
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box className={styles.checkoutFormContainer}>
      <Navbar />
      <Box className={styles.checkoutForm}>
        <Typography variant="h4" gutterBottom className={styles.cartTitle}>SHOPPING CART</Typography>
        <Grid container spacing={4} sx={{ marginTop: 3 }}>
          {/* Product Info Section */}
          <Grid item xs={12}>
            <div className={styles.productInfoForm}>
              {cart.length > 0 ? (
                <ul className={styles.productInfoList}>
                  {cart.map((item, index) => (
                    <li key={index} className={styles.productInfoItem}>
                      <div className={styles.productImage}>
                        <img
                          src={item.PROD_IMG}
                          alt={item.PROD_NAME}
                        />
                      </div>
                      <div className={styles.productDetails}>
                        <Typography variant="body1">
                          <strong>{item.PROD_NAME}</strong>
                        </Typography>
                        <Typography variant="body2">
                          ${parseFloat(item.PROD_PRICE || 0).toFixed(2)}
                        </Typography>
                      </div>
                      <div className={styles.removeBtn}>
                        <TextField
                          type="number"
                          value={item.quantity || 1}
                          onChange={(e) => changeQuantity(index, parseInt(e.target.value, 10))}
                          inputProps={{ min: 1 }}
                          variant="outlined"
                          size="small"
                          sx={{ width: '70px', backgroundColor: '#f0f0f0' }}
                        />
                        <IconButton onClick={() => removeItem(index)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body1">Your cart is empty.</Typography>
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
          <Typography variant="body1">Please add items to your cart to proceed to checkout.</Typography>
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
