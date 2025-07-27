import { serialize } from "cookie"

export function setTokenCookie(res: any, token: string) {
  const cookie = serialize("token", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  })

  res.setHeader("Set-Cookie", cookie)
}
