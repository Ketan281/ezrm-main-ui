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

export default function VitaminActivityPage() {
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
            Vitamin Activity
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
            Composition & Activity Database
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
            placeholder="Search vitamins, activity levels, composition, or specifications..."
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
            Access comprehensive vitamin composition and activity data
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
          Vitamin Activity and Composition
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          Composition table for vitamins. NB: Data here is lower or average
          values from calculated or published data and should be used as a guide
          only. Please contact our friendly and knowledgeable technical sales
          colleagues to help guide you to the best ingredients to allow you to
          achieve your desired vitamin levels for your products.
        </Typography>

        {/* Vitamin Table */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Vitamin Activity and Composition Database
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
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Vitamin B1 */}
              <TableRow>
                <TableCell>NIGEVIT001111</TableCell>
                <TableCell>Vitamin B1 Benfotiamine</TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Benfotiamine</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001109</TableCell>
                <TableCell>
                  Vitamin B1 Thiamine 25% Food State On Yeast (Fungus) (Soya)
                </TableCell>
                <TableCell>79.67%</TableCell>
                <TableCell>Vitamin B1 (Thiamine)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001001</TableCell>
                <TableCell>Vitamin B1 Thiamine HCL</TableCell>
                <TableCell>78.74%</TableCell>
                <TableCell>Vitamin B1 (Thiamine)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001101</TableCell>
                <TableCell>Vitamin B1 Thiamine Mononitrate</TableCell>
                <TableCell>81.30%</TableCell>
                <TableCell>Vitamin B1 (Thiamine)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Vitamin B2 */}
              <TableRow>
                <TableCell>NIGEVIT001511</TableCell>
                <TableCell>
                  Vitamin B2 Riboflavin 10% Food State On Yeast (Fungus) (Soya)
                </TableCell>
                <TableCell>10.00%</TableCell>
                <TableCell>Vitamin B2 (Riboflavin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001501</TableCell>
                <TableCell>Vitamin B2 Riboflavin</TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Vitamin B2 (Riboflavin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001601</TableCell>
                <TableCell>
                  Vitamin B2 Riboflavin 5-Phosphate Sodium (R5P)
                </TableCell>
                <TableCell>73.00%</TableCell>
                <TableCell>Vitamin B2 (Riboflavin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Vitamin B3 */}
              <TableRow>
                <TableCell>NIGEVIT000521</TableCell>
                <TableCell>
                  Vitamin B3 (Non Flush) Inositol Hexanicotinate
                </TableCell>
                <TableCell>80.00%</TableCell>
                <TableCell>Vitamin B3 (Niacin)</TableCell>
                <TableCell>20.00%</TableCell>
                <TableCell>Inositol</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001701</TableCell>
                <TableCell>
                  Vitamin B3 Nicotinamide (Niacinamide Vitamin PP)
                </TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Vitamin B3 (Niacin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001702</TableCell>
                <TableCell>
                  Vitamin B3 Nicotinic Acid (Niacin Vitamin PP) - May cause
                  Flushing
                </TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Vitamin B3 (Niacin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Vitamin B5 */}
              <TableRow>
                <TableCell>NIGEVIT001801</TableCell>
                <TableCell>
                  Vitamin B5 Calcium Pantothenate (Calpan) 45 Mesh
                </TableCell>
                <TableCell>92.00%</TableCell>
                <TableCell>Vitamin B5 (Pantothenate)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001806</TableCell>
                <TableCell>Vitamin B5 D-Panthenol 75% Liquid</TableCell>
                <TableCell>79.79%</TableCell>
                <TableCell>Vitamin B5 (Pantothenate)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001808</TableCell>
                <TableCell>Vitamin B5 D-Pantethine 40%</TableCell>
                <TableCell>40.00%</TableCell>
                <TableCell>Pantethine</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Vitamin B6 */}
              <TableRow>
                <TableCell>NIGEVIT001901</TableCell>
                <TableCell>
                  Vitamin B6 Pyridoxal 5-Phosphate Monohydrate (P5P)
                </TableCell>
                <TableCell>67.22%</TableCell>
                <TableCell>Vitamin B6 (Pyridoxine)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT002001</TableCell>
                <TableCell>Vitamin B6 Pyridoxine HCl 40 Mesh</TableCell>
                <TableCell>82.00%</TableCell>
                <TableCell>Vitamin B6 (Pyridoxine)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Vitamin B7 */}
              <TableRow>
                <TableCell>NIGEVIT002101</TableCell>
                <TableCell>Vitamin B7 D-Biotin (Vitamin H) 100%</TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Vitamin B7 (Biotin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT002102</TableCell>
                <TableCell>
                  Vitamin B7 D-Biotin (Vitamin H) 1% On Dicalcium Phosphate
                </TableCell>
                <TableCell>1.00%</TableCell>
                <TableCell>Vitamin B7 (Biotin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Vitamin B9 */}
              <TableRow>
                <TableCell>NIGEVIT002301</TableCell>
                <TableCell>
                  Vitamin B9 Folic Acid (Folacin / Folate) 350 Mesh
                </TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Vitamin B9 (Folate)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT002211</TableCell>
                <TableCell>
                  Vitamin B9 L-5-Methyltetrahydrofolate Calcium MTHF Crystalline
                  Stabilised 1%
                </TableCell>
                <TableCell>0.75%</TableCell>
                <TableCell>MTHF</TableCell>
                <TableCell>1.27%</TableCell>
                <TableCell>Vitamin B9 (Folate)</TableCell>
              </TableRow>

              {/* Vitamin B12 */}
              <TableRow>
                <TableCell>NIGEVIT001200</TableCell>
                <TableCell>
                  Vitamin B12 Cyanocobalamin 1% (on Dicalcium Phosphate)
                </TableCell>
                <TableCell>1.00%</TableCell>
                <TableCell>Vitamin B12 (Cobalamin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001203</TableCell>
                <TableCell>Vitamin B12 Cyanocobalamin Pure 100%</TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Vitamin B12 (Cobalamin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT001398</TableCell>
                <TableCell>
                  Vitamin B12 Methylcobalamin (Mecobalamin) 1% (On Maltodextrin)
                </TableCell>
                <TableCell>1.00%</TableCell>
                <TableCell>Vitamin B12 (Cobalamin)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Vitamin C */}
              <TableRow>
                <TableCell>NIGEVIT002401</TableCell>
                <TableCell>Vitamin C Ascorbic Acid</TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Vitamin C (Ascorbate)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT002501</TableCell>
                <TableCell>
                  Vitamin C Calcium Ascorbate Dihydrate (~82% Ascorbate)
                </TableCell>
                <TableCell>81.97%</TableCell>
                <TableCell>Vitamin C (Ascorbate)</TableCell>
                <TableCell>9.00%</TableCell>
                <TableCell>Calcium</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT002605</TableCell>
                <TableCell>
                  Vitamin C Magnesium Ascorbate Anhydrous (~80% Ascorbate)
                </TableCell>
                <TableCell>80.00%</TableCell>
                <TableCell>Vitamin C (Ascorbate)</TableCell>
                <TableCell>5.00%</TableCell>
                <TableCell>Magnesium</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT002701</TableCell>
                <TableCell>
                  Vitamin C Sodium Ascorbate (~88% Ascorbate)
                </TableCell>
                <TableCell>88.50%</TableCell>
                <TableCell>Vitamin C (Ascorbate)</TableCell>
                <TableCell>11.00%</TableCell>
                <TableCell>Sodium</TableCell>
              </TableRow>

              {/* Vitamin D */}
              <TableRow>
                <TableCell>NIGEVIT002801</TableCell>
                <TableCell>
                  Vitamin D2 Ergocalciferol Powder 0.25% 2500ug/g 100000iu/g
                  Synthetic Vegan
                </TableCell>
                <TableCell>0.25%</TableCell>
                <TableCell>Vitamin D (Calciferol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT002802</TableCell>
                <TableCell>
                  Vitamin D2 Ergocalciferol Powder Pure 1000000ug/g 40000000iu/g
                  Synthetic Vegan
                </TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Vitamin D (Calciferol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT002920</TableCell>
                <TableCell>
                  Vitamin D3 Cholecalciferol Crystals Pure 1000000ug/g
                  40000000iu/g Vegetarian (Wool Lanolin)
                </TableCell>
                <TableCell>98.00%</TableCell>
                <TableCell>Vitamin D (Calciferol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT002905</TableCell>
                <TableCell>
                  Vitamin D3 Cholecalciferol Oil 10% 100000ug/g 4000000iu/g
                  Vegetarian (Wool Lanolin)
                </TableCell>
                <TableCell>10.00%</TableCell>
                <TableCell>Vitamin D (Calciferol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Vitamin E */}
              <TableRow>
                <TableCell>NIGEVIT003201</TableCell>
                <TableCell>
                  Vitamin E Mixed Natural Tocopherol Oil 95% Non-GMO
                </TableCell>
                <TableCell>95.00%</TableCell>
                <TableCell>Vitamin E (Tocopherol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT003301</TableCell>
                <TableCell>
                  Vitamin E Mixed Natural Tocopherol Powder 30% Non-GMO
                </TableCell>
                <TableCell>30.00%</TableCell>
                <TableCell>Vitamin E (Tocopherol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT003401</TableCell>
                <TableCell>
                  Vitamin E Natural (D-Alpha-Tocopheryl Acetate 51.5% 700iu/g)
                  Powder CWD Non-GMO
                </TableCell>
                <TableCell>46.99%</TableCell>
                <TableCell>Vitamin E (Tocopherol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Vitamin K */}
              <TableRow>
                <TableCell>NIGEVIT003601</TableCell>
                <TableCell>
                  Vitamin K1 (Phylloquinone / Phytomenadione / Phytonadione) 1%
                  Powder
                </TableCell>
                <TableCell>1.00%</TableCell>
                <TableCell>Vitamin K1 (Phylloquinone)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT003610</TableCell>
                <TableCell>
                  Vitamin K1 (Phylloquinone / Phytomenadione / Phytonadione) 20%
                  Powder
                </TableCell>
                <TableCell>20.00%</TableCell>
                <TableCell>Vitamin K1 (Phylloquinone)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT003828</TableCell>
                <TableCell>
                  Vitamin K2 Menaquinone-7 (MK7) 1.0% Powder Fermented Trans
                  Vegan
                </TableCell>
                <TableCell>1.00%</TableCell>
                <TableCell>Vitamin K2 (Menaquinone)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT003830</TableCell>
                <TableCell>
                  Vitamin K2 Menaquinone-7 (MK7) 5.0% Powder Fermented Trans
                  Vegan
                </TableCell>
                <TableCell>5.00%</TableCell>
                <TableCell>Vitamin K2 (Menaquinone)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Beta Carotene */}
              <TableRow>
                <TableCell>NIGEVIT000960</TableCell>
                <TableCell>Beta Carotene 1% Beadlet Synthetic</TableCell>
                <TableCell>0.17%</TableCell>
                <TableCell>Vitamin A (Retinol)</TableCell>
                <TableCell>1.00%</TableCell>
                <TableCell>Beta Carotene</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT000913</TableCell>
                <TableCell>Beta Carotene 10% Beadlet Synthetic</TableCell>
                <TableCell>1.67%</TableCell>
                <TableCell>Vitamin A (Retinol)</TableCell>
                <TableCell>10.00%</TableCell>
                <TableCell>Beta Carotene</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT000918</TableCell>
                <TableCell>Beta Carotene 20% Beadlet Synthetic</TableCell>
                <TableCell>3.33%</TableCell>
                <TableCell>Vitamin A (Retinol)</TableCell>
                <TableCell>20.00%</TableCell>
                <TableCell>Beta Carotene</TableCell>
              </TableRow>

              {/* Vitamin A */}
              <TableRow>
                <TableCell>NIGEVIT000831</TableCell>
                <TableCell>
                  Vitamin A Acetate (Retinol) - Crystalline 2800000IU/G
                </TableCell>
                <TableCell>84.00%</TableCell>
                <TableCell>Vitamin A (Retinol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT000821</TableCell>
                <TableCell>
                  Vitamin A Acetate (Retinol) - Oil 1000000IU/G
                </TableCell>
                <TableCell>30.00%</TableCell>
                <TableCell>Vitamin A (Retinol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT000601</TableCell>
                <TableCell>
                  Vitamin A Acetate (Retinol) - Powder 250000IU/G
                </TableCell>
                <TableCell>7.50%</TableCell>
                <TableCell>Vitamin A (Retinol)</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Other Vitamins */}
              <TableRow>
                <TableCell>NIGEVIT000221</TableCell>
                <TableCell>
                  Choline 25% Food State On Yeast (Fungus) (Soya)
                </TableCell>
                <TableCell>25.00%</TableCell>
                <TableCell>Choline</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT000101</TableCell>
                <TableCell>DL-Choline Bitartrate</TableCell>
                <TableCell>41.00%</TableCell>
                <TableCell>Choline</TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>DL-Choline Bitartrate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT000301</TableCell>
                <TableCell>
                  Coenzyme Q10 CoQ10 Powder 100% (Ubiquinone / Ubidecarenone)
                </TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Coenzyme Q10</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEVIT000501</TableCell>
                <TableCell>Inositol (Myo-Inositol)</TableCell>
                <TableCell>100.00%</TableCell>
                <TableCell>Inositol</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
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
