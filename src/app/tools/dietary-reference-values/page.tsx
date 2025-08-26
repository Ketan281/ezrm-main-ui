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

export default function DietaryReferenceValuesPage() {
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
            Dietary Reference Values
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
            NRV, RDA & Nutritional Requirements Database
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
            placeholder="Search nutrients, vitamins, minerals, or daily values..."
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
            Access comprehensive nutritional reference values and daily
            requirements
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
          European Vitamin, Mineral and Proximate Dietary Reference Values (DRV,
          NRV, RDA)
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          Dietary reference values (DRVs) is an umbrella term for a set of
          nutrient reference values (NRVs) that includes the average requirement
          (AR), the population reference intake (PRI), the adequate intake (AI)
          and the reference intake range for macronutrients (RI). These values
          guide professionals on the amount of a nutrient needed to maintain
          health in an otherwise healthy individual or group of people. DRVs
          also include the tolerable upper intake level (UL), which is the
          maximum amount of a nutrient that can be consumed safely over a long
          period of time.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          RDA's (Recommended Daily Allowance) were an old system and have now
          changed to NRV's. The values for RDA and NRV are exactly the same.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 6, color: "#666", lineHeight: 1.6 }}
        >
          Please contact our friendly and knowledgeable technical sales
          colleagues to help guide you to the best ingredients to allow you to
          achieve these recommended levels on your products.
        </Typography>

        {/* Vitamins Table */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Daily Reference Intakes for Vitamins and Minerals (Adults)
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          sx={{ mb: 2, fontWeight: "bold", color: "#555" }}
        >
          Vitamins
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ mb: 6, boxShadow: 2, overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Nutrient</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>EU NRV</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Units (mg or mcg)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>IU</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Standardised Units (mg)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Tolerable Upper Intake Level (UL) mg
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Vitamin A Retinol</TableCell>
                <TableCell>800</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell>2664iu</TableCell>
                <TableCell>0.8</TableCell>
                <TableCell>3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin D Calciferol</TableCell>
                <TableCell>5</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell>200iu</TableCell>
                <TableCell>0.005</TableCell>
                <TableCell>0.1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin E Tocopherol</TableCell>
                <TableCell>12</TableCell>
                <TableCell>mg</TableCell>
                <TableCell>17.9iu</TableCell>
                <TableCell>12</TableCell>
                <TableCell>300</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin K1 Phylloquinone</TableCell>
                <TableCell>75</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell></TableCell>
                <TableCell>0.075</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin K2 Menaquinone</TableCell>
                <TableCell>75</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell></TableCell>
                <TableCell>0.075</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin B1 Thiamin</TableCell>
                <TableCell>1.1</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>1.1</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin B2 Riboflavin</TableCell>
                <TableCell>1.4</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>1.4</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin B3 Niacin</TableCell>
                <TableCell>16</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>16</TableCell>
                <TableCell>35</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin B5 Pantothenic Acid</TableCell>
                <TableCell>6</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>6</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin B6 Pyridoxine</TableCell>
                <TableCell>1.4</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>1.4</TableCell>
                <TableCell>25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin B7 Biotin</TableCell>
                <TableCell>50</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell></TableCell>
                <TableCell>0.05</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin B9 Folic Acid</TableCell>
                <TableCell>200</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell></TableCell>
                <TableCell>0.2</TableCell>
                <TableCell>1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin B12 Cobalamin</TableCell>
                <TableCell>2.5</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell></TableCell>
                <TableCell>0.0025</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vitamin C Ascorbic Acid</TableCell>
                <TableCell>80</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>80</TableCell>
                <TableCell>2000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Minerals Table */}
        <Typography
          variant="h6"
          component="h4"
          sx={{ mb: 2, fontWeight: "bold", color: "#555" }}
        >
          Minerals
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ mb: 6, boxShadow: 2, overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Nutrient</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>EU NRV</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Units (mg or mcg)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>IU</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Standardised Units (mg)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Tolerable Upper Intake Level (UL) mg
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Calcium</TableCell>
                <TableCell>800</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>800</TableCell>
                <TableCell>2500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Chloride</TableCell>
                <TableCell>800</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>800</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Chromium</TableCell>
                <TableCell>40</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell></TableCell>
                <TableCell>0.04</TableCell>
                <TableCell>0.2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Copper</TableCell>
                <TableCell>5</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>1</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fluoride</TableCell>
                <TableCell>3.5</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>3.5</TableCell>
                <TableCell>7</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Iodine</TableCell>
                <TableCell>150</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell></TableCell>
                <TableCell>0.15</TableCell>
                <TableCell>0.6</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Iron</TableCell>
                <TableCell>14</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>14</TableCell>
                <TableCell>45</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Magnesium</TableCell>
                <TableCell>375</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>375</TableCell>
                <TableCell>450</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Manganese</TableCell>
                <TableCell>2</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>2</TableCell>
                <TableCell>11</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Molybdenum</TableCell>
                <TableCell>50</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell></TableCell>
                <TableCell>0.05</TableCell>
                <TableCell>0.6</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phosphorus</TableCell>
                <TableCell>700</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>700</TableCell>
                <TableCell>4000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Potassium</TableCell>
                <TableCell>2000</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>2000</TableCell>
                <TableCell>n/a</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Selenium</TableCell>
                <TableCell>55</TableCell>
                <TableCell>mcg</TableCell>
                <TableCell></TableCell>
                <TableCell>0.055</TableCell>
                <TableCell>0.3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Zinc</TableCell>
                <TableCell>10</TableCell>
                <TableCell>mg</TableCell>
                <TableCell></TableCell>
                <TableCell>10</TableCell>
                <TableCell>40</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Energy and Macronutrients Table */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Daily Reference Intakes for Energy and selected nutrients other than
          Vitamins and Minerals (Adults)
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 6, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Energy or Nutrient
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Reference Intake
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Energy</TableCell>
                <TableCell>2000 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Energy</TableCell>
                <TableCell>8400 kJ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total fat</TableCell>
                <TableCell>70 g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Saturates</TableCell>
                <TableCell>20 g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carbohydrate</TableCell>
                <TableCell>260 g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sugars</TableCell>
                <TableCell>90 g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Protein</TableCell>
                <TableCell>50 g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Salt</TableCell>
                <TableCell>6 g</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Conversion Factors Table */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Conversion factors for the calculation of Energy
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 6, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Nutrient</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Energy per g</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Carbohydrate (except polyols)</TableCell>
                <TableCell>17 kJ / 4 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Polyols</TableCell>
                <TableCell>10 kJ / 2.4 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Protein</TableCell>
                <TableCell>17 kJ / 4 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fat</TableCell>
                <TableCell>37 kJ / 9 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Salatrims</TableCell>
                <TableCell>25 kJ / 6 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alcohol (Ethanol)</TableCell>
                <TableCell>29 kJ / 7 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Organic acid</TableCell>
                <TableCell>13 kJ / 3 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fibre</TableCell>
                <TableCell>8 kJ / 2 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Erythritol</TableCell>
                <TableCell>0 kJ / 0 kcal</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pregnancy Section */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 6 }}
        >
          Navigating Nutrient Needs: A Guide to Vitamin and Mineral Safety in
          Pregnancy in Europe
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          Ensuring adequate nutrition is paramount during pregnancy for the
          health of both mother and child. While meeting dietary requirements is
          crucial, it is equally important to be aware of the upper safe limits
          of vitamins and minerals to avoid potential harm. In Europe, the
          European Food Safety Authority (EFSA) provides guidance on these
          limits.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          Below is a comprehensive table detailing the EU Nutrient Reference
          Values (NRV) for the general adult population, alongside the Tolerable
          Upper Intake Levels (UL) established by EFSA that are applicable to
          expectant mothers. It is important to note that the NRV is the daily
          amount considered sufficient to meet the needs of an average healthy
          person, while the UL is the maximum daily intake unlikely to pose a
          risk of adverse health effects.
        </Typography>

        {/* Key Recommendations */}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold", color: "#333", mt: 4 }}
        >
          Key Recommendations for Pregnancy:
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            <strong>Folic Acid:</strong> Supplementation is crucial. It is
            recommended to take 400 µg of folic acid daily before conception and
            until the 12th week of pregnancy to reduce the risk of neural tube
            defects. In some cases, a higher dose may be prescribed.
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            <strong>Vitamin D:</strong> A daily supplement of 10 µg is
            recommended throughout pregnancy and breastfeeding, as it is
            difficult to obtain sufficient amounts from diet and sunlight alone.
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            <strong>Vitamin A (Retinol):</strong> High doses of Vitamin A can be
            teratogenic (cause birth defects). Therefore, pregnant individuals
            should avoid supplements containing high levels of vitamin A and
            limit consumption of liver and liver products. The UL for preformed
            Vitamin A (retinol) should be carefully observed.
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "#666", lineHeight: 1.6 }}
          >
            <strong>Iron:</strong> While essential, the need for iron increases
            significantly during pregnancy and postnatally. However, any
            high-dose supplementation should only be taken under medical
            supervision, as excessive iron can cause gastrointestinal issues.
          </Typography>
        </Box>

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
