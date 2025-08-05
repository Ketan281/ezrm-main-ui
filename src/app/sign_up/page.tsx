"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useInitiateSignup, useVerifyOtp, useCompleteSignup } from "@/api/handlers"

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7A59",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

type SignupStep = "email" | "otp" | "details" | "success"

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<SignupStep>("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [emailError, setEmailError] = useState("")
  const [otpError, setOtpError] = useState("")

  // Form data for complete signup
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    industry: "",
    website: "",
    employeeCount: 0,
    annualRevenue: "",
    businessType: "",
    taxId: "",
    registrationNumber: "",
    contactPerson: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    notes: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // API hooks
  const initiateSignupMutation = useInitiateSignup()
  const verifyOtpMutation = useVerifyOtp()
  const completeSignupMutation = useCompleteSignup()

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const publicDomains = [
      // "gmail.com",
      // "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "icloud.com",
      "live.com",
      "msn.com",
      "rediffmail.com",
    ]

    if (!email) {
      return "Email is required"
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address"
    }
    const domain = email.split("@")[1]?.toLowerCase()
    if (publicDomains.includes(domain)) {
      return "Public email domains are not allowed. Please enter a valid company email address."
    }
    return ""
  }

  // Handle email submission
  const handleEmailSubmit = async () => {
    const error = validateEmail(email)
    setEmailError(error)

    if (!error) {
      try {
        await initiateSignupMutation.mutateAsync({ email })
        setCurrentStep("otp")
      } catch (error) {
        console.error("Email submission failed:", error)
      }
    }
  }

  // Handle OTP verification
  const handleOtpSubmit = async () => {
    if (!otp) {
      setOtpError("OTP is required")
      return
    }
    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits")
      return
    }

    try {
      await verifyOtpMutation.mutateAsync({ email, otp })
      setCurrentStep("details")
      setOtpError("")
    } catch (error) {
      console.error("OTP verification failed:", error)
    }
  }

  // Validate form data
  const validateFormData = () => {
    const errors: Record<string, string> = {}

    if (!formData.name) errors.name = "Name is required"
    if (!formData.phone) errors.phone = "Phone is required"
    if (!formData.companyName) errors.companyName = "Company name is required"
    if (!formData.industry) errors.industry = "Industry is required"
    if (!formData.contactPerson) errors.contactPerson = "Contact person is required"
    if (!formData.contactPersonPhone) errors.contactPersonPhone = "Contact person phone is required"
    if (!formData.contactPersonEmail) errors.contactPersonEmail = "Contact person email is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle complete signup
  const handleCompleteSignup = async () => {
    if (!validateFormData()) {
      return
    }

    try {
      await completeSignupMutation.mutateAsync({
        email,
        ...formData,
      })
      setCurrentStep("success")
    } catch (error) {
      console.error("Complete signup failed:", error)
    }
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const renderEmailStep = () => (
    <>
      <Typography
        sx={{
          fontWeight: 600,
          color: "#333",
          mb: 1,
          fontSize: "20px",
        }}
      >
        Buyer Registration
      </Typography>
      <Box sx={{ width: "100%", maxWidth: "500px" }}>
        <Typography
          sx={{
            color: "rgba(90, 96, 127, 1)",
            mt: 4,
            mb: 2,
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          Step 1 : Provide your Email ID
        </Typography>

        {initiateSignupMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {initiateSignupMutation.error instanceof Error
              ? initiateSignupMutation.error.message
              : "Failed to send verification email"}
          </Alert>
        )}

        <TextField
          fullWidth
          placeholder="Email"
          variant="standard"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (emailError) {
              setEmailError("")
            }
          }}
          error={!!emailError}
          disabled={initiateSignupMutation.isPending}
          sx={{
            mb: emailError ? 1 : 4,
            "& .MuiInput-underline:before": {
              borderBottomColor: emailError ? "#f44336" : "#e0e0e0",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: emailError ? "#f44336" : "#FF7A59",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: emailError ? "#f44336" : "#FF7A59",
            },
            "& .MuiInputBase-input": {
              padding: "12px 0",
              fontSize: "1rem",
              color: "#333",
              "&::placeholder": {
                color: "#999",
                opacity: 1,
              },
            },
          }}
        />
        {emailError && (
          <Typography
            sx={{
              color: "#f44336",
              fontSize: "12px",
              mb: 3,
              textAlign: "left",
              width: "100%",
            }}
          >
            {emailError}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={handleEmailSubmit}
          disabled={initiateSignupMutation.isPending}
          sx={{
            backgroundColor: "#FF7A59",
            color: "white",
            py: 1.8,
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: 500,
            textTransform: "none",
            mb: 2,
            maxWidth: "500px",
            "&:hover": {
              backgroundColor: "#FF5722",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
            },
          }}
        >
          {initiateSignupMutation.isPending ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Sending...
            </Box>
          ) : (
            "Submit"
          )}
        </Button>
        <Typography
          sx={{
            color: "#666",
            fontSize: "12px",
            mb: 3,
            textAlign: "left",
            width: "100%",
          }}
        >
          Public email domains are not allowed. Please enter a valid company email address.
        </Typography>
      </Box>
    </>
  )

  const renderOtpStep = () => (
    <>
      <Typography
        sx={{
          fontWeight: 600,
          color: "#333",
          mb: 1,
          fontSize: "20px",
        }}
      >
        Verify Your Email
      </Typography>
      <Box sx={{ width: "100%", maxWidth: "500px" }}>
        <Typography
          sx={{
            color: "rgba(90, 96, 127, 1)",
            mt: 4,
            mb: 2,
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          Step 2 : Enter the OTP sent to your email
        </Typography>

        <Typography
          sx={{
            color: "#666",
            fontSize: "14px",
            mb: 3,
            textAlign: "center",
          }}
        >
          We sent a 6-digit verification code to{" "}
          <Typography component="span" sx={{ fontWeight: 600, color: "#333" }}>
            {email}
          </Typography>
        </Typography>

        {verifyOtpMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {verifyOtpMutation.error instanceof Error ? verifyOtpMutation.error.message : "Invalid OTP"}
          </Alert>
        )}

        <TextField
          fullWidth
          placeholder="Enter 6-digit OTP"
          variant="standard"
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 6)
            setOtp(value)
            if (otpError) {
              setOtpError("")
            }
          }}
          error={!!otpError}
          disabled={verifyOtpMutation.isPending}
          sx={{
            mb: otpError ? 1 : 4,
            "& .MuiInput-underline:before": {
              borderBottomColor: otpError ? "#f44336" : "#e0e0e0",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: otpError ? "#f44336" : "#FF7A59",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: otpError ? "#f44336" : "#FF7A59",
            },
            "& .MuiInputBase-input": {
              padding: "12px 0",
              fontSize: "1.5rem",
              textAlign: "center",
              letterSpacing: "0.5rem",
              color: "#333",
              "&::placeholder": {
                color: "#999",
                opacity: 1,
                letterSpacing: "normal",
              },
            },
          }}
        />
        {otpError && (
          <Typography
            sx={{
              color: "#f44336",
              fontSize: "12px",
              mb: 3,
              textAlign: "left",
              width: "100%",
            }}
          >
            {otpError}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={handleOtpSubmit}
          disabled={verifyOtpMutation.isPending}
          sx={{
            backgroundColor: "#FF7A59",
            color: "white",
            py: 1.8,
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: 500,
            textTransform: "none",
            mb: 2,
            maxWidth: "500px",
            "&:hover": {
              backgroundColor: "#FF5722",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
            },
          }}
        >
          {verifyOtpMutation.isPending ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Verifying...
            </Box>
          ) : (
            "Verify OTP"
          )}
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => setCurrentStep("email")}
          sx={{
            color: "#FF7A59",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255, 122, 89, 0.1)",
            },
          }}
        >
          Back to Email
        </Button>
      </Box>
    </>
  )

  const renderDetailsStep = () => (
    <>
      <Typography
        sx={{
          fontWeight: 600,
          color: "#333",
          mb: 1,
          fontSize: "20px",
        }}
      >
        Complete Your Registration
      </Typography>
      <Box sx={{ width: "100%", maxWidth: "600px" }}>
        <Typography
          sx={{
            color: "rgba(90, 96, 127, 1)",
            mt: 4,
            mb: 3,
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          Step 3 : Provide your business details
        </Typography>

        {completeSignupMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {completeSignupMutation.error instanceof Error
              ? completeSignupMutation.error.message
              : "Failed to complete registration"}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Row 1: Name and Phone */}
          <Grid >
            <TextField
              fullWidth
              label="Name *"
              variant="outlined"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={!!formErrors.name}
              helperText={formErrors.name}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>
          <Grid >
            <TextField
              fullWidth
              label="Phone *"
              variant="outlined"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>

          {/* Row 2: Company Name (Full Width) */}
          <Grid >
            <TextField
              fullWidth
              label="Company Name *"
              variant="outlined"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              error={!!formErrors.companyName}
              helperText={formErrors.companyName}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>

          {/* Row 3: Industry and Website */}
          <Grid >
            <FormControl fullWidth error={!!formErrors.industry}>
              <InputLabel>Industry *</InputLabel>
              <Select
                value={formData.industry}
                label="Industry *"
                onChange={(e) => handleInputChange("industry", e.target.value)}
                disabled={completeSignupMutation.isPending}
              >
                <MenuItem value="Information Technology">Information Technology</MenuItem>
                <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                <MenuItem value="Healthcare">Healthcare</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Retail">Retail</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {formErrors.industry && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  {formErrors.industry}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid >
            <TextField
              fullWidth
              label="Website"
              variant="outlined"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>

          {/* Row 4: Employee Count and Annual Revenue */}
          <Grid >
            <TextField
              fullWidth
              label="Employee Count"
              type="number"
              variant="outlined"
              value={formData.employeeCount}
              onChange={(e) => handleInputChange("employeeCount", Number.parseInt(e.target.value) || 0)}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>
          <Grid >
            <TextField
              fullWidth
              label="Annual Revenue"
              variant="outlined"
              value={formData.annualRevenue}
              onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>

          {/* Row 5: Business Type and Tax ID */}
          <Grid >
            <FormControl fullWidth>
              <InputLabel>Business Type</InputLabel>
              <Select
                value={formData.businessType}
                label="Business Type"
                onChange={(e) => handleInputChange("businessType", e.target.value)}
                disabled={completeSignupMutation.isPending}
              >
                <MenuItem value="Private Limited">Private Limited</MenuItem>
                <MenuItem value="Public Limited">Public Limited</MenuItem>
                <MenuItem value="Partnership">Partnership</MenuItem>
                <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
                <MenuItem value="LLP">LLP</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid >
            <TextField
              fullWidth
              label="Tax ID"
              variant="outlined"
              value={formData.taxId}
              onChange={(e) => handleInputChange("taxId", e.target.value)}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>

          {/* Row 6: Registration Number and Contact Person */}
          <Grid >
            <TextField
              fullWidth
              label="Registration Number"
              variant="outlined"
              value={formData.registrationNumber}
              onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>
          <Grid >
            <TextField
              fullWidth
              label="Contact Person *"
              variant="outlined"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange("contactPerson", e.target.value)}
              error={!!formErrors.contactPerson}
              helperText={formErrors.contactPerson}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>

          {/* Row 7: Contact Person Phone and Email */}
          <Grid >
            <TextField
              fullWidth
              label="Contact Person Phone *"
              variant="outlined"
              value={formData.contactPersonPhone}
              onChange={(e) => handleInputChange("contactPersonPhone", e.target.value)}
              error={!!formErrors.contactPersonPhone}
              helperText={formErrors.contactPersonPhone}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>
          <Grid >
            <TextField
              fullWidth
              label="Contact Person Email *"
              variant="outlined"
              value={formData.contactPersonEmail}
              onChange={(e) => handleInputChange("contactPersonEmail", e.target.value)}
              error={!!formErrors.contactPersonEmail}
              helperText={formErrors.contactPersonEmail}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>

          {/* Row 8: Notes (Full Width) */}
          <Grid>
            <TextField
              fullWidth
              label="Notes"
              variant="outlined"
              multiline
              rows={3}
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              disabled={completeSignupMutation.isPending}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setCurrentStep("otp")}
            sx={{
              color: "#FF7A59",
              borderColor: "#FF7A59",
              flex: 1,
              py: 1.8,
              "&:hover": {
                borderColor: "#FF5722",
                backgroundColor: "rgba(255, 122, 89, 0.1)",
              },
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleCompleteSignup}
            disabled={completeSignupMutation.isPending}
            sx={{
              backgroundColor: "#FF7A59",
              color: "white",
              flex: 2,
              py: 1.8,
              "&:hover": {
                backgroundColor: "#FF5722",
              },
              "&:disabled": {
                backgroundColor: "#ccc",
              },
            }}
          >
            {completeSignupMutation.isPending ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Completing...
              </Box>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </Box>
      </Box>
    </>
  )

  const renderSuccessStep = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "500px",
        mt: 4,
      }}
    >
      {/* Success Icon */}
      <Box sx={{ mb: 3 }}>
        <Image src="/success.png" alt="Success" width={50} height={50} style={{ objectFit: "contain" }} />
      </Box>
      {/* Success Heading */}
      <Typography
        sx={{
          fontWeight: 600,
          color: "#333",
          mb: 3,
          fontSize: "20px",
        }}
      >
        Registration Successful!
      </Typography>
      {/* Success Message */}
      <Typography
        sx={{
          color: "#666",
          fontSize: "16px",
          lineHeight: 1.5,
          mb: 1,
        }}
      >
        Your registration has been completed successfully.
      </Typography>
      <Typography
        sx={{
          color: "#666",
          fontSize: "16px",
          lineHeight: 1.5,
          mb: 1,
        }}
      >
        Welcome to EZRM B2B Marketplace!
      </Typography>
      <Typography
        sx={{
          color: "#333",
          fontSize: "16px",
          fontWeight: 600,
          mb: 2,
        }}
      >
        {email}
      </Typography>
      <Typography
        sx={{
          color: "#666",
          fontSize: "14px",
          mb: 4,
        }}
      >
        You can now start exploring our platform and connect with suppliers.
      </Typography>
      {/* Back to Home Button */}
      <Button
        fullWidth
        variant="contained"
        onClick={handleBackToHome}
        sx={{
          backgroundColor: "#FF7A59",
          color: "white",
          py: 1.8,
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: 500,
          textTransform: "none",
          maxWidth: "500px",
          "&:hover": {
            backgroundColor: "#FF5722",
          },
        }}
      >
        Back To Home
      </Button>
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        {/* Full Screen Background Image */}
        <Image
          src="/signBack.png"
          alt="Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
        />

        {/* Left Side Content - Welcome Text (35% width) */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "35%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            px: 4,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "350px",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: { xs: "1.6rem", md: "24px" },
                lineHeight: 1.2,
                mb: 2,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Welcome to B2B Market Place
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: "0.95rem",
                lineHeight: 1.5,
                fontWeight: 300,
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Your Gateway to Effortless Management
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: "0.95rem",
                lineHeight: 1.5,
                fontWeight: 300,
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Your Gateway to Effortless
            </Typography>
          </Box>
        </Box>

        {/* Right Side Overlay - Registration Form (65% width) */}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "65%",
            height: "100%",
            backgroundColor: "white",
            borderTopLeftRadius: "24px",
            borderBottomLeftRadius: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
            boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
            overflow: "auto",
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: { xs: 3, sm: 6 },
                py: 4,
                width: "100%",
              }}
            >
              {/* Logo */}
              <Box sx={{ mb: 1, mt: 4 }}>
                <Image src="/ezrm-logo.png" alt="EZRM Logo" width={200} height={60} style={{ objectFit: "contain" }} />
              </Box>

              {/* Conditional Rendering based on current step */}
              {currentStep === "email" && renderEmailStep()}
              {currentStep === "otp" && renderOtpStep()}
              {currentStep === "details" && renderDetailsStep()}
              {currentStep === "success" && renderSuccessStep()}
            </Box>
          </Container>
        </Box>

        {/* Mobile Responsive Overlay */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1,
          }}
        />
      </Box>
    </ThemeProvider>
  )
}
