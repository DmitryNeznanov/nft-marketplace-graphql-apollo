import { Metadata } from "next"
import apolloServer from "@/lib/apolloServer"
import { GET_USERS } from "@/graphql/queries/user/getUsers"
import Table from "./components/Table"
export const metadata: Metadata = {
  title: "NFT Marketplace | Rankings",
  description: "NFT Marketplace Rankings page",
}

export default async function Rankings() {
  const { data } = await apolloServer.query({ query: GET_USERS })

  return (
    <section className="py-[40px] md:py-[60px] lg:py-[80px]">
      <div className="max-w-sm md:container mx-auto">
        <article>
          <h1 className="h1-sans">Top Creators</h1>
          <p className="mt-[10px] p-sans-xl">
            Check out top ranking NFT artists on the NFT Marketplace.
          </p>
        </article>
        <Table users={data} />
      </div>
    </section>
  )
}
