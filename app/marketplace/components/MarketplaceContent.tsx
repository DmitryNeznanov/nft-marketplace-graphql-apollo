"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@apollo/client"
import { GET_FILTERED_ITEMS_WITH_AUTHOR } from "@/graphql/queries/items/getFilteredItemsWithAuthor"
import Image from "next/image"
import Link from "next/link"
import Search from "./Search"

export default function MarketplaceContent({
  defaultData,
}: {
  defaultData: NFT[]
}) {
  const [items, setItems] = useState(defaultData)
  const router = useRouter()
  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""
  const page = parseInt(searchParams.get("page") || "1")
  const prevQRef = useRef("")

  const itemsPerPage = 9
  const offset = (page - 1) * itemsPerPage

  const { data, loading, error } = useQuery(GET_FILTERED_ITEMS_WITH_AUTHOR, {
    variables: { q, offset, limit: itemsPerPage },
    skip: !q,
  })

  // 🔁 Обновляем items при изменении данных
  useEffect(() => {
    if (q && data?.items) {
      setItems(data.items)
    } else if (!q) {
      setItems(defaultData)
    }
  }, [data, defaultData, q])

  // 🔁 Сброс page = 1 при новом q
  useEffect(() => {
    const currentQ = searchParams.get("q") || ""
    const currentPage = parseInt(searchParams.get("page") || "1")

    if (prevQRef.current !== currentQ) {
      prevQRef.current = currentQ

      if (currentPage !== 1) {
        const params = new URLSearchParams(searchParams)
        params.set("q", currentQ)
        params.set("page", "1")
        router.replace(`/marketplace?${params.toString()}`)
      }
    }
  }, [searchParams, router])

  function changePage(newPage: number) {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    if (q) params.set("q", q)
    router.push(`/marketplace?${params.toString()}`)
  }
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
                {items.length}
              </span>
            </p>
          </div>
        </div>
        <div className="bg-black-white">
          <div className="pt-[40px] md:pt-[60px] pb-[40px] md:pb-[80px] max-w-sm md:container mx-auto">
            {loading && <h2 className="h1-sans">Loading items...</h2>}
            {items.length === 0 && !loading && (
              <h2 className="h1-sans">Nothing was found...</h2>
            )}
            {error && <h2 className="h1-sans">Error: {error.message}</h2>}

            {!loading && (
              <div className="w-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                {/* ISSUE: button to view more or pagination ? */}
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
            )}
            <div className="flex justify-between mt-6">
              <button
                className="button-primary before:hidden"
                disabled={Number(page) <= 1}
                onClick={() => changePage(Number(page) - 1)}
              >
                prev
              </button>
              <button
                className="button-primary before:hidden"
                disabled={items.length < itemsPerPage}
                onClick={() => changePage(Number(page) + 1)}
              >
                next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
