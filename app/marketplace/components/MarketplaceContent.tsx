"use client"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_FILTERED_ITEMS_WITH_AUTHOR } from "@/graphql/queries/items/getFilteredItemsWithAuthor"
import Image from "next/image"
import Link from "next/link"
import Search from "./Search"
import Pagination from "@/app/components/Pagination/Pagination"
import { useSearchParams } from "next/navigation"
export default function MarketplaceContent({
  initialData,
  offset,
  itemsPerPage,
  dataLenght,
}: {
  initialData: NFT[]
  offset: number
  itemsPerPage: number
  dataLenght: number
}) {
  const [items, setItems] = useState(initialData)

  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""

  const {
    data: itemsData,
    loading,
    error,
  } = useQuery(GET_FILTERED_ITEMS_WITH_AUTHOR, {
    variables: { q, offset, limit: itemsPerPage },
    skip: !q,
  })

  const totalPages = Math.ceil(dataLenght / itemsPerPage)

  useEffect(() => {
    if (q && itemsData?.items) {
      setItems(itemsData.items)
    } else if (!q) {
      setItems(initialData)
    }
  }, [itemsData, initialData, q])
  console.log(itemsData, dataLenght)

  return (
    <>
      <section className="py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="max-w-sm md:container mx-auto">
          <article>
            <h1 className="h1-sans">Browse Marketplace</h1>
            <p className="mt-[10px] p-sans-xl">
              Browse through more than 50k NFTs on the NFT Marketplace.
            </p>
          </article>
          <div className="mt-[30px]">
            <Search></Search>
          </div>
        </div>
      </section>
      <section>
        <div className="border-t border-black-white">
          <div className="max-w-sm md:container mx-auto">
            <p className="w-full pb-[14px] pt-[24px] h4-sans text-center border-b-[2px] border-gray text-white">
              NFTs
              <span className="ml-[16px] px-[10px] py-[5px] p-space text-white rounded-full bg-gray">
                {dataLenght}
              </span>
            </p>
          </div>
        </div>
        <div className="bg-black-white">
          <div className="pt-[40px] md:pt-[60px] pb-[40px] md:pb-[80px] max-w-sm md:container mx-auto">
            {loading && <h2 className="h1-sans">Loading items...</h2>}
            {dataLenght === 0 && !loading && (
              <h2 className="h1-sans">Nothing was found...</h2>
            )}
            {error && <h2 className="h1-sans">Error: {error.message}</h2>}

            {!loading && dataLenght !== 0 && (
              <div>
                <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                  {items.map((item: NFT, i: number) => {
                    return (
                      <article
                        className="w-full rounded-primary overflow-hidden hover:scale-primary"
                        key={i}
                      >
                        <Link href={`/marketplace/${item.id}`}>
                          <Image
                            className="w-full max-w-[420px] max-h-[296px]"
                            src={item.image}
                            width={420}
                            height={296}
                            alt={`item-${i + 1}`}
                          ></Image>
                        </Link>
                        <div className="p-[20px] md:px-[30px] bg-black">
                          <div>
                            <Link
                              className="w-max block"
                              href={`/marketplace/${item.id}`}
                            >
                              <h3 className="h3-sans hover:hover:underline-primary">
                                {item.title}
                              </h3>
                            </Link>
                            <Link
                              className={`w-max mt-[5px] flex items-center font-work-sans text-[16px]/[140%] hover:underline-primary`}
                              href={`/users/${item.author}`}
                            >
                              <Image
                                className="mr-[12px] rounded-full"
                                src={item.itemAuthor.profileImage}
                                width={24}
                                height={24}
                                alt="userProfileImage"
                              ></Image>
                              <p className="p-space">{item.itemAuthor.name}</p>
                            </Link>
                          </div>
                          <div className="mt-[25px] flex flex-row justify-between items-center">
                            <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                              Price
                              <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                                {item.price} ETH
                              </span>
                            </p>
                            <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                              Highest Bid
                              <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                                {item.bid} ETH
                              </span>
                            </p>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
                <div className="mt-[25px] md:mt-[45px]">
                  <Pagination totalPages={totalPages}></Pagination>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
