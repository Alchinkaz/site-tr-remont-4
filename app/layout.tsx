import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { inter, rubik } from "@/styles/fonts"
import { LanguageProvider } from "@/contexts/LanguageContext"

export const metadata: Metadata = {
  title: "TR Remont - Ремонт квартир в Алматы под ключ",
  description: "Современный ремонт квартиры или загородного дома под ключ в Алмате",
  generator: "TR Remont",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${rubik.variable}`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
