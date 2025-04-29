import Image from "next/image"
import NFT from "../mongodb/models/NFT"
export default async function MarketPlace() {
  const data = NFT.find({})

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
          <div className="p-[20px] flex flex-row items-center justify-between gap-x-[26px] border border-gray rounded-primary">
            <input
              className="p-sans placeholder:text-gray"
              type="text"
              placeholder="Search your favourite NFTs"
            />
            <button className="block">
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
      <div></div>
    </section>
  )
}
