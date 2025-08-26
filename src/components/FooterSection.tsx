import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  Facebook,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import ContactForm from "./ContactForm";
import { useCompanyDetails } from "@/hooks/use-company-details";

const FooterSection: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const { companyDetails, loading } = useCompanyDetails();

  const handleSuccess = () => {
    setSnackbarMessage("Thank you! Your message has been sent successfully.");
    setSnackbarOpen(true);
  };

  const handleError = (error: string) => {
    setSnackbarMessage(error);
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, rgba(240, 90, 37, 1) 0%, rgba(84, 29, 9, 1) 100%)",
        borderRadius: "0 0 20px 20px",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        // Removed mx and mb properties that were causing white space
        width: "100%", // Ensure full width
      }}
    >
      <Container maxWidth={false} sx={{ px: 0 }}>
        {/* Main Content Grid */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Left Side - Contact Information */}
          <Box sx={{ flex: { md: 1 } }}>
            {/* Get In Touch Label */}
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              GET IN TOUCH
            </Typography>
            {/* Main Heading */}
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Request More Information
            </Typography>
            {/* Description */}
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                mb: 4,
                maxWidth: "400px",
              }}
            >
              We supply certified, traceable ingredients for nutrition,
              wellness, cosmetics, and pharma. Talk to our team for quotes,
              documentation, or custom sourcing.
            </Typography>
            {/* Contact Details */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Email */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Email sx={{ color: "white", fontSize: 20 }} />
                <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
                  {loading
                    ? "Loading..."
                    : companyDetails?.email || "Email@gmail.com"}
                </Typography>
              </Box>
              {/* Phone */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Phone sx={{ color: "white", fontSize: 20 }} />
                <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
                  {loading
                    ? "Loading..."
                    : companyDetails?.phone || "1 124 152 424"}
                </Typography>
              </Box>
              {/* Address */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <LocationOn sx={{ color: "white", fontSize: 20 }} />
                <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
                  {loading
                    ? "Loading..."
                    : companyDetails?.address || "J4, Main street, Bristol"}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Right Side - Contact Form */}
          <Box
            sx={{
              flex: { md: 1 },
              display: "flex",
              justifyContent: { md: "flex-end" },
            }}
          >
            <ContactForm
              source="website"
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </Box>
        </Box>
        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 4,
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 0 },
          }}
        >
          {/* Left - Navigation Links */}
          <Box sx={{ display: "flex", gap: 4 }}>
            {["Team", "Products", "Connect"].map((link) => (
              <Typography
                key={link}
                component="a"
                href="#"
                sx={{
                  color: "white",
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>
          {/* Center - Logo */}
          <Typography
            sx={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {loading
              ? "Loading..."
              : companyDetails?.name?.toLowerCase() || "ezrm"}
          </Typography>
          {/* Right - Social Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {companyDetails?.linkedin && (
              <IconButton
                component="a"
                href={companyDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <LinkedIn sx={{ fontSize: 20 }} />
              </IconButton>
            )}
            {companyDetails?.facebook && (
              <IconButton
                component="a"
                href={companyDetails.facebook}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Facebook sx={{ fontSize: 20 }} />
              </IconButton>
            )}
            {companyDetails?.instagram && (
              <IconButton
                component="a"
                href={companyDetails.instagram}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Instagram sx={{ fontSize: 20 }} />
              </IconButton>
            )}
            {companyDetails?.youtube && (
              <IconButton
                component="a"
                href={companyDetails.youtube}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <YouTube sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default FooterSection;
