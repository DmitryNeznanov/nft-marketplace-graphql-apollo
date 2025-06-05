import Image from "next/image"
import NFT from "../models/NFT"
import { Suspense } from "react"
import Link from "next/link"
import { Metadata } from "next"
import User from "../models/User"
import Search from "./components/Search"
export const metadata: Metadata = {
  title: "NFT Marketplace | Marketplace",
  description: "Page on which NFT is sold",
}

export default async function MarketPlace(props: {
  searchParams?: Promise<{
    q?: string
  }>
}) {
  //FIXME: q
  const searchParams = await props.searchParams

  const items = (await NFT.find()) as NFT[]
  const uniqueAuthorIds = Array.from(
    new Set(items.map((item) => item.author.toString()))
  )
  const authors = await User.find({ _id: { $in: uniqueAuthorIds } })
  const authorMap = new Map(
    authors.map((author) => [author._id.toString(), author.name.toLowerCase()])
  )

  const filteredData = [...items].filter((item) => {
    const q = searchParams?.q || ""
    const authorName = authorMap.get(item.author.toString()) || ""
    return (
      // ISSUE add more rules ?
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      uniqueAuthorIds.some((id) => id.includes(q)) ||
      authorName.includes(q)
    )
  })

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
        <div>
          {/* TODO: tabs with collections */}
          <div className="max-w-sm md:container mx-auto">nft</div>
        </div>
        <div className="bg-black-white">
          <div className="pt-[40px] md:pt-[60px] pb-[40px] md:pb-[80px] max-w-sm md:container mx-auto">
            <div className="w-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              <Suspense
                fallback={<h2 className="h1-sans">Loading marketplace...</h2>}
              >
                {/* ISSUE: button to view more or pagination ? */}
                {filteredData.map(async (item: NFT, i) => {
                  const itemUser = (await User.findById(item.author)) as User
                  return (
                    <article
                      className="w-full rounded-primary overflow-hidden hover:scale-primary"
                      key={i}
                    >
                      <Link href={`/marketplace/${item._id}`}>
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
                            href={`/marketplace/${item._id}`}
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
                              src={itemUser.profileImage}
                              width={24}
                              height={24}
                              alt="userProfileImage"
                            ></Image>
                            <p className="p-space">{itemUser.name}</p>
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
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
