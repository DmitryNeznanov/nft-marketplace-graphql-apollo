"use client"

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
})

export default apolloClient
