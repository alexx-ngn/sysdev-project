import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { LanguageProvider } from "./context/language-context"
import { SettingsProvider } from "./context/settings-context"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MilesForHope",
  description: "Making a difference for children's hospitals in Montréal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <SettingsProvider>
            {children}
            <Toaster position="top-center" />
          </SettingsProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

