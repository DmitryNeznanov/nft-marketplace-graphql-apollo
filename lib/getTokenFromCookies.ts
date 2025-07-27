import { parse } from "cookie"

export function getTokenFromCookies(req: any): string | null {
  const cookie = req.headers.cookie
  if (!cookie) return null

  const parsed = parse(cookie)
  return parsed.token || null
}
