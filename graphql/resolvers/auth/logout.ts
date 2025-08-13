// graphql/resolvers/auth/logout.ts
import dbConnect from "@/lib/mongoose"
import Token from "@/app/models/Token"
import { NextResponse } from "next/server"

export const logout = async (
  _: unknown,
  __: unknown,
  {
    user,
    res,
  }: { user: { accountId: string; token: string } | null; res: NextResponse }
) => {
  await dbConnect()

  if (user?.token) {
    await Token.deleteOne({ token: user.token })
    console.log("Token deleted from DB:", user.token)
  }

  // Удаляем cookie
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })

  console.log("Cookie cleared")
  return { success: true }
}
