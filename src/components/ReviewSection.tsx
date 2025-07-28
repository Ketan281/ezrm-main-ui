"use client"

import React from "react"

import { Box, Typography, Container, Card, CardContent, Avatar, CircularProgress, Alert } from "@mui/material"
import { ThumbUp, ThumbDown, Star } from "@mui/icons-material"
import { useReviewListing } from "@/api/handlers"
import type { CustomerReview } from "@/api/services"

interface ReviewCardProps {
  review: CustomerReview
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Get customer initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: "none",
        border: "none",
        bgcolor: "white",
        width: "380px",
        minHeight: "320px",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "visible", // Allow circles to extend outside
        "&:hover": {
          border: "1px solid #ccc",
        },
      }}
    >
      <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
        {/* Like/Dislike Thumbs in Circles - Half inside, half outside */}
        <Box
          sx={{
            position: "absolute",
            right: -20, // Position so circles are half outside
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* Like Thumb in Circle with Counter */}
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(0, 0, 0, 0.04)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <ThumbUp
                sx={{
                  fontSize: 18,
                  color: "#ff7849",
                }}
              />
            </Box>
            {/* Like Counter Circle */}
            <Box
              sx={{
                position: "absolute",
                right: -6,
                top: -6,
                width: 20,
                height: 20,
                bgcolor: "#ff7849",
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
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                {review.helpfulVotes}
              </Typography>
            </Box>
          </Box>
          {/* Dislike Thumb in Circle */}
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #f0f0f0",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <ThumbDown
              sx={{
                fontSize: 18,
                color: "#666",
              }}
            />
          </Box>
        </Box>

        {/* Top Section - Avatar, Product Name, and Rating in horizontal line */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          {/* Avatar */}
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#ff7849",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            {getInitials(review.customer.name)}
          </Avatar>
          {/* Product Name */}
          <Typography
            sx={{
              fontWeight: 600,
              color: "#333",
              fontSize: "1.1rem",
              mr: 2,
              flex: 1,
            }}
          >
            {review.product.name}
          </Typography>
          {/* Star Rating */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                sx={{
                  fontSize: 18,
                  color: index < review.rating ? "#ff7849" : "#e0e0e0",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Title */}
        <Typography
          sx={{
            color: "#333",
            fontSize: "1rem",
            fontWeight: 600,
            mb: 1,
            lineHeight: 1.4,
          }}
        >
          {review.title}
        </Typography>

        {/* Review Text */}
        <Box sx={{ flex: 1, pr: 6 }}>
          <Typography
            sx={{
              color: "#666",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {review.review}
          </Typography>
        </Box>

        {/* Verified Purchase Badge */}
        {review.isVerifiedPurchase && (
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                color: "#4caf50",
                fontSize: "0.75rem",
                fontWeight: 600,
                bgcolor: "#e8f5e8",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                display: "inline-block",
              }}
            >
              ✓ Verified Purchase
            </Typography>
          </Box>
        )}

        {/* Bottom Section - Date and Reviewer */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
          <Typography
            sx={{
              color: "#ff7849",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            {formatDate(review.createdAt)}
          </Typography>
          <Typography
            sx={{
              color: "#333",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            - {review.customer.name}
          </Typography>
        </Box>

        {/* Order ID */}
        <Typography
          sx={{
            color: "#999",
            fontSize: "0.75rem",
            mt: 1,
            textAlign: "center",
          }}
        >
          Order: {review.order}
        </Typography>
      </CardContent>
    </Card>
  )
}

const ReviewsSection: React.FC = () => {
  const {
    data: response,
    isLoading,
    error,
    isError,
  } = useReviewListing({
    page: 1,
    pageSize: 3, // Get 3 reviews for display
    status: "published",
  })

  // Debug logging
  React.useEffect(() => {
    console.log("Reviews Loading:", isLoading)
    console.log("Reviews Error:", error)
    console.log("Reviews Response:", response)
  }, [isLoading, error, response])

  if (isLoading) {
    return (
      <Box
        sx={{
          bgcolor: "#fafafa",
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                color: "#2c5530",
                fontSize: { xs: "2rem", md: "2.5rem" },
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 60,
                  height: 3,
                  bgcolor: "#ff7849",
                  borderRadius: 1.5,
                },
              }}
            >
              Reviews
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box
        sx={{
          bgcolor: "#fafafa",
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                color: "#2c5530",
                fontSize: { xs: "2rem", md: "2.5rem" },
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 60,
                  height: 3,
                  bgcolor: "#ff7849",
                  borderRadius: 1.5,
                },
              }}
            >
              Reviews
            </Typography>
          </Box>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">Error loading reviews</Typography>
            <Typography variant="body2">{error instanceof Error ? error.message : "Something went wrong"}</Typography>
          </Alert>
        </Container>
      </Box>
    )
  }

  const reviews = response?.data?.reviews || []

  if (reviews.length === 0) {
    return (
      <Box
        sx={{
          bgcolor: "#fafafa",
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                color: "#2c5530",
                fontSize: { xs: "2rem", md: "2.5rem" },
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 60,
                  height: 3,
                  bgcolor: "#ff7849",
                  borderRadius: 1.5,
                },
              }}
            >
              Reviews
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ textAlign: "center", color: "#666" }}>
            No reviews available at the moment.
          </Typography>
        </Container>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <Box
          sx={{
            textAlign: "center",
            mb: 10,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              color: "#2c5530",
              fontSize: { xs: "2rem", md: "2.5rem" },
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 3,
                bgcolor: "#ff7849",
                borderRadius: 1.5,
              },
            }}
          >
            Reviews ({response?.data?.total || 0})
          </Typography>
        </Box>

        {/* Reviews Grid */}
        <Box
          sx={{
            display: "flex",
            gap: 5,
            justifyContent: "center",
            mb: 10,
            flexWrap: { xs: "wrap", lg: "nowrap" },
          }}
        >
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default ReviewsSection
