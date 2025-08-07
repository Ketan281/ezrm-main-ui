import type React from "react"
import { Box, Typography, TextField, Button, Container } from "@mui/material"
import { useAppStore } from "@/store/use-app-store"

const Hero: React.FC = () => {
  const { isAuthenticated } = useAppStore()
  
  return (
    <Box
      sx={{
        backgroundImage: 'url(/bgImage.png)',
        // backdropFilter:'',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '28.75rem', // 572px converted to rem (572/16 = 35.75rem)
        position: 'relative',
        marginLeft: '50%',
        transform: 'translateX(-50%)', // Centers the full-width element
        // background:"transparent"
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            textAlign: "center",
            py: { xs: 4, md: 8 },
          }}
        >
          {/* Main Logo */}
          <Box
            component="img"
            src="/ezrm-logo.png"
            alt="EZRM - Raw Materials Simplified"
            sx={{
              height: { xs: 50, sm: 80, md: 90 },
              width: "280px",
              mb: 2,
              filter: "brightness(0) invert(1)", // Makes the logo white
            }}
          />

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 5,
              mt: 1,
              maxWidth: "48rem",
            }}
          >
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: "48rem",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 0, sm: 0 },
            }}
          >
            <TextField
              placeholder="Enter product / Service Name"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: { xs: "25px 25px 0 0", sm: "25px 0 0 25px" },
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  py: 2,
                  px: 3,
                  fontSize: "1rem",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#333",
                color: "white",
                fontWeight: 500,
                px: 4,
                py: 2,
                borderRadius: { xs: "0 0 25px 25px", sm: "0 25px 25px 0" },
                minWidth: "fit-content",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "#555",
                },
              }}
            >
              {isAuthenticated ? 'Buy' : 'Request Quote'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Hero
