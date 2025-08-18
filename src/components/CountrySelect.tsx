"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  CircularProgress,
  Typography,
  Chip,
} from "@mui/material";
import { countriesHandler } from "@/api/handlers/countriesHandler";
import type { Country } from "@/api/services/countries";

interface CountrySelectProps {
  value?: string;
  onChange?: (countryCode: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  showPhoneCode?: boolean;
  showCurrency?: boolean;
  showContinent?: boolean;
  filterByContinent?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  label = "Country",
  placeholder = "Select a country",
  required = false,
  error = false,
  helperText,
  disabled = false,
  fullWidth = true,
  size = "medium",
  showPhoneCode = false,
  showCurrency = false,
  showContinent = false,
  filterByContinent,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        let countriesData: Country[];

        if (filterByContinent) {
          countriesData = await countriesHandler.getCountriesByContinent(
            filterByContinent
          );
        } else {
          countriesData = await countriesHandler.getCountries();
        }

        setCountries(countriesData);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [filterByContinent]);

  useEffect(() => {
    if (value && countries.length > 0) {
      const country = countries.find((c) => c.countryCode === value);
      setSelectedCountry(country || null);
    } else {
      setSelectedCountry(null);
    }
  }, [value, countries]);

  const handleCountryChange = (event: any, newValue: Country | null) => {
    setSelectedCountry(newValue);
    if (onChange && newValue) {
      onChange(newValue.countryCode);
    } else if (onChange) {
      onChange("");
    }
  };

  const getOptionLabel = (option: Country) => {
    let label = `${option.emoji} ${option.name}`;

    if (showPhoneCode) {
      label += ` (${option.phoneCode})`;
    }

    if (showCurrency) {
      label += ` - ${option.currency}`;
    }

    if (showContinent) {
      label += ` [${option.continent}]`;
    }

    return label;
  };

  const renderOption = (props: any, option: Country) => (
    <Box component="li" {...props}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontSize: "1.2rem" }}>{option.emoji}</Typography>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {option.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
            {showPhoneCode && (
              <Chip
                label={option.phoneCode}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem", height: 20 }}
              />
            )}
            {showCurrency && (
              <Chip
                label={option.currency}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem", height: 20 }}
              />
            )}
            {showContinent && (
              <Chip
                label={option.continent}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem", height: 20 }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Autocomplete
      options={countries}
      value={selectedCountry}
      onChange={handleCountryChange}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      loading={loading}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      required={required}
      placeholder={placeholder}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      isOptionEqualToValue={(option, value) =>
        option.countryCode === value.countryCode
      }
      filterOptions={(options, { inputValue }) => {
        const filtered = options.filter(
          (option) =>
            option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            option.countryCode.toLowerCase().includes(inputValue.toLowerCase())
        );
        return filtered;
      }}
      noOptionsText="No countries found"
      loadingText="Loading countries..."
    />
  );
};

export default CountrySelect;
