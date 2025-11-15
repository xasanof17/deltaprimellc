import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ScrollToTop } from "@/components/animations/scroll-to-top"

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Delta Prime LLC | Global Logistics & Freight Forwarding",
  description: "Tech-enabled logistics solutions with global reach. On time, every time.",
  generator: "Next.js",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased`}>
        <ScrollToTop />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
