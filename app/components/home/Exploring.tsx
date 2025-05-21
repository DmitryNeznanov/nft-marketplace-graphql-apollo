import NFT from "@/app/models/NFT"
import Image from "next/image"
import Link from "next/link"

export default async function Exploring() {
  const items: NFT[] = (await NFT.find()) as NFT[]

  return (
    <section className="py-[40px] md:py-[80px]">
      <div className="max-w-sm md:container mx-auto">
        <article className="flex flex-row justify-between">
          <div>
            <h2 className="h2-sans">Discover More NFTs</h2>
            <p className="mt-[10px] p-sans capitalize">
              Explore new trending NFTs
            </p>
          </div>
          <div className="hidden md:block self-end">
            <Link
              className="button-transparent before:content-[url('/icons/eye-accent.svg')]"
              href="marketplace"
            >
              see all
            </Link>
          </div>
        </article>
        <section className="mt-[40px] lg:mt-[60px]">
          <div className="flex flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[30px] md:*:nth-[n+3]:hidden lg:*:nth-[n+3]:block">
            {items.slice(0, 3).map((item: NFT, i) => {
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
                        // TODO: add author's image to DB and display it
                        className="mt-[10px] w-max font-work-sans text-[16px]/[140%] font-normal md:font-semibold flex items-center before:content-[url('/heroAvatar.png')] before:w-[24px] before:h-[24px] before:mr-[12px] hover:underline-primary hover:cursor-pointer"
                        // TODO: Link to creator pagee
                        href="#"
                      >
                        {item.author}
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
          <div className="mt-[40px] md:hidden">
            <Link
              className="w-full button-transparent before:content-[url('/icons/eye-accent.svg')]"
              href="rankings"
            >
              see all
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}
