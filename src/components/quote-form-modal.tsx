"use client"
import type React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  IconButton,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material"
import { Close } from "@mui/icons-material"
import { useSubmitRFQ } from "../api/handlers/rfqHandler"
import type { RFQRequest } from "../api/services/rfq"

interface QuoteFormModalProps {
  isOpen: boolean
  onClose: () => void
  productName?: string
  productId?: string
}

interface FormData {
  customerName: string
  customerEmail: string
  customerPhone: string
  customerPhoneCountryCode: string
  productName: string
  quantity: number
  companyWebsiteLink: string
  department: string
  companyType: string
  monthlyVolume: string
  timeline: string
  availabilityDay: string
  availabilityTime: string
}

interface FormErrors {
  [key: string]: string
}

const QuoteFormModal: React.FC<QuoteFormModalProps> = ({ isOpen, onClose, productName = "", productId = "" }) => {
  const submitRFQMutation = useSubmitRFQ()

  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerPhoneCountryCode: "+1",
    productName: productName || "Organic Mucuna pruriens Powder",
    quantity: 1,
    companyWebsiteLink: "",
    department: "",
    companyType: "",
    monthlyVolume: "",
    timeline: "",
    availabilityDay: "",
    availabilityTime: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuccess, setShowSuccess] = useState(false)

  // Update product name when prop changes
  useEffect(() => {
    if (productName) {
      setFormData((prev) => ({ ...prev, productName }))
    }
  }, [productName])

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required field validation
    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required"
    if (!formData.customerEmail.trim()) newErrors.customerEmail = "Email is required"
    if (!formData.customerPhone.trim()) newErrors.customerPhone = "Phone number is required"
    if (!formData.productName.trim()) newErrors.productName = "Product name is required"
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Valid quantity is required"
    if (!formData.department) newErrors.department = "Department is required"
    if (!formData.monthlyVolume) newErrors.monthlyVolume = "Monthly volume is required"
    if (!formData.timeline) newErrors.timeline = "Timeline is required"

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.customerEmail && !emailRegex.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const mapFormDataToRFQ = (data: FormData): RFQRequest => {
    // Map timeline to urgency
    const getUrgency = (timeline: string): "low" | "medium" | "high" => {
      switch (timeline) {
        case "immediate":
        case "1-week":
          return "high"
        case "1-month":
          return "medium"
        case "3-months":
        default:
          return "low"
      }
    }

    // Create description from monthly volume and company type
    const description = `Monthly Volume: ${data.monthlyVolume}${
      data.companyType ? `, Company Type: ${data.companyType}` : ""
    }`

    return {
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerPhoneCountryCode: data.customerPhoneCountryCode,
      productId: productId || undefined,
      productName: data.productName,
      quantity: data.quantity,
      description,
      urgency: getUrgency(data.timeline),
      status: "pending",
      companyWebsiteLink: data.companyWebsiteLink || undefined,
      department: data.department,
      availabilityDay: data.availabilityDay || undefined,
      availabilityTime: data.availabilityTime || undefined,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const rfqData = mapFormDataToRFQ(formData)
      await submitRFQMutation.mutateAsync(rfqData)

      // Reset form and show success
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        customerPhoneCountryCode: "+1",
        productName: productName || "Organic Mucuna pruriens Powder",
        quantity: 1,
        companyWebsiteLink: "",
        department: "",
        companyType: "",
        monthlyVolume: "",
        timeline: "",
        availabilityDay: "",
        availabilityTime: "",
      })
      setShowSuccess(true)

      // Auto-close after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Failed to submit RFQ:", error)
    }
  }

  const handleClose = () => {
    setShowSuccess(false)
    setErrors({})
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "600px",
          maxWidth: "90vw",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ p: 3, pb: 2, position: "relative" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#333",
              fontSize: "18px",
              mb: 0,
            }}
          >
            Tell Us Your Requirement
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "#999",
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            <Close sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Success Message */}
        {showSuccess && (
          <Box sx={{ px: 3, pb: 2 }}>
            <Alert severity="success" sx={{ borderRadius: "6px" }}>
              Your quote request has been submitted successfully! We will get back to you soon.
            </Alert>
          </Box>
        )}

        {/* Error Message */}
        {submitRFQMutation.isError && (
          <Box sx={{ px: 3, pb: 2 }}>
            <Alert severity="error" sx={{ borderRadius: "6px" }}>
              Failed to submit quote request. Please try again.
            </Alert>
          </Box>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ px: 3, pb: 3 }}>
          {/* Customer Name - Full Width */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#333",
                mb: 1,
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#ff4444" }}>*</span> Customer Name
            </Typography>
            <TextField
              fullWidth
              required
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              error={!!errors.customerName}
              helperText={errors.customerName}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "45px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ccc",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4CAF50",
                    borderWidth: "1px",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                },
              }}
            />
          </Box>

          {/* Enter Product - Full Width */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#333",
                mb: 1,
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#ff4444" }}>*</span> Enter Product
            </Typography>
            <TextField
              fullWidth
              required
              value={formData.productName}
              onChange={(e) => handleInputChange("productName", e.target.value)}
              error={!!errors.productName}
              helperText={errors.productName}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "45px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ccc",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4CAF50",
                    borderWidth: "1px",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                },
              }}
            />
          </Box>

          {/* Pack Quantity and Company Website - Side by Side */}
          <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Pack Quantity
              </Typography>
              <TextField
                fullWidth
                required
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", Number.parseInt(e.target.value) || 1)}
                error={!!errors.quantity}
                helperText={errors.quantity}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px 14px",
                  },
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                Company Website Link
              </Typography>
              <TextField
                fullWidth
                placeholder="Ex. www.example.com"
                value={formData.companyWebsiteLink}
                onChange={(e) => handleInputChange("companyWebsiteLink", e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px 14px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#999",
                    opacity: 1,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Email and Mobile - Side by Side */}
          <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Email
              </Typography>
              <TextField
                fullWidth
                required
                type="email"
                placeholder="Ex. user@example.com"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                error={!!errors.customerEmail}
                helperText={errors.customerEmail}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px 14px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#999",
                    opacity: 1,
                  },
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Mobile
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <FormControl sx={{ minWidth: "80px" }}>
                  <Select
                    value={formData.customerPhoneCountryCode}
                    onChange={(e) => handleInputChange("customerPhoneCountryCode", e.target.value)}
                    variant="outlined"
                    sx={{
                      height: "45px",
                      fontSize: "14px",
                      borderRadius: "6px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4CAF50",
                        borderWidth: "1px",
                      },
                      "& .MuiSelect-select": {
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                  >
                    <MenuItem value="+1">🇺🇸 +1</MenuItem>
                    <MenuItem value="+44">🇬🇧 +44</MenuItem>
                    <MenuItem value="+91">🇮🇳 +91</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  required
                  placeholder="345446645"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                  error={!!errors.customerPhone}
                  helperText={errors.customerPhone}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "45px",
                      fontSize: "14px",
                      borderRadius: "6px",
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px 14px",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#999",
                      opacity: 1,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Department and Company Type - Side by Side */}
          <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Department
              </Typography>
              <FormControl fullWidth required>
                <Select
                  displayEmpty
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  error={!!errors.department}
                  variant="outlined"
                  sx={{
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-select": {
                      padding: "12px 14px",
                      color: "#999",
                    },
                    "& .MuiSelect-icon": {
                      color: "#999",
                    },
                  }}
                  renderValue={(value) => {
                    if (!value) {
                      return "Please Select a Department"
                    }
                    return value as string
                  }}
                >
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="procurement">Procurement</MenuItem>
                  <MenuItem value="operations">Operations</MenuItem>
                </Select>
              </FormControl>
              {errors.department && (
                <Typography sx={{ color: "#d32f2f", fontSize: "12px", mt: 0.5 }}>{errors.department}</Typography>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                Company Type
              </Typography>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={formData.companyType}
                  onChange={(e) => handleInputChange("companyType", e.target.value)}
                  variant="outlined"
                  sx={{
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-select": {
                      padding: "12px 14px",
                      color: "#999",
                    },
                    "& .MuiSelect-icon": {
                      color: "#999",
                    },
                  }}
                  renderValue={(value) => {
                    if (!value) {
                      return "Please Select a Type"
                    }
                    return value as string
                  }}
                >
                  <MenuItem value="manufacturer">Manufacturer</MenuItem>
                  <MenuItem value="distributor">Distributor</MenuItem>
                  <MenuItem value="retailer">Retailer</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Monthly Volume and Timeline - Side by Side */}
          <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Monthly Volume
              </Typography>
              <FormControl fullWidth required>
                <Select
                  displayEmpty
                  value={formData.monthlyVolume}
                  onChange={(e) => handleInputChange("monthlyVolume", e.target.value)}
                  error={!!errors.monthlyVolume}
                  variant="outlined"
                  sx={{
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-select": {
                      padding: "12px 14px",
                      color: "#999",
                    },
                    "& .MuiSelect-icon": {
                      color: "#999",
                    },
                  }}
                  renderValue={(value) => {
                    if (!value) {
                      return "Please Select a Volume"
                    }
                    return value as string
                  }}
                >
                  <MenuItem value="1-10">1-10 units</MenuItem>
                  <MenuItem value="11-50">11-50 units</MenuItem>
                  <MenuItem value="51-100">51-100 units</MenuItem>
                  <MenuItem value="100+">100+ units</MenuItem>
                </Select>
              </FormControl>
              {errors.monthlyVolume && (
                <Typography sx={{ color: "#d32f2f", fontSize: "12px", mt: 0.5 }}>{errors.monthlyVolume}</Typography>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#ff4444" }}>*</span> Timeline
              </Typography>
              <FormControl fullWidth required>
                <Select
                  displayEmpty
                  value={formData.timeline}
                  onChange={(e) => handleInputChange("timeline", e.target.value)}
                  error={!!errors.timeline}
                  variant="outlined"
                  sx={{
                    height: "45px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4CAF50",
                      borderWidth: "1px",
                    },
                    "& .MuiSelect-select": {
                      padding: "12px 14px",
                      color: "#999",
                    },
                    "& .MuiSelect-icon": {
                      color: "#999",
                    },
                  }}
                  renderValue={(value) => {
                    if (!value) {
                      return "Please Select a Timeline"
                    }
                    return value as string
                  }}
                >
                  <MenuItem value="immediate">Immediate</MenuItem>
                  <MenuItem value="1-week">Within 1 week</MenuItem>
                  <MenuItem value="1-month">Within 1 month</MenuItem>
                  <MenuItem value="3-months">Within 3 months</MenuItem>
                </Select>
              </FormControl>
              {errors.timeline && (
                <Typography sx={{ color: "#d32f2f", fontSize: "12px", mt: 0.5 }}>{errors.timeline}</Typography>
              )}
            </Box>
          </Box>

          {/* Call Availability Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#333",
                mb: 2,
                fontWeight: 500,
              }}
            >
              Would you be available for a call at your earliest convenience?
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#333",
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  Day
                </Typography>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    value={formData.availabilityDay}
                    onChange={(e) => handleInputChange("availabilityDay", e.target.value)}
                    variant="outlined"
                    sx={{
                      height: "45px",
                      fontSize: "14px",
                      borderRadius: "6px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4CAF50",
                        borderWidth: "1px",
                      },
                      "& .MuiSelect-select": {
                        padding: "12px 14px",
                        color: "#999",
                      },
                      "& .MuiSelect-icon": {
                        color: "#999",
                      },
                    }}
                    renderValue={(value) => {
                      if (!value) {
                        return "Please Select a Day"
                      }
                      return value as string
                    }}
                  >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="tomorrow">Tomorrow</MenuItem>
                    <MenuItem value="this-week">This Week</MenuItem>
                    <MenuItem value="next-week">Next Week</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#333",
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  Time (Timezone-EST)
                </Typography>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    value={formData.availabilityTime}
                    onChange={(e) => handleInputChange("availabilityTime", e.target.value)}
                    variant="outlined"
                    sx={{
                      height: "45px",
                      fontSize: "14px",
                      borderRadius: "6px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#4CAF50",
                        borderWidth: "1px",
                      },
                      "& .MuiSelect-select": {
                        padding: "12px 14px",
                        color: "#999",
                      },
                      "& .MuiSelect-icon": {
                        color: "#999",
                      },
                    }}
                    renderValue={(value) => {
                      if (!value) {
                        return "Please Select time"
                      }
                      return value as string
                    }}
                  >
                    <MenuItem value="9-10">9:00 AM - 10:00 AM</MenuItem>
                    <MenuItem value="10-11">10:00 AM - 11:00 AM</MenuItem>
                    <MenuItem value="11-12">11:00 AM - 12:00 PM</MenuItem>
                    <MenuItem value="2-3">2:00 PM - 3:00 PM</MenuItem>
                    <MenuItem value="3-4">3:00 PM - 4:00 PM</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={submitRFQMutation.isPending}
            sx={{
              bgcolor: "#F05A25",
              color: "white",
              height: "48px",
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: "6px",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#689F38",
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
              },
              "&:disabled": {
                bgcolor: "#ccc",
                color: "#666",
              },
            }}
          >
            {submitRFQMutation.isPending ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: "inherit" }} />
                Submitting...
              </>
            ) : (
              "Place an Enquiry"
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default QuoteFormModal
