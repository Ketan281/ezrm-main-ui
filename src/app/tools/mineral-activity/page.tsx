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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CompanyContactInfo from "@/components/CompanyContactInfo";

export default function MineralActivityPage() {
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
            Mineral Activity
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
            Solubility in Water & Elemental Composition Database
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
            placeholder="Search minerals, solubility, elemental composition, or specifications..."
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
            Access comprehensive mineral solubility and elemental composition
            data
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
          Mineral Activity and Solubility in Water
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          Elemental composition table for minerals. NB: Data here is lower or
          average values from calculated or published data and should be used as
          a guide only. Please contact our friendly and knowledgeable technical
          sales colleagues to help guide you to the best ingredients to allow
          you to achieve your desired mineral levels for your products.
        </Typography>

        {/* Mineral Table */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Mineral Activity and Solubility Database
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ mb: 6, boxShadow: 2, overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Item Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Main Activity %
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Main Active Ingredient#1
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Sub Activity %
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Sub Active Ingredient#2
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Solubility / Extraction
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Boron */}
              <TableRow>
                <TableCell>NIGEMIN000089</TableCell>
                <TableCell>
                  Boron 1% Food State On Yeast (Fungus) (Soya) (~1% B)
                </TableCell>
                <TableCell>1.00%</TableCell>
                <TableCell>Boron</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000081</TableCell>
                <TableCell>
                  Disodium Tetraborate Decahydrate Nutrition Grade (Borax)
                  (Boron) (~11% B)
                </TableCell>
                <TableCell>11.34%</TableCell>
                <TableCell>Boron</TableCell>
                <TableCell>12.06%</TableCell>
                <TableCell>Sodium</TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>

              {/* Calcium */}
              <TableRow>
                <TableCell>NIGEMIN001073</TableCell>
                <TableCell>
                  Calcium 5% Food State On Yeast (Fungus) (Soya) (~5% Ca)
                </TableCell>
                <TableCell>5.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000095</TableCell>
                <TableCell>
                  Calcium Alpha Ketoglutarate (Oxoglutarate) Nutrition Grade
                  (~19.5% Ca)
                </TableCell>
                <TableCell>19.50%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000101</TableCell>
                <TableCell>
                  Calcium Aspartate Chelate Nutrition Grade (~12% Ca)
                </TableCell>
                <TableCell>12.50%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000654</TableCell>
                <TableCell>
                  Calcium Bisglycinate Chelate Buffered Nutrition Grade (~30%
                  Ca)
                </TableCell>
                <TableCell>30.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000651</TableCell>
                <TableCell>
                  Calcium Bisglycinate Chelate Nutrition Grade (~19% Ca)
                </TableCell>
                <TableCell>19.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000241</TableCell>
                <TableCell>
                  Calcium Caprylate (Calcium Octanoate) Powder Nutrition Grade
                  (~12% Ca)
                </TableCell>
                <TableCell>12.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000211</TableCell>
                <TableCell>
                  Calcium Carbonate DC (&lt;5% Maltodextrin) Nutrition Grade
                  (~36% Ca)
                </TableCell>
                <TableCell>36.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000203</TableCell>
                <TableCell>
                  Calcium Carbonate Nutrition Grade 1250 Mesh (~40% Ca)
                </TableCell>
                <TableCell>40.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000421</TableCell>
                <TableCell>
                  Calcium Chloride Dihydrate Nutrition Grade (~27% Ca)
                </TableCell>
                <TableCell>27.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell>48.00%</TableCell>
                <TableCell>Chlorine</TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000401</TableCell>
                <TableCell>
                  Calcium Citrate Malate Granular Nutrition Grade (~20% Ca)
                </TableCell>
                <TableCell>20.50%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  Insoluble at 1330mg in 200ml water ~266mg Elemental 33% RDA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000301</TableCell>
                <TableCell>
                  Calcium Citrate Tetrahydrate Nutrition Grade (~19% Ca)
                </TableCell>
                <TableCell>19.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000611</TableCell>
                <TableCell>Calcium Fructoborate (~5% Ca ~2.5% B)</TableCell>
                <TableCell>5.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell>2.50%</TableCell>
                <TableCell>Boron</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000601</TableCell>
                <TableCell>
                  Calcium Gluconate Nutrition Grade (~8% Ca)
                </TableCell>
                <TableCell>8.94%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000621</TableCell>
                <TableCell>
                  Calcium Glycerophosphate Nutrition Grade (~18% Ca)
                </TableCell>
                <TableCell>18.60%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004112</TableCell>
                <TableCell>
                  Calcium Hydrogen Phosphate Dihydrate Nutrition Grade (~23% Ca)
                </TableCell>
                <TableCell>23.29%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell>18.00%</TableCell>
                <TableCell>Phosphorus</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000655</TableCell>
                <TableCell>
                  Calcium Hydroxide Nutrition Grade (~51% Ca)
                </TableCell>
                <TableCell>51.80%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000658</TableCell>
                <TableCell>
                  Calcium Iodate Nutrition Grade (~61% Iodate)
                </TableCell>
                <TableCell>10.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell>61.00%</TableCell>
                <TableCell>Iodine</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000661</TableCell>
                <TableCell>
                  Calcium Ketoisocaproate (KIC Calcium) Nutrition Grade (~13%
                  Ca)
                </TableCell>
                <TableCell>13.40%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000705</TableCell>
                <TableCell>
                  Calcium Lactate Anhydrous Nutrition Grade (~18% Ca)
                </TableCell>
                <TableCell>18.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000701</TableCell>
                <TableCell>
                  Calcium Lactate Pentahydrate Nutrition Grade (~13% Ca)
                </TableCell>
                <TableCell>13.40%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000751</TableCell>
                <TableCell>
                  Calcium Magnesium Carbonate (Dolomite) Nutrition Grade (21% Ca
                  13% Mg)
                </TableCell>
                <TableCell>21.70%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell>13.10%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000801</TableCell>
                <TableCell>Calcium Malate Nutrition Grade (~23% Ca)</TableCell>
                <TableCell>23.28%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000901</TableCell>
                <TableCell>
                  Calcium Pyruvate Nutrition Grade (~15% Ca)
                </TableCell>
                <TableCell>15.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN000951</TableCell>
                <TableCell>
                  Calcium Silicate Nutrition Grade (~34% Ca)
                </TableCell>
                <TableCell>34.50%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell>65.60%</TableCell>
                <TableCell>Silicon</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001001</TableCell>
                <TableCell>
                  Calcium Succinate Nutrition Grade (~25% Ca)
                </TableCell>
                <TableCell>25.67%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001010</TableCell>
                <TableCell>
                  Calcium Sulphate Anhydrous Nutrition Grade (~29% Ca)
                </TableCell>
                <TableCell>29.44%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell>23.55%</TableCell>
                <TableCell>Sulphur</TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001020</TableCell>
                <TableCell>
                  Calcium Sulphate Dihydrate (Gypsum) Nutrition Grade (~23% Ca)
                </TableCell>
                <TableCell>23.27%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell>18.62%</TableCell>
                <TableCell>Sulphur</TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>

              {/* Chromium */}
              <TableRow>
                <TableCell>NIGEMIN001110a</TableCell>
                <TableCell>
                  Chromium 1% Food State On Buckwheat (~1% Cr)
                </TableCell>
                <TableCell>1.00%</TableCell>
                <TableCell>Chromium</TableCell>
                <TableCell>2.04%</TableCell>
                <TableCell>Chlorine</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001085</TableCell>
                <TableCell>
                  Chromium Chloride Encapsulated Nutrition Grade (~2% Cr)
                </TableCell>
                <TableCell>2.00%</TableCell>
                <TableCell>Chromium</TableCell>
                <TableCell>34.00%</TableCell>
                <TableCell>Calcium</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001100</TableCell>
                <TableCell>
                  Chromium Chloride Hexahydrate Nutrition Grade (~19% Cr)
                </TableCell>
                <TableCell>19.13%</TableCell>
                <TableCell>Chromium</TableCell>
                <TableCell>39.00%</TableCell>
                <TableCell>Chlorine</TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001101</TableCell>
                <TableCell>
                  Chromium Picolinate Nutrition Grade (~12% Cr)
                </TableCell>
                <TableCell>12.43%</TableCell>
                <TableCell>Chromium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>

              {/* Copper */}
              <TableRow>
                <TableCell>NIGEMIN001325</TableCell>
                <TableCell>
                  Copper 1% Food State On Yeast (Fungus) (Soya) (~1% Cu)
                </TableCell>
                <TableCell>1.00%</TableCell>
                <TableCell>Copper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001111</TableCell>
                <TableCell>
                  Copper Aspartate Chelate Nutrition Grade (~12% Cu)
                </TableCell>
                <TableCell>12.00%</TableCell>
                <TableCell>Copper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001201</TableCell>
                <TableCell>
                  Copper Bisglycinate Chelate Nutrition Grade (~29% Cu)
                </TableCell>
                <TableCell>29.00%</TableCell>
                <TableCell>Copper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001211</TableCell>
                <TableCell>
                  Copper Citrate Hemitrihydrate Powder Nutrition Grade (~36% Cu)
                </TableCell>
                <TableCell>36.00%</TableCell>
                <TableCell>Copper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001301</TableCell>
                <TableCell>
                  Copper Gluconate Anhydrous Nutrition Grade (~13% Cu)
                </TableCell>
                <TableCell>13.00%</TableCell>
                <TableCell>Copper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001305</TableCell>
                <TableCell>Copper Oxide Nutrition Grade (~78% Cu)</TableCell>
                <TableCell>78.70%</TableCell>
                <TableCell>Copper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001315</TableCell>
                <TableCell>
                  Copper Sulphate Anhydrous Nutrition Grade (~39% Cu)
                </TableCell>
                <TableCell>39.81%</TableCell>
                <TableCell>Copper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001311</TableCell>
                <TableCell>
                  Copper Sulphate Pentahydrate Nutrition Grade (~25% Cu)
                </TableCell>
                <TableCell>25.45%</TableCell>
                <TableCell>Copper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>

              {/* Iron */}
              <TableRow>
                <TableCell>NIGEMIN001636</TableCell>
                <TableCell>
                  Carbonyl Iron Powder Nutrition Grade (~99% Fe)
                </TableCell>
                <TableCell>99.50%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001631</TableCell>
                <TableCell>
                  Ferric (Iron III) Pyrophosphate Nutrition Grade (~25% Fe)
                </TableCell>
                <TableCell>25.00%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell>21.00%</TableCell>
                <TableCell>Phosphorus</TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001505</TableCell>
                <TableCell>
                  Ferrous (Iron II) Bisglycinate Chelate Liposomal Powder
                  Nutrition Grade (~7% Fe)
                </TableCell>
                <TableCell>7.00%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001501</TableCell>
                <TableCell>
                  Ferrous (Iron II) Bisglycinate Chelate Nutrition Grade (~18%
                  Fe)
                </TableCell>
                <TableCell>18.00%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001551</TableCell>
                <TableCell>
                  Ferrous (Iron II) Citrate Nutrition Grade (~20% Fe)
                </TableCell>
                <TableCell>20.00%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001611</TableCell>
                <TableCell>
                  Ferrous (Iron II) Fumarate Nutrition Grade (~33% Fe)
                </TableCell>
                <TableCell>33.00%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001601</TableCell>
                <TableCell>
                  Ferrous (Iron II) Gluconate Nutrition Grade (~11% Fe)
                </TableCell>
                <TableCell>11.80%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001615</TableCell>
                <TableCell>
                  Ferrous (Iron II) Lactate Dihydrate Nutrition Grade (~19% Fe)
                </TableCell>
                <TableCell>19.00%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001621</TableCell>
                <TableCell>
                  Ferrous (Iron II) Sulphate Dried Nutrition Grade (~32% Fe)
                </TableCell>
                <TableCell>32.50%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell>21.00%</TableCell>
                <TableCell>Sulphur</TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001624</TableCell>
                <TableCell>
                  Ferrous (Iron II) Sulphate Heptahydrate Nutrition Grade (~20%
                  Fe)
                </TableCell>
                <TableCell>20.10%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell>11.53%</TableCell>
                <TableCell>Sulphur</TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN001634</TableCell>
                <TableCell>
                  Reduced Iron Powder Nutrition Grade (~97% Fe)
                </TableCell>
                <TableCell>97.00%</TableCell>
                <TableCell>Iron</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Magnesium */}
              <TableRow>
                <TableCell>NIGEMIN002850</TableCell>
                <TableCell>
                  Magnesium 5% Food State On Yeast (Fungus) (Soya) (~5% Mg)
                </TableCell>
                <TableCell>5.00%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002424a</TableCell>
                <TableCell>
                  Magnesium Acetyl Taurate Nutrition Grade (~6% Mg)
                </TableCell>
                <TableCell>6.00%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002402</TableCell>
                <TableCell>
                  Magnesium Bisglycinate Anhydrous Chelate Fully Reacted
                  Nutrition Grade (~13% Mg)
                </TableCell>
                <TableCell>13.00%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002411</TableCell>
                <TableCell>
                  Magnesium Bisglycinate Chelate Buffered Nutrition Grade (~20%
                  Mg)
                </TableCell>
                <TableCell>20.00%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002001</TableCell>
                <TableCell>Magnesium Chloride Anhydrous (~25% Mg)</TableCell>
                <TableCell>25.50%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell>74.40%</TableCell>
                <TableCell>Chlorine</TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002000</TableCell>
                <TableCell>
                  Magnesium Chloride Hexahydrate Nutrition Grade (~11% Mg)
                </TableCell>
                <TableCell>11.96%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell>34.80%</TableCell>
                <TableCell>Chlorine</TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002210</TableCell>
                <TableCell>
                  Magnesium Citrate 30% Buffered Nutrition Grade (~30% Mg)
                </TableCell>
                <TableCell>30.00%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002207</TableCell>
                <TableCell>
                  Magnesium Citrate Nonahydrate Nutrition Grade (~11% Mg)
                </TableCell>
                <TableCell>11.20%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002301</TableCell>
                <TableCell>
                  Magnesium Gluconate Nutrition Grade (~5% Mg)
                </TableCell>
                <TableCell>5.86%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002421</TableCell>
                <TableCell>
                  Magnesium Glycerophosphate Nutrition Grade (~10% Mg)
                </TableCell>
                <TableCell>10.50%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002423</TableCell>
                <TableCell>
                  Magnesium Hydroxide Nutrition Grade (~41% Mg)
                </TableCell>
                <TableCell>41.60%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002501</TableCell>
                <TableCell>
                  Magnesium Lactate Dihydrate Nutrition Grade (~10% Mg)
                </TableCell>
                <TableCell>10.19%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002601</TableCell>
                <TableCell>
                  Magnesium Malate Anhydrous Nutrition Grade (~14% Mg)
                </TableCell>
                <TableCell>14.00%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002715</TableCell>
                <TableCell>
                  Magnesium Oxide DC Granular Nutrition Grade (~60% Mg)
                </TableCell>
                <TableCell>60.30%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002811</TableCell>
                <TableCell>
                  Magnesium Sulphate Heptahydrate (Epsom Salts) Nutrition Grade
                  (~9% Mg)
                </TableCell>
                <TableCell>9.86%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell>13.01%</TableCell>
                <TableCell>Sulphur</TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN002424</TableCell>
                <TableCell>
                  Magnesium Taurate Nutrition Grade (~8% Mg)
                </TableCell>
                <TableCell>8.92%</TableCell>
                <TableCell>Magnesium</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>

              {/* Zinc */}
              <TableRow>
                <TableCell>NIGEMIN004405a</TableCell>
                <TableCell>
                  Zinc 1.5% Food State On Buckwheat (~1.5% Zn)
                </TableCell>
                <TableCell>1.50%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004505</TableCell>
                <TableCell>
                  Zinc 5% Food State On Yeast (Fungus) (Soya) (~5% Zn)
                </TableCell>
                <TableCell>5.00%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004301</TableCell>
                <TableCell>Zinc Acetate Nutrition Grade (~29% Zn)</TableCell>
                <TableCell>29.70%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004315</TableCell>
                <TableCell>
                  Zinc Bisglycinate Chelate Nutrition Grade (~20% Zn)
                </TableCell>
                <TableCell>20.00%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004401</TableCell>
                <TableCell>
                  Zinc Citrate Dihydrate Nutrition Grade (~31% Zn)
                </TableCell>
                <TableCell>31.21%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004501</TableCell>
                <TableCell>
                  Zinc Gluconate Powder Nutrition Grade (~13% Zn)
                </TableCell>
                <TableCell>13.40%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004551</TableCell>
                <TableCell>
                  Zinc Lactate Dihydrate Nutrition Grade (~22% Zn)
                </TableCell>
                <TableCell>22.00%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004701</TableCell>
                <TableCell>
                  Zinc Monomethionine (Zinc Methionate) Nutrition Grade (~18%
                  Zn)
                </TableCell>
                <TableCell>18.00%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Insoluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004805</TableCell>
                <TableCell>Zinc Orotate Nutrition Grade (~14% Zn)</TableCell>
                <TableCell>14.30%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Slightly soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004802</TableCell>
                <TableCell>
                  Zinc Oxide Nutrition Grade 30 Mesh (~80% Zn)
                </TableCell>
                <TableCell>80.35%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004811</TableCell>
                <TableCell>Zinc Picolinate Nutrition Grade (~20% Zn)</TableCell>
                <TableCell>20.00%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEMIN004821</TableCell>
                <TableCell>
                  Zinc Sulphate Monohydrate Nutrition Grade (~35% Zn)
                </TableCell>
                <TableCell>35.50%</TableCell>
                <TableCell>Zinc</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Soluble in water</TableCell>
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
