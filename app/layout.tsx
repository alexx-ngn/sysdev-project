import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MilesForHope",
  description: "Making a difference in communities worldwide",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add Open Peeps CSS */}
        <link
          rel="stylesheet"
          href="https://uploads-ssl.webflow.com/5e8c338ed1df992297f0ab78/css/open-peeps.webflow.9658c1b6e.css"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

