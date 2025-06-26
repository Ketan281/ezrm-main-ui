import type React from "react"
import { Box } from "@mui/material"
import { styled } from '@mui/material/styles';
const CurvedSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "6rem",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <path d="M0,120 C300,60 900,60 1200,120 L1200,120 L0,120 Z" fill="white" />
      </svg>
    </Box>
  )
}

export default CurvedSection
