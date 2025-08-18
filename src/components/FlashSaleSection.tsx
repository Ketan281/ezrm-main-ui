"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Container, LinearProgress } from "@mui/material";

interface FlashSaleProductProps {
  productName: string;
  price: string;
  stockLeft: number;
  totalStock: number;
}

const FlashSaleProduct: React.FC<FlashSaleProductProps> = ({
  productName,
  price,
  stockLeft,
  totalStock,
}) => {
  const progressValue = ((totalStock - stockLeft) / totalStock) * 100;

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "12px",
        p: 2.5,
        width: "200px",
        height: "140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Product Icon and Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
        {/* Vitamin Bottle Icon */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Bottle */}
          <Box
            sx={{
              width: "32px",
              height: "42px",
              bgcolor: "#ff7849",
              borderRadius: "4px 4px 2px 2px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* Bottle Cap */}
            <Box
              sx={{
                width: "22px",
                height: "6px",
                bgcolor: "#ff7849",
                borderRadius: "2px",
                position: "absolute",
                top: "-3px",
              }}
            />
            {/* VIT Text */}
            <Typography
              sx={{
                color: "white",
                fontSize: "8px",
                fontWeight: "bold",
                lineHeight: 1,
                mb: 0.2,
              }}
            >
              VIT
            </Typography>
          </Box>
          {/* C Badge */}
          <Box
            sx={{
              position: "absolute",
              right: "-4px",
              bottom: "4px",
              width: "14px",
              height: "14px",
              bgcolor: "#ffd700",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid white",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "8px",
                fontWeight: "bold",
              }}
            >
              C
            </Typography>
          </Box>
        </Box>

        {/* Product Name */}
        <Typography
          sx={{
            color: "#333",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          {productName}
        </Typography>
      </Box>

      {/* Price */}
      <Typography
        sx={{
          color: "#333",
          fontSize: "1.1rem",
          fontWeight: 600,
          mb: 1,
        }}
      >
        {price}
      </Typography>

      {/* Progress Bar */}
      <Box sx={{ mb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={progressValue}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "#f0f0f0",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#ff6b35",
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {/* Stock Left */}
      <Typography
        sx={{
          color: "#666",
          fontSize: "0.8rem",
          textAlign: "right",
        }}
      >
        {stockLeft} left
      </Typography>
    </Box>
  );
};

const FlashSaleSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 54,
    minutes: 33,
    seconds: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <Box
      sx={{
        bgcolor: "#fef7ed",
        py: { xs: 4, md: 6 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Shapes */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          left: -100,
          width: 200,
          height: 300,
          bgcolor: "#fde68a",
          opacity: 0.3,
          borderRadius: "50%",
          transform: "rotate(-15deg)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          right: -120,
          width: 250,
          height: 200,
          bgcolor: "#fed7aa",
          opacity: 0.4,
          borderRadius: "30%",
          transform: "rotate(25deg)",
        }}
      />

      <Container maxWidth="lg">
        {/* Flash Sale Container */}
        <Box
          sx={{
            bgcolor: "linear-gradient(135deg, #ff7849 0%, #ff6b35 100%)",
            background: "linear-gradient(135deg, #ff7849 0%, #ff6b35 100%)",
            borderRadius: "20px",
            p: { xs: 3, md: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Left Side - Flash Sale Info */}
          <Box sx={{ color: "white", flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 2,
              }}
            >
              Flash Sale
            </Typography>

            <Typography
              sx={{
                fontSize: "1rem",
                mb: 3,
                opacity: 0.9,
                maxWidth: "300px",
              }}
            >
              Limited-time discounts on fast-moving ingredients. Grab exclusive
              prices before the timer runs out.
            </Typography>

            {/* Countdown Timer */}
            <Typography
              sx={{
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                fontWeight: 600,
                fontFamily: "monospace",
              }}
            >
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </Typography>
          </Box>

          {/* Right Side - Product Cards */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <FlashSaleProduct
              productName="Product Name"
              price="$123"
              stockLeft={30}
              totalStock={100}
            />
            <FlashSaleProduct
              productName="Product Name"
              price="$123"
              stockLeft={30}
              totalStock={100}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FlashSaleSection;
