"use client"
import { useState } from "react"
import { Box, Typography, TextField, Button, Container } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Image from "next/image"

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

export default function RegisterPage() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const publicDomains = [
      "gmail.com",
      "yahoo.com",
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

  const handleSubmit = () => {
    const error = validateEmail(email)
    setEmailError(error)

    if (!error) {
      setShowSuccess(true)
    }
  }

  const handleBackToHome = () => {
    // Add navigation logic here
    console.log("Navigate to home")
  }

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
        {/* Right Side Overlay - Registration Form or Success Message (65% width) */}
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

              {/* Conditional Rendering */}
              {!showSuccess ? (
                // Registration Form
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
                    <TextField
                      fullWidth
                      placeholder="Email"
                      variant="standard"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        // Clear error when user starts typing
                        if (emailError) {
                          setEmailError("")
                        }
                      }}
                      error={!!emailError}
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
                      onClick={handleSubmit}
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
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </>
              ) : (
                // Success Message
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

                  {/* Almost Done Heading */}
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#333",
                      mb: 3,
                      fontSize: "24px",
                    }}
                  >
                    Almost Done
                  </Typography>

                  {/* Verification Message */}
                  <Typography
                    sx={{
                      color: "#666",
                      fontSize: "16px",
                      lineHeight: 1.5,
                      mb: 1,
                    }}
                  >
                    Verify your email to start your EZRM registration.
                  </Typography>

                  <Typography
                    sx={{
                      color: "#666",
                      fontSize: "16px",
                      lineHeight: 1.5,
                      mb: 1,
                    }}
                  >
                    We sent a verification link to
                  </Typography>

                  <Typography
                    sx={{
                      color: "#333",
                      fontSize: "16px",
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {email || "shruti@ezrm.in"}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#666",
                      fontSize: "14px",
                      mb: 4,
                    }}
                  >
                    Check your spam folder if you can't find it.
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
              )}
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
