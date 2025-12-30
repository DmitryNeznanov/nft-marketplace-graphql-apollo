import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import typeDefs from "@/graphql/typeDefs"
import resolvers from "@/graphql/resolvers"
import { setCookiePlugin } from "@/lib/cookies/setCookiePlugin"
import cookie from "cookie"

const JWT_SECRET = process.env.JWT_SECRET || "JWTPlaceholder"

const server = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
  plugins: [setCookiePlugin()],
})

function getAccountFromRequest(req: Request): ServerContext["account"] {
  const token = cookie.parse(req.headers.get("cookie") || "").token
  if (!token) {
    console.log("No token found in request or token is empty")
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { accountId: string }
    return decoded.accountId ? { accountId: decoded.accountId, token } : null
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.log(`Invalid token: ${token}`)
    } else {
      console.log("Invalid or expired token")
    }
    return null
  }
}

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest): Promise<ServerContext> => ({
    account: getAccountFromRequest(req),
    setCookies: [],
  }),
})
export async function POST(req: NextRequest) {
  return handler(req)
}
