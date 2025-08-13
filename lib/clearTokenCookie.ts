// lib/clearTokenCookie.ts
import { serialize } from "cookie"
import { NextResponse } from "next/server"

export function clearTokenCookie(res: NextResponse) {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })

  res.headers.set("Set-Cookie", cookie)
}
