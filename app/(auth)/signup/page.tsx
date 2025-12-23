import SignupContent from "./components/SignupContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NFT Marketplace | Signup",
  description: "NFT Marketplace Signup page",
}

export default function Signup() {
  return <SignupContent></SignupContent>
}
