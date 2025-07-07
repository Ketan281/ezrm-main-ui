import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import ClientLayout from "@/components/client-layout"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "EZRM - Raw Materials Simplified",
  description: "Raw Materials Simplified",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
