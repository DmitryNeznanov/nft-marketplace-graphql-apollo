// app/api/graphql/route.ts
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import typeDefs from "@/graphql/typeDefs"
import resolvers from "@/graphql/resolvers"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your_secret"

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    const cookieHeader = req.headers.get("cookie") || ""
    const tokenMatch = cookieHeader.match(/token=([^;]+)/)
    const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null

    console.log("Token from context:", token)

    let user: { accountId: string; token: string } | null = null

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { accountId: string }
        if (decoded?.accountId) {
          user = { accountId: decoded.accountId, token }
        }
      } catch {
        console.warn("Invalid token")
      }
    }

    const res = NextResponse.next()
    return { user, res }
  },
})

export async function POST(req: NextRequest) {
  const response = await handler(req)

  response.headers.set("Access-Control-Allow-Credentials", "true")
  response.headers.set(
    "Access-Control-Allow-Origin",
    process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"
  )

  return response
}
