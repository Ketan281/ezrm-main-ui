import type React from "react"
import { Box, Typography, TextField, Button, Container } from "@mui/material"

const Hero: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{
        // border:"1px solid red"
        // backgroundImage:'./heroborder.png'
    }}>
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
            height: { xs: 50, sm: 80, md: 110 },
            width: "330px",
            mb: 2,
            filter: "brightness(0) invert(1)", // Makes the logo white
          }}
        />

        {/* Subtitle */}


        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            mb: 5,
            mt:1,
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
            Request Quote
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Hero
