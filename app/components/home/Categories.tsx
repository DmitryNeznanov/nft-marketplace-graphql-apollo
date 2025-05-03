import Image from "next/image"
// import { data } from "@/app/mongodb/mongodb"

// const posts = await data.findOne({})
// const qwe = await posts
// console.log(qwe)

export default function Categories() {
  return (
    <section className="py-[40px] lg:py-[80px]">
      <div className="max-w-sm md:container mx-auto">
        <div>
          <h2 className="h2-sans">Browse Categories</h2>
        </div>
        <section className="mt-[40px] lg:mt-[60px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] md:gap-[30px]">
            {[
              ["Art"],
              ["Collectibles"],
              ["Music"],
              ["Photography"],
              ["Video"],
              ["Utility"],
              ["Sport"],
              ["Virtual Worlds"],
            ].map(([title], i) => {
              return (
                // FIXME: fix text overflow
                <article
                  className="rounded-primary overflow-hidden"
                  key={i}
                >
                  <div className="relative flex items-center justify-center ">
                    <div className="w-full h-full absolute bg-white/10"></div>
                    <div className="flex items-center justify-center before:content-[url('/icons/basketball.svg')] before:absolute">
                      <Image
                        className="w-full blur-[8px] -z-10"
                        src="/categories-1.png"
                        width={240}
                        height={240}
                        alt="categories-1.png"
                      ></Image>
                    </div>
                  </div>
                  <div className="bg-black-white pt-[20px] pb-[25px] md:px-[30px] md:pb-[45px] lg:pb-[25px] px-[20px] lg:px-[30px]">
                    <h3 className="font-work-sans font-bold text-[16px]/[140%] lg:text-[22px]/[140%]">
                      {title}
                    </h3>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </section>
  )
}
