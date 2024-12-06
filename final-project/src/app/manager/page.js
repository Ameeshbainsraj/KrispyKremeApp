'use client';
import React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Tabs, Tab } from "@mui/material";
import { Logout as LogoutIcon, SupervisorAccount as ManagerIcon } from "@mui/icons-material";  
import { useManagerPage } from "./FUNCTIONS/functions";
import OrdersSection from "./COMPONENTS/OrderSection";
import DashboardSection from "./COMPONENTS/DashboardSection";



export default function ManagerPage() {
  const {
    selectedTab,
    setSelectedTab,
    orders,
    products,
    isLoggedIn,
    handleTabChange,
    handleLogout
  } = useManagerPage();

  return (
    <div style={{ background: "#ff4081", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ background: "BLACK" }}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontFamily: "'Pacifico', cursive", color: "white", marginRight: "20px" }}
          >
            KRISPYKREME
          </Typography>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="inherit"
              sx={{ flexGrow: 1 }}
            >
              <Tab label="Orders" />
              <Tab label="Dashboard" />
            </Tabs>
          </Box>
          {isLoggedIn && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton sx={{ color: "white", marginRight: 2 }}>
                <ManagerIcon />
              </IconButton>
              <IconButton onClick={handleLogout} sx={{ color: "white" }}>
                <LogoutIcon />
                Logout
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ paddingTop: "80px" }}>
        {/* Orders Section */}
        {selectedTab === 0 && <OrdersSection orders={orders} />}
        
        {/* Dashboard Section */}
        {selectedTab === 1 && <DashboardSection products={products} />}
      </Container>
    </div>
  );
}
