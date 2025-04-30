import Image from "next/image"
import NFT from "../mongodb/models/NFT"
// import { NTFs } from "../mongodb/mongodb"
export default async function MarketPlace() {
  // const data = NTFs.find()
  // console.log(data)

  const data = await NFT.find()

  return (
    <section>
      <div className="container py-[40px] md:py-[60px] lg:py-[80px] bg-black">
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
      <div className="container">
        <div className="mx-auto w-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {data.map((nft, i) => {
            return (
              <article
                className="rounded-primary w-max overflow-hidden"
                key={i}
              >
                <div>
                  <Image
                    className="w-full"
                    src={nft.image}
                    width={420}
                    height={296}
                    alt={`nft-${i + 1}`}
                  ></Image>
                </div>
                <div className="p-[20px] md:px-[30px] bg-black-white">
                  <div>
                    <h3 className="h3-sans">{nft.title}</h3>
                    <p className="mt-[5px] flex items-center font-work-sans text-[16px]/[140%] before:content-[url('/heroAvatar.png')] before:w-[24px] before:h-[24px] before:mr-[12px]">
                      {nft.author}
                    </p>
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
        </div>
      </div>
    </section>
  )
}
