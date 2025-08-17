"use client";
import type React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Divider,
  Paper,
  Container,
  Checkbox,
  Modal,
  Grid,
  Select,
  MenuItem,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import {
  Add,
  Remove,
  ShoppingCartOutlined,
  Login,
  Settings,
  ArrowUpward,
  ArrowDownward,
  DeleteOutline,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/use-app-store";
import {
  useCart,
  useUpdateCartItem,
  useRemoveFromCart,
} from "@/api/handlers/cartHandler";
import type { CartItem as APICartItem } from "@/api/services/cart";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

interface Truck {
  id: number;
  name: string;
  image: string;
}

const trucks: Truck[] = [
  { id: 1, name: "TAUTLINER\n(CURAINSIDER)", image: "/truck1.png" },
  { id: 2, name: "REFRIGERATED TRUCK", image: "/truck2.png" },
  { id: 3, name: "ISOTHERM TRUCK", image: "/truck3.png" },
  { id: 4, name: "MEGA-TRAILER", image: "/truck4.png" },
  { id: 5, name: "JUMBO", image: "/truck5.png" },
  { id: 6, name: "CUSTOM TRUCK", image: "/truck6.png" },
];

const ShoppingCart: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, customer } = useAppStore();

  // Fetch cart data from API
  const {
    data: cartResponse,
    isLoading: cartLoading,
    error: cartError,
    isError: cartIsError,
  } = useCart(customer?.id || "", { enabled: !!customer?.id });

  // Cart mutation hooks
  const updateCartItemMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();

  const [discount, setDiscount] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  // Modal states
  const [isTruckModalOpen, setIsTruckModalOpen] = useState(false);
  const [isContainerModalOpen, setIsContainerModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [selectedTruckForDetail, setSelectedTruckForDetail] =
    useState<Truck | null>(null);
  const [showTruckDetail, setShowTruckDetail] = useState(false);

  // Container detail form states
  const [containerCount, setContainerCount] = useState(1);
  const [containerType, setContainerType] = useState("20' STANDARD");
  const [loadingRules, setLoadingRules] = useState("Auto");
  const [loadSpecificGroups, setLoadSpecificGroups] = useState(false);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1 || !customer?.id) return;

    updateCartItemMutation.mutate({
      productId,
      data: {
        customerId: customer.id,
        quantity: newQuantity,
      },
    });
  };

  const removeFromCart = (productId: string) => {
    if (!customer?.id) return;

    removeFromCartMutation.mutate({
      customerId: customer.id,
      productId,
    });
  };
  console.log(cartResponse, "cartResponse__cartResponse");

  // Extract cart data
  const cartData = cartResponse?.data?.cart;
  const cartItems = cartData?.items || [];
  const subtotal = cartData?.totalAmount || 0;
  const total = subtotal;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleLogin = () => {
    router.push("/sign_in");
  };

  const handleSignUp = () => {
    router.push("/sign_up");
  };

  const handleOpenTruckModal = () => {
    setSelectedTruck(null);
    setShowTruckDetail(false);
    setIsTruckModalOpen(true);
  };

  const handleCloseTruckModal = () => {
    setIsTruckModalOpen(false);
    setSelectedTruck(null);
    setShowTruckDetail(false);
  };

  const handleSelectTruck = (truck: Truck) => {
    setSelectedTruck(truck);
  };

  const handleTruckSelect = () => {
    if (selectedTruck) {
      setSelectedTruckForDetail(selectedTruck);
      setShowTruckDetail(true);
      setIsTruckModalOpen(false);
    }
  };

  const handleOpenContainerModal = () => {
    setIsContainerModalOpen(true);
  };

  const handleCloseContainerModal = () => {
    setIsContainerModalOpen(false);
  };

  // Loading state
  if (cartLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper
          elevation={0}
          sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}
        >
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
        <Paper
          elevation={0}
          sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}
        >
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
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 0,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                backgroundColor: "#fafafa",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
                border: "2px dashed #e0e0e0",
              }}
            >
              <ShoppingCartOutlined
                sx={{
                  fontSize: 48,
                  color: "#ff6b35",
                }}
              />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#333",
                fontSize: "1.1rem",
                mb: 1,
              }}
            >
              Please Login to View Your Cart
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#666",
                fontSize: "0.875rem",
                mb: 4,
                maxWidth: 400,
                lineHeight: 1.6,
              }}
            >
              You need to be signed in to view and manage your shopping cart
              items. Login to your account or create a new one to get started.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={handleLogin}
                startIcon={<Login />}
                sx={{
                  backgroundColor: "#ff6b35",
                  color: "white",
                  px: 4,
                  py: 0.5,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1,
                  minWidth: 140,
                  "&:hover": {
                    backgroundColor: "#e55a2b",
                  },
                }}
              >
                Login
              </Button>

              <Button
                variant="outlined"
                onClick={handleSignUp}
                sx={{
                  borderColor: "#ff6b35",
                  color: "#ff6b35",
                  px: 4,
                  py: 1,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1,
                  minWidth: 140,
                  "&:hover": {
                    borderColor: "#e55a2b",
                    backgroundColor: "rgba(255, 107, 53, 0.04)",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>

            <Box
              sx={{
                mt: 1,
                p: 3,
                backgroundColor: "#fafafa",
                borderRadius: 1,
                maxWidth: 500,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontSize: "0.75rem",
                  lineHeight: 1.45,
                  textAlign: "center",
                }}
              >
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
        <Paper
          elevation={0}
          sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}
        >
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                backgroundColor: "#fafafa",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                margin: "0 auto",
                border: "2px dashed #e0e0e0",
              }}
            >
              <ShoppingCartOutlined sx={{ fontSize: 48, color: "#ff6b35" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#333", mb: 2 }}
            >
              Your cart is empty
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
              Add some products to your cart and they will appear here.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/product")}
              sx={{
                backgroundColor: "#ff6b35",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 1,
                "&:hover": { backgroundColor: "#e55a2b" },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Authenticated user - show normal cart
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#333",
              fontSize: "1.25rem",
            }}
          >
            Shopping Cart
          </Typography>
        </Box>
        <Box
          sx={{
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          {/* Main Cart Content */}
          <Box sx={{ flex: 1 }}>
            {/* Cart Items Table */}
            <TableContainer
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                mb: 3,
              }}
            >
              <Table
                sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "0.875rem",
                        py: 2,
                        borderBottom: "1px solid rgba(234, 104, 36, 1)",
                        backgroundColor: "transparent",
                      }}
                    >
                      Item
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "0.875rem",
                        py: 2,
                        borderBottom: "1px solid rgba(234, 104, 36, 1)",
                        backgroundColor: "transparent",
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "0.875rem",
                        py: 2,
                        borderBottom: "1px solid rgba(234, 104, 36, 1)",
                        backgroundColor: "transparent",
                      }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "0.875rem",
                        py: 2,
                        borderBottom: "1px solid rgba(234, 104, 36, 1)",
                        backgroundColor: "transparent",
                      }}
                    >
                      Subtotal
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "0.875rem",
                        py: 2,
                        borderBottom: "1px solid rgba(234, 104, 36, 1)",
                        backgroundColor: "transparent",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow
                      key={item.product._id}
                      sx={{
                        "& td": {
                          backgroundColor: "#fafafa",
                          border: "none",
                          "&:first-of-type": {
                            borderTopLeftRadius: "20px",
                            borderBottomLeftRadius: "20px",
                          },
                          "&:last-of-type": {
                            borderTopRightRadius: "20px",
                            borderBottomRightRadius: "20px",
                          },
                        },
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: "#ffa500",
                              borderRadius: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              📦
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                color: "#333",
                                fontSize: "0.875rem",
                                mb: 0.5,
                              }}
                            >
                              {item.productName}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#666",
                                fontSize: "0.75rem",
                              }}
                            >
                              Product ID: {item.product._id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "#333",
                            fontSize: "0.875rem",
                          }}
                        >
                          ${item.productPrice.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                            sx={{
                              width: 24,
                              height: 24,
                              border: "1px solid #ddd",
                              borderRadius: "50%",
                              "&:hover": {
                                backgroundColor: "#f5f5f5",
                              },
                            }}
                          >
                            <Remove sx={{ fontSize: 14 }} />
                          </IconButton>
                          <Box
                            sx={{ mx: 1, textAlign: "center", minWidth: 40 }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                color: "#333",
                                fontSize: "0.875rem",
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#4caf50",
                                fontSize: "0.625rem",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              IN STOCK: 6
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
                            sx={{
                              width: 24,
                              height: 24,
                              border: "1px solid #ddd",
                              borderRadius: "50%",
                              "&:hover": {
                                backgroundColor: "#f5f5f5",
                              },
                            }}
                          >
                            <Add sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "#333",
                            fontSize: "0.875rem",
                          }}
                        >
                          ${(item.productPrice * item.quantity).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.product._id)}
                          disabled={removeFromCartMutation.isPending}
                          sx={{
                            color: "#f44336",
                            "&:hover": {
                              backgroundColor: "rgba(244, 67, 54, 0.1)",
                            },
                          }}
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Bottom Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#fafafa",
            }}
          >
            {/* Shipping Address */}
            <Box sx={{ p: 5 }}>
              <Typography
                sx={{
                  color: "#ff6b35",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  mb: 2,
                }}
              >
                Shipping Address
              </Typography>
              <Box
                sx={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.6 }}
              >
                <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                  Loreal Gummersbach Jaunstrasse
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                  Gummersbach Jaunstrasse
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                  Gummersbach Jaunstrasse Gummersbach
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                  Postcode: 234534-007
                </Typography>
                <Typography sx={{ fontSize: "0.75rem" }}>
                  Number: 234-234-2344
                </Typography>
              </Box>
            </Box>

            {/* Order Summary */}
            <Box
              sx={{
                width: { xs: "100%", lg: "400px" },
                flexShrink: 0,
                p: 3,
              }}
            >
              {/* Subtotal */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#333",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  Subtotal
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  ${subtotal.toFixed(2)}
                </Typography>
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
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "2px solid #ff6b35",
                      },
                    },
                  }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Total */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    color: "#333",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  ${total.toFixed(2)}
                </Typography>
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
                  "&:hover": {
                    backgroundColor: "#e55a2b",
                  },
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>

          {/* Load & Stuffing Calculation Section */}
          <Box sx={{ mt: 4, width: "100%" }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#333",
                mb: 3,
                fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
              }}
            >
              Load & Stuffing Calculation
            </Typography>

            <Paper
              elevation={0}
              sx={{
                border: "1px solid transparent",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {/* Tab Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "rgba(251, 251, 251, 1)",
                  minHeight: 56,
                }}
              >
                {/* Tabs */}
                {["PRODUCTS", "CONTAINER & TRUCKS", "STUFFING RESULT"].map(
                  (tab, index) => (
                    <Box
                      key={tab}
                      onClick={() => setActiveTab(index)}
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 56,
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 600,
                        color:
                          activeTab === index
                            ? "#ff6b35"
                            : "rgba(90, 96, 127, 0.77)",
                        borderRight: index < 2 ? "3px solid #f0f0f0" : "none",
                        borderBottom:
                          activeTab === index
                            ? "2px solid #ff6b35"
                            : "2px solid transparent",
                        transition: "all 0.3s ease",
                        position: "relative",
                        "&:hover": {
                          color: "#ff6b35",
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          backgroundColor: "#ff6b35",
                          transform:
                            activeTab === index ? "scaleX(1)" : "scaleX(0)",
                          transformOrigin: "center",
                          transition: "transform 0.3s ease",
                        },
                      }}
                    >
                      {tab}
                    </Box>
                  )
                )}

                {/* Settings Icon */}
                <IconButton
                  sx={{
                    m: 1,
                    border: "1px solid transparent",
                    borderRadius: "4px",
                    width: 36,
                    height: 36,
                    bgcolor: "white",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                  }}
                >
                  <Settings sx={{ fontSize: 18, color: "#999" }} />
                </IconButton>
              </Box>

              {/* Conditionally render tab content */}
              {activeTab === 0 && (
                <>
                  {/* Action Buttons for Products Tab */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                      p: 2,
                      bgcolor: "rgba(251, 251, 251, 1)",
                      borderBottom: "1px solid #f0f0f0",
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Button
                        size="medium"
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          textTransform: "none",
                          color: "#fff",
                          background:
                            "linear-gradient(90deg, #F58A4E 0%, #F16A3C 100%)",
                          minWidth: 135,
                          height: 38,
                          borderRadius: "5px",
                          "&:hover": {
                            borderColor: "#d0d0d0",
                          },
                        }}
                      >
                        + Add Group
                      </Button>
                    </Box>
                    <Box display={"flex"} gap={2}>
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderColor: "#e0e0e0",
                          color: "#52c41a",
                          bgcolor: "rgba(238, 249, 236, 1)",
                          minWidth: 135,
                          height: 38,
                          borderRadius: "5px",
                          "&:hover": {
                            borderColor: "#52c41a",
                            bgcolor: "rgba(82, 196, 26, 0.05)",
                          },
                        }}
                      >
                        Import
                      </Button>

                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderColor: "#e0e0e0",
                          color: "#1890ff",
                          bgcolor: "rgba(230, 232, 255, 1)",
                          minWidth: 135,
                          height: 38,
                          borderRadius: "5px",
                          "&:hover": {
                            borderColor: "#1890ff",
                            bgcolor: "rgba(24, 144, 255, 0.05)",
                          },
                        }}
                      >
                        Export
                      </Button>

                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          textTransform: "none",
                          borderColor: "#e0e0e0",
                          color: "#fff",
                          background:
                            "linear-gradient(90deg, rgba(255, 199, 0, 1) 0%, rgba(255, 143, 107, 1) 100%)",
                          minWidth: 135,
                          height: 38,
                          borderRadius: "5px",
                          "&:hover": {
                            borderColor: "#faad14",
                            bgcolor: "rgba(250, 173, 20, 0.05)",
                          },
                        }}
                      >
                        Upgrade
                      </Button>
                    </Box>
                  </Box>

                  {/* Products Table Section */}
                  <Box sx={{ p: 2, bgcolor: "white" }}>
                    {/* Group Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                        p: 1,
                        borderBottom: "1px solid rgba(203, 204, 214, 1)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          bgcolor: "#333",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#333",
                        }}
                      >
                        Group #1
                      </Typography>
                      <IconButton size="small" sx={{ ml: "auto" }}></IconButton>
                      <IconButton size="small" sx={{ color: "#ff4d4f" }}>
                        <img
                          src="/bin.png"
                          alt="Delete"
                          style={{ width: 16, height: 16 }}
                        />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#1890ff" }}>
                        <ArrowUpward sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#52c41a" }}>
                        <ArrowDownward sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>

                    {/* Table */}
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#666",
                                py: 1,
                              }}
                            >
                              Type
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#666",
                                py: 1,
                              }}
                            >
                              Product Name
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#666",
                                py: 1,
                              }}
                              align="center"
                            >
                              Length/Diameter
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#666",
                                py: 1,
                              }}
                              align="center"
                            >
                              Width
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#666",
                                py: 1,
                              }}
                              align="center"
                            >
                              Height
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#666",
                                py: 1,
                              }}
                              align="center"
                            >
                              Weight
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#666",
                                py: 1,
                              }}
                              align="center"
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#666",
                                py: 1,
                              }}
                              align="center"
                            >
                              Color
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#666",
                                py: 1,
                              }}
                              align="center"
                            >
                              Stock
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Product Row 1 */}
                          <TableRow>
                            <TableCell sx={{ py: 1.5 }}>
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  bgcolor: "#f0f0f0",
                                  borderRadius: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                📦
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: "12px", py: 1.5 }}>
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 16px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                Boxes 1
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                500 <span style={{ color: "#999" }}>mm</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                300 <span style={{ color: "#999" }}>mm</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                300 <span style={{ color: "#999" }}>mm</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                45 <span style={{ color: "#999" }}>kg</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                py: 1.5,
                                fontWeight: 600,
                              }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 16px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                  fontWeight: 600,
                                }}
                              >
                                80
                              </Box>
                            </TableCell>
                            <TableCell sx={{ py: 1.5 }} align="center">
                              <Box
                                sx={{
                                  width: 16,
                                  height: 16,
                                  bgcolor: "#52c41a",
                                  borderRadius: "50%",
                                  mx: "auto",
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ py: 1.5 }} align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 0.5,
                                  justifyContent: "center",
                                }}
                              >
                                <IconButton
                                  size="small"
                                  sx={{ color: "#1890ff" }}
                                >
                                  <Settings sx={{ fontSize: 14 }} />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  sx={{ color: "#ff4d4f" }}
                                >
                                  <img
                                    src="/bin.png"
                                    alt="Delete"
                                    style={{ width: 14, height: 14 }}
                                  />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>

                          {/* Product Row 2 */}
                          <TableRow>
                            <TableCell sx={{ py: 1.5 }}>
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  bgcolor: "#f0f0f0",
                                  borderRadius: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                🧦
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: "12px", py: 1.5 }}>
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 16px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                Socks
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                1000 <span style={{ color: "#999" }}>mm</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                300 <span style={{ color: "#999" }}>mm</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                300 <span style={{ color: "#999" }}>mm</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                45 <span style={{ color: "#999" }}>kg</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                py: 1.5,
                                fontWeight: 600,
                              }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 16px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                  fontWeight: 600,
                                }}
                              >
                                100
                              </Box>
                            </TableCell>
                            <TableCell sx={{ py: 1.5 }} align="center">
                              <Box
                                sx={{
                                  width: 16,
                                  height: 16,
                                  bgcolor: "#eb2f96",
                                  borderRadius: "50%",
                                  mx: "auto",
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ py: 1.5 }} align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 0.5,
                                  justifyContent: "center",
                                }}
                              >
                                <IconButton
                                  size="small"
                                  sx={{ color: "#1890ff" }}
                                >
                                  <Settings sx={{ fontSize: 14 }} />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  sx={{ color: "#ff4d4f" }}
                                >
                                  <img
                                    src="/bin.png"
                                    alt="Delete"
                                    style={{ width: 14, height: 14 }}
                                  />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>

                          {/* Product Row 3 */}
                          <TableRow>
                            <TableCell sx={{ py: 1.5 }}>
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  bgcolor: "#f0f0f0",
                                  borderRadius: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                👜
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: "12px", py: 1.5 }}>
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 16px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                Big Bags
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                1000 <span style={{ color: "#999" }}>mm</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                1000 <span style={{ color: "#999" }}>mm</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                1000 <span style={{ color: "#999" }}>mm</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", py: 1.5 }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 12px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                }}
                              >
                                50 <span style={{ color: "#999" }}>kg</span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "12px",
                                py: 1.5,
                                fontWeight: 600,
                              }}
                              align="center"
                            >
                              <Box
                                component="span"
                                sx={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  borderRadius: "20px",
                                  width: "100px",
                                  padding: "6px 16px",
                                  display: "inline-block",
                                  fontSize: "12px",
                                  backgroundColor: "#fafafa",
                                  fontWeight: 600,
                                }}
                              >
                                16
                              </Box>
                            </TableCell>
                            <TableCell sx={{ py: 1.5 }} align="center">
                              <Box
                                sx={{
                                  width: 16,
                                  height: 16,
                                  bgcolor: "#1890ff",
                                  borderRadius: "50%",
                                  mx: "auto",
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ py: 1.5 }} align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 0.5,
                                  justifyContent: "center",
                                }}
                              >
                                <IconButton
                                  size="small"
                                  sx={{ color: "#1890ff" }}
                                >
                                  <Settings sx={{ fontSize: 14 }} />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  sx={{ color: "#ff4d4f" }}
                                >
                                  <img
                                    src="/bin.png"
                                    alt="Delete"
                                    style={{ width: 14, height: 14 }}
                                  />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {/* Add Product Link */}
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Button
                        size="small"
                        sx={{
                          fontSize: "12px",
                          color: "#1890ff",
                          textTransform: "none",
                          fontWeight: 500,
                          p: 0,
                          minWidth: "auto",
                          "&:hover": {
                            bgcolor: "transparent",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        + Add Product
                      </Button>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#999",
                          ml: 2,
                        }}
                      >
                        Use Palette ?
                      </Typography>
                    </Box>

                    {/* Product Count */}
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#1890ff",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        1,245 Product(s)
                      </Typography>
                    </Box>
                  </Box>

                  {/* Next Button for Products Tab */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 3,
                      backgroundColor: "white",
                      borderTop: "1px solid #f0f0f0",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => setActiveTab(1)}
                      sx={{
                        bgcolor: "#ff6b35",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 600,
                        textTransform: "none",
                        px: 4,
                        py: 1,
                        borderRadius: "4px",
                        minWidth: 120,
                        "&:hover": {
                          bgcolor: "#e55a2b",
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </>
              )}

              {/* Container & Trucks Tab Content */}
              {activeTab === 1 && (
                <Box
                  sx={{
                    bgcolor: "#fff",
                    fontFamily:
                      "'Inter', 'Roboto', 'Helvetica Neue', Arial, 'sans-serif'",
                    px: { xs: 1, sm: 1, md: 2.5 },
                    pt: { xs: 2, sm: 3, md: 4 },
                  }}
                >
                  {/* Top Bar */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: { xs: 2, md: 3.5 },
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        disableElevation
                        onClick={handleOpenContainerModal}
                        sx={{
                          fontSize: "15px",
                          fontWeight: 500,
                          textTransform: "none",
                          bgcolor: "#FF8043",
                          color: "#fff",
                          px: 3,
                          py: 1,
                          minWidth: "160px",
                          borderRadius: "10px",
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "#FF8043",
                          },
                        }}
                      >
                        + Add Container
                      </Button>
                      <Button
                        variant="contained"
                        disableElevation
                        onClick={handleOpenTruckModal}
                        sx={{
                          fontSize: "15px",
                          fontWeight: 500,
                          textTransform: "none",
                          bgcolor: "#FF8043",
                          color: "#fff",
                          px: 3,
                          py: 1,
                          minWidth: "140px",
                          borderRadius: "10px",
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "#FF8043",
                          },
                        }}
                      >
                        + Add Truck
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#fff7f1",
                        px: 2.4,
                        py: 0.75,
                        borderRadius: "12px",
                        minHeight: 40,
                        boxShadow: "none",
                      }}
                    >
                      <Checkbox
                        size="small"
                        checked
                        sx={{
                          p: 0,
                          color: "#FF8043",
                          "&.Mui-checked": {
                            color: "#FF8043",
                          },
                          mr: 1.2,
                          "& .MuiSvgIcon-root": {
                            fontSize: "1.45rem",
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: 500,
                          fontFamily:
                            "'Inter', 'Roboto', 'Helvetica Neue', Arial, 'sans-serif'",
                          color: "#FF8043",
                          letterSpacing: 0,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Automatic container selection
                      </Typography>
                    </Box>
                  </Box>

                  {/* Main Content Box */}
                  {selectedTruckForDetail && showTruckDetail ? (
                    // Show selected truck detail UI from second image
                    <Box
                      sx={{
                        py: 2,
                        borderRadius: 2,
                        bgcolor: "#fff",
                        maxWidth: 900,
                        mx: "auto",
                      }}
                    >
                      {/* Dropdown and action icons row */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Select
                          size="small"
                          value={containerType}
                          onChange={(e) => setContainerType(e.target.value)}
                          sx={{ width: 150, fontSize: 13 }}
                          variant="outlined"
                        >
                          <MenuItem value="20' STANDARD">
                            20&apos; STANDARD
                          </MenuItem>
                          <MenuItem value="40' STANDARD">
                            40&apos; STANDARD
                          </MenuItem>
                          <MenuItem value="40' HIGH CUBE">
                            40&apos; HIGH CUBE
                          </MenuItem>
                        </Select>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <IconButton size="small" sx={{ color: "#ff4d4f" }}>
                            <DeleteOutline fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "#1890ff" }}>
                            <ArrowUpward fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "#52c41a" }}>
                            <ArrowDownward fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Main row with image and inputs */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 4,
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 200,
                            height: 180,
                            bgcolor: "#ebebe9",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {/* Container image placeholder */}
                          <Box sx={{ fontSize: 80, color: "#999" }}>📦</Box>
                        </Box>

                        {/* Form inputs section */}
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 2,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography sx={{ fontSize: 13 }}>Count</Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ minWidth: 32, p: 0, width: 32, height: 32 }}
                              onClick={() =>
                                setContainerCount(
                                  Math.max(1, containerCount - 1)
                                )
                              }
                            >
                              -
                            </Button>
                            <TextField
                              size="small"
                              type="number"
                              value={containerCount}
                              onChange={(e) =>
                                setContainerCount(
                                  Math.max(1, parseInt(e.target.value) || 1)
                                )
                              }
                              inputProps={{
                                min: 1,
                                style: {
                                  textAlign: "center",
                                  width: "50px",
                                  fontSize: 13,
                                },
                              }}
                              sx={{ width: 70 }}
                            />
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ minWidth: 32, p: 0, width: 32, height: 32 }}
                              onClick={() =>
                                setContainerCount(containerCount + 1)
                              }
                            >
                              +
                            </Button>

                            <Typography sx={{ fontSize: 13 }}>
                              Length
                            </Typography>
                            <TextField
                              size="small"
                              defaultValue="678"
                              sx={{ width: 70 }}
                              inputProps={{
                                readOnly: true,
                                style: { textAlign: "center", fontSize: 13 },
                              }}
                            />
                            <Typography sx={{ fontSize: 13 }}>mm</Typography>

                            <Typography sx={{ fontSize: 13 }}>Width</Typography>
                            <TextField
                              size="small"
                              defaultValue="678"
                              sx={{ width: 70 }}
                              inputProps={{
                                readOnly: true,
                                style: { textAlign: "center", fontSize: 13 },
                              }}
                            />
                            <Typography sx={{ fontSize: 13 }}>mm</Typography>

                            <Typography sx={{ fontSize: 13 }}>
                              Height
                            </Typography>
                            <TextField
                              size="small"
                              defaultValue="678"
                              sx={{ width: 70 }}
                              inputProps={{
                                readOnly: true,
                                style: { textAlign: "center", fontSize: 13 },
                              }}
                            />
                            <Typography sx={{ fontSize: 13 }}>mm</Typography>

                            <Typography sx={{ fontSize: 13 }}>
                              Max Weight
                            </Typography>
                            <TextField
                              size="small"
                              defaultValue="678"
                              sx={{ width: 70 }}
                              inputProps={{
                                readOnly: true,
                                style: { textAlign: "center", fontSize: 13 },
                              }}
                            />
                            <Typography sx={{ fontSize: 13 }}>Kg</Typography>
                          </Box>

                          {/* Loading rules and checkbox */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mt: 2,
                            }}
                          >
                            <Typography sx={{ fontSize: 13 }}>
                              Loading rules
                            </Typography>
                            <Select
                              size="small"
                              value={loadingRules}
                              onChange={(e) => setLoadingRules(e.target.value)}
                              sx={{ width: 120, fontSize: 13 }}
                            >
                              <MenuItem value="Auto">Auto</MenuItem>
                              <MenuItem value="Manual">Manual</MenuItem>
                            </Select>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  checked={loadSpecificGroups}
                                  onChange={(e) =>
                                    setLoadSpecificGroups(e.target.checked)
                                  }
                                />
                              }
                              label={
                                <Typography
                                  sx={{
                                    fontSize: 13,
                                    fontWeight: 400,
                                    color: "#000",
                                  }}
                                >
                                  Load only specific groups
                                </Typography>
                              }
                            />
                          </Box>
                        </Box>
                      </Box>

                      {/* Buttons */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "center",
                          mt: 4,
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => setActiveTab(0)}
                          sx={{
                            minWidth: 96,
                            borderRadius: 2,
                            borderColor: "#f6e1da",
                            color: "#ff8144",
                            fontWeight: 600,
                            fontSize: 14,
                            textTransform: "none",
                            "&:hover": {
                              borderColor: "#f6e1da",
                              bgcolor: "rgba(255, 129, 68, 0.04)",
                            },
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => setActiveTab(2)}
                          sx={{
                            minWidth: 112,
                            borderRadius: 2,
                            bgcolor: "#ff8144",
                            fontWeight: 600,
                            fontSize: 14,
                            textTransform: "none",
                            "&:hover": {
                              bgcolor: "#e55a2b",
                            },
                          }}
                        >
                          Next
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    // Show fallback UI when no truck selected
                    <Box
                      sx={{
                        bgcolor: "#fff",
                        borderRadius: "16px",
                        boxShadow: "none",
                        minHeight: { xs: 250, sm: 330, md: 340 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: { xs: 2.5, md: 5 },
                        border: "2px solid rgba(248,248,248, 1)",
                        px: { xs: 0, sm: 2, md: 4 },
                        py: { xs: 3, sm: 4, md: 4 },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "100%",
                          pt: 1,
                          pb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            mb: 2.25,
                            width: 54,
                            height: 54,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box sx={{ fontSize: 54, color: "#1890ff" }}>📦</Box>
                        </Box>
                        <Typography
                          sx={{
                            fontFamily:
                              "'Inter', 'Roboto', Arial, 'sans-serif'",
                            fontWeight: 600,
                            fontSize: "18px",
                            color: "#220c1b",
                            letterSpacing: 0.02,
                          }}
                        >
                          Please add Transport
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {!showTruckDetail && (
                    // Action Buttons (only show when no truck detail)
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                        mb: 1.5,
                        mt: { xs: 2, md: 0 },
                      }}
                    >
                      <Button
                        variant="contained"
                        disableElevation
                        onClick={() => setActiveTab(0)}
                        sx={{
                          minWidth: "120px",
                          borderRadius: "8px",
                          background: "#ffe7db",
                          color: "#ff8144",
                          boxShadow: "none",
                          fontSize: "16px",
                          fontWeight: 600,
                          textTransform: "none",
                          height: 44,
                          mr: 1.5,
                          "&:hover": {
                            background: "#ffe7db",
                            color: "#ff8144",
                          },
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        disableElevation
                        onClick={() => setActiveTab(2)}
                        sx={{
                          minWidth: "120px",
                          borderRadius: "8px",
                          background: "#ff8144",
                          color: "#fff",
                          fontSize: "16px",
                          fontWeight: 600,
                          textTransform: "none",
                          height: 44,
                          boxShadow: "none",
                          "&:hover": {
                            background: "#ff8144",
                            color: "#fff",
                          },
                        }}
                      >
                        Next
                      </Button>
                    </Box>
                  )}
                </Box>
              )}

              {/* Stuffing Result Tab Content */}
              {activeTab === 2 && (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="h6">Stuffing Result Content</Typography>
                  <Typography>
                    This will show the stuffing calculation results.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 3,
                      mt: 4,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => setActiveTab(1)}
                      sx={{
                        minWidth: "120px",
                        borderRadius: "8px",
                        background: "#ffe7db",
                        color: "#ff8144",
                        boxShadow: "none",
                        fontSize: "16px",
                        fontWeight: 600,
                        textTransform: "none",
                        height: 44,
                        "&:hover": {
                          background: "#ffe7db",
                          color: "#ff8144",
                        },
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        minWidth: "120px",
                        borderRadius: "8px",
                        background: "#ff8144",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 600,
                        textTransform: "none",
                        height: 44,
                        boxShadow: "none",
                        "&:hover": {
                          background: "#ff8144",
                          color: "#fff",
                        },
                      }}
                    >
                      Finish
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>

        {/* Truck Selection Modal */}
        <Modal
          open={isTruckModalOpen}
          onClose={handleCloseTruckModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "95%", sm: "85%", md: "75%", lg: 1000 },
              maxHeight: "90vh",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 0,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Modal Header with Tabs */}
            <Box
              sx={{
                bgcolor: "#fafafa",
                px: 3,
                py: 2,
                borderBottom: "1px solid #e5e5e5",
              }}
            >
              <Box sx={{ display: "flex", gap: 4 }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#667080",
                    fontSize: 16,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  🏛️ Container
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#1890ff",
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                    borderBottom: "3px solid #1890ff",
                    pb: 1,
                  }}
                >
                  🚚 Truck
                </Typography>
              </Box>
            </Box>

            {/* Modal Content */}
            <Box sx={{ p: 3, maxHeight: "70vh", overflowY: "auto" }}>
              <Grid container spacing={2}>
                {trucks.map((truck) => (
                  <Grid key={truck.id}>
                    <Box
                      onClick={() => handleSelectTruck(truck)}
                      sx={{
                        cursor: "pointer",
                        borderRadius: 2,
                        border:
                          selectedTruck?.id === truck.id
                            ? "3px solid #1890ff"
                            : "1px solid #e1e6ed",
                        p: 2,
                        textAlign: "center",
                        height: "100%",
                        minHeight: 200,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1.5,
                        backgroundColor: "#fff",
                        transition: "border-color 0.3s, transform 0.2s",
                        "&:hover": {
                          borderColor: "#1890ff",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#18202c",
                          whiteSpace: "pre-line",
                          lineHeight: 1.3,
                          minHeight: 40,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {truck.name}
                      </Typography>

                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 120,
                            height: 80,
                            bgcolor: "#f8f9fa",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 40,
                          }}
                        >
                          🚛
                        </Box>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#9aa5b1",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        LEARN MORE
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Modal Footer */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                bgcolor: "#fafafa",
                borderTop: "1px solid #e5e5e5",
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseTruckModal}
                sx={{
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: 14,
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  color: "#5992ff",
                  borderColor: "#e1e6ed",
                  "&:hover": {
                    borderColor: "#5992ff",
                    bgcolor: "rgba(89, 146, 255, 0.04)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={!selectedTruck}
                onClick={handleTruckSelect}
                sx={{
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: 14,
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: "#1890ff",
                  "&:hover": { bgcolor: "#0c7cd5" },
                  "&:disabled": { bgcolor: "#d1d5db", color: "#9ca3af" },
                }}
              >
                Select
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Container Modal */}
        <Modal
          open={isContainerModalOpen}
          onClose={handleCloseContainerModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              minWidth: 300,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Coming Soon
            </Typography>
            <Typography sx={{ mb: 3, color: "#666" }}>
              Container functionality will be available soon!
            </Typography>
            <Button
              variant="contained"
              onClick={handleCloseContainerModal}
              sx={{
                bgcolor: "#ff8144",
                px: 4,
                "&:hover": { bgcolor: "#e55a2b" },
              }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Paper>
    </Container>
  );
};

export default ShoppingCart;
