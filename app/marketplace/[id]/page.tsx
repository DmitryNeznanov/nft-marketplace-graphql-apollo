import NFT from "@/app/models/NFT"
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
  const item = await NFT.findById(id) as NFT

  return {
    title: "NFT Marketplace",
    description: `Page with information about NFT with name "${item.title}" and ID "${item._id}" `,
  }
}
export async function generateStaticParams() {
  const items = await NFT.find() as NFT[]
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
  return (
    <>
      <section>
        <div>
          {/* // TODO: fixed image ? */}
          <Image
            className="w-screen max-h-[320px] md:max-h-[420px] lg:max-h-[560px]"
            src={item.image}
            width={1280}
            height={560}
            alt="NFT image"
          ></Image>
        </div>
        <div className="max-w-sm md:container mx-auto">
          <div className="max-w-[605px] py-[40px] flex flex-col gap-y-[20px] md:gap-y-[30px]">
            <Suspense
              fallback={<h2 className="h1-sans">Loading NFT item...</h2>}
            >
              <div>
                <h2 className="h2-sans">{item.title}</h2>
                <p className="mt-[10px] p-sans-xl text-gray">
                  {/* // TODO: corrent date value in DB */}
                  {/* // TODO: format date to normal */}
                  Minted On <data value="">{item.postTime}</data>
                </p>
              </div>
              {/* // TODO: add dynamic timer */}
              {/* TODO: change flex order */}
              <div className="w-full h-max md:w-max p-[30px] flex flex-col items-center md:items-start rounded-primary bg-black-white/50 overflow-hidden">
                <p className="font-space-mono font-normal text-[12px]/[120%]">
                  Auction ends in:
                </p>
                <div className="mt-[10px] flex flex-row gap-x-[8px]">
                  <div className="flex flex-col gap-y-[5px]">
                    <p className="font-space-mono font-bold text-[38px]/[120%]">
                      59
                    </p>
                    <p className="font-space-mono font-normal text-[12px]/[120%]">
                      Hours
                    </p>
                  </div>
                  <span className="font-space-mono font-bold text-[28px]/[140%]">
                    :
                  </span>
                  <div className="flex flex-col gap-y-[5px]">
                    <p className="font-space-mono font-bold text-[38px]/[120%]">
                      59
                    </p>
                    <p className="font-space-mono font-normal text-[12px]/[120%]">
                      Minutes
                    </p>
                  </div>
                  <span className="font-space-mono font-bold text-[28px]/[140%]">
                    :
                  </span>
                  <div className="flex flex-col gap-y-[5px]">
                    <p className="font-space-mono font-bold text-[38px]/[120%]">
                      59
                    </p>
                    <p className="font-space-mono font-normal text-[12px]/[120%]">
                      Seconds
                    </p>
                  </div>
                </div>
                <button className="mt-[30px] w-full button-primary before:hidden">
                  place bid
                </button>
              </div>
              <div>
                <h4 className="h4-space text-gray">Created By</h4>
                <Link
                  // TODO: add author's image to DB and display it
                  className="mt-[10px] w-max font-work-sans text-[16px]/[140%] font-normal md:font-semibold flex items-center before:content-[url('/heroAvatar.png')] before:w-[24px] before:h-[24px] before:mr-[12px] hover:underline-primary hover:cursor-pointer"
                  // TODO: Link to creator pagee
                  href="#"
                >
                  {item.author}
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
        </div>
      </section>
      <section className="py-[40px] lg:py-[80px]">
        <div className="container">
          <div className="max-w-sm md:container mx-auto">
            <div className="flex justify-between">
              <h2 className="h2-sans capitalize">More from this artist</h2>
              {/* TODO: link to author page */}
              <Link
                className="hidden md:flex button-transparent before:content-[url('/icons/arrow-right-accent.svg')]"
                href="#"
              >
                go to artist page
              </Link>
            </div>
            <div className="mt-[30px] md:mt-[60px]">
              <Suspense
                fallback={<h2 className="h1-sans">Loading author NFTs...</h2>}
              >
                {/* TODO: add author post to db and render it */}
              </Suspense>
              <Link
                className="w-full md:w-max md:hidden button-transparent before:content-[url('/icons/arrow-right-accent.svg')]"
                href="#"
              >
                go to artist page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
