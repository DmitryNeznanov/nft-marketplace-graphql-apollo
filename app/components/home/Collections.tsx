import Image from "next/image"

export default function Collections() {
  return (
    <section className="py-[40px] lg:py-[80px]">
      <div className="container">
        <div className="flex flex-col items-center md:items-start">
          <article className="">
            <h2 className="h2-sans">Trending Collection</h2>
            <p className="mt-[10px] p-sans">
              Checkout Our Weekly Updated Trending Collection.
            </p>
          </article>
          <section className="mt-[40px] lg:mt-[60px] flex flex-col items-center w-max mx-auto md:flex-row gap-x-[30px] *:nth-of-type-[3]:hidden *:nth-of-type-[2]:hidden md:*:nth-of-type-[2]:block xl:*:nth-of-type-[3]:block">
            {[
              ["DSGN Animals", "Magic Mushrooms", "1025"],
              ["Disco Machines", "MrFox", "805"],
              ["Shroomie", "BeKind2Robots", "975"],
            ].map(([title, author, imageCount], i) => {
              return (
                <article
                  className=""
                  key={i}
                >
                  <div className="max-w-[330px] flex flex-col gap-[15px]">
                    <div className="">
                      <Image
                        className="w-screen max-h-[330px] rounded-[20px]"
                        src="/machine-1.png"
                        width={330}
                        height={330}
                        alt="machine-1.png"
                      ></Image>
                    </div>
                    <div className="flex flex-row gap-[15px]">
                      <Image
                        className="max-w-[33%] rounded-[20px]"
                        src="/machine-1.png"
                        width={100}
                        height={100}
                        alt="machine-1.png"
                      ></Image>
                      <Image
                        className="max-w-[33%] rounded-[20px]"
                        src="/machine-1.png"
                        width={100}
                        height={100}
                        alt="machine-1.png"
                      ></Image>
                      <div className="w-full max-w-[33%] flex items-center justify-center bg-accent font-space font-bold text-[16px]/[140%] md:text-[22px]/[160%] rounded-[20px]">
                        <p className="">{imageCount}+</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[15px]">
                    <h3 className="h3-sans">{title}</h3>
                    <p className="mt-[10px]  flex items-center before:content-[url('/heroAvatar.png')] before:w-[24px] before:h-[24px] before:mr-[12px]">
                      {author}
                    </p>
                  </div>
                </article>
              )
            })}
          </section>
        </div>
      </div>
    </section>
  )
}
