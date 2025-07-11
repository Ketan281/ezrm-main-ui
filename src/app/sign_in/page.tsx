"use client"
import { Box, Typography, TextField, Button, Link, Container } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Image from "next/image"
import { useRouter } from "next/navigation"
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

export default function LoginPage() {
      const router = useRouter()
    
      const handleSignInClick = () => {
        router.push("/sign_up")
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
            //   variant="h3"
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

        {/* Right Side Overlay - Login Form (65% width) */}
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
              <Box sx={{ mb: 1,mt:4 }}>
                <Image src="/ezrm-logo.png" alt="EZRM Logo" width={200} height={60} style={{ objectFit: "contain" }} />
              </Box>

              {/* Welcome Text */}
              <Typography
                // variant="h4"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 1,
                  fontSize: "20px",
                }}
              >
                Welcome Back
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  mb: 4,
                  fontSize: "15px",
                }}
              >
                Sign in to your Account
              </Typography>

              {/* Login Form */}
              <Box sx={{ width: "100%", maxWidth: "500px" }}>
                <TextField
                  fullWidth
                  placeholder="Email"
                  variant="standard"
                  sx={{
                    mb: 4,
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#e0e0e0",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "#FF7A59",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#FF7A59",
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

                <TextField
                  fullWidth
                  placeholder="Password"
                  type="password"
                  variant="standard"
                  sx={{
                    mb: 4,
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#e0e0e0",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "#FF7A59",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#FF7A59",
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

                <Button
                  fullWidth
                  variant="contained"
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
                  Login
                </Button>

                <Box sx={{ textAlign: "right", mb: 3 }}>
                  <Link
                    href="#"
                    sx={{
                      color: "#FF7A59",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Box sx={{ textAlign: "center" }} onClick={handleSignInClick}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: "0.9rem",
                    }}
                  >
                    {"Don't have an account? "}
                    <Link
                      href="#"
                      sx={{
                        color: "#FF7A59",
                        textDecoration: "none",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Sign up Here
                    </Link>
                  </Typography>
                </Box>
              </Box>
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
