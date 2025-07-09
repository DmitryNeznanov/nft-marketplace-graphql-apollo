import { Metadata } from "next"
import MarketplaceContent from "./components/MarketplaceContent"
import apolloServer from "@/lib/apolloServer"
import { GET_FILTERED_ITEMS_WITH_AUTHOR } from "@/graphql/queries/items/getFilteredItemsWithAuthor"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "NFT Marketplace | Marketplace",
  description: "Page on which NFT is sold",
}
export default async function Marketplace({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string }
}) {
  const params = await Promise.resolve(searchParams)
  const q = params?.q || ""
  const limit = 9
  const page = parseInt(params?.page) || "1"
  const offset = (page - 1) * limit
  const { data } = await apolloServer.query({
    query: GET_FILTERED_ITEMS_WITH_AUTHOR,
    variables: { q, offset, limit },
  })

  if (!params?.page) {
    const params = await Promise.resolve(new URLSearchParams())
    if (q) params.set("q", q)
    params.set("page", "1")
    redirect(`/marketplace?${params.toString()}`)
  }
  // ISSUE: add cache ?
  // TODO: search on button click
  // TODO: search more adaptive to ui with empty "q" and tldr
  return (
    <>
      <MarketplaceContent defaultData={data.items}></MarketplaceContent>
    </>
  )
}
