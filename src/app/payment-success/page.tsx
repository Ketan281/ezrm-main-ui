"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { CheckCircle, Home, ShoppingBag } from "@mui/icons-material";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentSuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    // Get order ID from URL parameters
    const orderIdParam = searchParams.get("orderId");
    if (orderIdParam) {
      setOrderId(orderIdParam);
    }

    // Simulate loading time
    setTimeout(() => setLoading(false), 2000);
  }, [searchParams]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleViewOrders = () => {
    router.push("/profile?page=orders");
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress sx={{ color: "#ff6b35" }} />
          <Typography sx={{ ml: 2, color: "#666" }}>
            Processing your payment...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "#fafafa",
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Success Icon */}
        <Box sx={{ mb: 4 }}>
          <CheckCircle
            sx={{
              fontSize: 80,
              color: "#4caf50",
              mb: 2,
            }}
          />
        </Box>

        {/* Success Message */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#333",
            mb: 2,
          }}
        >
          Payment Successful!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#666",
            mb: 4,
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          Thank you for your purchase. Your order has been confirmed and payment
          has been processed successfully.
        </Typography>

        {/* Order Details */}
        {orderId && (
          <Box
            sx={{
              p: 3,
              backgroundColor: "white",
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              mb: 4,
              maxWidth: 400,
              mx: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#333",
                mb: 2,
              }}
            >
              Order Details
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                mb: 1,
              }}
            >
              <strong>Order ID:</strong> {orderId}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                mb: 1,
              }}
            >
              <strong>Status:</strong> Payment Confirmed
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
              }}
            >
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        )}

        {/* Success Alert */}
        <Alert
          severity="success"
          sx={{
            mb: 4,
            borderRadius: 2,
            maxWidth: 500,
            mx: "auto",
          }}
        >
          You will receive an email confirmation shortly with your order details
          and tracking information.
        </Alert>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={handleGoHome}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: "0.875rem",
              fontWeight: 600,
              textTransform: "none",
              borderColor: "#ddd",
              color: "#666",
              "&:hover": {
                borderColor: "#ccc",
                backgroundColor: "#f9f9f9",
              },
            }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            startIcon={<ShoppingBag />}
            onClick={handleViewOrders}
            sx={{
              backgroundColor: "#ff6b35",
              color: "white",
              py: 1.5,
              px: 4,
              fontSize: "0.875rem",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#e55a2b",
              },
            }}
          >
            View My Orders
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentSuccessPage;
