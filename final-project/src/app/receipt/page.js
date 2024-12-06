'use client';
import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Importing the tick icon
import Navbar from '../TEMPLATES/NAVBAR/Navbar';
import styles from './style/checkout.module.css';

export default function ReceiptPage() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('orderDetails')); // Retrieve order details from localStorage
    if (!order) {
      // If no order is found, redirect to the cart page
      window.location.href = '/cart';
    } else {
      setOrderDetails(order); // If order exists, set it in the state
    }
  }, []);

  // If there is no orderDetails, return nothing (to prevent rendering empty content)
  if (!orderDetails) return null;

  const { email, cardholder, subtotal, shippingFee, total, items } = orderDetails;

  return (
    <div
      className={styles.receiptContainer}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, black 50%, #d5006d 50%)',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
        <Navbar />
        <Typography variant="h4" gutterBottom sx={{ paddingTop: 4, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircleIcon sx={{ marginRight: 1, color: 'green' }} />
          Receipt
        </Typography>

        <Paper elevation={3} sx={{ padding: '1rem', marginBottom: '2rem' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Thank you for your order, {cardholder}!
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Email: {email}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} gutterBottom>
            Subtotal: ${parseFloat(subtotal).toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} gutterBottom>
            Shipping: ${parseFloat(shippingFee).toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} gutterBottom>
            Total: ${parseFloat(total).toFixed(2)}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Order Summary:
          </Typography>
          
          <Divider sx={{ marginY: 1 }} />
          
          {items.map((item, index) => (
            <Typography key={index} gutterBottom>
              {item.quantity}x {item.PROD_NAME.padEnd(20, '.')}
              ${parseFloat(item.PROD_PRICE).toFixed(2)}
            </Typography>
          ))}
          
          <Divider sx={{ marginY: 1 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Total Amount: ${parseFloat(total).toFixed(2)}
          </Typography>
        </Paper>
      </div>
    </div>
  );
}
