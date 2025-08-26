import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
  styled,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSubmitRFQ } from "@/api/handlers";
import RFQSuccessModal from "./RFQSuccessModal";

// Styled components for premium look
const PremiumTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "all 0.3s ease",
    minHeight: "56px",
    "& fieldset": {
      borderColor: "#e0e0e0",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "#ff6b35",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff6b35",
      borderWidth: "2px",
    },
  },
  "& .MuiInputBase-input": {
    padding: "16px 20px",
    fontSize: "14px",
    height: "24px",
    lineHeight: "24px",
  },
  "& .MuiInputBase-inputMultiline": {
    padding: "16px 20px",
    fontSize: "14px",
    minHeight: "120px",
    lineHeight: "1.5",
  },
}));

const PremiumSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "all 0.3s ease",
    minHeight: "56px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e0e0e0",
    borderWidth: "1px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff6b35",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff6b35",
    borderWidth: "2px",
  },
  "& .MuiSelect-select": {
    padding: "16px 20px",
    fontSize: "14px",
    height: "24px",
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
  },
}));

const PremiumFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "all 0.3s ease",
    minHeight: "56px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e0e0e0",
    borderWidth: "1px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff6b35",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff6b35",
    borderWidth: "2px",
  },
  "& .MuiSelect-select": {
    padding: "16px 20px",
    fontSize: "14px",
    height: "24px",
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
  },
}));

interface RFQModalProps {
  open: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const RFQModal: React.FC<RFQModalProps> = ({
  open,
  onClose,
  productId,
  productName = "",
  onSuccess,
  onError,
}) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerPhoneCountryCode: "+1",
    productName: productName,
    quantity: 1,
    description: "",
    urgency: "medium" as "low" | "medium" | "high",
    department: "",
    companyType: "",
    monthlyVolume: "",
    timeline: "",
    availabilityDay: "",
    availabilityTime: "",
    companyWebsiteLink: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitRFQMutation = useSubmitRFQ();

  // Options for dropdowns
  const urgencyOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const departmentOptions = [
    { value: "R&D", label: "R&D" },
    { value: "Production", label: "Production" },
    { value: "Quality Control", label: "Quality Control" },
    { value: "Procurement", label: "Procurement" },
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Other", label: "Other" },
  ];

  const companyTypeOptions = [
    { value: "Manufacturer", label: "Manufacturer" },
    { value: "Distributor", label: "Distributor" },
    { value: "Retailer", label: "Retailer" },
    { value: "Research Institute", label: "Research Institute" },
    { value: "University", label: "University" },
    { value: "Other", label: "Other" },
  ];

  const monthlyVolumeOptions = [
    { value: "1-10kg", label: "1-10kg" },
    { value: "10-50kg", label: "10-50kg" },
    { value: "50-100kg", label: "50-100kg" },
    { value: "100-500kg", label: "100-500kg" },
    { value: "500kg+", label: "500kg+" },
  ];

  const timelineOptions = [
    { value: "1-2 weeks", label: "1-2 weeks" },
    { value: "2-4 weeks", label: "2-4 weeks" },
    { value: "1-2 months", label: "1-2 months" },
    { value: "2-3 months", label: "2-3 months" },
    { value: "3+ months", label: "3+ months" },
  ];

