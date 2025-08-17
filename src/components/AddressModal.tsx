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
} from "@mui/material";
import { Close } from "@mui/icons-material";
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
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h6" component="div">
          {isEditing ? "Edit Address" : "Add New Address"}
        </Typography>
        <Button
          onClick={onClose}
          sx={{
            minWidth: "auto",
            p: 1,
            color: "text.secondary",
          }}
        >
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent dividers>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Address Type */}
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{ mb: 1, fontSize: "0.875rem", fontWeight: 500 }}
            >
              Address Type
            </FormLabel>
            <RadioGroup
              row
              value={formData.type}
              onChange={(e) =>
                handleInputChange(
                  "type",
                  e.target.value as "home" | "work" | "other"
                )
              }
            >
              <FormControlLabel
                value="home"
                control={<Radio size="small" />}
                label="Home"
              />
              <FormControlLabel
                value="work"
                control={<Radio size="small" />}
                label="Work"
              />
              <FormControlLabel
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          {/* Street Address */}
          <TextField
            label="Street Address"
            value={formData.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
            error={!!errors.street}
            helperText={errors.street}
            fullWidth
            size="small"
            required
          />

          {/* City and State */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="City"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              error={!!errors.city}
              helperText={errors.city}
              size="small"
              required
            />
            <TextField
              label="State"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              error={!!errors.state}
              helperText={errors.state}
              size="small"
              required
            />
          </Box>

          {/* Country and ZIP Code */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              error={!!errors.country}
              helperText={errors.country}
              size="small"
              required
            />
            <TextField
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              size="small"
              required
            />
          </Box>

          {/* Default Address Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isDefault}
                onChange={(e) =>
                  handleInputChange("isDefault", e.target.checked)
                }
                size="small"
              />
            }
            label="Set as default address"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            minWidth: 100,
            backgroundColor: "#ff6b35",
            "&:hover": {
              backgroundColor: "#e55a2b",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : isEditing ? (
            "Update"
          ) : (
            "Add"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
