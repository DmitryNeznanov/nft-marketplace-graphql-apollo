import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import typeDefs from "@/graphql/typeDefs"
import resolvers from "@/graphql/resolvers"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your_secret"

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    let user = null

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (typeof decoded === "object" && decoded !== null) {
          user = { ...decoded, token }
        }
      } catch (err) {
        console.warn("Invalid token")
      }
    }

    return { user }
  },
})

export async function POST(req: Request) {
  return handler(req)
}
