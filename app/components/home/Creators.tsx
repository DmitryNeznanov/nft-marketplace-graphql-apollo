import Image from "next/image"
import Link from "next/link"

export default function Creators() {
  return (
    <section className="py-[40px] md:py-[80px]">
      <div className="max-w-sm md:container">
        <article className="flex flex-row justify-between">
          <div>
            <h2 className="h2-sans">Top Creators</h2>
            <p className="mt-[10px] p-sans capitalize">
              Checkout Top Rated Creators on the NFT Marketplace
            </p>
          </div>
          <div className="hidden md:block self-end">
            <Link
              className="button-transparent before:content-[url('/icons/rocketLaunch-accent.svg')]"
              href="rankings"
            >
              View Rankings
            </Link>
          </div>
        </article>
        <section className="mt-[40px] lg:mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-[25px] *:[&:nth-child(n+6)]:hidden md:*:[&:nth-child(n+6)]:flex md:*:[&:nth-child(n+7)]:hidden lg:md:*:[&:nth-child(n+7)]:flex lg:*:[&:nth-child(n+1)]:flex">
            {[
              ["Keepitreal", "25.84"],
              ["DigiLab", "38.13"],
              ["GravityOne", "78.23"],
              ["Juanie", "23.79"],
              ["BlueWhale", "25.76"],
              ["Mr Fox", "94.25"],
              ["Shroomie", "17.97"],
              ["Robotica", "26.78"],
              ["RustyRobot", "26.48"],
              ["Animakid", "97.26"],
              ["Dotgu", "49.78"],
              ["Ghiblier", "67.49"],
            ].map(([title, sales], i) => {
              return (
                <article
                  className="w-full p-[20px] flex flex-row lg:flex-col items-center bg-black-white rounded-primary relative"
                  key={i}
                >
                  <div className="w-[30px] h-[30px] flex items-center justify-center bg-black rounded-full absolute m-[12px] lg:m-[20px] top-0 left-0">
                    <p className="p-mono text-gray">{i + 1}</p>
                  </div>
                  <div>
                    <Image
                      className="max-w-[60px] max-h-[60px] lg:max-w-max lg:max-h-max lg:mx-auto"
                      src="/creators-1.png"
                      width={120}
                      height={120}
                      alt="creators-1.png"
                    ></Image>
                  </div>
                  <div className="ml-[20px] lg:ml-0 lg:mt-[20px] flex flex-col lg:items-center">
                    <h3 className="h3-sans">{title}</h3>
                    <p className="mt-[5px] p-sans text-gray">
                      Total sales:{" "}
                      <span className="p-space text-white uppercase">
                        {sales} ETH
                      </span>
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="mt-[40px] md:hidden">
            <Link
              className="w-full button-transparent before:content-[url('/icons/rocketLaunch-accent.svg')]"
              href="rankings"
            >
              View Rankings
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}
