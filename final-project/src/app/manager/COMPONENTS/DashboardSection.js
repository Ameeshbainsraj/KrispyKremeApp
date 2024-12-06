import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function DashboardSection({ products, handleDeleteProduct }) {
  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Product Dashboard
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              {/* Product Image */}
              <CardMedia
                component="img"
                height="140"
                image={product.PROD_IMG}
                alt={product.PROD_NAME}
              />
              <CardContent>
                <Typography variant="h6">{product.PROD_NAME}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: "10px" }}>
                  {product.PROD_DESCRIP}
                </Typography>
                <Typography variant="body2">Price: ${product.PROD_PRICE}</Typography>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteProduct(product._id)}
                  sx={{ marginTop: "10px" }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
