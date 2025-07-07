"use client"
import React from "react"
import { Box, Typography, Card, CardMedia, CardContent, Button, IconButton, Container } from "@mui/material"
import { Favorite, FavoriteBorder } from "@mui/icons-material"

// Mock data for products
const products = [
  {
    id: 1,
    title: "Loreal Ipsum",
    subtitle: "Turmeric Powder",
    productCode: "12345678",
    image: "/product.png?height=278&width=421",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Loreal Ipsum",
    subtitle: "Turmeric Powder",
    productCode: "12345678",
    image: "/product.png?height=278&width=421",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Loreal Ipsum",
    subtitle: "Turmeric Powder",
    productCode: "12345678",
    image: "/product.png?height=278&width=421",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Loreal Ipsum",
    subtitle: "Turmeric Powder",
    productCode: "12345678",
    image: "/product.png?height=278&width=421",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Loreal Ipsum",
    subtitle: "Turmeric Powder",
    productCode: "12345678",
    image: "/product.png?height=278&width=421",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Loreal Ipsum",
    subtitle: "Turmeric Powder",
    productCode: "12345678",
    image: "/product.png?height=278&width=421",
    isFavorite: false,
  },
  {
    id: 7,
    title: "Loreal Ipsum",
    subtitle: "Turmeric Powder",
    productCode: "12345678",
    image: "/product.png?height=278&width=421",
    isFavorite: false,
  },
  {
    id: 8,
    title: "Loreal Ipsum",
    subtitle: "Turmeric Powder",
    productCode: "12345678",
    image: "/product.png?height=278&width=421",
    isFavorite: false,
  },
  {
    id: 9,
    title: "Loreal Ipsum",
    subtitle: "Turmeric Powder",
    productCode: "12345678",
    image: "/product.png?height=278&width=421",
    isFavorite: false,
  },
]

const FavouritesSection: React.FC = () => {
  const [favorites, setFavorites] = React.useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, md: 3 } }}>
      {/* Section Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: "#333",
          mb: { xs: 2, md: 3 },
          fontSize: { xs: "1.5rem", md: "2rem" },
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        }}
      >
        Favourites
      </Typography>

      {/* Products Grid - Responsive Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, md: 3 },
        }}
      >
        {/* Create rows of exactly 3 cards each */}
        {Array.from({ length: Math.ceil(products.length / 3) }, (_, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2, md: 3 },
              justifyContent: "center",
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            {products.slice(rowIndex * 3, rowIndex * 3 + 3).map((product) => (
              <Card
                key={product.id}
                sx={{
                  // Responsive width calculation
                  width: {
                    xs: "calc(100vw - 32px)", // Full width minus padding on mobile
                    sm: "calc(50vw - 24px)", // Half width minus gap on small tablets
                    md: "calc(33.333vw - 32px)", // One third minus gaps on desktop
                    lg: "calc(30vw - 24px)", // Slightly smaller on large screens
                    xl: "min(28vw, 421px)", // Cap at 421px on extra large screens
                  },
                  maxWidth: "421px", // Never exceed original design width
                  minWidth: { xs: "280px", md: "320px" }, // Minimum usable width
                  // Responsive height with aspect ratio preservation
                  height: {
                    xs: "auto",
                    md: "min(28vw, 380px)", // Maintain aspect ratio, cap at 443px
                  },
                  minHeight: { xs: "400px", md: "420px" },
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: { xs: "8px", md: "12px" },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Product Image Container */}
                <Box
                  sx={{
                    position: "relative",
                    // Responsive height maintaining aspect ratio (278/421 ≈ 0.66)
                    height: {
                      xs: "60vw",
                      sm: "30vw",
                      md: "22vw",
                      lg: "20vw",
                      xl: "min(18.5vw, 278px)",
                    },
                    maxHeight: "278px",
                    minHeight: { xs: "200px", md: "220px" },
                    width: "100%",
                    overflow: "hidden",
                    borderTopLeftRadius: { xs: "8px", md: "12px" },
                    borderTopRightRadius: { xs: "8px", md: "12px" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Watermark */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: { xs: "1rem", md: "1.2rem" },
                      fontWeight: 600,
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      pointerEvents: "none",
                    }}
                  >
                    Greenjeeva
                  </Box>
                </Box>

                {/* Product Content */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 1.5, md: 2 },
                    "&:last-child": {
                      pb: { xs: 1.5, md: 2 },
                    },
                  }}
                >
                  {/* Product Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#333",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      mb: 0.5,
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    }}
                  >
                    {product.title}
                  </Typography>

                  {/* Product Subtitle */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                      mb: 1,
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    }}
                  >
                    {product.subtitle}
                  </Typography>

                  {/* Product Code */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#999",
                      fontSize: { xs: "0.7rem", md: "0.75rem" },
                      mb: { xs: 1.5, md: 2 },
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    }}
                  >
                    Product Code: {product.productCode}
                  </Typography>

                  {/* Bottom Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "auto",
                    }}
                  >
                    {/* Favorite Button */}
                    <IconButton
                      onClick={() => toggleFavorite(product.id)}
                      sx={{
                        color: favorites.includes(product.id) ? "#ff4444" : "#ccc",
                        p: { xs: 0.25, md: 0.5 },
                        "&:hover": {
                          backgroundColor: "rgba(255, 68, 68, 0.1)",
                        },
                      }}
                    >
                      {favorites.includes(product.id) ? (
                        <Favorite sx={{ fontSize: { xs: 18, md: 20 } }} />
                      ) : (
                        <FavoriteBorder sx={{ fontSize: { xs: 18, md: 20 } }} />
                      )}
                    </IconButton>

                    {/* Buy Button */}
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff6b35",
                        color: "white",
                        fontSize: { xs: "0.7rem", md: "0.75rem" },
                        fontWeight: 600,
                        textTransform: "uppercase",
                        px: { xs: 2, md: 2.5 },
                        py: { xs: 0.5, md: 0.75 },
                        borderRadius: "6px",
                        minWidth: { xs: "50px", md: "60px" },
                        "&:hover": {
                          backgroundColor: "#e55a2b",
                        },
                      }}
                    >
                      BUY
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default FavouritesSection
