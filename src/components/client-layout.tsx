"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/theme/theme"
import Navbar from "@/components/Navbar"
import FooterSection from "@/components/FooterSection"

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname()

  // Create QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  )

  // Handle hydration
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Define routes where navbar and footer should be hidden
  const hideNavbarFooterRoutes = ["/sign_in", "/register", "/sign-in", "/sign_up"]
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(pathname)

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
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

        {/* React Query DevTools */}
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default ClientLayout
