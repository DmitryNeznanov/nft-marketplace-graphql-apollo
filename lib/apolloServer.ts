import { ApolloClient, InMemoryCache } from "@apollo/client"
import { SchemaLink } from "@apollo/client/link/schema"
import { makeExecutableSchema } from "@graphql-tools/schema"
import typeDefs from "@/graphql/typeDefs"
import resolvers from "@/graphql"
const schema = makeExecutableSchema({ typeDefs, resolvers })

export const apolloServer = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
})
export default apolloServer