  const dayOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const timeOptions = [
    { value: "9:00 AM", label: "9:00 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "1:00 PM", label: "1:00 PM" },
    { value: "2:00 PM", label: "2:00 PM" },
    { value: "3:00 PM", label: "3:00 PM" },
    { value: "4:00 PM", label: "4:00 PM" },
    { value: "5:00 PM", label: "5:00 PM" },
  ];

  const countryCodeOptions = [
    { value: "+1", label: "🇺🇸 +1" },
    { value: "+44", label: "🇬🇧 +44" },
    { value: "+91", label: "🇮🇳 +91" },
    { value: "+86", label: "🇨🇳 +86" },
    { value: "+81", label: "🇯🇵 +81" },
    { value: "+49", label: "🇩🇪 +49" },
    { value: "+33", label: "🇫🇷 +33" },
    { value: "+39", label: "🇮🇹 +39" },
    { value: "+34", label: "🇪🇸 +34" },
    { value: "+31", label: "🇳🇱 +31" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.customerPhone.replace(/\D/g, ""))) {
      newErrors.customerPhone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.monthlyVolume) {
      newErrors.monthlyVolume = "Monthly volume is required";
    }

    if (!formData.timeline) {
      newErrors.timeline = "Timeline is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const rfqData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        customerPhoneCountryCode: formData.customerPhoneCountryCode,
        productId: productId,
        productName: formData.productName,
        quantity: formData.quantity,
        description: formData.description,
        urgency: formData.urgency,
        status: "pending",
        department: formData.department,
        companyWebsiteLink: formData.companyWebsiteLink,
        availabilityDay: formData.availabilityDay,
        availabilityTime: formData.availabilityTime,
      };

      const response = await submitRFQMutation.mutateAsync(rfqData);

      if (response.success) {
        setResponseData(response.data);
        setSuccessModalOpen(true);
        onSuccess?.();
      } else {
        onError?.(response.message || "Failed to submit RFQ");
      }
    } catch (error) {
      onError?.("Failed to submit RFQ. Please try again.");
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    // Reset form
    setFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerPhoneCountryCode: "+1",
      productName: productName,
      quantity: 1,
      description: "",
      urgency: "medium",
      department: "",
      companyType: "",
      monthlyVolume: "",
      timeline: "",
      availabilityDay: "",
      availabilityTime: "",
      companyWebsiteLink: "",
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.slice(0, 10);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          maxHeight: "95vh",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      {/* Premium Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
          color: "white",
          p: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(50px, -50px)",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "20px", md: "24px" },
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Request for Quotation
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            Get a customized quote for your requirements
          </Typography>
        </Box>
      </Box>

      <DialogContent
        sx={{
          pt: 4,
          pb: 2,
          px: 4,
          background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)",
        }}
      >
        {submitRFQMutation.isError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: "12px",
              border: "1px solid #ffebee",
              "& .MuiAlert-icon": {
                color: "#d32f2f",
              },
            }}
          >
            Failed to submit RFQ. Please try again.
          </Alert>
        )}

        {submitRFQMutation.isSuccess && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: "12px",
              border: "1px solid #e8f5e8",
              "& .MuiAlert-icon": {
                color: "#2e7d32",
              },
            }}
          >
            Thank you! Your RFQ has been submitted successfully. We'll get back
            to you soon.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ maxHeight: "60vh", overflowY: "auto", pr: 1 }}>
            <Grid container spacing={3}>
              {/* Customer Name - Full Width */}
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#333",
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <span style={{ color: "#ff6b35", fontSize: "16px" }}>*</span>
                  Customer Name
                </Typography>
                <PremiumTextField
                  fullWidth
                  value={formData.customerName}
                  onChange={(e) =>
                    handleInputChange("customerName", e.target.value)
                  }
                  error={!!errors.customerName}
                  helperText={errors.customerName}
                  placeholder="Enter your full name"
                />
              </Grid>

              {/* Product Name - Full Width */}
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  <span style={{ color: "#d32f2f" }}>*</span> Enter Product
                </Typography>
                <PremiumTextField
                  value={formData.productName}
                  onChange={(e) =>
                    handleInputChange("productName", e.target.value)
                  }
                  error={!!errors.productName}
                  helperText={errors.productName}
                  placeholder="Enter product name"
                />
              </Grid>

              {/* Pack Quantity and Company Website Link */}
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  <span style={{ color: "#d32f2f" }}>*</span> Pack Quantity
                </Typography>
                <PremiumTextField
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", parseInt(e.target.value) || 1)
                  }
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  Company Website Link
                </Typography>
                <PremiumTextField
                  value={formData.companyWebsiteLink}
                  onChange={(e) =>
                    handleInputChange("companyWebsiteLink", e.target.value)
                  }
                  placeholder="Ex: www.example.com"
                />
              </Grid>

