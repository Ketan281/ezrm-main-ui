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

export default function ScovilleHeatUnitsPage() {
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
            Scoville Heat Units
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
            Heat Scale & Capsaicin Measurement Database
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
            placeholder="Search heat levels, peppers, capsaicin content, or SHU ratings..."
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
            Explore the complete Scoville scale from mild to extreme heat levels
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
          Understanding the Scoville Scale
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          The Scoville scale is the measurement system used to quantify the heat
          or spiciness of chilli peppers and other spicy foods. Developed by
          American pharmacist Wilbur Scoville in 1912, this scale is determined
          by a panel of people tasting diluted samples with the human tongue,
          rather than using a chemical method and provides a numerical value
          that represents the concentration of capsaicin, the compound
          responsible for the burning sensation experienced when consuming spicy
          foods.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          The Scoville scale ranges from 0 to over 16 million Scoville Heat
          Units (SHU), with the lower end representing mild, sweet peppers and
          the higher end representing the most intensely fiery chilli peppers.
          The scale works by measuring the amount of capsaicin present in a
          specific pepper variety, with a higher SHU indicating a greater
          concentration of this compound.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 6, color: "#666", lineHeight: 1.6 }}
        >
          Understanding the Scoville scale is crucial when exploring the world
          of chilli peppers, as it allows us to appreciate the nuances of
          spiciness and make informed choices about the level of heat we can
          handle. This knowledge can enhance our culinary and health
          experiences, whether we're experimenting with supplements, creating
          spicy condiments, or simply enjoying the thrill of a well-balanced,
          flavorful dish.
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          Nutraceuticals Group Europe supplies a range of the chilli powders and
          extracts, but are we too hot for you to handle? Below we have the
          Scoville scale so you can see which ingredient suits you, your product
          and your customers. Please read our blog on Capsaicin or contact our
          friendly and knowledgeable technical sales colleagues to help guide
          you to the best ingredients to allow you to achieve your desired
          flavour profile or check our hot items here.
        </Typography>

        {/* Scoville Scale Table */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Complete Scoville Heat Scale
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ mb: 6, boxShadow: 2, overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Approx Heat Rating (SHU)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Heat vs Pure Capsaicin
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Example</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Approx Pungency
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Source</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>16,000,000,000</TableCell>
                <TableCell>100000%</TableCell>
                <TableCell>Resiniferatoxin</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5,300,000,000</TableCell>
                <TableCell>33125%</TableCell>
                <TableCell>Tinyatoxin</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>16,000,000</TableCell>
                <TableCell>100%</TableCell>
                <TableCell>Capsaicin Pure</TableCell>
                <TableCell>Pure Capsaicin</TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15,000,000</TableCell>
                <TableCell>94%</TableCell>
                <TableCell>Dihydrocapsaicin</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>9,200,000</TableCell>
                <TableCell>58%</TableCell>
                <TableCell>Nonivamide</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>9,100,000</TableCell>
                <TableCell>57%</TableCell>
                <TableCell>Nordihydrocapsaicin</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>8,600,000</TableCell>
                <TableCell>54%</TableCell>
                <TableCell>Homocapsaicin, Homodihydrocapsaicin</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2,200,000</TableCell>
                <TableCell>14%</TableCell>
                <TableCell>Carolina Reaper, Dragons Breath</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2,009,999</TableCell>
                <TableCell>13%</TableCell>
                <TableCell>Trinidad Moruga Scorpion</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2,000,000</TableCell>
                <TableCell>13%</TableCell>
                <TableCell>Pepper Spray</TableCell>
                <TableCell>Extreme Heat</TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1,600,000</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>Capsaicin 10%</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell>NIGEHER008215</TableCell>
                <TableCell>
                  Capsicum Pepper Extract Oleoresin 10% Capsaicin 1.6 Million
                  SHU ~60:1 (Chilli) (Capsicum annuum)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1,350,000</TableCell>
                <TableCell>8%</TableCell>
                <TableCell>Naga Viper</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1,000,000</TableCell>
                <TableCell>6%</TableCell>
                <TableCell>Capsaicin 6.2%</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell>NIGEHER008211</TableCell>
                <TableCell>
                  Capsicum Pepper Extract Oleoresin 6.2% Capsaicin 1 Million SHU
                  ~40:1 (Chilli) (Capsicum annuum)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1,000,000</TableCell>
                <TableCell>6%</TableCell>
                <TableCell>Ghost Pepper (Bhut Jolokia)</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>800,000</TableCell>
                <TableCell>5%</TableCell>
                <TableCell>Capsaicin 5%</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>750,000</TableCell>
                <TableCell>5%</TableCell>
                <TableCell>
                  Infinity Chilli, Bhut Jolokia chili pepper, Super Naga
                </TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>500,000</TableCell>
                <TableCell>3.1%</TableCell>
                <TableCell>Red Savina habanero</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>400,000</TableCell>
                <TableCell>2.5%</TableCell>
                <TableCell>Capsaicin 2.5%</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>400,000</TableCell>
                <TableCell>2.5%</TableCell>
                <TableCell>Animal Repellant - Capsaicin 2.5%</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>350,000</TableCell>
                <TableCell>2.2%</TableCell>
                <TableCell>Chocolate habanero, Habanaga, Nagabon</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>200,000</TableCell>
                <TableCell>1.3%</TableCell>
                <TableCell>Habanero</TableCell>
                <TableCell>Very High Heat</TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>160,000</TableCell>
                <TableCell>1.0%</TableCell>
                <TableCell>Capsaicin 1%</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>160,000</TableCell>
                <TableCell>1.0%</TableCell>
                <TableCell>Shogaol</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>100,000</TableCell>
                <TableCell>0.6%</TableCell>
                <TableCell>Piperine</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell>NIGEHER006001</TableCell>
                <TableCell>
                  Black Pepper Extract 95% Piperine ~25:1 (Piper nigrum)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>100,000</TableCell>
                <TableCell>0.6%</TableCell>
                <TableCell>
                  Habanero chili, Scotch bonnet, Datil, Rocoto, White Habanero,
                  Jamaican hot pepper
                </TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>80,000</TableCell>
                <TableCell>0.5%</TableCell>
                <TableCell>Capsaicin 0.5%</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell>NIGEHER009001</TableCell>
                <TableCell>
                  Cayenne Pepper Extract 0.5% Capsaicinoids (Chilli) (Capsicum
                  annuum Cayenne)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>75,000</TableCell>
                <TableCell>0.5%</TableCell>
                <TableCell>Red Amazon</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>75,000</TableCell>
                <TableCell>0.5%</TableCell>
                <TableCell>Pequin</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>70,000</TableCell>
                <TableCell>0.4%</TableCell>
                <TableCell>Chiltecepin</TableCell>
                <TableCell>High Heat</TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>60,000</TableCell>
                <TableCell>0.4%</TableCell>
                <TableCell>Gingerol</TableCell>
                <TableCell></TableCell>
                <TableCell>Chemical</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>50,000</TableCell>
                <TableCell>0.3%</TableCell>
                <TableCell>
                  Byadgi chilli, Bird's eye chili (Thai Chili Pepper), Malagueta
                  pepper, Chiltepin pepper, Piri piri
                </TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>30,000</TableCell>
                <TableCell>0.2%</TableCell>
                <TableCell>Cayenne Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell>NIGEHER009301HT</TableCell>
                <TableCell>
                  Cayenne Pepper Powder (Chilli) (Capsicum annuum Cayenne) Heat
                  Treated
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>30,000</TableCell>
                <TableCell>0.2%</TableCell>
                <TableCell>Tabasco Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>25,000</TableCell>
                <TableCell>0.2%</TableCell>
                <TableCell>Arbol</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>25,000</TableCell>
                <TableCell>0.2%</TableCell>
                <TableCell>Japone</TableCell>
                <TableCell>Moderate</TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>25,000</TableCell>
                <TableCell>0.2%</TableCell>
                <TableCell>
                  Guntur chilli, Ají pepper, Cumari pepper (Capsicum Chinense),
                  Katara (spicy), Arbol pepper
                </TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>16,000</TableCell>
                <TableCell>0.10%</TableCell>
                <TableCell>Capsiate</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10,000</TableCell>
                <TableCell>0.06%</TableCell>
                <TableCell>Smoked Jalepeno (Chipotle)</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10,000</TableCell>
                <TableCell>0.06%</TableCell>
                <TableCell>
                  Serrano pepper, Peter pepper, Aleppo pepper
                </TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>7,000</TableCell>
                <TableCell>0.04%</TableCell>
                <TableCell>Puya</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>7,000</TableCell>
                <TableCell>0.04%</TableCell>
                <TableCell>Tabasco Sauce (Green Habanero)</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5,000</TableCell>
                <TableCell>0.03%</TableCell>
                <TableCell>Guajillo</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3,500</TableCell>
                <TableCell>0.02%</TableCell>
                <TableCell>Jalapeno pepper</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3,000</TableCell>
                <TableCell>0.02%</TableCell>
                <TableCell>Poblano</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2,500</TableCell>
                <TableCell>0.02%</TableCell>
                <TableCell>Tabasco Sauce (Red)</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2,500</TableCell>
                <TableCell>0.02%</TableCell>
                <TableCell>Pasilla</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2,500</TableCell>
                <TableCell>0.02%</TableCell>
                <TableCell>
                  Espelette pepper, Chipotle, Guajillo pepper, Hungarian wax
                  pepper, Bullet pepper
                </TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2,200</TableCell>
                <TableCell>0.01%</TableCell>
                <TableCell>Sriracha Sauce</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2,000</TableCell>
                <TableCell>0.01%</TableCell>
                <TableCell>Tabasco Sauce (Chipotle)</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1,000</TableCell>
                <TableCell>0.01%</TableCell>
                <TableCell>Mild Jalepeno</TableCell>
                <TableCell>Mild</TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1,000</TableCell>
                <TableCell>0.01%</TableCell>
                <TableCell>Guindillas peppers</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1,000</TableCell>
                <TableCell>0.01%</TableCell>
                <TableCell>New Mexican</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1,000</TableCell>
                <TableCell>0.01%</TableCell>
                <TableCell>Ancho</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1,000</TableCell>
                <TableCell>0.01%</TableCell>
                <TableCell>
                  Anaheim pepper, Poblano pepper, Rocotillo pepper, Peppadew
                </TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>450</TableCell>
                <TableCell>0.00%</TableCell>
                <TableCell>Frank's Red Hot Sauce</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>100</TableCell>
                <TableCell>0.00%</TableCell>
                <TableCell>Pimento, Peperoncini, Banana pepper</TableCell>
                <TableCell></TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>0.00%</TableCell>
                <TableCell>Bell pepper, Cubanelle, Aji dulce</TableCell>
                <TableCell>No Heat</TableCell>
                <TableCell>Pepper</TableCell>
                <TableCell>NIGEHER008251</TableCell>
                <TableCell>
                  Red Bell Pepper Powder (Capsicum annuum) Heat Treated
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Product Table */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Available Products
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
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>NIGEHER009001</TableCell>
                <TableCell>
                  Cayenne Pepper Extract 0.5% Capsaicinoids (Chilli) (Capsicum
                  annuum Cayenne)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEHER009005</TableCell>
                <TableCell>
                  Cayenne Pepper Extract 0.6% Capsaicinoids (Chilli) (Capsicum
                  annuum Cayenne)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEHER009010</TableCell>
                <TableCell>
                  Cayenne Pepper Extract 1.0% Capsaicinoids (Chilli) (Capsicum
                  annuum Cayenne)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEHER009015</TableCell>
                <TableCell>
                  Cayenne Pepper Extract 1.3% Capsaicinoids (Chilli) (Capsicum
                  annuum Cayenne)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEHER009080</TableCell>
                <TableCell>
                  Cayenne Pepper Extract 4:1 (Chilli) (Capsicum annuum Cayenne)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEHER009090</TableCell>
                <TableCell>
                  Cayenne Pepper Extract 7:1 (Chilli) (Capsicum annuum Cayenne)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEHER009101</TableCell>
                <TableCell>
                  Cayenne Pepper Extract 8:1 (Chilli) (Capsicum annuum Cayenne)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEHER009190</TableCell>
                <TableCell>
                  Cayenne Pepper Powder 40K SHU (Chilli) (Capsicum annuum
                  Cayenne) NHT
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEHER009201</TableCell>
                <TableCell>
                  Cayenne Pepper Powder 100K SHU (Chilli) (Capsicum annuum
                  Cayenne) Heat Treated
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NIGEHER009301HT</TableCell>
                <TableCell>
                  Cayenne Pepper Powder (Chilli) (Capsicum annuum Cayenne) Heat
                  Treated
                </TableCell>
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
