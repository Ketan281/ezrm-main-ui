import React from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CompanyContactInfo from "@/components/CompanyContactInfo";

export default function HealthClaimsPage() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          width: "100%",
          backgroundImage:
            "url('https://nutraceuticalsgroup.com/images/mainImage.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          py: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
        }}
      >
        {/* Main Heading */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              mb: 2,
              letterSpacing: "0.02em",
            }}
          >
            Health Claims
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 400,
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            EFSA Approved Nutrition & Health Claims Database
          </Typography>
        </Box>

        {/* Search Box */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "90%",
            maxWidth: 700,
          }}
        >
          <TextField
            placeholder="Search health claims, nutrients, or EFSA regulations..."
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ff7849, #ff6b35)",
                      boxShadow: "0 4px 12px rgba(255, 120, 73, 0.3)",
                      marginRight: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow: "0 6px 16px rgba(255, 120, 73, 0.4)",
                      },
                    }}
                  >
                    <SearchIcon
                      sx={{
                        color: "#ffffff",
                        fontSize: 20,
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </Box>
                </InputAdornment>
              ),
              sx: {
                fontSize: "18px",
                height: 60,
                "& input": {
                  paddingRight: 2,
                },
              },
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(15px)",
              borderRadius: "50px",
              boxShadow:
                "0 25px 50px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  borderWidth: 1.5,
                  borderRadius: "50px",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.6)",
                  borderWidth: 2,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(255, 120, 73, 0.8)",
                  borderWidth: 2.5,
                },
                "&:hover": {
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))",
                  transform: "translateY(-3px) scale(1.02)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow:
                    "0 35px 70px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                },
                "&.Mui-focused": {
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.9))",
                  boxShadow:
                    "0 40px 80px rgba(0, 0, 0, 0.18), 0 15px 30px rgba(0, 0, 0, 0.12), 0 0 0 4px rgba(255, 120, 73, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-4px) scale(1.03)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                },
              },
              "& .MuiInputBase-input": {
                color: "#2c3e50",
                fontWeight: 500,
                "&::placeholder": {
                  color: "#7f8c8d",
                  opacity: 0.8,
                  fontWeight: 400,
                },
              },
              "& .MuiInputAdornment-root": {
                marginRight: 1,
                "& .MuiSvgIcon-root": {
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                },
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 2,
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Access comprehensive EFSA health claims and regulatory guidance
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ px: 4, py: 6, maxWidth: 1200, mx: "auto" }}>
        {/* Introduction */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
        >
          EFSA Health Claims - European Food Safety Authority
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          The European Food Safety Authority (EFSA) regulates nutrition and
          health claims made on foods in the European Union. This comprehensive
          database provides access to approved health claims, regulatory
          guidance, and compliance requirements for food and supplement
          manufacturers.
        </Typography>

        {/* Key Resources */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Key Resources & Links
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            Follow the two links below for a breakdown of current EFSA health
            claims:
          </Typography>
          <List sx={{ mb: 3 }}>
            <ListItem sx={{ pl: 0 }}>
              <ListItemText
                primary={
                  <Link
                    href="#"
                    sx={{
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Full list of EFSA health claims with Conditions of use of
                    the claim / Restrictions of use
                  </Link>
                }
              />
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <ListItemText
                primary={
                  <Link
                    href="#"
                    sx={{
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    EFSA health claims summary by category
                  </Link>
                }
              />
            </ListItem>
          </List>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            For a list of Nutraceuticals Branded Blends that can help you
            achieve some of these health claims – please check here
          </Typography>
        </Box>

        {/* EU Register Section */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          EU Register of Approved Nutrition and Health Claims
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          These are divided into 4 sections:
        </Typography>

        {/* Article 13(1) */}
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
            >
              Article 13(1) – General Function Claims
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.6 }}>
              "General function" claims under Article 13(1) of the EC Regulation
              on nutrition and health claims refer to the role of a nutrient or
              substance in growth, development and body functions; psychological
              and behavioural functions; slimming and weight control, satiety or
              reduction of available energy from the diet.
            </Typography>
          </CardContent>
        </Card>

        {/* Article 13(5) */}
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
            >
              Article 13(5) – Newly Developed Scientific Evidence Claims
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.6 }}>
              Claims under article 13(5) EC Regulation on nutrition and health
              claims are those based on newly developed scientific evidence
              and/or for which protection of proprietary data is requested. For
              these health claims authorisation is required on a case-by-case
              basis, following the submission of a scientific dossier to EFSA
              for assessment.
            </Typography>
          </CardContent>
        </Card>

        {/* Article 14(1a) */}
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
            >
              Article 14(1a) – Reduction of Disease Risk Claims
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.6 }}>
              Claims under Article 14(1a) of the EC Regulation on nutrition and
              health claims refer to the reduction of disease risk.
            </Typography>
          </CardContent>
        </Card>

        {/* Article 14(1b) */}
        <Card sx={{ mb: 4, boxShadow: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
            >
              Article 14(1b) – Children's Development or Health Claims
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.6 }}>
              Claims under Article 14(1b) of the EC Regulation on nutrition and
              health claims refer to children's development or health.
            </Typography>
          </CardContent>
        </Card>

        {/* Helpful Links */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          More Helpful Links
        </Typography>
        <List sx={{ mb: 4 }}>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText
              primary={
                <Link
                  href="#"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  EU Register of approved nutrition and health claims made on
                  foods
                </Link>
              }
            />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText
              primary={
                <Link
                  href="#"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Health Claims List as Excel
                </Link>
              }
            />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText
              primary={
                <Link
                  href="#"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Health Claims List as PDF
                </Link>
              }
            />
          </ListItem>
        </List>

        <Typography
          variant="body1"
          sx={{ mb: 6, color: "#666", lineHeight: 1.6 }}
        >
          Please contact our friendly and knowledgeable technical sales
          colleagues to help guide you to the best ingredients to allow you to
          make health claims on your products.
        </Typography>

        {/* Disclaimer */}
        <Card
          sx={{
            mt: 6,
            mb: 4,
            backgroundColor: "#f8f9fa",
            border: "1px solid #e9ecef",
          }}
        >
          <CardContent>
            <Typography
              variant="body2"
              sx={{ color: "#666", lineHeight: 1.6, fontStyle: "italic" }}
            >
              All information is correct to the best of our knowledge and
              Nutraceuticals Group Europe takes no responsibility for any errors
              or mistakes. Links to other sources and reference material are
              included for accuracy. Any errors or omissions? Please let us know
              through our contact form.
            </Typography>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <CompanyContactInfo />
      </Box>
    </Box>
  );
}
