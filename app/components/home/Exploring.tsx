import { GET_ITEMS_WITH_AUTHOR } from "@/graphql/queries/items/getItemsWithAuthor"
import apolloServer from "@/lib/apolloServer"
import Image from "next/image"
import Link from "next/link"

export default async function Exploring() {
  const { data } = await apolloServer.query({
    query: GET_ITEMS_WITH_AUTHOR,
    variables: { limit: 3 },
  })

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
            {data.items.map((item: NFT, i: number) => {
              return (
                <article
                  className="max-w-[330px] w-full rounded-primary overflow-hidden scale-primary"
                  key={i}
                >
                  <div>
                    <Link href={`/marketplace/${item.id}`}>
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
