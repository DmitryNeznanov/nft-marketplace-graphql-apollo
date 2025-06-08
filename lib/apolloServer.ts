import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const apolloServer = new ApolloClient({
  link: new HttpLink({
    uri: process.env.API_URL + "/api/graphql",
  }),
  cache: new InMemoryCache(),
})

export default apolloServer
