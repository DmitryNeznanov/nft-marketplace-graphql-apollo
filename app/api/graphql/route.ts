import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import resolvers from "@/graphql/resolvers"
import typeDefs from "@/graphql/typeDefs"

export const POST = startServerAndCreateNextHandler(
  new ApolloServer({ typeDefs, resolvers })
)