              {/* Email and Mobile */}
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  <span style={{ color: "#d32f2f" }}>*</span> Email
                </Typography>
                <PremiumTextField
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) =>
                    handleInputChange("customerEmail", e.target.value)
                  }
                  error={!!errors.customerEmail}
                  helperText={errors.customerEmail}
                  placeholder="Ex: user@example.com"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  <span style={{ color: "#d32f2f" }}>*</span> Mobile
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={formData.customerPhoneCountryCode}
                      onChange={(e) =>
                        handleInputChange(
                          "customerPhoneCountryCode",
                          e.target.value
                        )
                      }
                      sx={{
                        borderRadius: "12px",
                        backgroundColor: "white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        transition: "all 0.3s ease",
                        minHeight: "56px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                          borderWidth: "1px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ff6b35",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ff6b35",
                          borderWidth: "2px",
                        },
                        "& .MuiSelect-select": {
                          padding: "16px 20px",
                          fontSize: "14px",
                          height: "24px",
                          lineHeight: "24px",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        },
                      }}
                    >
                      {countryCodeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <PremiumTextField
                    value={formData.customerPhone}
                    onChange={(e) =>
                      handleInputChange(
                        "customerPhone",
                        formatPhoneNumber(e.target.value)
                      )
                    }
                    error={!!errors.customerPhone}
                    helperText={errors.customerPhone}
                    placeholder="345446645"
                  />
                </Box>
              </Grid>

              {/* Department and Company Type */}
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  <span style={{ color: "#d32f2f" }}>*</span> Department
                </Typography>
                <PremiumFormControl error={!!errors.department}>
                  <Select
                    value={formData.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Please Select a Department
                    </MenuItem>
                    {departmentOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.department && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        mt: 0.5,
                      }}
                    >
                      {errors.department}
                    </Typography>
                  )}
                </PremiumFormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  Company Type
                </Typography>
                <PremiumFormControl>
                  <Select
                    value={formData.companyType}
                    onChange={(e) =>
                      handleInputChange("companyType", e.target.value)
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Please Select a Type</MenuItem>
                    {companyTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </PremiumFormControl>
              </Grid>

              {/* Monthly Volume and Timeline */}
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  <span style={{ color: "#d32f2f" }}>*</span> Monthly Volume
                </Typography>
                <PremiumFormControl error={!!errors.monthlyVolume}>
                  <Select
                    value={formData.monthlyVolume}
                    onChange={(e) =>
                      handleInputChange("monthlyVolume", e.target.value)
                    }
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Please Select a Volume
                    </MenuItem>
                    {monthlyVolumeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.monthlyVolume && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        mt: 0.5,
                      }}
                    >
                      {errors.monthlyVolume}
                    </Typography>
                  )}
                </PremiumFormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  <span style={{ color: "#d32f2f" }}>*</span> Timeline
                </Typography>
                <PremiumFormControl error={!!errors.timeline}>
                  <Select
                    value={formData.timeline}
                    onChange={(e) =>
                      handleInputChange("timeline", e.target.value)
                    }
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Please Select a Timeline
                    </MenuItem>
                    {timelineOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.timeline && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        mt: 0.5,
                      }}
                    >
                      {errors.timeline}
                    </Typography>
                  )}
                </PremiumFormControl>
              </Grid>

              {/* Call Scheduling Section */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 2,
                    mt: 2,
                  }}
                >
                  Would you be available for a call at your earliest
                  convenience?
                </Typography>
              </Grid>

              {/* Day and Time */}
              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  Day
                </Typography>
                <PremiumFormControl>
                  <Select
                    value={formData.availabilityDay}
                    onChange={(e) =>
                      handleInputChange("availabilityDay", e.target.value)
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Please Select a Day</MenuItem>
                    {dayOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </PremiumFormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  Time (Timezone-EST)
                </Typography>
                <PremiumFormControl>
                  <Select
                    value={formData.availabilityTime}
                    onChange={(e) =>
                      handleInputChange("availabilityTime", e.target.value)
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Please Select time</MenuItem>
                    {timeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </PremiumFormControl>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    mb: 1,
                  }}
                >
                  <span style={{ color: "#d32f2f" }}>*</span> Description
                </Typography>
                <PremiumTextField
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  error={!!errors.description}
                  helperText={errors.description}
                  placeholder="Please describe your requirements in detail..."
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 4,
                    mb: 2,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitRFQMutation.isPending}
                    sx={{
                      background:
                        "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "16px",
                      padding: "16px 48px",
                      borderRadius: "50px",
                      textTransform: "none",
                      boxShadow: "0 8px 25px rgba(255, 107, 53, 0.3)",
                      minWidth: "200px",
                      height: "56px",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #e55a2b 0%, #e68a1a 100%)",
                        boxShadow: "0 12px 35px rgba(255, 107, 53, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                      },
                      "&:disabled": {
                        background:
                          "linear-gradient(135deg, #ccc 0%, #bbb 100%)",
                        color: "#666",
                        boxShadow: "none",
                        transform: "none",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s",
                      },
                      "&:hover::before": {
                        left: "100%",
                      },
                    }}
                  >
                    {submitRFQMutation.isPending ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CircularProgress size={20} sx={{ color: "white" }} />
                        <Typography sx={{ fontSize: "14px" }}>
                          Submitting...
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                          Submit RFQ
                        </Typography>
                        <Box sx={{ fontSize: "18px" }}>→</Box>
                      </Box>
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>

      {/* Premium Footer */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
          borderTop: "1px solid #e9ecef",
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            ✓
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Secure & Confidential
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#666",
              }}
            >
              Your information is protected
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            ⚡
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Fast Response
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#666",
              }}
            >
              Get quote within 24 hours
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Success Modal */}
      {responseData && (
        <RFQSuccessModal
          open={successModalOpen}
          onClose={handleSuccessModalClose}
          responseData={responseData}
        />
      )}
    </Dialog>
  );
};

export default RFQModal;
