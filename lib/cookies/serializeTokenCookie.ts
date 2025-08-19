import cookie from "cookie"

export default function serializeTokenCookie(
  token: string,
  maxAgeSec = 60 * 60 * 24
) {
  return cookie.serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSec,
  })
}
