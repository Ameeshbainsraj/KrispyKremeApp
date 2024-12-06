import React from "react";
import { Card, Box, Typography } from "@mui/material";

export default function OrdersSection({ orders }) {
  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        All Orders
      </Typography>
      <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
        {orders.map((order, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              padding: "15px",
            }}
          >
            {/* First Section: List Products Vertically */}
            <Box sx={{ flexBasis: "50%", overflowY: "auto", maxHeight: "200px" }}>
              {order.items.map((item, idx) => (
                <Typography
                  key={idx}
                  variant="body1"
                  sx={{ fontWeight: "bold", marginBottom: "5px" }}
                >
                  {idx + 1}. {item.PROD_NAME} - ${item.PROD_PRICE}
                </Typography>
              ))}
            </Box>

            {/* Second Section: Order Details */}
            <Box sx={{ flexBasis: "50%", paddingLeft: "20px" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Name: {order.cardholder}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Email: {order.email}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Quantity: {order.items.length}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Shipping Fee: ${order.shippingFee}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Total: ${order.total}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </div>
  );
}
