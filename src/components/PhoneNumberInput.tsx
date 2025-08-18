"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { countriesHandler } from "@/api/handlers/countriesHandler";
import type { Country } from "@/api/services/countries";

interface PhoneNumberInputProps {
  value?: string;
  onChange?: (
    phoneNumber: string,
    countryCode: string,
    phoneCode: string
  ) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  defaultCountryCode?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value = "",
  onChange,
  label = "Phone Number",
  placeholder = "Enter phone number",
  required = false,
  error = false,
  helperText,
  disabled = false,
  fullWidth = true,
  size = "medium",
  defaultCountryCode = "IN", // Default to India
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const countriesData = await countriesHandler.getCountries();
        setCountries(countriesData);

        // Set default country
        const defaultCountry = countriesData.find(
          (c) => c.countryCode === defaultCountryCode
        );
        if (defaultCountry) {
          setSelectedCountry(defaultCountry);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [defaultCountryCode]);

  useEffect(() => {
    setPhoneNumber(value);
  }, [value]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setAnchorEl(null);
    setSearchQuery("");

    if (onChange) {
      onChange(phoneNumber, country.countryCode, country.phoneCode);
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPhoneNumber = event.target.value;
    setPhoneNumber(newPhoneNumber);

    if (onChange && selectedCountry) {
      onChange(
        newPhoneNumber,
        selectedCountry.countryCode,
        selectedCountry.phoneCode
      );
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSearchQuery("");
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.phoneCode.includes(searchQuery) ||
      country.countryCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        helperText={helperText}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                onClick={handleMenuOpen}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#f8f9fa",
                  "&:hover": {
                    backgroundColor: "#e9ecef",
                  },
                  minWidth: 80,
                }}
              >
                {loading ? (
                  <CircularProgress size={16} />
                ) : selectedCountry ? (
                  <>
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      {selectedCountry.emoji}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "#666",
                      }}
                    >
                      {selectedCountry.phoneCode}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    +1
                  </Typography>
                )}
                <KeyboardArrowDown sx={{ fontSize: 16, color: "#666" }} />
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor: "#c0c0c0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ff6b35",
            },
          },
        }}
      />

      {/* Country Selection Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            maxHeight: 400,
            width: 300,
          },
        }}
      >
        {/* Search Input */}
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <TextField
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "0.9rem",
              },
            }}
          />
        </Box>

        {/* Country List */}
        {filteredCountries.map((country) => (
          <MenuItem
            key={country.countryCode}
            onClick={() => handleCountrySelect(country)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 1.5,
              px: 2,
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>{country.emoji}</Typography>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {country.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "#666" }}>
                {country.continent}
              </Typography>
            </Box>
            <Chip
              label={country.phoneCode}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                height: 20,
                borderColor: "#ff6b35",
                color: "#ff6b35",
              }}
            />
          </MenuItem>
        ))}

        {filteredCountries.length === 0 && (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#666" }}>
              No countries found
            </Typography>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default PhoneNumberInput;
