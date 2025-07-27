import { serialize } from "cookie"

export function clearTokenCookie(res: any) {
  const cookie = serialize("token", "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  })

  res.setHeader("Set-Cookie", cookie)
}
