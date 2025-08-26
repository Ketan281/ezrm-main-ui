import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useSubmitContactQuery } from "@/api/handlers";

interface ContactFormProps {
  source?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  source = "website",
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitQueryMutation = useSubmitContactQuery();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
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
      const response = await submitQueryMutation.mutateAsync({
        ...formData,
        source,
      });

      if (response.success) {
        setFormData({
          name: "",
          mobile: "",
          email: "",
          message: "",
        });
        onSuccess?.();
      } else {
        onError?.(response.message || "Failed to submit query");
      }
    } catch (error) {
      onError?.("Failed to submit query. Please try again.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatMobileNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Limit to 10 digits
    return digits.slice(0, 10);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #8B3E2F 0%, #A0522D 100%)",
        borderRadius: "12px",
        padding: { xs: "24px", md: "32px" },
        maxWidth: "500px",
        minWidth: { xs: "100%", sm: "400px" },
        width: "100%",
        boxShadow: "0 8px 32px rgba(139, 62, 47, 0.3)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "white",
          fontWeight: 600,
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        Contact Us
      </Typography>

      {submitQueryMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to submit query. Please try again.
        </Alert>
      )}

      {submitQueryMutation.isSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you! Your message has been sent successfully.
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Name Field */}
          <Box>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "14px",
                fontWeight: 500,
                mb: 1,
              }}
            >
              Name
            </Typography>
            <TextField
              fullWidth
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#ffcdd2",
                },
              }}
            />
          </Box>

          {/* Email Field */}
          <Box>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "14px",
                fontWeight: 500,
                mb: 1,
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#ffcdd2",
                },
              }}
            />
          </Box>

          {/* Mobile Field */}
          <Box>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "14px",
                fontWeight: 500,
                mb: 1,
              }}
            >
              Number
            </Typography>
            <TextField
              fullWidth
              value={formData.mobile}
              onChange={(e) =>
                handleInputChange("mobile", formatMobileNumber(e.target.value))
              }
              error={!!errors.mobile}
              helperText={errors.mobile}
              placeholder="9876501234"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#ffcdd2",
                },
              }}
            />
          </Box>

          {/* Message Field */}
          <Box>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "14px",
                fontWeight: 500,
                mb: 1,
              }}
            >
              Message
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              error={!!errors.message}
              helperText={errors.message}
              placeholder="Please describe your query in detail..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#ffcdd2",
                },
              }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={submitQueryMutation.isPending}
            sx={{
              backgroundColor: "white",
              color: "#8B3E2F",
              fontWeight: 600,
              fontSize: "16px",
              padding: "12px 24px",
              borderRadius: "25px",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              },
              "&:disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                color: "rgba(139, 62, 47, 0.5)",
              },
            }}
          >
            {submitQueryMutation.isPending ? (
              <CircularProgress size={20} sx={{ color: "#8B3E2F" }} />
            ) : (
              "Contact Us"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;
