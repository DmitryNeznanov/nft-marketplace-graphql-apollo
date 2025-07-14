import type { Metadata } from "next"
import { Space_Mono, Work_Sans } from "next/font/google"
import "./globals.css"
import Footer from "@/app/components/footer/Footer"
import Header from "@/app/components/header/Header"
import ApolloProviderWrapper from "./ApolloProviderWrapper"

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
      <body className={`${spaceMono.variable} ${workSans.variable}`}>
        <ApolloProviderWrapper>
          <div className="min-h-screen flex flex-col">
            <Header></Header>
            <div className="flex-1">{children}</div>
            <Footer></Footer>
          </div>
        </ApolloProviderWrapper>
      </body>
    </html>
  )
}
