"use client"
import type React from "react"
import { Box, Typography, Link, Container } from "@mui/material"
import Image from "next/image"

interface CertificationData {
  id: number
  title: string
  subtitle: string
  description: string
  logoSrc: string
  logoAlt: string
  certificateLink: string
}

const certificationsData: CertificationData[] = [
  {
    id: 1,
    title: "ISO 9001",
    subtitle: "Quality Management Systems",
    description:
      "ISO 9001 is an international standard that outlines the requirements for a quality management system (QMS). It helps organizations ensure consistent quality in products and services while improving customer satisfaction and operational efficiency.",
    logoSrc: "/iso.png",
    logoAlt: "ISO 9001 Certification",
    certificateLink: "#iso-9001",
  },
  {
    id: 2,
    title: "ISO 14001",
    subtitle: "Environmental Management Systems",
    description:
      "ISO 14001 provides a framework for environmental management systems (EMS). It helps organizations improve their environmental performance through more efficient use of resources and reduction of waste, gaining a competitive advantage and stakeholder trust.",
    logoSrc: "/iso.png",
    logoAlt: "ISO 14001 Certification",
    certificateLink: "#iso-14001",
  },
  {
    id: 3,
    title: "ISO 45001",
    subtitle: "Occupational Health and Safety Management",
    description:
      "ISO 45001 specifies requirements for an occupational health and safety (OH&S) management system. It provides a framework to increase safety, reduce workplace risks and enhance health and well-being at work, enabling organizations to proactively improve their OH&S performance.",
    logoSrc: "/iso.png",
    logoAlt: "ISO 45001 Certification",
    certificateLink: "#iso-45001",
  },
]

const Certifications: React.FC = () => {
  // Limit to maximum 3 cards
  const displayedCertifications = certificationsData.slice(0, 3)

  return (
    <Box sx={{ width: "100%", backgroundColor: "#fafafa", py: { xs: 3, md: 5 } }}>
      <Container maxWidth={false} sx={{ width: "100%", px: 0 }}>
        <Box
          sx={{
            backgroundColor: "#fafafa",
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
              ml: "2rem",
            }}
          >
            Certifications
          </Typography>

          {/* Certifications Cards Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, md: 4 },
              mx: "2rem",
            }}
          >
            {displayedCertifications.map((certification) => (
              <Box
                key={certification.id}
                sx={{
                  display: "flex",
                  alignItems: { xs: "flex-start", md: "center" },
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "flex-start",
                  gap: { xs: 3, md: 6 },
                  width: "100%",
                  backgroundColor: "white",
                  p: { xs: 3, md: 3 },
                  borderRadius: "46px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Certification Logo */}
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
                      width: {
                        xs: "min(80vw, 300px)", // Mobile: 80% of viewport width, max 300px
                        sm: "min(50vw, 350px)", // Small tablet: 50% of viewport width, max 350px
                        md: "min(30vw, 450px)", // Desktop: 30% of viewport width, max 450px
                        lg: "min(25vw, 450px)", // Large desktop: 25% of viewport width, max 450px
                      },
                      height: {
                        xs: "min(80vw, 300px)", // Maintain aspect ratio
                        sm: "min(50vw, 350px)",
                        md: "min(30vw, 450px)",
                        lg: "min(25vw, 450px)",
                      },
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Next.js Image for Certification Logo */}
                    <Image
                      src={certification.logoSrc || "/placeholder.svg"}
                      alt={certification.logoAlt}
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                      priority={certification.id === 1} // Priority loading for first image only
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, (max-width: 1200px) 30vw, 25vw"
                    />
                  </Box>
                </Box>

                {/* Content Section */}
                <Box
                  sx={{
                    flex: 1,
                    textAlign: { xs: "center", md: "left" },
                    minWidth: 0, // Prevents flex item from overflowing
                  }}
                >
                  {/* Certification Title */}
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
                    {certification.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    sx={{
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 500,
                      fontSize: { xs: "0.95rem", md: "1.5rem" },
                      color: "#666666",
                      mb: { xs: 2, md: 2.5 },
                      letterSpacing: "0.01em",
                    }}
                  >
                    {certification.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 400,
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      color: "#555555",
                      lineHeight: 1.6,
                      mb: { xs: 2.5, md: 3 },
                      maxWidth: { xs: "100%", md: "650px" },
                      mx: { xs: "auto", md: 0 },
                    }}
                  >
                    {certification.description}
                  </Typography>

                  {/* View Certificate Link */}
                  <Link
                    href={certification.certificateLink}
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
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Certifications
