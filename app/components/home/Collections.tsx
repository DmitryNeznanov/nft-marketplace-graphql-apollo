import Image from "next/image"

export default function Collections() {
  return (
    <section className="py-[40px] lg:py-[80px]">
      <div className="max-w-sm md:container mx-auto">
        <article>
          <h2 className="h2-sans">Trending Collection</h2>
          <p className="mt-[10px] p-sans">
            Checkout Our Weekly Updated Trending Collection.
          </p>
        </article>
        <section className="mt-[40px] lg:mt-[60px] flex flex-col justify-center md:flex-row gap-x-[30px] *:nth-of-type-[3]:hidden *:nth-of-type-[2]:hidden md:*:nth-of-type-[2]:block xl:*:nth-of-type-[3]:block">
          {[
            ["DSGN Animals", "Magic Mushrooms", "1025"],
            ["Disco Machines", "MrFox", "805"],
            ["Shroomie", "BeKind2Robots", "975"],
          ].map(([title, author, imageCount], i) => {
            return (
              <article
                className="md:max-w-[330px]"
                key={i}
              >
                <div className="flex flex-col gap-[15px]">
                  <div>
                    <Image
                      className="w-full rounded-primary"
                      src="/machine-1.png"
                      width={330}
                      height={330}
                      alt="machine-1.png"
                    ></Image>
                  </div>
                  <div className="grid grid-cols-3 gap-[15px]">
                    <Image
                      className="w-full rounded-primary"
                      src="/machine-1.png"
                      width={100}
                      height={100}
                      alt="machine-1.png"
                    ></Image>
                    <Image
                      className="w-full rounded-primary"
                      src="/machine-1.png"
                      width={100}
                      height={100}
                      alt="machine-1.png"
                    ></Image>
                    <div className="w-full flex items-center justify-center bg-accent rounded-primary">
                      <p className="p-space-xl font-bold">{imageCount}+</p>
                    </div>
                  </div>
                </div>
                <div className="mt-[15px]">
                  <h3 className="h3-sans">{title}</h3>
                  <p className="mt-[10px] flex items-center before:content-[url('/heroAvatar.png')] before:w-[24px] before:h-[24px] before:mr-[12px]">
                    {author}
                  </p>
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </section>
  )
}
