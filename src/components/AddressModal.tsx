"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Checkbox,
  Alert,
  CircularProgress,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import { Close, Home, Work, LocationOn, Star } from "@mui/icons-material";
import type {
  CustomerAddress,
  AddAddressRequest,
  UpdateAddressRequest,
} from "@/api/services/customerAddress";

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    addressData: AddAddressRequest | UpdateAddressRequest
  ) => Promise<void>;
  editAddress?: CustomerAddress | null;
  loading?: boolean;
}

const AddressModal: React.FC<AddressModalProps> = ({
  open,
  onClose,
  onSave,
  editAddress,
  loading = false,
}) => {
  const [formData, setFormData] = useState<AddAddressRequest>({
    type: "home",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");

  useEffect(() => {
    if (editAddress) {
      setFormData({
        type: editAddress.type,
        street: editAddress.street,
        city: editAddress.city,
        state: editAddress.state,
        country: editAddress.country,
        zipCode: editAddress.zipCode,
        isDefault: editAddress.isDefault,
      });
    } else {
      setFormData({
        type: "home",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        isDefault: false,
      });
    }
    setErrors({});
    setSubmitError("");
  }, [editAddress, open]);

  const handleInputChange = (
    field: keyof AddAddressRequest,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5,6}$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = "ZIP code must be 5-6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitError("");
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving address:", error);
      setSubmitError("Failed to save address. Please try again.");
    }
  };

  const isEditing = !!editAddress;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 3,
          background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
          color: "white",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LocationOn sx={{ fontSize: 28 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {isEditing ? "Edit Address" : "Add New Address"}
          </Typography>
        </Box>
        <Button
          onClick={onClose}
          sx={{
            minWidth: "auto",
            p: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        {submitError && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {submitError}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Address Type Selection */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocationOn sx={{ color: "#ff6b35" }} />
              Address Type
            </Typography>
            <RadioGroup
              row
              value={formData.type}
              onChange={(e) =>
                handleInputChange(
                  "type",
                  e.target.value as "home" | "work" | "other"
                )
              }
              sx={{ gap: 2 }}
            >
              <FormControlLabel
                value="home"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#ff6b35",
                      "&.Mui-checked": {
                        color: "#ff6b35",
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Home sx={{ fontSize: 20, color: "#ff6b35" }} />
                    <Typography sx={{ fontWeight: 500 }}>Home</Typography>
                  </Box>
                }
                sx={{
                  border:
                    formData.type === "home"
                      ? "2px solid #ff6b35"
                      : "2px solid transparent",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor:
                    formData.type === "home"
                      ? "rgba(255, 107, 53, 0.05)"
                      : "transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 107, 53, 0.05)",
                  },
                }}
              />
              <FormControlLabel
                value="work"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#ff6b35",
                      "&.Mui-checked": {
                        color: "#ff6b35",
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Work sx={{ fontSize: 20, color: "#ff6b35" }} />
                    <Typography sx={{ fontWeight: 500 }}>Work</Typography>
                  </Box>
                }
                sx={{
                  border:
                    formData.type === "work"
                      ? "2px solid #ff6b35"
                      : "2px solid transparent",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor:
                    formData.type === "work"
                      ? "rgba(255, 107, 53, 0.05)"
                      : "transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 107, 53, 0.05)",
                  },
                }}
              />
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#ff6b35",
                      "&.Mui-checked": {
                        color: "#ff6b35",
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOn sx={{ fontSize: 20, color: "#ff6b35" }} />
                    <Typography sx={{ fontWeight: 500 }}>Other</Typography>
                  </Box>
                }
                sx={{
                  border:
                    formData.type === "other"
                      ? "2px solid #ff6b35"
                      : "2px solid transparent",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor:
                    formData.type === "other"
                      ? "rgba(255, 107, 53, 0.05)"
                      : "transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 107, 53, 0.05)",
                  },
                }}
              />
            </RadioGroup>
          </Paper>

          {/* Address Details */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocationOn sx={{ color: "#ff6b35" }} />
              Address Details
            </Typography>

            {/* Street Address */}
            <TextField
              label="Street Address"
              value={formData.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
              error={!!errors.street}
              helperText={errors.street}
              fullWidth
              size="medium"
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
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

            {/* City and State */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                mb: 3,
              }}
            >
              <TextField
                label="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                error={!!errors.city}
                helperText={errors.city}
                size="medium"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
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
              <TextField
                label="State"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                error={!!errors.state}
                helperText={errors.state}
                size="medium"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
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
            </Box>

            {/* Country and ZIP Code */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
            >
              <TextField
                label="Country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                error={!!errors.country}
                helperText={errors.country}
                size="medium"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
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
              <TextField
                label="ZIP Code"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                error={!!errors.zipCode}
                helperText={errors.zipCode}
                size="medium"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
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
            </Box>
          </Paper>

          {/* Default Address Setting */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isDefault}
                  onChange={(e) =>
                    handleInputChange("isDefault", e.target.checked)
                  }
                  size="medium"
                  sx={{
                    color: "#ff6b35",
                    "&.Mui-checked": {
                      color: "#ff6b35",
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Star sx={{ color: "#ff6b35" }} />
                  <Typography sx={{ fontWeight: 500, color: "#333" }}>
                    Set as default address
                  </Typography>
                  {formData.isDefault && (
                    <Chip
                      label="Default"
                      size="small"
                      sx={{
                        backgroundColor: "#ff6b35",
                        color: "white",
                        fontSize: "0.7rem",
                        height: 20,
                        fontWeight: 500,
                      }}
                    />
                  )}
                </Box>
              }
            />
            <Typography variant="body2" sx={{ color: "#666", mt: 1, ml: 4 }}>
              This address will be used as the default for shipping and billing
            </Typography>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 4, pt: 2, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{
            borderColor: "#e0e0e0",
            color: "#666",
            "&:hover": {
              borderColor: "#c0c0c0",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            minWidth: 120,
            backgroundColor: "#ff6b35",
            "&:hover": {
              backgroundColor: "#e55a2b",
            },
            fontWeight: 600,
            textTransform: "none",
            px: 3,
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : isEditing ? (
            "Update Address"
          ) : (
            "Add Address"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
