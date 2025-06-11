import { Metadata } from "next"
import Rankings from "./components/Rankings"
import apolloServer from "@/lib/apolloServer"
import { GET_USERS } from "@/graphql/queries"
export const metadata: Metadata = {
  title: "NFT Marketplace | Rankings",
  description: "NFT Marketplace Rankings page",
}

export default async function RankingsWrapper() {
  const { data } = await apolloServer.query({ query: GET_USERS })

  return <Rankings users={data.users} />
}
