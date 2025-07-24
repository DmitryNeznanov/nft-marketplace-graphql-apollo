import { NextRequest } from "next/server"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import typeDefs from "@/graphql/typeDefs"
import resolvers from "@/graphql"
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server)

export async function POST(req: NextRequest) {
  return handler(req)
}
