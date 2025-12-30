"use client"

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: (process.env.API_URL ?? "http://localhost:3000") + "/api/graphql",
  }),
  cache: new InMemoryCache(),
})

export default apolloClient
