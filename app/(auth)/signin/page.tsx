import SigninContent from "./components/SigninContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NFT Marketplace | Signin",
  description: "NFT Marketplace Signin page",
}
export default function Signin() {
  return <SigninContent></SigninContent>
}
