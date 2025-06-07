import Link from "next/link"
import Timer from "../Timer"
import NFT from "@/app/models/NFT"
import User from "@/app/models/User"
import Image from "next/image"

export default async function Offer() {
  const item = (await NFT.findOne()) as NFT
  const itemAuthor = (await User.findById(item.author)) as User

  return (
    <section className="relative pb-[40px] pt-[120px] md:pt-[360px] md:pb-[60px] bg-gradient-to-b from-white/0 to-accent">
      <Image
        className="absolute left-0 top-0 w-full h-full -z-[9999]"
        src={item.image}
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
                href={`/users/${itemAuthor._id}`}
              >
                <Image
                  className="rounded-full"
                  src={itemAuthor.profileImage}
                  width={24}
                  height={24}
                  alt="profile image"
                ></Image>
                <p className="ml-[12px] flex items-center p-sans">
                  {itemAuthor.name}
                </p>
              </Link>
            </div>
            <h2 className="font-work-sans font-semibold text-[38px]/[120%] lg:text-[51px]/[110%] order-2">
              {item.title}
            </h2>
            <div className="order-4 md:order-3">
              <Link
                className="w-full md:w-max button-white before:content-[url('/icons/eye-accent.svg')]"
                href={`/marketplace/${item._id}`}
              >
                see NFT
              </Link>
            </div>
          </div>
          <Timer expiredAt={item.postTime}></Timer>
        </article>
      </div>
    </section>
  )
}
