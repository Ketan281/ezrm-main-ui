"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Box, CircularProgress, Typography } from "@mui/material"
import { useAppStore } from "@/store/use-app-store"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo = "/sign_in" }) => {
  const router = useRouter()
  const { isAuthenticated, customer } = useAppStore()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !customer) {
      // Redirect to sign in page
      router.push(redirectTo)
    }
  }, [isAuthenticated, customer, router, redirectTo])

  // Show loading while checking authentication
  if (!isAuthenticated || !customer) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <CircularProgress sx={{ color: "#ff7849", mb: 2 }} />
        <Typography sx={{ color: "#666", fontSize: "14px" }}>Checking authentication...</Typography>
      </Box>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
