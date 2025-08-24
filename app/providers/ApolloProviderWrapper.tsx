"use client"
import apolloClient from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client"

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
