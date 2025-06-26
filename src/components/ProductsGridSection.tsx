"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Container, Card, CardContent, Button, IconButton } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

interface ProductGridCardProps {
  productName: string
  productDescription: string
  price: string
  priceDescription: string
}

const ProductGridCard: React.FC<ProductGridCardProps> = ({
  productName,
  productDescription,
  price,
  priceDescription,
}) => {
  return (
    <Card
      sx={{
        borderRadius: "18px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        bgcolor: "white",
        width: "280px",
        height: "320px",
        transition: "all 0.3s ease",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 0, height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Product Image Container */}
        <Box
          sx={{
            bgcolor: "#f8f8f8",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            // Remove px: 3, py: 2 padding
          }}
        >
          {/* Product Image */}
          <Box
            component="img"
            src="/productGrid.png"
            alt="Product"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain", // Change from "contain" to "cover"
            }}
          />
        </Box>

        {/* Get Quote Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#ff6b35",
            color: "white",
            fontWeight: 500,
            py: 0.5,
            borderRadius: 0,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              bgcolor: "#e55a2b",
            },
          }}
        >
          Get Quote
        </Button>

        {/* Content Section */}
        <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Product Name and Price Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: "#2c3e50",
                fontSize: "0.8rem",
                lineHeight: 1.2,
              }}
            >
              {productName}
            </Typography>

            <Typography
              sx={{
                color: "#3498db",
                fontSize: "0.8rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                ml: 1,
              }}
            >
              {price}
            </Typography>
          </Box>

          {/* Description and Price Description Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                color: "#7f8c8d",
                fontSize: "0.65rem",
                lineHeight: 1.3,
                flex: 1,
              }}
            >
              {productDescription}
            </Typography>

            <Typography
              sx={{
                color: "#3498db",
                fontSize: "0.65rem",
                whiteSpace: "nowrap",
                ml: 1,
              }}
            >
              {priceDescription}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const ProductsGridSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const products = [
    {
      productName: "Product Name",
      productDescription: "Lorem ipsum ipsum lorem",
      price: "$123.78 /Bottle",
      priceDescription: "Lorem ipsum",
    },
    {
      productName: "Product Name",
      productDescription: "Lorem ipsum ipsum lorem",
      price: "$123.78 /Bottle",
      priceDescription: "Lorem ipsum",
    },
    {
      productName: "Product Name",
      productDescription: "Lorem ipsum ipsum lorem",
      price: "$123.78 /Bottle",
      priceDescription: "Lorem ipsum",
    },
    {
      productName: "Product Name",
      productDescription: "Lorem ipsum ipsum lorem",
      price: "$123.78 /Bottle",
      priceDescription: "Lorem ipsum",
    },
  ]

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1)
  }

  return (
    <Box
      sx={{
       bgcolor: "#f1f5f9",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: 4 }}>
          {/* Title with Orange Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 4,
                height: 32,
                bgcolor: "#ff7849",
                mr: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "#333",
                fontSize: { xs: "1.8rem", md: "2.2rem" },
              }}
            >
              Products
            </Typography>
          </Box>

          {/* Navigation Arrows */}
          <Box sx={{ display: "flex", gap: 1, ml: 6 }}>
            <IconButton
              onClick={handlePrevious}
              disabled={currentPage === 1}
              sx={{
                width: 24,
                height: 24,
                p: 0,
                color: "#666",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
                "&:disabled": {
                  opacity: 0.5,
                },
              }}
            >
               <ChevronLeft sx={{ fontSize: 16, color: "#666", mr: -0.5 }} />
                <ChevronLeft sx={{ fontSize: 16, color: "#666" }} />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                width: 24,
                height: 24,
                p: 0,
                color: "#666",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
               <ChevronRight sx={{ fontSize: 16, color: "#666", mr: -0.5 }} />
                <ChevronRight sx={{ fontSize: 16, color: "#666" }} />
            </IconButton>
          </Box>
        </Box>

        {/* Products Grid */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "flex-start",
            overflowX: "auto",
            pb: 2,
          }}
        >
          {products.map((product, index) => (
            <ProductGridCard
              key={index}
              productName={product.productName}
              productDescription={product.productDescription}
              price={product.price}
              priceDescription={product.priceDescription}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default ProductsGridSection
