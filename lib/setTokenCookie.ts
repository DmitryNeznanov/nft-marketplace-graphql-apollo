// lib/setTokenCookie.ts
import { NextResponse } from "next/server"

export function setTokenCookie(res: NextResponse, token: string) {
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  })
}
