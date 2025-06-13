import { Metadata } from "next"
import MarketplaceContent from "./components/MarketplaceContent"
import apolloServer from "@/lib/apolloServer"
import { GET_ITEMS_WITH_AUTHOR } from "@/graphql/queries/items/getItemsWithAuthor"

export const metadata: Metadata = {
  title: "NFT Marketplace | Marketplace",
  description: "Page on which NFT is sold",
}
export default async function Marketplace() {
  const { data } = await apolloServer.query({ query: GET_ITEMS_WITH_AUTHOR })
  // TODO: add cache ?
  // TODO: search on button click
  // TODO: search more adaptive to ui with empty "q" and tldr
  return (
    <>
      <MarketplaceContent defaultData={data.items}></MarketplaceContent>
    </>
  )
}
