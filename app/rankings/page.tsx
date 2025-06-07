import User from "../models/User"
import { gql } from "graphql-tag"
import type { Metadata } from "next"
import { Suspense } from "react"
import Table from "./components/Table"
import { ApolloClient, InMemoryCache } from "@apollo/client"
export const metadata: Metadata = {
  title: "NFT Marketplace | Rankings",
  description: "NFT Marketplace Rankings page",
}

const GET_USERS = gql`
  query {
    users {
      id
      name
      sold
      volume
      followers
      change
      info
      profileImage
      backgroundImage
    }
  }
`

export default async function Rankings() {
  const users = (await User.find()) as User[]
  const client = new ApolloClient({
    uri: `${process.env.API_URL}/api/graphql`, // ← обязательно полный URL
    cache: new InMemoryCache(),
  })

  const { data } = await client.query({ query: GET_USERS })
  console.log(data)

  return (
    <>
      <section className="py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="max-w-sm md:container mx-auto">
          <article>
            <h1 className="h1-sans">Top Creators</h1>
            <p className="mt-[10px] p-sans-xl">
              Check out top ranking NFT artists on the NFT Marketplace.
            </p>
          </article>
        </div>
      </section>
      <section className="pb-[40px]">
        <div className="max-w-sm md:container mx-auto">
          <Suspense fallback={<h2 className="h1-sans">Loading NFT item...</h2>}>
            <Table users={await JSON.parse(JSON.stringify(data))}></Table>
          </Suspense>
        </div>
      </section>
    </>
  )
}
