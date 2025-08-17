"use client";

import type React from "react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Tabs,
  Tab,
  Container,
  CircularProgress,
  Alert,
  Snackbar,
  InputLabel,
} from "@mui/material";
import {
  FavoriteBorder,
  WhatsApp,
  Email,
  Share,
  ShoppingCart,
  Add,
  Remove,
} from "@mui/icons-material";
import Image from "next/image";
import { useProductDetail } from "@/api/handlers/productDetailsHandler";
import { useAddToWishlist } from "@/api/handlers/wishlistHandler";
import { useAddToCart } from "@/api/handlers/cartHandler";
import { useAppStore } from "@/store/use-app-store";
import QuoteFormModal from "@/components/quote-form-modal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  // Auth state
  const { customer, isAuthenticated } = useAppStore();

  // Fetch product details
  const {
    data: response,
    isLoading,
    error,
    isError,
  } = useProductDetail(productId);

  // Wishlist mutation
  const addToWishlistMutation = useAddToWishlist();

  // Cart mutation
  const addToCartMutation = useAddToCart();

  // Tab state
  const [tabValue, setTabValue] = useState(1); // Product Description is active by default

  // Quote modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Snackbar state for feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Cart quantity state
  const [cartQuantity, setCartQuantity] = useState(1);

  // Dropdown states
  const [companySpecific, setCompanySpecific] = useState(
    "Documents - Company Specific"
  );
  const [facilitySpecific, setFacilitySpecific] = useState(
    "Documents - Facility Specific"
  );
  const [productSpecific, setProductSpecific] = useState(
    "Documents - Product Specific"
  );
  const [batchSpecific, setBatchSpecific] = useState(
    "Documents - Batch Specific"
  );
  const [minOrderQty, setMinOrderQty] = useState("25000");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePlaceEnquiry = () => {
    setIsQuoteModalOpen(true);
  };

  const handleWishlistClick = () => {
    // Check if user is authenticated
    if (!isAuthenticated || !customer) {
      // Redirect to login page
      router.push("/sign_in");
      return;
    }

    // Add to wishlist if authenticated
    addToWishlistMutation.mutate(
      {
        customerId: customer.id,
        productId: productId,
      },
      {
        onSuccess: () => {
          setSnackbarMessage("Product added to wishlist successfully!");
          setSnackbarOpen(true);
        },
        onError: (error) => {
          console.error("Failed to add to wishlist:", error);
          setSnackbarMessage(
            "Failed to add product to wishlist. Please try again."
          );
          setSnackbarOpen(true);
        },
      }
    );
  };

  const handleAddToCart = () => {
    // Check if user is authenticated
    if (!isAuthenticated || !customer) {
      // Redirect to login page
      router.push("/sign_in");
      return;
    }

    // Add to cart if authenticated
    addToCartMutation.mutate(
      {
        customerId: customer.id,
        productId: productId,
        quantity: cartQuantity,
      },
      {
        onSuccess: () => {
          setSnackbarMessage(
            `${cartQuantity} item(s) added to cart successfully!`
          );
          setSnackbarOpen(true);
        },
        onError: (error) => {
          console.error("Failed to add to cart:", error);
          setSnackbarMessage(
            "Failed to add product to cart. Please try again."
          );
          setSnackbarOpen(true);
        },
      }
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <Container
        maxWidth="xl"
        sx={{ py: 4, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // Error state
  if (isError) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading product details:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </Alert>
      </Container>
    );
  }

  const product: any = response?.data ?? {};

  if (!product) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="warning">Product not found</Alert>
      </Container>
    );
  }

  // Get product image
  const getProductImage = () => {
    if (product.bannerImage) {
      return product.bannerImage.startsWith("http")
        ? product.bannerImage
        : `${process.env.NEXT_PUBLIC_API_URL}/${product.bannerImage}`;
    }
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      return firstImage.startsWith("http")
        ? firstImage
        : `${process.env.NEXT_PUBLIC_API_URL}/${firstImage}`;
    }
    return "/placeholder.svg?height=400&width=600";
  };

  // Data
  const pricingData = [
    {
      quantity: "25 KG",
      price: `₹${product.price.toLocaleString()}`,
      save: "10%",
    },
    {
      quantity: "50 KG",
      price: `₹${(product.price * 0.95).toLocaleString()}`,
      save: "15%",
    },
    {
      quantity: "100 KG",
      price: `₹${(product.price * 0.9).toLocaleString()}`,
      save: "20%",
    },
  ];

  const productDescriptionData = [
    { label: "Product Category", value: product?.category?.name || "N/A" },
    { label: "Product ID", value: product.uniqueId },
    { label: "Product Type", value: product.appearance || "N/A" },
    { label: "Product Usage", value: product.description },
    {
      label: "Stock Status",
      value: product.inStock ? "In Stock" : "Out of Stock",
    },
  ];

  const features = [
    { label: "Allergen Free", color: "#ff6b35" },
    { label: "GMO Free", color: "#ff6b35" },
    { label: "Vegan", color: "#ff6b35" },
    { label: "Quality Assured", color: "#ff6b35" },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box>
        {/* Header */}
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 500,
            color: "#333",
          }}
        >
          {product?.name} / {product?.category?.name}
        </Typography>

        {/* Main Content - 70% Left, 30% Right */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Left Side - 70% */}
          <Box sx={{ width: "65%" }}>
            {/* Product Image Container */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 400,
                borderRadius: "30px 0px 0px 30px",
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
                mb: 3,
              }}
            >
              <Image
                src={getProductImage() || "/placeholder.svg"}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>

            {/* Three Tabs Container */}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="product tabs"
                  sx={{
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#666",
                      minHeight: 40,
                      "&.Mui-selected": {
                        color: "white",
                        backgroundColor: "#ff6b35",
                        borderRadius: "4px 4px 0 0",
                      },
                    },
                    "& .MuiTabs-indicator": {
                      display: "none", // Hide the default indicator since we're using full background
                    },
                  }}
                >
                  <Tab label="Sample Product" />
                  <Tab label="Product Description" />
                  <Tab label="FAQs" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.6, color: "#666" }}
                >
                  Sample Product information and details will be displayed here.
                </Typography>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Product Description
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.6, color: "#666", mb: 3 }}
                  >
                    {product.description}
                  </Typography>
                  {product.appearance && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Appearance:
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {product.appearance}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.6, color: "#666" }}
                >
                  Frequently Asked Questions content will be displayed here.
                </Typography>
              </TabPanel>
            </Box>

            {/* Table Container (borderless) */}
            <Box sx={{ mt: 3 }}>
              <Table size="small">
                <TableBody>
                  {productDescriptionData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td": { border: 0 } }}
                    >
                      <TableCell
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          width: "40%",
                          border: "none",
                          pl: 0,
                        }}
                      >
                        {row.label}:
                      </TableCell>
                      <TableCell sx={{ py: 1.5, border: "none" }}>
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>

          {/* Right Side - 30% */}
          <Box sx={{ width: "35%" }}>
            {/* Top Section - Height equal to image */}
            <Box sx={{ height: 400, display: "flex", flexDirection: "column" }}>
              {/* Product Title */}
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {product.name} /{" "}
                <span style={{ fontWeight: 400 }}>
                  {product?.category?.name}
                </span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {product.uniqueId}
              </Typography>

              {/* Product Icons */}
              <Grid container spacing={4} sx={{ mb: 3 }}>
                {features.map((feature, index) => (
                  <Grid key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: `2px solid ${feature.color}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 1,
                          backgroundColor: "white",
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: feature.color,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "white",
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            ✓
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "10px",
                          fontWeight: 500,
                          color: "#666",
                        }}
                      >
                        {feature.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Pricing Table */}
              <Box sx={{ mt: 0, mb: 3 }}>
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{ border: "1px solid #e0e0e0" }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                        <TableCell
                          sx={{ fontWeight: 600, py: 1.5, fontSize: "12px" }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 600, py: 1.5, fontSize: "12px" }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 600, py: 1.5, fontSize: "12px" }}
                        >
                          Save
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pricingData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ py: 1.5, fontSize: "12px" }}>
                            {row.quantity}
                          </TableCell>
                          <TableCell sx={{ py: 1.5, fontSize: "12px" }}>
                            {row.price}
                          </TableCell>
                          <TableCell sx={{ py: 1.5, fontSize: "12px" }}>
                            {row.save}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Quantity Selector and Add to Cart */}
              <Box sx={{ mb: 3 }}>
                {/* Quantity Selector */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, mb: 1, fontSize: "14px" }}
                  >
                    Quantity
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setCartQuantity(Math.max(1, cartQuantity - 1))
                      }
                      disabled={cartQuantity <= 1}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                        width: "32px",
                        height: "32px",
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <TextField
                      value={cartQuantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setCartQuantity(Math.max(1, value));
                      }}
                      size="small"
                      sx={{
                        width: "60px",
                        "& .MuiOutlinedInput-root": {
                          textAlign: "center",
                          fontSize: "14px",
                        },
                      }}
                      inputProps={{
                        min: 1,
                        style: { textAlign: "center" },
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => setCartQuantity(cartQuantity + 1)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                        width: "32px",
                        height: "32px",
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addToCartMutation.isPending}
                  sx={{
                    backgroundColor: product.inStock ? "#4caf50" : "#ccc",
                    color: "white",
                    py: 1.5,
                    fontSize: "14px",
                    fontWeight: 500,
                    textTransform: "none",
                    borderRadius: 1,
                    mb: 2,
                    "&:hover": {
                      backgroundColor: product.inStock ? "#45a049" : "#ccc",
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ShoppingCart fontSize="small" />
                  {addToCartMutation.isPending
                    ? "Adding..."
                    : product.inStock
                    ? "Add to Cart"
                    : "Out of Stock"}
                </Button>
              </Box>

              {/* Place Enquiry Button */}
              <Button
                variant="contained"
                fullWidth
                onClick={handlePlaceEnquiry}
                disabled={!product.inStock}
                sx={{
                  backgroundColor: product.inStock ? "#ff6b35" : "#ccc",
                  color: "white",
                  py: 1.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: 1,
                  mb: 2,
                  "&:hover": {
                    backgroundColor: product.inStock ? "#e55a2b" : "#ccc",
                  },
                }}
              >
                {product.inStock ? "Place an Enquiry" : "Out of Stock"}
              </Button>

              {/* Social Icons */}
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 1, fontSize: "12px" }}>
                  Add to Wishlist
                </Typography>
                <IconButton
                  size="small"
                  sx={{ color: "#ff6b35" }}
                  onClick={handleWishlistClick}
                  disabled={addToWishlistMutation.isPending}
                >
                  <FavoriteBorder fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: "#25d366" }}>
                  <WhatsApp fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: "#ea4335" }}>
                  <Email fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: "#ff6b35" }}>
                  <Share fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Company Specific Documents Section */}
            <Box sx={{ mt: 13, mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, fontSize: "16px" }}
              >
                Company Specific Documents
              </Typography>
              {/* Connected Dropdowns - No gaps */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormControl fullWidth size="small">
                  <Select
                    value={companySpecific}
                    onChange={(e) => setCompanySpecific(e.target.value)}
                    sx={{
                      backgroundColor: "#f8f9fa",
                      borderRadius: "4px 4px 0 0",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderBottom: "none",
                      },
                      "& .MuiSelect-select": {
                        color:
                          companySpecific === "Documents - Company Specific"
                            ? "#666"
                            : "#000",
                        fontSize: "13px",
                      },
                    }}
                  >
                    <MenuItem value="Documents - Company Specific" disabled>
                      Documents - Company Specific
                    </MenuItem>
                    <MenuItem value="doc1">Company Document 1</MenuItem>
                    <MenuItem value="doc2">Company Document 2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <Select
                    value={facilitySpecific}
                    onChange={(e) => setFacilitySpecific(e.target.value)}
                    sx={{
                      backgroundColor: "#f8f9fa",
                      borderRadius: 0,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderTop: "none",
                        borderBottom: "none",
                      },
                      "& .MuiSelect-select": {
                        color:
                          facilitySpecific === "Documents - Facility Specific"
                            ? "#666"
                            : "#000",
                        fontSize: "13px",
                      },
                    }}
                  >
                    <MenuItem value="Documents - Facility Specific" disabled>
                      Documents - Facility Specific
                    </MenuItem>
                    <MenuItem value="doc1">Facility Document 1</MenuItem>
                    <MenuItem value="doc2">Facility Document 2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <Select
                    value={productSpecific}
                    onChange={(e) => setProductSpecific(e.target.value)}
                    sx={{
                      backgroundColor: "#f8f9fa",
                      borderRadius: 0,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderTop: "none",
                        borderBottom: "none",
                      },
                      "& .MuiSelect-select": {
                        color:
                          productSpecific === "Documents - Product Specific"
                            ? "#666"
                            : "#000",
                        fontSize: "13px",
                      },
                    }}
                  >
                    <MenuItem value="Documents - Product Specific" disabled>
                      Documents - Product Specific
                    </MenuItem>
                    <MenuItem value="doc1">Product Document 1</MenuItem>
                    <MenuItem value="doc2">Product Document 2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <Select
                    value={batchSpecific}
                    onChange={(e) => setBatchSpecific(e.target.value)}
                    sx={{
                      backgroundColor: "#f8f9fa",
                      borderRadius: "0 0 4px 4px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderTop: "none",
                      },
                      "& .MuiSelect-select": {
                        color:
                          batchSpecific === "Documents - Batch Specific"
                            ? "#666"
                            : "#000",
                        fontSize: "13px",
                      },
                    }}
                  >
                    <MenuItem value="Documents - Batch Specific" disabled>
                      Documents - Batch Specific
                    </MenuItem>
                    <MenuItem value="doc1">Batch Document 1</MenuItem>
                    <MenuItem value="doc2">Batch Document 2</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Request For Sample Section - No Card */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, fontSize: "16px" }}
              >
                Request For Sample
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#ff6b35",
                  color: "white",
                  py: 1.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: 1,
                  mb: 3,
                  "&:hover": {
                    backgroundColor: "#e55a2b",
                  },
                }}
              >
                Request Now
              </Button>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, fontSize: "13px" }}
                >
                  Minimum Order Quantity:
                </Typography>
                <TextField
                  value={minOrderQty}
                  onChange={(e) => setMinOrderQty(e.target.value)}
                  size="small"
                  sx={{
                    width: "80px",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      fontSize: "13px",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Quote Form Modal */}
      <QuoteFormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productName={product.name}
        productId={product._id}
      />

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
}
