import Image from "next/image"
import Link from "next/link"

export default function Exploring() {
  return (
    <section className="py-[40px] md:py-[80px]">
      <div className="container">
        <div className="max-w-sm md:max-w-full mx-auto">
          <article className="flex flex-row justify-between">
            <div>
              <h2 className="h2-sans">Discover More NFTs</h2>
              <p className="mt-[10px] p-sans capitalize">
                Explore new trending NFTs
              </p>
            </div>
            <div className="hidden md:block self-end">
              <Link
                className="button-transparent"
                href="rankings"
              >
                see all
              </Link>
            </div>
          </article>
          <section className="mt-[40px] lg:mt-[60px]">
            <div className="flex flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[30px] md:*:nth-[n+3]:hidden lg:*:nth-[n+3]:block">
              {[
                ["Distant Galaxy", "MoonDancer", 1.24, 0.32],
                ["Life on Edena", "NebulaKid", 1.88, 0.84],
                ["AstroFiction", "Spaceone", 1.13, 0.33],
              ].map(([title, author, price, bid], i) => {
                return (
                  <article
                    className="rounded-[20px] w-max overflow-hidden"
                    key={i}
                  >
                    <div>
                      <Image
                        className="w-full"
                        src="/exploring-1.png"
                        width={420}
                        height={296}
                        alt="exploring-1.png"
                      ></Image>
                    </div>
                    <div className="p-[20px] md:px-[30px] bg-black-white">
                      <div>
                        <h3 className="h3-sans">{title}</h3>
                        <p className="mt-[5px] flex items-center font-work-sans text-[16px]/[140%] before:content-[url('/heroAvatar.png')] before:w-[24px] before:h-[24px] before:mr-[12px]">
                          {author}
                        </p>
                      </div>
                      <div className="mt-[25px] flex flex-row justify-between items-center">
                        <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                          Price
                          <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                            {price} ETH
                          </span>
                        </p>
                        <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                          Highest Bid
                          <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                            {bid} ETH
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
                className="w-full button-transparent"
                href="rankings"
              >
                see all
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
