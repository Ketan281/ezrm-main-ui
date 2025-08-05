"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Container, Card, CardContent, Button, IconButton } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
// import { useRouter } from "next/navigation"
import QuoteFormModal from "./quote-form-modal"

interface Product {
  id: string
  productName: string
  description: string
  priceLabel: string
  price: string
}

interface ProductCardProps extends Product {
  onClick: (productId: string, productName: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ id, productName, description, priceLabel, price, onClick }) => {
  const handleCardClick = () => {
    onClick(id, productName)
  }

  const handleGetQuoteClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when clicking the button
    onClick(id, productName)
  }

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        bgcolor: "white",
        width: "200px",
        height: "300px",
        flexShrink: 0,
        transition: "all 0.3s ease",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 0, height: "100%" }}>
        {/* Product Image/Icon Container - Flush with top */}
        <Box
          sx={{
            bgcolor: "#e9ecef",
            borderRadius: "12px 12px 0 0",
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Vitamin Bottle Icon */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Bottle */}
            <Box
              sx={{
                width: "45px",
                height: "60px",
                bgcolor: "#ff7849",
                borderRadius: "6px 6px 3px 3px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {/* Bottle Cap */}
              <Box
                sx={{
                  width: "30px",
                  height: "8px",
                  bgcolor: "#ff7849",
                  borderRadius: "3px",
                  position: "absolute",
                  top: "-4px",
                }}
              />
              {/* VIT Text */}
              <Typography
                sx={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "bold",
                  lineHeight: 1,
                  mb: 0.3,
                }}
              >
                VIT
              </Typography>
            </Box>
            {/* C Badge */}
            <Box
              sx={{
                position: "absolute",
                right: "-6px",
                bottom: "6px",
                width: "18px",
                height: "18px",
                bgcolor: "#ffd700",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid white",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                C
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Content Section with padding */}
        <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Product Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#333",
              mb: 1,
              fontSize: "0.95rem",
            }}
          >
            {productName}
          </Typography>
          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              mb: 1.5,
              fontSize: "0.75rem",
              lineHeight: 1.3,
              flex: 1,
            }}
          >
            {description}
          </Typography>
          {/* Price Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                color: "#2196f3",
                fontSize: "0.65rem",
              }}
            >
              {priceLabel}
            </Typography>
            <Typography
              sx={{
                color: "#333",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            >
              {price}
            </Typography>
          </Box>
        </Box>
        {/* Get Quote Button - Flush with bottom */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleGetQuoteClick}
          sx={{
            bgcolor: "#ff7849",
            color: "white",
            fontWeight: 500,
            py: 0.7,
            borderRadius: "0 0 12px 12px",
            textTransform: "none",
            fontSize: "0.9rem",
            // mb:2,
            "&:hover": {
              bgcolor: "#e66a3c",
            },
          }}
        >
          Get Quote
        </Button>
      </CardContent>
    </Card>
  )
}

const ProductsSection: React.FC = () => {
  // const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string>("")

  const products: Product[] = [
    {
      id: "vitamin-001",
      productName: "Vitamin C Complex",
      description: "High potency vitamin C supplement",
      priceLabel: "Starting from",
      price: "$29.99 /Bottle",
    },
    {
      id: "vitamin-002",
      productName: "Multivitamin Plus",
      description: "Complete daily multivitamin",
      priceLabel: "Starting from",
      price: "$45.78 /Bottle",
    },
    {
      id: "vitamin-003",
      productName: "Vitamin D3 5000IU",
      description: "High strength vitamin D3 for bone health",
      priceLabel: "Starting from",
      price: "$22.50 /Bottle",
    },
    {
      id: "vitamin-004",
      productName: "B-Complex Energy",
      description: "B-vitamin complex for energy and metabolism",
      priceLabel: "Starting from",
      price: "$35.99 /Bottle",
    },
    {
      id: "vitamin-005",
      productName: "Omega-3 Fish Oil",
      description: "Premium omega-3 fatty acids for heart health",
      priceLabel: "Starting from",
      price: "$42.25 /Bottle",
    },
    {
      id: "vitamin-006",
      productName: "Calcium Magnesium",
      description: "Essential minerals for bone and muscle health",
      priceLabel: "Starting from",
      price: "$28.75 /Bottle",
    },
  ]

  const handleProductClick = (productId: string, productName: string) => {
    // Navigate to product detail page with the product ID
    setSelectedProduct(productName)
    setIsQuoteModalOpen(true)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    const maxIndex = Math.max(0, products.length - 4)
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + 4)

  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          {/* Main Horizontal Layout */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Left Side - Title and Navigation */}
            <Box
              sx={{
                minWidth: "200px",
                flexShrink: 0,
              }}
            >
              {/* Section Title with Orange Bar */}
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
                    fontSize: { xs: "1.3rem", md: "1.8rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Products you may
                  <br />
                  like
                </Typography>
              </Box>
              {/* Navigation Arrows */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "4px",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                    "&:disabled": {
                      opacity: 0.5,
                      cursor: "not-allowed",
                    },
                  }}
                >
                  <ChevronLeft sx={{ fontSize: 16, color: "#666", mr: -0.5 }} />
                  <ChevronLeft sx={{ fontSize: 16, color: "#666" }} />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  disabled={currentIndex >= Math.max(0, products.length - 4)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "4px",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                    "&:disabled": {
                      opacity: 0.5,
                      cursor: "not-allowed",
                    },
                  }}
                >
                  <ChevronRight sx={{ fontSize: 16, color: "#666", mr: -0.5 }} />
                  <ChevronRight sx={{ fontSize: 16, color: "#666" }} />
                </IconButton>
              </Box>
            </Box>
            {/* Right Side - Products Grid (Fixed 4 cards, no scroll) */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flex: 1,
                overflow: "hidden",
              }}
            >
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} {...product} onClick={handleProductClick} />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Quote Form Modal */}
      <QuoteFormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productName={selectedProduct}
      />
    </>
  )
}

export default ProductsSection
