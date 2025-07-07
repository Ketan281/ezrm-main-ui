"use client"
import type React from "react"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/theme/theme"
import Navbar from "@/components/Navbar"
import FooterSection from "@/components/FooterSection"

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {/* Navbar - appears on all pages */}
      <Navbar />

      {/* Main content area */}
      <main style={{ minHeight: "calc(100vh - 140px)" }}>{children}</main>

      {/* Footer - appears on all pages */}
      <FooterSection />
    </ThemeProvider>
  )
}

export default ClientLayout
