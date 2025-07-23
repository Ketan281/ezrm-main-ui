"use client"
import type React from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/theme/theme"
import Navbar from "@/components/Navbar"
import FooterSection from "@/components/FooterSection"

interface ClientLayoutProps {
  children: React.ReactNode
} 

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname()

  // Define routes where navbar and footer should be hidden
  const hideNavbarFooterRoutes = ["/sign_in", "/register", "/sign-in", "/sign_up"]
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(pathname)

  return (
    <ThemeProvider theme={theme}>
      {/* Conditionally render Navbar */}
      {!shouldHideNavbarFooter && <Navbar />}

      {/* Main content area with dynamic min-height */}
      <main
        style={{
          minHeight: shouldHideNavbarFooter ? "100vh" : "calc(100vh - 140px)",
        }}
      >
        {children}
      </main>

      {/* Conditionally render Footer */}
      {!shouldHideNavbarFooter && <FooterSection />}
    </ThemeProvider>
  )
}

export default ClientLayout
