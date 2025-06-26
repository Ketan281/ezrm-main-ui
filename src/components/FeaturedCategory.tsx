import type React from "react"
import { Box, Typography, Container, Grid, Card, CardContent } from "@mui/material"

interface CategoryCardProps {
  title: string
  isHighlighted?: boolean
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, isHighlighted = false }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        width: "13em",
        bgcolor: isHighlighted ? "#ff7849" : "white",
        color: isHighlighted ? "white" : "#333",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          py: 3,
          px: 3,
          "&:last-child": {
            pb: 3,
          },
        }}
      >
        <Box
          component="img"
          src="./vitIcon.png"
          alt="Vitamin Icon"
          sx={{
            width: 28,
            height: 28,
            filter: isHighlighted ? "brightness(0) invert(1)" : "none",
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}

const FeaturedCategory: React.FC = () => {
  // Define the grid layout as shown in the image
  const categoryRows = [
    [
      { title: "Vitamins", isHighlighted: false },
      { title: "Vitamins", isHighlighted: true }, // Highlighted card
      { title: "Vitamins", isHighlighted: false },
      { title: "Vitamins", isHighlighted: false },
    ],
    [
      { title: "Vitamins", isHighlighted: false },
      { title: "Vitamins", isHighlighted: false },
      { title: "Vitamins", isHighlighted: false },
      { title: "Vitamins", isHighlighted: false },
      { title: "Vitamins", isHighlighted: false },
    ],
    [
      { title: "Vitamins", isHighlighted: false },
      { title: "Vitamins", isHighlighted: false },
      { title: "Vitamins", isHighlighted: false },
      { title: "Vitamins", isHighlighted: false },
    ],
  ]

  return (
    <Box
      sx={{
        bgcolor: "#f8f9fa",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
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
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Featured Category
          </Typography>
        </Box>

        {/* Category Grid */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
          {categoryRows.map((row, rowIndex) => (
            <Grid container spacing={2} key={rowIndex} justifyContent="center">
              {row.map((category, cardIndex) => (
                <Grid >
                  <CategoryCard title={category.title} isHighlighted={category.isHighlighted} />
                </Grid>
              ))}
            </Grid>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default FeaturedCategory
