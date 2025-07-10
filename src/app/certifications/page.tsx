"use client"
import type React from "react"
import { Box, Typography, Link, Container } from "@mui/material"

const Certifications: React.FC = () => {
  return (
    <Container sx={{ width:"100%", backgroundColor: "#f8f9fa", }}>
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          borderRadius: 2,
          p: { xs: 3, md: 4 },
          minHeight: "300px",
        }}
      >
        {/* Certifications Heading */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            fontSize: { xs: "1.75rem", md: "2rem" },
            color: "#1a1a1a",
            mb: { xs: 3, md: 4 },
            letterSpacing: "-0.02em",
          }}

        >
          Certifications
        </Typography>

        {/* ISO Certification Section */}
        <Box
        sx={{
            display:"flex",
          flexDirection:"column",
          alignItems:"center"
        }}
        >
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent:"center",
            gap: { xs: 3, md: 9 },
            minWidth: "800px",
             backgroundColor: "white",
            p:3,
            // pl:8,
            borderRadius:"46px"

          }}
          
        >
          {/* ISO Logo */}
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Box
              sx={{
                width: { xs: "120px", md: "140px" },
                height: { xs: "120px", md: "140px" },
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* ISO Badge Background Circle */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "3px solid #0066cc",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {/* ISO Text */}
                <Typography
                  sx={{
                    fontFamily: '"Arial", sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                    color: "#0066cc",
                    lineHeight: 1,
                    mb: 0.5,
                  }}
                >
                  ISO
                </Typography>

                {/* Globe/Network Icon Placeholder */}
                <Box
                  sx={{
                    width: "40px",
                    height: "20px",
                    backgroundColor: "#0066cc",
                    borderRadius: "10px",
                    mb: 0.5,
                    opacity: 0.8,
                  }}
                />

                {/* 9001 Text */}
                <Typography
                  sx={{
                    fontFamily: '"Arial", sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    color: "#0066cc",
                    lineHeight: 1,
                  }}
                >
                  9001
                </Typography>

                {/* Circular Text Around Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    right: "-2px",
                    bottom: "-2px",
                    borderRadius: "50%",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "8px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "2px",
                      height: "8px",
                      backgroundColor: "#0066cc",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Content Section */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {/* ISO 9001 Title */}
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
                fontSize: { xs: "1.5rem", md: "1.75rem" },
                color: "#ff6b35",
                mb: 1,
                letterSpacing: "-0.01em",
              }}
            >
              ISO 9001
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 500,
                fontSize: { xs: "0.95rem", md: "1rem" },
                color: "#666666",
                mb: { xs: 2, md: 2.5 },
                letterSpacing: "0.01em",
              }}
            >
              Quality Management Systems
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: { xs: "0.875rem", md: "0.9rem" },
                color: "#555555",
                lineHeight: 1.6,
                mb: { xs: 2.5, md: 3 },
                maxWidth: "500px",
                mx: { xs: "auto", md: 0 },
              }}
            >
              ISO 9001 is an international standard that outlines the requirements for a quality management system
              (QMS). It helps organizations ensure consistent quality in products and services while improving customer
              satisfaction and operational efficiency.
            </Typography>

            {/* View Certificate Link */}
            <Link
              href="#"
              sx={{
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 500,
                fontSize: { xs: "0.875rem", md: "0.9rem" },
                color: "#0066cc",
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                  color: "#0052a3",
                },
                "&:focus": {
                  outline: "2px solid #0066cc",
                  outlineOffset: "2px",
                  borderRadius: "2px",
                },
              }}
            >
              View Certificate
            </Link>
          </Box>
        </Box>
        </Box>
       
      </Box>
    </Container>
  )
}

export default Certifications
