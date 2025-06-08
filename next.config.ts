import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.usercontent.google.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
