import { GET_ITEM_WITH_AUTHOR } from "@/graphql/queries/items/getItemWithAuthor"
import apolloServer from "@/lib/apolloServer"
import Image from "next/image"
import Link from "next/link"
export default async function Hero() {
  const { data } = await apolloServer.query({
    query: GET_ITEM_WITH_AUTHOR,
  })

  return (
    <section className="py-[40px] md:py-[80px]">
      <div className="max-w-sm md:container mx-auto">
        <div className="flex flex-col md:flex-row gap-x-[30px] gap-y-[40px]">
          <div className="contents w-full md:max-w-[50%] md:block">
            <article className="order-1 md:order-1">
              <h1 className="h1-sans">Discover Digital Art & Collect NFTs</h1>
              <p className="mt-[10px] md:mt-[20px] p-sans-xl capitalize">
                NFT Marketplace UI created with Anima for Figma. Collect, buy
                and sell art from more than 20k NFT artists.
              </p>
            </article>
            <div className="md:mt-[30px] order-4 md:order-2">
              <Link
                className="button-primary w-full before:content-[url('/icons/rocketLaunch.svg')] md:w-max"
                href="/signup"
              >
                get started
              </Link>
            </div>
            <div className="md:mt-[30px] max-w-[90%] flex flex-row justify-between order-4 md:order-3">
              {/* ISSUE: dynamic stat? */}
              {[
                ["240", "Auctions"],
                ["240", "Total Sale"],
                ["100", "Artists"],
              ].map(([title, text], i) => {
                return (
                  <article key={i}>
                    <p className="font-space-mono font-bold text-[22px]/[160%] lg:text-[28px]/[140%]">
                      {title}k+
                    </p>
                    <h3 className="font-work-sans font-normal text-[16px]/[140%] lg:text-[24px]/[160%] capitalize">
                      {text}
                    </h3>
                  </article>
                )
              })}
            </div>
          </div>
          {/* ISSUE: 3D nft? */}
          <div className="contents md:block w-full md:max-w-[50%]">
            <article className="order-3 md:order-4 rounded-primary overflow-hidden scale-primary">
              <Link href={`/marketplace/${data.item.id}`}>
                <Image
                  src="/hero.png"
                  width={510}
                  height={400}
                  alt="hero.png"
                ></Image>
              </Link>
              <div className="p-[21px] bg-black-white">
                <Link
                  className="w-max block"
                  href={`/marketplace/${data.item.id}`}
                >
                  <h3 className="h3-sans hover:hover:underline-primary">
                    {data.item.title}
                  </h3>
                </Link>
                <Link
                  className={`w-max mt-[5px] flex items-center font-work-sans text-[16px]/[140%] hover:underline-primary`}
                  href={`/users/${data.item.author}`}
                >
                  <Image
                    className="mr-[12px] rounded-full"
                    src={data.item.itemAuthor.profileImage}
                    width={24}
                    height={24}
                    alt="userProfileImage"
                  ></Image>
                  <p className="p-space">{data.item.itemAuthor.name}</p>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
