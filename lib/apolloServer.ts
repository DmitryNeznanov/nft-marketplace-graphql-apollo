import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const apolloServer = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
})

export default apolloServer
