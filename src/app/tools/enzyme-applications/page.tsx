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

export default function EnzymeApplicationsPage() {
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
            Enzyme Applications
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
            Units, Information & Industrial Applications Database
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
            placeholder="Search enzymes, applications, units, or specifications..."
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
            Explore enzyme types, activity units, and industrial applications
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
          Activity, Measurement and Potency
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          We listen to our customers and always want to help, so we have created
          an enzyme tool for you on our website so you can find the right kind
          of enzyme and potency for your project. Whether it's for a gut health
          supplement, to increase muscle mass, heart health or a combination we
          have the technical know how and tools to point you in the right
          direction.
        </Typography>

        {/* Key Questions */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Key Questions Answered:
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            • Which enzyme is suitable for gut, muscle and heart applications
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            • What is the optimum temperature
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            • Which unit is used
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            • Which potency is ideal for your project
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{ mb: 6, color: "#666", lineHeight: 1.6 }}
        >
          Below is a summary, for a more detailed view of the different units
          used globally please see our Enzyme table. Please contact our friendly
          and knowledgeable technical sales colleagues to help guide you to the
          best solutions for your formulations.
        </Typography>

        {/* Enzyme Table */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Enzyme Applications and Specifications
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ mb: 6, boxShadow: 2, overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Item Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Applications</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Optimum Temperature °C
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Optimum pH</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Common Units</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>NIGEENZ000090</TableCell>
                <TableCell>Amylase 2500 SKB/g (Fungal)</TableCell>
                <TableCell>
                  Hydrolyses carbohydrates (starch) into simple sugars,
                  improving absorption and energy uptake. Applications in
                  digestive health and weight management.
                </TableCell>
                <TableCell>40 – 60</TableCell>
                <TableCell>4.0 – 6.0</TableCell>
                <TableCell>DU / SKB</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000095</TableCell>
                <TableCell>Amylase 5000 SKB/g (Fungal)</TableCell>
                <TableCell>
                  Hydrolyses carbohydrates (starch) into simple sugars,
                  improving absorption and energy uptake. Applications in
                  digestive health and weight management.
                </TableCell>
                <TableCell>40 – 60</TableCell>
                <TableCell>4.0 – 6.0</TableCell>
                <TableCell>DU / SKB</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000191</TableCell>
                <TableCell>Bromelain 80 GDU/g 10:1 (Pineapple)</TableCell>
                <TableCell>
                  Derived from pineapple stem, a broad specificity protease
                  which hydrolyses protein to amino acids. Applications in meat
                  tenderising and reducing inflammation.
                </TableCell>
                <TableCell>40 – 60</TableCell>
                <TableCell>5.0 – 8.0</TableCell>
                <TableCell>GDU / PU / MCU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000201</TableCell>
                <TableCell>Bromelain 1200 GDU/g (Pineapple)</TableCell>
                <TableCell>
                  Derived from pineapple stem, a broad specificity protease
                  which hydrolyses protein to amino acids. Applications in meat
                  tenderising and reducing inflammation.
                </TableCell>
                <TableCell>40 – 60</TableCell>
                <TableCell>5.0 – 8.0</TableCell>
                <TableCell>GDU / PU / MCU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000208</TableCell>
                <TableCell>Catalase 600 Baker/g</TableCell>
                <TableCell>
                  Hydrolyses harmful hydrogen peroxide into oxygen and water.
                  Applications in inflammation, anti-ageing, weight management
                  and fat reduction.
                </TableCell>
                <TableCell>20 – 50</TableCell>
                <TableCell>5.0 – 8.0</TableCell>
                <TableCell>Baker</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000210</TableCell>
                <TableCell>Cellulase (Trichoderma) 400 U/g</TableCell>
                <TableCell>
                  Hydrolyses cellulose carbohydrate into glucose. Applications
                  in weight management and digestive health.
                </TableCell>
                <TableCell>40 – 60</TableCell>
                <TableCell>4.0 – 6.0</TableCell>
                <TableCell>U / CU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000214</TableCell>
                <TableCell>Chitinase 1000 U/g</TableCell>
                <TableCell>
                  Hydrolyses Chitin found in yeast, fungi and algae.
                  Applications in gut health and immune system regulation.
                </TableCell>
                <TableCell>45 – 55</TableCell>
                <TableCell>4.0 – 6.0</TableCell>
                <TableCell>U / CU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000215</TableCell>
                <TableCell>Hemicellulase 50000 CU/g</TableCell>
                <TableCell>
                  Hydrolyses hemicellulose – a cellullose component in cell
                  walls of plants, facilitating the digetsion of fruits and
                  vegetables. Applications in digestive and gut health.
                </TableCell>
                <TableCell>40 – 70</TableCell>
                <TableCell>4.0 – 6.0</TableCell>
                <TableCell>HCU / XU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000221</TableCell>
                <TableCell>Chymotrypsin 75USP/mg</TableCell>
                <TableCell>
                  Hydrolyses protein into amino acids in the small intestine.
                  Applications in inflammation and immune system health.
                </TableCell>
                <TableCell>35 – 55</TableCell>
                <TableCell>7.5 – 9.5</TableCell>
                <TableCell>USP</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000251</TableCell>
                <TableCell>Collagenase 250000U/g</TableCell>
                <TableCell>
                  Endopeptidase that hydrolyses collagen. Applications in the
                  breakdown of collagen in damaged tissue, connective tissue
                  repair and joint and bone health.
                </TableCell>
                <TableCell>30 – 40</TableCell>
                <TableCell>6.0 – 8.5</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000261</TableCell>
                <TableCell>Endopeptidase 10,000 HUT/g</TableCell>
                <TableCell>
                  Breaks down protein into amino acids from the middle of the
                  protein chain. Applications in digestive health.
                </TableCell>
                <TableCell>20 – 40</TableCell>
                <TableCell>7.0 – 8.0</TableCell>
                <TableCell>HUT</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000265</TableCell>
                <TableCell>Exopeptidase 15,000 U/g</TableCell>
                <TableCell>
                  Breaks down protein into amino acids from the end of the
                  protein chain. Applications in digestive health.
                </TableCell>
                <TableCell>20 – 40</TableCell>
                <TableCell>7.0 – 8.0</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000271</TableCell>
                <TableCell>Ficin (Vegetable Protease) 250 BAPA/g</TableCell>
                <TableCell>
                  Ficin is an enzyme from the Ficus insipida tree trunk.
                  Hydrolyses protein into amino acids. Applications in digestive
                  health and immune health.
                </TableCell>
                <TableCell>60 – 80</TableCell>
                <TableCell>5.0 – 5.5</TableCell>
                <TableCell>HUT / PC</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000301</TableCell>
                <TableCell>Glucoamylase 100000 U/g</TableCell>
                <TableCell>
                  Hydrolyses partially digested starch/dextrin to glucose.
                  Applications in digestive health and energy.
                </TableCell>
                <TableCell>50 – 60</TableCell>
                <TableCell>3.0 – 4.0</TableCell>
                <TableCell>AGU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000305</TableCell>
                <TableCell>Invertase 1000 SU/g</TableCell>
                <TableCell>
                  Catalyses the breakdown of sucrose into glucose and fructose.
                  Applications in digestive health and energy.
                </TableCell>
                <TableCell>20 – 65</TableCell>
                <TableCell>3.0 – 5.0</TableCell>
                <TableCell>SU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000311</TableCell>
                <TableCell>Maltase 500 DP/g</TableCell>
                <TableCell>
                  Hydrolyses maltose into glucose simple sugar. Applications in
                  digestive health and energy.
                </TableCell>
                <TableCell>20 – 50</TableCell>
                <TableCell>4.0 – 8.0</TableCell>
                <TableCell>DP</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000385</TableCell>
                <TableCell>Lactase 300 ALU/g</TableCell>
                <TableCell>
                  Hydrolyses lactose into glucose and galactose. Applications in
                  digestive health and products suitable for lactose intolerant
                  individuals.
                </TableCell>
                <TableCell>35 – 60</TableCell>
                <TableCell>4.0 – 6.0</TableCell>
                <TableCell>ALU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000401</TableCell>
                <TableCell>Lactase 3000 ALU/g</TableCell>
                <TableCell>
                  Hydrolyses lactose into glucose and galactose. Applications in
                  digestive health and products suitable for lactose intolerant
                  individuals.
                </TableCell>
                <TableCell>35 – 60</TableCell>
                <TableCell>4.0 – 6.0</TableCell>
                <TableCell>ALU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000585</TableCell>
                <TableCell>Lipase 60 U/g (Fungal)</TableCell>
                <TableCell>
                  Hydrolyses lipids (fats) to fatty acids and glycerol.
                  Applications in digestive health and weight management
                </TableCell>
                <TableCell>30 – 50</TableCell>
                <TableCell>4.0 – 7.0</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000590</TableCell>
                <TableCell>Lipase 1000 U/g (Fungal)</TableCell>
                <TableCell>
                  Hydrolyses lipids (fats) to fatty acids and glycerol.
                  Applications in digestive health and weight management
                </TableCell>
                <TableCell>30 – 50</TableCell>
                <TableCell>4.0 – 7.0</TableCell>
                <TableCell>LU / FIP</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000610</TableCell>
                <TableCell>Nattokinase 2000 FU/g</TableCell>
                <TableCell>
                  A serine protease that hydrolyses protein to amino acids.
                  Produced from "Natto" a fermented soy product in Japan.
                  Applications in heart and circulatory health.
                </TableCell>
                <TableCell>30 – 50</TableCell>
                <TableCell>6.0 – 9.0</TableCell>
                <TableCell>FU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000620</TableCell>
                <TableCell>Nattokinase 10000 FU/g</TableCell>
                <TableCell>
                  A serine protease that hydrolyses protein to amino acids.
                  Produced from "Natto" a fermented soy product in Japan.
                  Applications in heart and circulatory health.
                </TableCell>
                <TableCell>30 – 50</TableCell>
                <TableCell>6.0 – 9.0</TableCell>
                <TableCell>FU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000801</TableCell>
                <TableCell>Pancreatin 4XNF (Fungal)</TableCell>
                <TableCell>
                  Naturally contains lipase, protease and amylase enzymes to
                  digest lipids, proteins and starch. Applications in digestive
                  health and improving the absorption of fat soluble vitamins.
                </TableCell>
                <TableCell>30 – 55</TableCell>
                <TableCell>7.0 – 9.0</TableCell>
                <TableCell>XNF</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000901</TableCell>
                <TableCell>Papain 2000 USP-U/mg (Papaya)</TableCell>
                <TableCell>
                  Broad specificity protease that hydrolyses protein into amino
                  acids. Applications in digestive health and sports nutrition.
                </TableCell>
                <TableCell>65 – 80</TableCell>
                <TableCell>5.0 – 7.0</TableCell>
                <TableCell>PU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000911</TableCell>
                <TableCell>Papain 6000 USP-U/mg (Papaya)</TableCell>
                <TableCell>
                  Broad specificity protease that hydrolyses protein into amino
                  acids. Applications in digestive health and sports nutrition.
                </TableCell>
                <TableCell>65 – 80</TableCell>
                <TableCell>5.0 – 7.0</TableCell>
                <TableCell>PU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ000921</TableCell>
                <TableCell>Pectinase 300 Endo-PG/g</TableCell>
                <TableCell>
                  Pectinase hydrolyses pectin. Used to improve the digestion of
                  plant based foods. Applications in digestive health.
                </TableCell>
                <TableCell>40 – 55</TableCell>
                <TableCell>4.0 – 6.0</TableCell>
                <TableCell>Endo-PG</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ001101</TableCell>
                <TableCell>Pepsin 300NF (1:300)</TableCell>
                <TableCell>
                  Hydrolyses protein into it's amino acid constituents.
                  Applications in digestive health and sports nutrition,
                  inceasing muscle mass.
                </TableCell>
                <TableCell>40 – 65</TableCell>
                <TableCell>2.0 – 4.0</TableCell>
                <TableCell>Pepsin Units</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ001201</TableCell>
                <TableCell>Phytase 3000 U/g</TableCell>
                <TableCell>
                  Hydrolyses phytate to release phosphate, reducing the
                  anti-nutritional effect of phytate. Allows the body to better
                  absorb amino acids, phoshorous, calcium and energy from food.
                </TableCell>
                <TableCell>45 – 60</TableCell>
                <TableCell>4.0 – 6.0</TableCell>
                <TableCell>FTU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ001291</TableCell>
                <TableCell>Protease 3 – 300000 HUT/g</TableCell>
                <TableCell>
                  A non-specific protein hydrolysing enzyme that breaks protein
                  into amino acids. Applications in digestive health, energy and
                  inflammation.
                </TableCell>
                <TableCell>30 – 60</TableCell>
                <TableCell>3</TableCell>
                <TableCell>SAPU / HUT</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ001490</TableCell>
                <TableCell>Protease 200000 HUT/g (Fungal)</TableCell>
                <TableCell>
                  A non-specific protein hydrolysing enzyme that breaks protein
                  into amino acids. Applications in digestive health, energy and
                  inflammation.
                </TableCell>
                <TableCell>30 – 60</TableCell>
                <TableCell>6.0 – 8.0</TableCell>
                <TableCell>SAPU / HUT</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ001601</TableCell>
                <TableCell>
                  Serrapeptase (Serratiopeptidase) 1600 U/mg
                </TableCell>
                <TableCell>
                  A proteolytic enzyme that hydrolyses proteins into amino
                  acids. Applications in circulatory and respiratory health,
                  inflammation, scarring, improving cold symptoms.
                </TableCell>
                <TableCell>50 – 60</TableCell>
                <TableCell>8.0 – 10</TableCell>
                <TableCell>SPU</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ001651</TableCell>
                <TableCell>
                  Superoxide Dismutase (SOD) Bovine 8000 U/g
                </TableCell>
                <TableCell>
                  Breaks down potentially harmful oxygen molecules in cells.
                  Applications in injury recovery and immune health.
                </TableCell>
                <TableCell>30 – 45</TableCell>
                <TableCell>7.0 – 9.0</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ001701</TableCell>
                <TableCell>Sucrase 1000 SU/g</TableCell>
                <TableCell>
                  Catalyses the breakdown of sucrose into glucose and fructose.
                  Applications in digestive health and energy.
                </TableCell>
                <TableCell>20 – 65</TableCell>
                <TableCell>3.0 – 5.0</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ001751</TableCell>
                <TableCell>Trypsin 250USP/mg</TableCell>
                <TableCell>
                  Proteolytic enzyme that hydrolyses protein into amino acids.
                  Applications in digestive health, muscle repair and injury
                  recovery.
                </TableCell>
                <TableCell>35 – 60</TableCell>
                <TableCell>7.0 – 9.0</TableCell>
                <TableCell>USP</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEENZ003001</TableCell>
                <TableCell>Ox Bile Powder CP2010</TableCell>
                <TableCell>
                  Applications in digestive health and weight management
                </TableCell>
                <TableCell>20 – 65</TableCell>
                <TableCell>6.0 – 7.0</TableCell>
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
