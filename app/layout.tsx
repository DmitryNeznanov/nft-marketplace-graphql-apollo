import type { Metadata } from "next"
import { Space_Mono, Work_Sans } from "next/font/google"
import "./globals.css"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/header/Header"

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
})

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["700", "400"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NFT Marketplace",
  description: "NFT Marketplace page",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={` ${spaceMono.variable} ${workSans.variable}`}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
