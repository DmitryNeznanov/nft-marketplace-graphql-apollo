import Timer from "@/app/components/Timer"
import NFT from "@/app/models/NFT"
import User from "@/app/models/User"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const item = (await NFT.findById(id)) as NFT

  return {
    title: "NFT Marketplace",
    description: `Page with information about NFT with name "${item.title}" and ID "${item._id}" `,
  }
}
export async function generateStaticParams() {
  const items = (await NFT.find()) as NFT[]
  return items.map((item: NFT) => ({
    id: String(item._id),
  }))
}
export default async function MarketPlaceItem({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = (await NFT.findById(id)) as NFT
  const itemUser = (await User.findById(item.author)) as User
  const itemsUser = (await NFT.find({
    $nor: [{ title: item.title }],
    author: item.author,
  })) as NFT[]
  return (
    <>
      <section>
        <div>
          <Image
            className="w-screen max-h-[320px] md:max-h-[420px] lg:max-h-[560px]"
            src={item.image}
            width={1280}
            height={560}
            alt="NFT image"
          ></Image>
        </div>
        <div className="max-w-sm md:container mx-auto">
          <div className="py-[40px]">
            <div className="contents md:flex flex-row justify-between">
              <div className="md:max-w-[365px] lg:max-w-[605px] flex flex-col gap-y-[20px] md:gap-y-[30px]">
                <Suspense
                  fallback={<h2 className="h1-sans">Loading NFT item...</h2>}
                >
                  <div>
                    <h2 className="h2-sans">{item.title}</h2>
                    <p className="mt-[10px] p-sans-xl text-gray">
                      Minted On{" "}
                      <time dateTime={item.postTime}>
                        {new Date(item.postTime).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </p>
                  </div>
                  <div>
                    <h4 className="h4-space text-gray">Created By</h4>
                    <Link
                      className="mt-[10px] w-max flex items-center hover:underline-primary hover:cursor-pointer"
                      href={`/users/${itemUser._id}`}
                    >
                      <Image
                        className="mr-[12px] rounded-full"
                        src={itemUser.profileImage}
                        width={24}
                        height={24}
                        alt="userProfileImage"
                      ></Image>
                      <p className="font-work-sans text-[16px]/[140%] font-normal md:font-semibold">
                        {itemUser.name}
                      </p>
                    </Link>
                  </div>
                  <div>
                    <h4 className="h4-space text-gray">Description</h4>
                    <p className="mt-[10px] p-sans-xl">{item.content}</p>
                  </div>
                  <div>
                    <h4 className="h4-space text-gray">Details</h4>
                    <ul className="mt-[10px]">
                      {[
                        ["View on Etherscan", "https://etherscan.io/"],
                        ["View Original", "https://google.com"],
                      ].map(([text, href], i) => {
                        return (
                          <li
                            className="w-max list-none"
                            key={i}
                          >
                            <Link
                              className="p-sans-xl flex items-center before:content-[url('/icons/globe.svg')] hover:before:content-[url('/icons/globe-accent.svg')] before:w-[32px] before:h-[32px] before:mr-[10px] hover:underline-primary "
                              href={href}
                              target="_blank"
                            >
                              {text}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4 className="h4-space text-gray">Tags</h4>
                    <ul className="mt-[20px] flex flex-col lg:flex-row gap-[20px]">
                      {/* FIXME: fix grid */}
                      {item.tags.map((tag: string, i: number) => {
                        return (
                          <li
                            className="w-max p-sans font-semibold"
                            key={i}
                          >
                            <Link
                              className="block py-[12px] px-[20px] rounded-primary bg-black-white uppercase hover:text-accent"
                              // TODO: link to sorted NFTs with current tags
                              href="#"
                            >
                              {tag}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </Suspense>
              </div>
              {/* FIXME: fix timer grid */}
              <Timer expiredAt={item.postTime}></Timer>
            </div>
          </div>
        </div>
      </section>
      <section className="py-[40px] lg:py-[80px]">
        <div className="container">
          <div className="max-w-sm md:container mx-auto">
            <div className="flex justify-between">
              <h2 className="h2-sans capitalize">More from this artist</h2>
              <Link
                className="hidden md:flex button-transparent before:content-[url('/icons/arrow-right-accent.svg')]"
                href={`/users/${itemUser._id}`}
              >
                go to artist page
              </Link>
            </div>
            <div className="mt-[30px] md:mt-[60px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              <Suspense
                fallback={<h2 className="h1-sans">Loading author NFTs...</h2>}
              >
                {itemsUser.map(async (item: NFT, i) => {
                  return (
                    <article
                      className="max-w-[330px] w-full rounded-primary overflow-hidden scale-primary"
                      key={i}
                    >
                      <div>
                        <Link href={`/marketplace/${item._id}`}>
                          <Image
                            className="w-full"
                            src={item.image}
                            width={420}
                            height={296}
                            alt={`item-${i + 1}`}
                          ></Image>
                        </Link>
                      </div>
                      <div className="p-[20px] md:px-[30px] bg-black-white">
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
            <Link
              className="w-full md:w-max md:hidden button-transparent before:content-[url('/icons/arrow-right-accent.svg')]"
              href={`/users/${itemUser._id}`}
            >
              go to artist page
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
