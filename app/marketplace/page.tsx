import { Metadata } from "next"
import MarketplaceContent from "./components/MarketplaceContent"
import apolloServer from "@/lib/apolloServer"
import { GET_FILTERED_ITEMS_WITH_AUTHOR } from "@/graphql/queries/items/getFilteredItemsWithAuthor"
import { GET_TOTAL_COUNT } from "@/graphql/queries/count/getTotalCount"

export const metadata: Metadata = {
  title: "NFT Marketplace | Marketplace",
  description: "Page on which NFT is sold",
}

export default async function Marketplace({
  searchParams,
}: {
  searchParams: Promise<{ q: string; page: string }>
}) {
  const { q, page } = await searchParams

  const currentPage = Number(page) || 1
  const itemsPerPage = 9
  const offset = (currentPage - 1) * itemsPerPage

  const { data: initialData } = await apolloServer.query({
    query: GET_FILTERED_ITEMS_WITH_AUTHOR,
    variables: { q, offset, limit: itemsPerPage },
  })
  const { data: countData } = await apolloServer.query({
    query: GET_TOTAL_COUNT,
    variables: { q },
  })

  const dataLenght = countData?.totalCount || 0
  return (
    <MarketplaceContent
      initialData={initialData.items}
      offset={offset}
      itemsPerPage={itemsPerPage}
      dataLenght={dataLenght}
    />
  )
}
