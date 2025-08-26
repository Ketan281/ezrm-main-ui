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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CompanyContactInfo from "@/components/CompanyContactInfo";

export default function ENumbersPage() {
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
            E Numbers
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
            Food Additives & Nutritional Information Database
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
            placeholder="Search E Numbers, additives, or food ingredients..."
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
            Discover food additives, preservatives, and nutritional information
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ px: 4, py: 6, maxWidth: 1200, mx: "auto" }}>
        {/* E-Numbers Table */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
        >
          E-Numbers
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 6, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>E-Number</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Additive Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Also known as</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>E100</TableCell>
                <TableCell>Curcumin</TableCell>
                <TableCell>100-000-000</TableCell>
                <TableCell>Curcumin 95% (Turmeric Extract)</TableCell>
                <TableCell>Turmeric</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E101</TableCell>
                <TableCell>Riboflavin</TableCell>
                <TableCell>101-000-000</TableCell>
                <TableCell>Riboflavin (Vitamin B2)</TableCell>
                <TableCell>Vitamin B2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E102</TableCell>
                <TableCell>Tartrazine</TableCell>
                <TableCell>102-000-000</TableCell>
                <TableCell>Tartrazine</TableCell>
                <TableCell>FD&C Yellow 5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E120</TableCell>
                <TableCell>Cochineal</TableCell>
                <TableCell>120-000-000</TableCell>
                <TableCell>Cochineal Extract (Carmine)</TableCell>
                <TableCell>Carmine</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E150a</TableCell>
                <TableCell>Plain caramel</TableCell>
                <TableCell>150A-000-000</TableCell>
                <TableCell>Caramel Colour (Plain)</TableCell>
                <TableCell>Caramel I</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E160a</TableCell>
                <TableCell>Carotenes</TableCell>
                <TableCell>160A-000-000</TableCell>
                <TableCell>Beta Carotene 10% CWS</TableCell>
                <TableCell>Beta Carotene</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E171</TableCell>
                <TableCell>Titanium dioxide</TableCell>
                <TableCell>171-000-000</TableCell>
                <TableCell>Titanium Dioxide</TableCell>
                <TableCell>TiO2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E202</TableCell>
                <TableCell>Potassium sorbate</TableCell>
                <TableCell>202-000-000</TableCell>
                <TableCell>Potassium Sorbate</TableCell>
                <TableCell>Potassium salt of sorbic acid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E211</TableCell>
                <TableCell>Sodium benzoate</TableCell>
                <TableCell>211-000-000</TableCell>
                <TableCell>Sodium Benzoate</TableCell>
                <TableCell>Sodium salt of benzoic acid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E223</TableCell>
                <TableCell>Sodium metabisulphite</TableCell>
                <TableCell>223-000-000</TableCell>
                <TableCell>Sodium Metabisulphite</TableCell>
                <TableCell>Sodium Metabisulfite</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E250</TableCell>
                <TableCell>Sodium nitrite</TableCell>
                <TableCell>250-000-000</TableCell>
                <TableCell>Sodium Nitrite</TableCell>
                <TableCell>NaNO2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E260</TableCell>
                <TableCell>Acetic acid</TableCell>
                <TableCell>260-000-000</TableCell>
                <TableCell>Acetic Acid</TableCell>
                <TableCell>Ethanoic acid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E290</TableCell>
                <TableCell>Carbon dioxide</TableCell>
                <TableCell>290-000-000</TableCell>
                <TableCell>Carbon Dioxide</TableCell>
                <TableCell>CO2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E300</TableCell>
                <TableCell>Ascorbic acid</TableCell>
                <TableCell>300-000-000</TableCell>
                <TableCell>Ascorbic Acid (Vitamin C)</TableCell>
                <TableCell>Vitamin C</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E322</TableCell>
                <TableCell>Lecithins</TableCell>
                <TableCell>322-000-000</TableCell>
                <TableCell>Soy Lecithin</TableCell>
                <TableCell>Phosphatidylcholine</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E330</TableCell>
                <TableCell>Citric acid</TableCell>
                <TableCell>330-000-000</TableCell>
                <TableCell>Citric Acid</TableCell>
                <TableCell>2-Hydroxy-1,2,3-propanetricarboxylic acid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E341</TableCell>
                <TableCell>Calcium phosphates</TableCell>
                <TableCell>341-000-000</TableCell>
                <TableCell>Calcium Phosphate</TableCell>
                <TableCell>Tricalcium phosphate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E400</TableCell>
                <TableCell>Alginic acid</TableCell>
                <TableCell>400-000-000</TableCell>
                <TableCell>Alginic Acid</TableCell>
                <TableCell>Polymannuronic acid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E415</TableCell>
                <TableCell>Xanthan gum</TableCell>
                <TableCell>415-000-000</TableCell>
                <TableCell>Xanthan Gum</TableCell>
                <TableCell>Corn sugar gum</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E422</TableCell>
                <TableCell>Glycerol</TableCell>
                <TableCell>422-000-000</TableCell>
                <TableCell>Glycerol</TableCell>
                <TableCell>Glycerin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E440</TableCell>
                <TableCell>Pectins</TableCell>
                <TableCell>440-000-000</TableCell>
                <TableCell>Pectin</TableCell>
                <TableCell>Polysaccharide</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E450</TableCell>
                <TableCell>Diphosphates</TableCell>
                <TableCell>450-000-000</TableCell>
                <TableCell>Disodium Diphosphate</TableCell>
                <TableCell>Sodium pyrophosphate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E466</TableCell>
                <TableCell>Carboxymethylcellulose</TableCell>
                <TableCell>466-000-000</TableCell>
                <TableCell>Carboxymethylcellulose</TableCell>
                <TableCell>CMC</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E471</TableCell>
                <TableCell>Mono- and diglycerides of fatty acids</TableCell>
                <TableCell>471-000-000</TableCell>
                <TableCell>Glyceryl Monostearate</TableCell>
                <TableCell>GMS</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E481</TableCell>
                <TableCell>Sodium stearoyl-2-lactylate</TableCell>
                <TableCell>481-000-000</TableCell>
                <TableCell>Sodium Stearoyl Lactylate</TableCell>
                <TableCell>SSL</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Preservatives Table */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
        >
          Preservatives
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 6, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Preservatives</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Benzoic Acid</TableCell>
                <TableCell>BENZ-000-000</TableCell>
                <TableCell>Benzoic Acid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Potassium Sorbate</TableCell>
                <TableCell>POTS-000-000</TableCell>
                <TableCell>Potassium Sorbate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sodium Benzoate</TableCell>
                <TableCell>SOBE-000-000</TableCell>
                <TableCell>Sodium Benzoate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sorbic Acid</TableCell>
                <TableCell>SORB-000-000</TableCell>
                <TableCell>Sorbic Acid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sulphur Dioxide</TableCell>
                <TableCell>SULD-000-000</TableCell>
                <TableCell>Sulphur Dioxide</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Antioxidants Table */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
        >
          Antioxidants
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 6, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Antioxidants</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Ascorbic Acid</TableCell>
                <TableCell>ASCO-000-000</TableCell>
                <TableCell>Ascorbic Acid (Vitamin C)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>BHA</TableCell>
                <TableCell>BHA-000-000</TableCell>
                <TableCell>Butylated Hydroxyanisole</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mixed Tocopherols</TableCell>
                <TableCell>MIXT-000-000</TableCell>
                <TableCell>Mixed Tocopherols (Natural Vitamin E)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>TBHQ</TableCell>
                <TableCell>TBHQ-000-000</TableCell>
                <TableCell>Tertiary-butylhydroquinone</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Acidity Regulators, Anti-caking, Humectants and Raising Agents Table */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
        >
          Acidity Regulators, Anti-caking, Humectants and Raising Agents
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 6, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Acidity Regulators, Anti-caking, Humectants and Raising Agents
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Acetic Acid</TableCell>
                <TableCell>ACET-000-000</TableCell>
                <TableCell>Acetic Acid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Calcium Carbonate</TableCell>
                <TableCell>CALC-000-000</TableCell>
                <TableCell>Calcium Carbonate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Citric Acid</TableCell>
                <TableCell>CITR-000-000</TableCell>
                <TableCell>Citric Acid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Magnesium Oxide</TableCell>
                <TableCell>MAGO-000-000</TableCell>
                <TableCell>Magnesium Oxide</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sodium Bicarbonate</TableCell>
                <TableCell>SOBI-000-000</TableCell>
                <TableCell>Sodium Bicarbonate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tartaric Acid</TableCell>
                <TableCell>TART-000-000</TableCell>
                <TableCell>Tartaric Acid</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Contact Information */}
        <CompanyContactInfo />
      </Box>
    </Box>
  );
}
