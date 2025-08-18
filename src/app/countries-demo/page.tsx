"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Search, Public, Phone, LocationOn } from "@mui/icons-material";
import { countriesHandler } from "@/api/handlers/countriesHandler";
import CountrySelect from "@/components/CountrySelect";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import type { Country } from "@/api/services/countries";

const CountriesDemoPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const countriesData = await countriesHandler.getCountries();
        setCountries(countriesData);
        setFilteredCountries(countriesData);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.continent.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.currency.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchQuery, countries]);

  const handlePhoneChange = (
    number: string,
    countryCode: string,
    code: string
  ) => {
    setPhoneNumber(number);
    setPhoneCountryCode(countryCode);
    setPhoneCode(code);
  };

  const continents = Array.from(
    new Set(countries.map((c) => c.continent))
  ).sort();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, color: "#333" }}>
        Countries API Demo
      </Typography>

      {/* API Status */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body2">
          <strong>API Endpoint:</strong> /public/constants/countries
          <br />
          <strong>Total Countries:</strong> {countries.length}
          <br />
          <strong>Continents:</strong> {continents.join(", ")}
        </Typography>
      </Alert>

      {/* Component Demos */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Country Select Demo */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Public sx={{ color: "#ff6b35" }} />
                Country Select Component
              </Typography>
              <CountrySelect
                value={selectedCountry}
                onChange={setSelectedCountry}
                label="Select Country"
                placeholder="Choose a country"
                showPhoneCode={true}
                showCurrency={true}
                showContinent={true}
              />
              {selectedCountry && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Selected: {selectedCountry}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Phone Number Input Demo */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Phone sx={{ color: "#ff6b35" }} />
                Phone Number Input Component
              </Typography>
              <PhoneNumberInput
                value={phoneNumber}
                onChange={handlePhoneChange}
                label="Phone Number"
                placeholder="Enter phone number"
                defaultCountryCode="IN"
              />
              {phoneNumber && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Number: {phoneCode} {phoneNumber}
                    <br />
                    Country Code: {phoneCountryCode}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Search sx={{ color: "#ff6b35" }} />
            Search & Filter Countries
          </Typography>
          <TextField
            fullWidth
            placeholder="Search countries by name, continent, or currency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: "#666" }} />,
            }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {continents.map((continent) => (
              <Chip
                key={continent}
                label={continent}
                onClick={() => setSearchQuery(continent)}
                variant={searchQuery === continent ? "filled" : "outlined"}
                color={searchQuery === continent ? "primary" : "default"}
                sx={{
                  "&.MuiChip-filled": {
                    backgroundColor: "#ff6b35",
                    color: "white",
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Countries List */}
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
          >
            <LocationOn sx={{ color: "#ff6b35" }} />
            Countries List ({filteredCountries.length} results)
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredCountries.map((country) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={country.countryCode}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Typography sx={{ fontSize: "1.5rem" }}>
                          {country.emoji}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {country.name}
                        </Typography>
                      </Box>

                      <Typography
                        variant="caption"
                        sx={{ color: "#666", display: "block", mb: 1 }}
                      >
                        {country.continent}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        <Chip
                          label={country.phoneCode}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: "0.7rem", height: 20 }}
                        />
                        <Chip
                          label={country.currency}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: "0.7rem", height: 20 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {filteredCountries.length === 0 && !loading && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                No countries found matching your search criteria.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default CountriesDemoPage;
