"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material"
import { Close } from "@mui/icons-material"
import { useSubmitRFQ } from "@/api/handlers"

interface RFQModalProps {
  open: boolean
  onClose: () => void
  productId?: string
  productName?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

const RFQModal: React.FC<RFQModalProps> = ({ open, onClose, productId, productName = "", onSuccess, onError }) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [responseData, setResponseData] = useState<any>(null)
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
    additionalRequirements: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const submitRFQMutation = useSubmitRFQ()

  // Options for dropdowns
  const urgencyOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ]

  const departmentOptions = [
    { value: "R&D", label: "R&D" },
    { value: "Production", label: "Production" },
    { value: "Quality Control", label: "Quality Control" },
    { value: "Procurement", label: "Procurement" },
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Other", label: "Other" },
  ]

  const companyTypeOptions = [
    { value: "Manufacturer", label: "Manufacturer" },
    { value: "Distributor", label: "Distributor" },
    { value: "Retailer", label: "Retailer" },
    { value: "Research Institute", label: "Research Institute" },
    { value: "University", label: "University" },
    { value: "Other", label: "Other" },
  ]

  const monthlyVolumeOptions = [
    { value: "1-10kg", label: "1-10kg" },
    { value: "10-50kg", label: "10-50kg" },
    { value: "50-100kg", label: "50-100kg" },
    { value: "100-500kg", label: "100-500kg" },
    { value: "500kg+", label: "500kg+" },
  ]

  const timelineOptions = [
    { value: "1-2 weeks", label: "1-2 weeks" },
    { value: "2-4 weeks", label: "2-4 weeks" },
    { value: "1-2 months", label: "1-2 months" },
    { value: "2-3 months", label: "2-3 months" },
    { value: "3+ months", label: "3+ months" },
  ]

  const dayOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ]

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
  ]

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
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required"
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address"
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required"
    } else if (!/^[0-9]{10}$/.test(formData.customerPhone.replace(/\D/g, ""))) {
      newErrors.customerPhone = "Please enter a valid 10-digit phone number"
    }

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required"
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.department) {
      newErrors.department = "Department is required"
    }

    if (!formData.monthlyVolume) {
      newErrors.monthlyVolume = "Monthly volume is required"
    }

    if (!formData.timeline) {
      newErrors.timeline = "Timeline is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
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
        additionalRequirements: formData.additionalRequirements,
      }

      const response = await submitRFQMutation.mutateAsync(rfqData)

      if (response.success) {
        setResponseData(response.data)
        setSuccessModalOpen(true)
        onSuccess?.()
      } else {
        onError?.(response.message || "Failed to submit RFQ")
      }
    } catch (error) {
      onError?.("Failed to submit RFQ. Please try again.")
    }
  }

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false)
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
      additionalRequirements: "",
    })
    setErrors({})
    onClose()
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    return digits.slice(0, 10)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 0,
          boxShadow: "none",
          border: "1px solid #e0e0e0",
        },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, rgba(245, 138, 78, 1) 0%, rgba(241, 106, 60, 1) 100%)",
          color: "white",
          p: 3,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "24px" }}>
            Request for Quotation
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          Get a customized quote for your requirements
        </Typography>
      </Box>

      <DialogContent sx={{ p: 4, backgroundColor: "#fafafa" }}>
        {submitRFQMutation.isError && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 0 }}>
            Failed to submit RFQ. Please try again.
          </Alert>
        )}

        {submitRFQMutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 0 }}>
            RFQ submitted successfully! We'll get back to you soon.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Customer Name
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                error={!!errors.customerName}
                helperText={errors.customerName}
                placeholder="Enter your full name"
                sx={{
                  "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                  "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                  "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Email
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                error={!!errors.customerEmail}
                helperText={errors.customerEmail}
                placeholder="Enter your email"
                sx={{
                  "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                  "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                  "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Enter Product
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                value={formData.productName}
                onChange={(e) => handleInputChange("productName", e.target.value)}
                error={!!errors.productName}
                helperText={errors.productName}
                placeholder="Enter product name"
                sx={{
                  "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                  "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                  "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Mobile
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: "column", sm: "row" } }}>
                <FormControl sx={{ minWidth: { xs: "100%", sm: 120 } }}>
                  <Select
                    variant="standard"
                    value={formData.customerPhoneCountryCode}
                    onChange={(e) => handleInputChange("customerPhoneCountryCode", e.target.value)}
                    sx={{
                      "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                      "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                      "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                    }}
                  >
                    {countryCodeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  variant="standard"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange("customerPhone", formatPhoneNumber(e.target.value))}
                  error={!!errors.customerPhone}
                  helperText={errors.customerPhone}
                  placeholder="345446645"
                  sx={{
                    "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                    "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Pack Quantity
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", Number.parseInt(e.target.value) || 1)}
                error={!!errors.quantity}
                helperText={errors.quantity}
                InputProps={{ inputProps: { min: 1 } }}
                sx={{
                  "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                  "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                  "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                Company Website Link
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                value={formData.companyWebsiteLink}
                onChange={(e) => handleInputChange("companyWebsiteLink", e.target.value)}
                placeholder="Ex: www.example.com"
                sx={{
                  "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                  "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                  "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Department
              </Typography>
              <FormControl fullWidth error={!!errors.department}>
                <Select
                  variant="standard"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  sx={{
                    "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                    "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                  }}
                >
                  {departmentOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Company Type
              </Typography>
              <FormControl fullWidth error={!!errors.companyType}>
                <Select
                  variant="standard"
                  value={formData.companyType}
                  onChange={(e) => handleInputChange("companyType", e.target.value)}
                  sx={{
                    "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                    "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                  }}
                >
                  {companyTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Monthly Volume
              </Typography>
              <FormControl fullWidth error={!!errors.monthlyVolume}>
                <Select
                  variant="standard"
                  value={formData.monthlyVolume}
                  onChange={(e) => handleInputChange("monthlyVolume", e.target.value)}
                  sx={{
                    "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                    "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                  }}
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
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Timeline
              </Typography>
              <FormControl fullWidth error={!!errors.timeline}>
                <Select
                  variant="standard"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange("timeline", e.target.value)}
                  sx={{
                    "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                    "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                  }}
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
              </FormControl>
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
                  // background: "linear-gradient(135deg, rgba(245, 138, 78, 1) 0%, rgba(241, 106, 60, 1) 100%)",
                  // color: "black",
                  p: 2,
                  borderRadius: 0,
                }}
              >
                Would you be available for a call at your earliest convenience?
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>Day</Typography>
              <FormControl fullWidth>
                <Select
                  variant="standard"
                  value={formData.availabilityDay}
                  onChange={(e) => handleInputChange("availabilityDay", e.target.value)}
                  sx={{
                    "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                    "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                  }}
                >
                  <MenuItem value="">Please Select a Day</MenuItem>
                  {dayOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid >
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                Time (Timezone-EST)
              </Typography>
              <FormControl fullWidth>
                <Select
                  variant="standard"
                  value={formData.availabilityTime}
                  onChange={(e) => handleInputChange("availabilityTime", e.target.value)}
                  sx={{
                    "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                    "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                  }}
                >
                  <MenuItem value="">Please Select time</MenuItem>
                  {timeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid >
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                <span style={{ color: "#d32f2f" }}>*</span> Description
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Please describe your requirements in detail..."
                sx={{
                  "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                  "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                  "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#333", mb: 1 }}>
                Additional Requirements
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                multiline
                rows={4}
                value={formData.additionalRequirements}
                onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
                placeholder="Any specific requirements or details..."
                sx={{
                  "& .MuiInput-underline:before": { borderBottomColor: "#e0e0e0" },
                  "& .MuiInput-underline:hover:before": { borderBottomColor: "#333" },
                  "& .MuiInput-underline:after": { borderBottomColor: "#333" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitRFQMutation.isPending}
                  sx={{
                    background: "linear-gradient(135deg, rgba(245, 138, 78, 1) 0%, rgba(241, 106, 60, 1) 100%)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "16px",
                    padding: "12px 32px",
                    textTransform: "none",
                    minWidth: "200px",
                    border: "none",
                    "&:hover": {
                      background: "linear-gradient(135deg, rgba(245, 138, 78, 0.9) 0%, rgba(241, 106, 60, 0.9) 100%)",
                    },
                    "&:disabled": {
                      backgroundColor: "#ccc",
                      color: "#666",
                      background: "#ccc",
                    },
                  }}
                >
                  {submitRFQMutation.isPending ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: "white" }} />
                      <Typography>Submitting...</Typography>
                    </Box>
                  ) : (
                    "Submit RFQ"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          borderTop: "1px solid #e0e0e0",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px", color: "#666" }}>Your information is secure and confidential</Typography>
      </Box>
    </Dialog>
  )
}

export default RFQModal
