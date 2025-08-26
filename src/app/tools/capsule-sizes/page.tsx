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
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CompanyContactInfo from "@/components/CompanyContactInfo";
import Image from "next/image";

export default function CapsuleSizesPage() {
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
            Capsule Sizes
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
            Complete Guide to Capsule Dimensions & Specifications
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
            placeholder="Search capsule sizes, dimensions, or specifications..."
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
            Find the perfect capsule size for your supplement formulation
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
          Capsule Sizes
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          Whilst Nutraceuticals Group Europe does not provide hard-capsules,
          many of our products are suitable for hard-cap dosing. The diagrams
          and tables below detail the dimensions of various sizes of capsule,
          and the capacity they allow.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          For more information about the data below, or any other technical
          queries regarding the various herbals, aminos and vitamins suitable
          for hard capsules, please do not hesitate in contacting one of our
          friendly staff.
        </Typography>

        {/* Capsule Diagram Image */}
        <Box sx={{ textAlign: "center", my: 6 }}>
          <Typography
            variant="h5"
            component="h3"
            sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
          >
            Capsule Dimensions
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 800,
              height: 400,
              mx: "auto",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Image
              src="https://nutraceuticalsgroup.com/storage/Capsule%20Diagram%20English.jpg"
              alt="Capsule Dimensions Diagram"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>

        {/* Capsule Dimensions Table */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Capsule Volume / Mass Capacity
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          sx={{ mb: 2, fontWeight: "bold", color: "#555" }}
        >
          Empty Capsule Capacity and Mass
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 6, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Size</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Length (mm)</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Body Length (mm)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Diameter (mm)</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Cap Length (mm)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>26</TableCell>
                <TableCell>21.8</TableCell>
                <TableCell>9.6</TableCell>
                <TableCell>12.8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>00</TableCell>
                <TableCell>23.4</TableCell>
                <TableCell>20.1</TableCell>
                <TableCell>8.2</TableCell>
                <TableCell>11.8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>000</TableCell>
                <TableCell>21.5</TableCell>
                <TableCell>18.4</TableCell>
                <TableCell>7.3</TableCell>
                <TableCell>10.8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>19.4</TableCell>
                <TableCell>16.3</TableCell>
                <TableCell>6.6</TableCell>
                <TableCell>9.8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>17.6</TableCell>
                <TableCell>15.1</TableCell>
                <TableCell>6.1</TableCell>
                <TableCell>8.8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>15.7</TableCell>
                <TableCell>13.4</TableCell>
                <TableCell>5.6</TableCell>
                <TableCell>8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>14.3</TableCell>
                <TableCell>12.1</TableCell>
                <TableCell>5.1</TableCell>
                <TableCell>7.1</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Tol.</TableCell>
                <TableCell>± 0.30</TableCell>
                <TableCell>± 0.35</TableCell>
                <TableCell>–</TableCell>
                <TableCell>± 0.35</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Mass Capacity by Powder Density */}
        <Typography
          variant="h6"
          component="h4"
          sx={{ mb: 2, fontWeight: "bold", color: "#555" }}
        >
          Mass Capacity by Powder Density
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 6, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Size</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Mass (mg) - 0.6 g/ml
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Mass (mg) - 0.8 g/ml
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Mass (mg) - 1.0 g/ml
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>000</TableCell>
                <TableCell>822</TableCell>
                <TableCell>1096</TableCell>
                <TableCell>1370</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>00</TableCell>
                <TableCell>570</TableCell>
                <TableCell>760</TableCell>
                <TableCell>950</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>408</TableCell>
                <TableCell>544</TableCell>
                <TableCell>680</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>288</TableCell>
                <TableCell>384</TableCell>
                <TableCell>480</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>216</TableCell>
                <TableCell>288</TableCell>
                <TableCell>360</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>162</TableCell>
                <TableCell>216</TableCell>
                <TableCell>270</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>120</TableCell>
                <TableCell>160</TableCell>
                <TableCell>200</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

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
