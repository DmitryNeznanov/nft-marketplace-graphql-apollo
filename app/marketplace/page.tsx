import Image from "next/image"
import NFT from "../mongodb/models/NFT"
import { Suspense } from "react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "NFT Marketplace | Marketplace",
  description: "Page on which NFT is sold",
}

export default async function MarketPlace() {
  const items = await NFT.find()

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
          <form className="mt-[30px]">
            <div className="pr-[20px] flex flex-row items-center justify-between gap-x-[26px] border border-gray rounded-primary">
              <input
                className="w-full p-[20px] outline-none p-sans placeholder:text-gray"
                type="text"
                placeholder="Search your favourite NFTs"
              />
              <button className="block hover:cursor-pointer -m-[10px] p-[10px]">
                <Image
                  src="/icons/search.svg"
                  width={24}
                  height={24}
                  alt="search.svg"
                />
              </button>
            </div>
          </form>
        </div>
      </section>
      <section>
        <div>
          <div className="max-w-sm md:container mx-auto">nft</div>
        </div>
        <div className="bg-black-white">
          <div className="pt-[40px] md:pt-[60px] pb-[40px] md:pb-[80px] max-w-sm md:container mx-auto">
            <div className="w-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              <Suspense
                fallback={<h2 className="h1-sans">Loading marketplace...</h2>}
              >
                {items.map((nft, i) => {
                  return (
                    <article
                      className="w-max rounded-primary overflow-hidden"
                      key={i}
                    >
                      <Link href={`/marketplace/${nft._id}`}>
                        <Image
                          className="w-full"
                          src={nft.image}
                          width={420}
                          height={296}
                          alt={`nft-${i + 1}`}
                        ></Image>
                      </Link>
                      <div className="p-[20px] md:px-[30px] bg-black">
                        <div>
                          <Link
                            className="w-max block"
                            href={`/marketplace/${nft._id}`}
                          >
                            <h3 className="h3-sans hover:hover:underline-primary">
                              {nft.title}
                            </h3>
                          </Link>
                          <Link
                            className="w-max mt-[5px] flex items-center font-work-sans text-[16px]/[140%] before:content-[url('/heroAvatar.png')] before:w-[24px] before:h-[24px] before:mr-[12px]  hover:underline-primary"
                            href="#"
                          >
                            {nft.author}
                          </Link>
                        </div>
                        <div className="mt-[25px] flex flex-row justify-between items-center">
                          <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                            Price
                            <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                              {nft.price} ETH
                            </span>
                          </p>
                          <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                            Highest Bid
                            <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                              {nft.bid} ETH
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
