import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Suspense } from "react"
import PageLoading from "@/components/page-loading"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL('https://shangatatu.net'),
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Suspense fallback={<PageLoading />}>{children}</Suspense>
      </body>
    </html>
  )
}
