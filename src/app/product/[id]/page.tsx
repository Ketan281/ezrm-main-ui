"use client"

import type React from "react"

import { useState } from "react"
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
} from "@mui/material"
import { FavoriteBorder, WhatsApp, Email, Share } from "@mui/icons-material"
import Image from "next/image"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

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
  )
}

export default function ProductDetailPage() {
  // Tab state
  const [tabValue, setTabValue] = useState(1) // Product Description is active by default

  // Dropdown states
  const [companySpecific, setCompanySpecific] = useState("Documents - Company Specific")
  const [facilitySpecific, setFacilitySpecific] = useState("Documents - Facility Specific")
  const [productSpecific, setProductSpecific] = useState("Documents - Product Specific")
  const [batchSpecific, setBatchSpecific] = useState("Documents - Batch Specific")
  const [minOrderQty, setMinOrderQty] = useState("25000")

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Data
  const pricingData = [
    { quantity: "25 KG", price: "$17.50", save: "10%" },
    { quantity: "50 KG", price: "$17.50", save: "10%" },
    { quantity: "100 KG", price: "$17.50", save: "10%" },
  ]

  const productDescriptionData = [
    { label: "Product Category", value: "Category ABCD" },
    { label: "Product ID", value: "M123456" },
    { label: "Product Type", value: "lorem ipsum" },
    { label: "Product Usage", value: "Lorem ipsum lorem ipsum lorem CONSECTETUR consectetur lorem ipsum" },
  ]

  const features = [
    { label: "Allergen Free", color: "#ff6b35" },
    { label: "GMO Free", color: "#ff6b35" },
    { label: "Vegan", color: "#ff6b35" },
    { label: "Allergen Free", color: "#ff6b35" },
  ]

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
          Product Name / Product Category lorem ipsum
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
              <Image src="/detailProduct.png" alt="Product Image" fill style={{ objectFit: "cover" }} />
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
                <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#666" }}>
                  Sample Product information and details will be displayed here.
                </Typography>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Product Description
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#666", mb: 3 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#666" }}>
                  Frequently Asked Questions content will be displayed here.
                </Typography>
              </TabPanel>
            </Box>

            {/* Table Container (borderless) */}
            <Box sx={{ mt: 3 }}>
              <Table size="small">
                <TableBody>
                  {productDescriptionData.map((row, index) => (
                    <TableRow key={index} sx={{ "&:last-child td": { border: 0 } }}>
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
                      <TableCell sx={{ py: 1.5, border: "none" }}>{row.value}</TableCell>
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
                Product Name / <span style={{ fontWeight: 400 }}>Product Category</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                lorem ipsum
              </Typography>

              {/* Product Icons */}
              <Grid container spacing={4} sx={{ mb: 3 }}>
                {features.map((feature, index) => (
                  <Grid >
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
                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                        <TableCell sx={{ fontWeight: 600, py: 1.5, fontSize: "12px" }}>Quantity</TableCell>
                        <TableCell sx={{ fontWeight: 600, py: 1.5, fontSize: "12px" }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 600, py: 1.5, fontSize: "12px" }}>Save</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pricingData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ py: 1.5, fontSize: "12px" }}>{row.quantity}</TableCell>
                          <TableCell sx={{ py: 1.5, fontSize: "12px" }}>{row.price}</TableCell>
                          <TableCell sx={{ py: 1.5, fontSize: "12px" }}>{row.save}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Place Enquiry Button */}
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
                  mb: 2,
                  "&:hover": {
                    backgroundColor: "#e55a2b",
                  },
                }}
              >
                Place a Enquiry
              </Button>

              {/* Social Icons */}
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 1, fontSize: "12px" }}>
                  Add to Wishlist
                </Typography>
                <IconButton size="small" sx={{ color: "#ff6b35" }}>
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
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: "16px" }}>
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
                        color: companySpecific === "Documents - Company Specific" ? "#666" : "#000",
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
                        color: facilitySpecific === "Documents - Facility Specific" ? "#666" : "#000",
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
                        color: productSpecific === "Documents - Product Specific" ? "#666" : "#000",
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
                        color: batchSpecific === "Documents - Batch Specific" ? "#666" : "#000",
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
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: "16px" }}>
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
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "13px" }}>
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
    </Container>
  )
}
