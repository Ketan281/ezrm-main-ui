import React from "react";
import { Box, Skeleton } from "@mui/material";

interface ShimmerLoaderProps {
  count?: number;
}

const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({ count = 9 }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2,
        mb: 4,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Image skeleton */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            sx={{ backgroundColor: "#f0f0f0" }}
          />

          {/* Content skeleton */}
          <Box sx={{ p: 2 }}>
            {/* Title skeleton */}
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              sx={{ mb: 1, backgroundColor: "#f0f0f0" }}
            />

            {/* Description skeleton */}
            <Skeleton
              variant="text"
              width="100%"
              height={16}
              sx={{ mb: 0.5, backgroundColor: "#f0f0f0" }}
            />
            <Skeleton
              variant="text"
              width="60%"
              height={16}
              sx={{ mb: 2, backgroundColor: "#f0f0f0" }}
            />

            {/* Product code skeleton */}
            <Skeleton
              variant="text"
              width="70%"
              height={14}
              sx={{ mb: 2, backgroundColor: "#f0f0f0" }}
            />

            {/* Button skeleton */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={36}
              sx={{ borderRadius: "4px", backgroundColor: "#f0f0f0" }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ShimmerLoader;
