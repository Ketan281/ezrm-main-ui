"use client";
import type React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Paper,
  Container,
  CircularProgress,

} from "@mui/material";
import { ShoppingCartOutlined, Login } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/use-app-store";
import { useCart } from "@/api/handlers/cartHandler";
import CartItems from "./CartItems";
import LoadCalculation from "./LoadCalculation";

const ShoppingCart: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, customer } = useAppStore();
  const [discount, setDiscount] = useState("");

  const {
    data: cartResponse,
    isLoading: cartLoading,
    error: cartError,
    isError: cartIsError,
  } = useCart(customer?.id || "", { enabled: !!customer?.id });

  const handleCheckout = () => router.push("/checkout");
  const handleLogin = () => router.push("/sign_in");
  const handleSignUp = () => router.push("/sign_up");

  // Extract cart data
  const cartData = cartResponse?.data?.cart;
  const cartItems = cartData?.items || [];
  const subtotal = cartData?.totalAmount || 0;
  const total = subtotal;

  // Loading state
  if (cartLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#ff6b35" }} />
          </Box>
        </Paper>
      </Container>
    );
  }

  // Error state
  if (cartIsError) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}>
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" sx={{ color: "#f44336", mb: 2 }}>
              Error loading cart
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {cartError instanceof Error
                ? cartError.message
                : "Something went wrong"}
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Authentication fallback UI
  if (!isAuthenticated || !customer) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 0, textAlign: "center" }}>
            <Box sx={{ width: 120, height: 120, backgroundColor: "#fafafa", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", mb: 1, border: "2px dashed #e0e0e0" }}>
              <ShoppingCartOutlined sx={{ fontSize: 48, color: "#ff6b35" }} />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", fontSize: "1.1rem", mb: 1 }}>
              Please Login to View Your Cart
            </Typography>

            <Typography variant="body1" sx={{ color: "#666", fontSize: "0.875rem", mb: 4, maxWidth: 400, lineHeight: 1.6 }}>
              You need to be signed in to view and manage your shopping cart items. Login to your account or create a new one to get started.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
              <Button variant="contained" onClick={handleLogin} startIcon={<Login />} sx={{ backgroundColor: "#ff6b35", color: "white", px: 4, py: 0.5, fontSize: "0.875rem", fontWeight: 600, textTransform: "none", borderRadius: 1, minWidth: 140, "&:hover": { backgroundColor: "#e55a2b" } }}>
                Login
              </Button>

              <Button variant="outlined" onClick={handleSignUp} sx={{ borderColor: "#ff6b35", color: "#ff6b35", px: 4, py: 1, fontSize: "0.875rem", fontWeight: 600, textTransform: "none", borderRadius: 1, minWidth: 140, "&:hover": { borderColor: "#e55a2b", backgroundColor: "rgba(255, 107, 53, 0.04)" } }}>
                Sign Up
              </Button>
            </Box>

            <Box sx={{ mt: 1, p: 3, backgroundColor: "#fafafa", borderRadius: 1, maxWidth: 500 }}>
              <Typography variant="body2" sx={{ color: "#666", fontSize: "0.75rem", lineHeight: 1.45, textAlign: "center" }}>
                <strong>Why sign in?</strong>
                <br />• Save items for later
                <br />• Track your orders
                <br />• Faster checkout process
                <br />• Access exclusive deals
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}>
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Box sx={{ width: 120, height: 120, backgroundColor: "#fafafa", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", mb: 3, margin: "0 auto", border: "2px dashed #e0e0e0" }}>
              <ShoppingCartOutlined sx={{ fontSize: 48, color: "#ff6b35" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>
              Your cart is empty
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              Add some products to your cart and they will appear here.
            </Typography>
            <Button variant="contained" onClick={() => router.push("/product")} sx={{ backgroundColor: "#ff6b35", color: "white", px: 4, py: 1.5, fontSize: "14px", fontWeight: 600, textTransform: "none", borderRadius: 1, "&:hover": { backgroundColor: "#e55a2b" } }}>
              Continue Shopping
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper elevation={0} sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#333", fontSize: "1.25rem" }}>
            Shopping Cart
          </Typography>
        </Box>
        
        <Box sx={{ flexDirection: { xs: "column", lg: "row" } }}>
          {/* Cart Items */}
          <CartItems cartItems={cartItems} />
          
          {/* Bottom Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "#fafafa" }}>
            {/* Shipping Address */}
            <Box sx={{ p: 5 }}>
              <Typography sx={{ color: "#ff6b35", fontWeight: 600, fontSize: "0.95rem", mb: 2 }}>
                Shipping Address
              </Typography>
              <Box sx={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.6 }}>
                <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>Loreal Gummersbach Jaunstrasse</Typography>
                <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>Gummersbach Jaunstrasse</Typography>
                <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>Gummersbach Jaunstrasse Gummersbach</Typography>
                <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>Postcode: 234534-007</Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>Number: 234-234-2344</Typography>
              </Box>
            </Box>

            {/* Order Summary */}
            <Box sx={{ width: { xs: "100%", lg: "400px" }, flexShrink: 0, p: 3 }}>
              {/* Subtotal */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ color: "#333", fontSize: "0.875rem", fontWeight: 500 }}>Subtotal</Typography>
                <Typography sx={{ color: "#333", fontSize: "0.875rem", fontWeight: 600 }}>${subtotal.toFixed(2)}</Typography>
              </Box>

              {/* Discount */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Discount"
                  variant="outlined"
                  size="small"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.875rem",
                      backgroundColor: "#f5f5f5",
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "2px solid #ff6b35" },
                    },
                  }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Total */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography sx={{ color: "#333", fontSize: "1rem", fontWeight: 600 }}>Total</Typography>
                <Typography sx={{ color: "#333", fontSize: "1rem", fontWeight: 600 }}>${total.toFixed(2)}</Typography>
              </Box>

              {/* Checkout Button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleCheckout}
                sx={{
                  backgroundColor: "#ff6b35",
                  color: "white",
                  py: 1.5,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#e55a2b" },
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>

          {/* Load & Stuffing Calculation Section */}
          <LoadCalculation />
        </Box>
      </Paper>
    </Container>
  );
};

export default ShoppingCart;