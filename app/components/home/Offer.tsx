import Link from "next/link"
import Timer from "../Timer"
import Image from "next/image"
import apolloServer from "@/lib/apolloServer"
import { GET_ITEM_WITH_AUTHOR } from "@/graphql/queries/items/getItemWithAuthor"

export default async function Offer() {
  const { data } = await apolloServer.query({ query: GET_ITEM_WITH_AUTHOR })

  return (
    <section className="relative pb-[40px] pt-[120px] md:pt-[360px] md:pb-[60px] bg-gradient-to-b from-white/0 to-accent">
      <Image
        className="absolute left-0 top-0 w-full h-full -z-[9999]"
        src={data.item.image}
        fill
        alt="nftImage"
      ></Image>
      {/* <div className="absolute left-0 top-0 w-full h-full bg-[url('/offer-mobile.png')] md:bg-[url('/offer-laptop.png')] lg:bg-[url('/offer-desktop.png')] bg-cover bg-center -z-[9999]"></div> */}
      <div className="max-w-sm md:container mx-auto">
        <article className="flex flex-col gap-[30px] md:flex-row justify-between">
          <div className="contents md:flex flex-col gap-[30px]">
            <div className="w-max py-[10px] px-[20px] bg-black rounded-full order-1">
              <Link
                className="flex flex-row hover:underline-primary"
                href={`/users/${data.item.author}`}
              >
                <Image
                  className="rounded-full"
                  src={data.item.itemAuthor.profileImage}
                  width={24}
                  height={24}
                  alt="profile image"
                ></Image>
                <p className="ml-[12px] flex items-center p-sans">
                  {data.item.itemAuthor.name}
                </p>
              </Link>
            </div>
            <h2 className="font-work-sans font-semibold text-[38px]/[120%] lg:text-[51px]/[110%] order-2">
              {data.item.title}
            </h2>
            <div className="order-4 md:order-3">
              <Link
                className="w-full md:w-max button-white before:content-[url('/icons/eye-accent.svg')]"
                href={`/marketplace/${data.item.id}`}
              >
                see NFT
              </Link>
            </div>
          </div>
          <Timer expiredAt={data.item.postTime}></Timer>
        </article>
      </div>
    </section>
  )
}
