import type React from "react"
import { Box, Typography, Container, Card, CardContent, Avatar } from "@mui/material"
import { ThumbUp, ThumbDown, Star } from "@mui/icons-material"

interface ReviewCardProps {
  productName: string
  subtitle: string
  rating: number
  reviewText: string
  likes: number
  date: string
  reviewerName: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  productName,
  subtitle,
  rating,
  reviewText,
  likes,
  date,
  reviewerName,
}) => {
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
                {likes}
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
              bgcolor: "#d0d0d0",
              color: "transparent",
            }}
          />

          {/* Product Name */}
          <Typography
            sx={{
              fontWeight: 600,
              color: "#333",
              fontSize: "1.1rem",
              mr: 2,
            }}
          >
            {productName}
          </Typography>

          {/* Star Rating */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                sx={{
                  fontSize: 18,
                  color: index < rating ? "#ff7849" : "#e0e0e0",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Subtitle */}
        <Typography
          sx={{
            color: "#666",
            fontSize: "0.9rem",
            mb: 2,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </Typography>

        {/* Review Text */}
        <Box sx={{ flex: 1, pr: 6 }}>
          <Typography
            sx={{
              color: "#666",
              fontSize: "0.75rem",
              lineHeight: 1.5,
              mb: 2,
            }}
          >
            Lorem ipsum lorem lorem lorem Lorem ipsum lorem lorem lorem ipsum lorem lorem Lorem ipsum lorem lorem lorem
            lorem lorem ipsum lorem lorem lorem lorem lorem
          </Typography>

          <Typography
            sx={{
              color: "#666",
              fontSize: "0.75rem",
              lineHeight: 1.5,
            }}
          >
            Lorem ipsum lorem lorem lorem Lorem ipsum lorem lorem lorem ipsum lorem lorem Lorem ipsum lorem lorem lorem
            lorem lorem ipsum lorem i
          </Typography>
        </Box>

        {/* Bottom Section - Date and Reviewer */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
          <Typography
            sx={{
              color: "#ff7849",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            {date}
          </Typography>

          <Typography
            sx={{
              color: "#333",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            -{reviewerName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      productName: "Product Name",
      subtitle: "Lorem ipsum lorem lorem lorem",
      rating: 4,
      reviewText:
        "Lorem ipsum lorem lorem lorem Lorem ipsum lorem lorem lorem ipsum lorem lorem Lorem ipsum lorem lorem lorem lorem lorem ipsum lorem lorem lorem lorem lorem",
      likes: 3,
      date: "15.5.2025",
      reviewerName: "David Warmbey",
    },
    {
      productName: "Product Name",
      subtitle: "Lorem ipsum lorem lorem lorem",
      rating: 5,
      reviewText:
        "Lorem ipsum lorem lorem lorem Lorem ipsum lorem lorem lorem ipsum lorem lorem Lorem ipsum lorem lorem lorem lorem lorem ipsum lorem lorem lorem lorem lorem",
      likes: 5,
      date: "15.5.2025",
      reviewerName: "Sarah Johnson",
    },
    {
      productName: "Product Name",
      subtitle: "Lorem ipsum lorem lorem lorem",
      rating: 4,
      reviewText:
        "Lorem ipsum lorem lorem lorem Lorem ipsum lorem lorem lorem ipsum lorem lorem Lorem ipsum lorem lorem lorem lorem lorem ipsum lorem lorem lorem lorem lorem",
      likes: 2,
      date: "15.5.2025",
      reviewerName: "Mike Chen",
    },
  ]

  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        py: { xs: 6, md: 8 },
        // height: "90vh"
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
            Reviews
          </Typography>
        </Box>

        {/* Reviews Grid */}
        <Box
          sx={{
            display: "flex",
            gap: 5,
            justifyContent: "center",
            mb:10,
            flexWrap: { xs: "wrap", lg: "nowrap" },
          }}
        >
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              productName={review.productName}
              subtitle={review.subtitle}
              rating={review.rating}
              reviewText={review.reviewText}
              likes={review.likes}
              date={review.date}
              reviewerName={review.reviewerName}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default ReviewsSection
