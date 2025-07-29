"use client"

import React from "react"
import { Box, Typography, Link, Container, Alert, Skeleton } from "@mui/material"
import Image from "next/image"
import { useCertificateListing } from "@/api/handlers"
import type { Certificate } from "@/api/services"

interface CertificationCardProps {
  certificate: Certificate
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certificate }) => {
  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith("http")) {
      return imageUrl
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCertificateLink = () => {
    // Find the first PDF asset link
    const pdfAsset = certificate.assetsLinks.find((asset) => asset.fileType === "pdf")
    return pdfAsset?.url || "#"
  }

  const isExpired = () => {
    const expiryDate = new Date(certificate.expiryDate)
    const today = new Date()
    return expiryDate < today
  }

  return (
    <Box
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
              xs: "min(80vw, 300px)",
              sm: "min(50vw, 350px)",
              md: "min(30vw, 450px)",
              lg: "min(25vw, 450px)",
            },
            height: {
              xs: "min(80vw, 300px)",
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
          <Image
            src={getImageUrl(certificate.bannerImage) || "/placeholder.svg"}
            alt={certificate.certificationName}
            fill
            style={{
              objectFit: "contain",
            }}
            onError={(e) => {
              // Fallback to default ISO image if certificate image fails to load
              const target = e.target as HTMLImageElement
              target.src = "/iso.png"
            }}
            priority={false}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, (max-width: 1200px) 30vw, 25vw"
          />
        </Box>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: "center", md: "left" },
          minWidth: 0,
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
          {certificate.title}
        </Typography>

        {/* Certification Name (Subtitle) */}
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
          {certificate.certificationName}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: { xs: "0.875rem", md: "1rem" },
            color: "#555555",
            lineHeight: 1.6,
            mb: { xs: 2, md: 2.5 },
            maxWidth: { xs: "100%", md: "650px" },
            mx: { xs: "auto", md: 0 },
          }}
        >
          {certificate.descr}
        </Typography>

        {/* Certificate Details */}
        <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
          <Typography
            sx={{
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              color: "#777",
              mb: 0.5,
            }}
          >
            <strong>Issued by:</strong> {certificate.issuedBy}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              color: "#777",
              mb: 0.5,
            }}
          >
            <strong>Issue Date:</strong> {formatDate(certificate.issueDate)}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              color: isExpired() ? "#d32f2f" : "#777",
              mb: 0.5,
            }}
          >
            <strong>Expiry Date:</strong> {formatDate(certificate.expiryDate)}
            {isExpired() && " (Expired)"}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              color: "#777",
            }}
          >
            <strong>Certificate ID:</strong> {certificate.certificateId}
          </Typography>
        </Box>

        {/* View Certificate Link */}
        <Link
          href={getCertificateLink()}
          target="_blank"
          rel="noopener noreferrer"
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
          View Certificate ({certificate.assetsLinks.length} file{certificate.assetsLinks.length !== 1 ? "s" : ""})
        </Link>
      </Box>
    </Box>
  )
}

const CertificationCardSkeleton: React.FC = () => (
  <Box
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
    }}
  >
    {/* Logo Skeleton */}
    <Box
      sx={{
        flexShrink: 0,
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" },
        width: { xs: "100%", md: "auto" },
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: {
            xs: "min(80vw, 300px)",
            sm: "min(50vw, 350px)",
            md: "min(30vw, 450px)",
            lg: "min(25vw, 450px)",
          },
          height: {
            xs: "min(80vw, 300px)",
            sm: "min(50vw, 350px)",
            md: "min(30vw, 450px)",
            lg: "min(25vw, 450px)",
          },
          borderRadius: 2,
        }}
      />
    </Box>

    {/* Content Skeleton */}
    <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
      <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={30} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={20} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="45%" height={20} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="30%" height={20} />
    </Box>
  </Box>
)

const Certifications: React.FC = () => {
  const { data: response, isLoading, error, isError } = useCertificateListing({ limit: 3 })

  // Debug logging
  React.useEffect(() => {
    console.log("Certificates Loading:", isLoading)
    console.log("Certificates Error:", error)
    console.log("Certificates Response:", response)
  }, [isLoading, error, response])

  const renderLoadingState = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, md: 4 },
        mx: "2rem",
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <CertificationCardSkeleton key={index} />
      ))}
    </Box>
  )

  const renderErrorState = () => (
    <Box sx={{ mx: "2rem" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        <Typography variant="h6">Error loading certifications</Typography>
        <Typography variant="body2">{error instanceof Error ? error.message : "Something went wrong"}</Typography>
      </Alert>
    </Box>
  )

  const renderEmptyState = () => (
    <Box sx={{ textAlign: "center", py: 4, mx: "2rem" }}>
      <Typography variant="h6" sx={{ color: "#666", mb: 1 }}>
        No certifications found
      </Typography>
      <Typography variant="body2" sx={{ color: "#999" }}>
        Certifications will appear here once they are available.
      </Typography>
    </Box>
  )

  const certificates = response?.data?.certifications || []
  const displayedCertifications = certificates.slice(0, 3) // Limit to maximum 3 cards

  return (
    <Box sx={{ width: "100%", backgroundColor: "#fafafa", py: { xs: 3, md: 0 } }}>
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
            {!isLoading && certificates.length > 0 && (
              <Typography
                component="span"
                sx={{
                  ml: 2,
                  color: "#666",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                ({certificates.length} total)
              </Typography>
            )}
          </Typography>

          {/* Certifications Cards Container */}
          {isLoading && renderLoadingState()}
          {isError && renderErrorState()}
          {!isLoading && !isError && certificates.length === 0 && renderEmptyState()}
          {!isLoading && !isError && certificates.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 3, md: 4 },
                mx: "2rem",
              }}
            >
              {displayedCertifications.map((certificate) => (
                <CertificationCard key={certificate._id} certificate={certificate} />
              ))}
            </Box>
          )}

          {/* Debug Info (remove in production) */}
          {/* {process.env.NODE_ENV === "development" && (
            <Box sx={{ mt: 4, p: 2, bgcolor: "#f0f0f0", borderRadius: 1, fontSize: "0.8rem", mx: "2rem" }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Debug Info:
              </Typography>
              <br />
              <Typography variant="caption">
                API URL: {process.env.NEXT_PUBLIC_API_URL}
                <br />
                Loading: {isLoading.toString()}
                <br />
                Error: {error?.message || "None"}
                <br />
                Certificates Count: {certificates.length}
              </Typography>
            </Box>
          )} */}
        </Box>
      </Container>
    </Box>
  )
}

export default Certifications
