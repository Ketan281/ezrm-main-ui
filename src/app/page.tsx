"use client"

import type React from "react"
import { Box, ThemeProvider } from "@mui/material"
import { theme } from "@/theme/theme"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
// import CurvedSection from "@/components/CurvedSection"
import FeaturedCategory from "@/components/FeaturedCategory"
import ProductsSection from "@/components/ProductsSection"
import ServicesSection from "@/components/ServiceSection"
import FlashSaleSection from "@/components/FlashSaleSection"
import ProductsGridSection from "@/components/ProductsGridSection"
import ReviewsSection from "@/components/ReviewSection"
import FooterSection from "@/components/FooterSection"

const HomePage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh" }}>
        {/* Main Orange Section with Background Image */}
        <Box
          sx={{
            backgroundImage: "url('/heroborder.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            minHeight: "100vh",
            // Fallback gradient in case image doesn't load
            background: "linear-gradient(135deg, #ff7849 0%, #ff6b35 100%)",
          }}
        >
          <Navbar />
          <Hero />
          {/* <CurvedSection /> */}
        </Box>

        {/* Featured Category Section */}
        <FeaturedCategory />

        {/* Products Section */}
        <ProductsSection />
        <ServicesSection/>
        <FlashSaleSection/>
        <ProductsGridSection/>
        <ReviewsSection/>
        <FooterSection/>
        {/* Additional White Section */}
        <Box
          sx={{
            bgcolor: "white",
            height: "4rem",
          }}
        >
          {/* Additional content can go here */}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default HomePage
