import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar" // <-- Ajouté

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Al Barka Restaurant",
  description: "Restaurant Al Barka - Cuisine délicieuse au Burkina Faso",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SidebarProvider>
          {" "}
          {/* <-- Ajouté */}
          {children}
        </SidebarProvider>{" "}
        {/* <-- Ajouté */}
        <Toaster />
      </body>
    </html>
  )
}
