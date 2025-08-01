import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Suspense } from "react"
import PageLoading from "@/components/page-loading"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "SHANGATATU | DJ & Music Producer",
  description: "Electronic and House Music DJ based in Diani, Kenya",
  generator: 'v0.dev',
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon-96x96.png",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    title: "SHANGATATU | DJ & Music Producer",
    description: "Electronic and House Music DJ based in Diani, Kenya",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SHANGATATU DJ",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* You can add additional meta tags here if needed */}
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Suspense fallback={<PageLoading />}>{children}</Suspense>
      </body>
    </html>
  )
}
