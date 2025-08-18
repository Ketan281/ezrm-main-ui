import type React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
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

const FooterSection: React.FC = () => {
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
        <Grid container spacing={26} sx={{ mb: 4 }}>
          {/* Left Side - Contact Information */}
          <Grid>
            <Box>
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
                    Email@gmail.com
                  </Typography>
                </Box>
                {/* Phone */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Phone sx={{ color: "white", fontSize: 20 }} />
                  <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
                    1 124 152 424
                  </Typography>
                </Box>
                {/* Address */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LocationOn sx={{ color: "white", fontSize: 20 }} />
                  <Typography sx={{ color: "white", fontSize: "0.95rem" }}>
                    J4, Main street, Bristol
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* Right Side - Contact Form */}
          <Grid mt={4}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: "400px",
                ml: { md: "auto" },
              }}
            >
              {/* Name Field */}
              <TextField
                placeholder="Name"
                variant="standard"
                sx={{
                  "& .MuiInput-root": {
                    color: "white",
                    fontSize: "1rem",
                    width: "400px",
                    "&:before": {
                      borderBottomColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&:hover:before": {
                      borderBottomColor: "rgba(255, 255, 255, 0.8)",
                    },
                    "&:after": {
                      borderBottomColor: "white",
                    },
                  },
                  "& .MuiInput-input": {
                    color: "white",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.8)",
                      opacity: 1,
                    },
                  },
                }}
              />
              {/* Email Field */}
              <TextField
                placeholder="Email"
                variant="standard"
                fullWidth
                sx={{
                  "& .MuiInput-root": {
                    color: "white",
                    fontSize: "1rem",
                    "&:before": {
                      borderBottomColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&:hover:before": {
                      borderBottomColor: "rgba(255, 255, 255, 0.8)",
                    },
                    "&:after": {
                      borderBottomColor: "white",
                    },
                  },
                  "& .MuiInput-input": {
                    color: "white",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.8)",
                      opacity: 1,
                    },
                  },
                }}
              />
              {/* Number Field */}
              <TextField
                placeholder="Number"
                variant="standard"
                fullWidth
                sx={{
                  "& .MuiInput-root": {
                    color: "white",
                    fontSize: "1rem",
                    "&:before": {
                      borderBottomColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&:hover:before": {
                      borderBottomColor: "rgba(255, 255, 255, 0.8)",
                    },
                    "&:after": {
                      borderBottomColor: "white",
                    },
                  },
                  "& .MuiInput-input": {
                    color: "white",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.8)",
                      opacity: 1,
                    },
                  },
                }}
              />
              {/* Contact Us Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "white",
                  color: "#333",
                  fontWeight: 600,
                  fontSize: "1rem",
                  py: 1.5,
                  borderRadius: "25px",
                  textTransform: "none",
                  mt: 2,
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Grid>
        </Grid>
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
            ezrm
          </Typography>
          {/* Right - Social Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
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
            <IconButton
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
            <IconButton
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
            <IconButton
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterSection;
