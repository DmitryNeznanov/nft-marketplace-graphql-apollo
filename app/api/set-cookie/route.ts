// app/api/set-cookie/route.ts
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const { token } = await req.json()

  if (!token) return new Response("Missing token", { status: 400 })

  const cookieStore = await cookies()

  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return new Response("Cookie set", { status: 200 })
}
