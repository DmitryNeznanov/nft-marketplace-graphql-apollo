import Image from "next/image"
import Link from "next/link"
export default function Hero() {
  return (
    <section className="py-[40px] md:py-[80px]">
      <div className="container">
        {/* large grid */}
        <div className=" flex flex-row justify-between gap-x-[30px]">
          {/* mobile grid */}
          <div className="max-w-sm mx-auto flex flex-col gap-y-[40px] md:contents">
            <div className="contents md:block max-w-[505px]">
              <article className="order-1 md:order-1">
                <h1 className="h1-sans">Discover digital art & Collect NFTs</h1>
                <p className="mt-[10px] md:mt-[20px] p-sans ">
                  NFT marketplace UI created with Anima for Figma. Collect, buy
                  and sell art from more than 20k NFT artists.
                </p>
              </article>
              <div className="md:mt-[30px] order-4 md:order-2">
                <Link
                  className="button-primary w-full md:w-max"
                  href="/marketplace"
                >
                  get started
                </Link>
              </div>
              <div className="md:mt-[30px] flex flex-row justify-between order-4 md:order-3">
                {[
                  ["240 ", "Auctions"],
                  ["240", "Total Sale"],
                  ["100", "Artists"],
                ].map(([title, text], i) => {
                  return (
                    <article key={i}>
                      <p className="font-space font-bold text-[22px]/[160%] lg:text-[28px]/[140%]">
                        {title}k+
                      </p>
                      <h3 className="font-sans font-normal text-[16px]/[140%] lg:text-[24px]/[160%] capitalize">
                        {text}
                      </h3>
                    </article>
                  )
                })}
              </div>
            </div>
            <div className="contents md:block md:max-w-[330px] lg:max-w-[510px]">
              <article className="order-3 md:order-4 rounded-[20px] overflow-hidden">
                <div>
                  <Image
                    className="w-screen max-h-[206px] md:max-h-[220px] lg:max-h-max"
                    src="/hero.png"
                    width={510}
                    height={400}
                    alt=""
                  ></Image>
                </div>
                <div className="p-[21px] bg-black-white">
                  <h3 className="h3-sans">Space Walking</h3>
                  <p className="mt-[10px] flex items-center before:content-[url('/heroAvatar.png')] font-sans text-[16px]/[140%] before:w-[24px] before:h-[24px] before:mr-[12px]">
                    Animakid
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
