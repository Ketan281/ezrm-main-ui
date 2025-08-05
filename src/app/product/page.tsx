"use client"
import React from "react"
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Container,
  CircularProgress,
  Alert,
  Pagination,
  Badge,
} from "@mui/material"
import { Favorite, FavoriteBorder, ShoppingCart, Add, Remove } from "@mui/icons-material"
import { useProductListing } from "@/api/handlers"
import { useAppStore } from "@/store/use-app-store"
import { useRouter } from "next/navigation"
import type { Product } from "@/api/services"

const ProductPage: React.FC = () => {
  const [page, setPage] = React.useState(1)
  const router = useRouter()
  const {
    toggleFavorite,
    isFavorite,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    getCartItemQuantity,
    cart,
    cartTotal,
  } = useAppStore()

  const {
    data: response,
    isLoading,
    error,
    isError,
  } = useProductListing({
    page,
    limit: 9, // Show 9 products (3 rows of 3)
    sortBy: "createdAt",
    sortOrder: "desc",
  })

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleCardClick = (productId: string, event: React.MouseEvent) => {
    // Prevent navigation if clicking on interactive elements
    const target = event.target as HTMLElement
    const isInteractiveElement = target.closest("button") || target.closest('[role="button"]')

    if (!isInteractiveElement) {
      router.push(`/product/detail/${productId}`)
    }
  }

  const getProductImage = (product: Product) => {
    // Use bannerImage if available, otherwise use first image, otherwise use placeholder
    if (product.bannerImage) {
      return product.bannerImage.startsWith("http")
        ? product.bannerImage
        : `${process.env.NEXT_PUBLIC_API_URL}/${product.bannerImage}`
    }

    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0]
      return firstImage.startsWith("http") ? firstImage : `${process.env.NEXT_PUBLIC_API_URL}/${firstImage}`
    }

    return "/placeholder.svg?height=278&width=421"
  }

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    )
  }

  if (isError) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading products: {error instanceof Error ? error.message : "Something went wrong"}
        </Alert>
      </Container>
    )
  }

  const products = response?.products || []
  const pagination = response?.pagination

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, md: 3 } }}>
      {/* Header with Cart Info */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#333",
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          Products
        </Typography>

        {/* Cart Summary */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Badge badgeContent={cart.length} color="primary">
            <IconButton>
              <ShoppingCart />
            </IconButton>
          </Badge>
          <Typography variant="h6">Total: ₹{cartTotal.toLocaleString()}</Typography>
        </Box>
      </Box>

      {/* Products Grid */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, md: 3 },
        }}
      >
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
            {products.slice(rowIndex * 3, rowIndex * 3 + 3).map((product) => {
              const quantity = getCartItemQuantity(product._id)

              return (
                <Card
                  key={product._id}
                  onClick={(e) => handleCardClick(product._id, e)}
                  sx={{
                    width: {
                      xs: "calc(100vw - 32px)",
                      sm: "calc(50vw - 24px)",
                      md: "calc(33.333vw - 32px)",
                      lg: "calc(30vw - 24px)",
                      xl: "min(28vw, 421px)",
                    },
                    maxWidth: "421px",
                    minWidth: { xs: "280px", md: "320px" },
                    height: {
                      xs: "auto",
                      md: "min(28vw, 380px)",
                    },
                    minHeight: { xs: "400px", md: "420px" },
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: { xs: "8px", md: "12px" },
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
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
                      image={getProductImage(product)}
                      alt={product.name}
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
                    {/* Stock Status Badge */}
                    {!product.inStock && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(255, 0, 0, 0.8)",
                          color: "white",
                          px: 1,
                          py: 0.5,
                          borderRadius: "4px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                        }}
                      >
                        Out of Stock
                      </Box>
                    )}
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
                        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                      }}
                    >
                      {product.name}
                    </Typography>
                    {/* Product Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        mb: 1,
                        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description || product.category}
                    </Typography>
                    {/* Price */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#ff6b35",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      ₹{product.price.toLocaleString()}
                    </Typography>
                    {/* Product Code */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#999",
                        fontSize: { xs: "0.7rem", md: "0.75rem" },
                        mb: { xs: 1.5, md: 2 },
                        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                      }}
                    >
                      Product Code: {product.uniqueId}
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
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(product._id)
                        }}
                        sx={{
                          color: isFavorite(product._id) ? "#ff4444" : "#ccc",
                          p: { xs: 0.25, md: 0.5 },
                          "&:hover": {
                            backgroundColor: "rgba(255, 68, 68, 0.1)",
                          },
                        }}
                      >
                        {isFavorite(product._id) ? (
                          <Favorite sx={{ fontSize: { xs: 18, md: 20 } }} />
                        ) : (
                          <FavoriteBorder sx={{ fontSize: { xs: 18, md: 20 } }} />
                        )}
                      </IconButton>
                      {/* Cart Controls */}
                      {quantity === 0 ? (
                        <Button
                          variant="contained"
                          disabled={!product.inStock}
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart({
                              id: product._id,
                              name: product.name,
                              price: product.price,
                              image: getProductImage(product),
                              uniqueId: product.uniqueId,
                            })
                          }}
                          sx={{
                            backgroundColor: product.inStock ? "#ff6b35" : "#ccc",
                            color: "white",
                            fontSize: { xs: "0.7rem", md: "0.75rem" },
                            fontWeight: 600,
                            textTransform: "uppercase",
                            px: { xs: 2, md: 2.5 },
                            py: { xs: 0.5, md: 0.75 },
                            borderRadius: "6px",
                            minWidth: { xs: "50px", md: "60px" },
                            "&:hover": {
                              backgroundColor: product.inStock ? "#e55a2b" : "#ccc",
                            },
                          }}
                        >
                          {product.inStock ? "BUY" : "SOLD OUT"}
                        </Button>
                      ) : (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation()
                              updateCartItemQuantity(product._id, quantity - 1)
                            }}
                            size="small"
                          >
                            <Remove />
                          </IconButton>
                          <Typography sx={{ minWidth: 20, textAlign: "center" }}>{quantity}</Typography>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation()
                              updateCartItemQuantity(product._id, quantity + 1)
                            }}
                            size="small"
                          >
                            <Add />
                          </IconButton>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFromCart(product._id)
                            }}
                            sx={{ ml: 1, fontSize: "0.7rem" }}
                          >
                            Remove
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              )
            })}
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pagination.totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  )
}

export default ProductPage
