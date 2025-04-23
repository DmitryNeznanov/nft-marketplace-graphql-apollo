import Image from "next/image"
import Link from "next/dist/client/app-dir/link"
export default function Footer() {
  return (
    <footer className="py-[40px] bg-black-white">
      <div className="container">
        <section className="xl:w-auto mx-auto md:mx-0 p-[30px] flex flex-col xl:flex-row xl:justify-between gap-y-[30px]">
          <section>
            <article>
              <Link href="/">
                <Image
                  className="w-[182px] h-[24px] lg:w-auto lg:h-auto p-[10px] -m-[10px] box-content"
                  src="/logo.svg"
                  width={243}
                  height={32}
                  alt="logo.svg"
                  priority={true}
                ></Image>
              </Link>
              <p className="max-w-[240px] md:max-w-max xl:max-w-[240px] mt-[20px] md:mt-[30px] p-sans text-gray">
                NFT marketplace UI created with Anima for Figma.
              </p>
            </article>
            <div className="mt-[20px]">
              <p className="p-sans text-gray">Join our community</p>
              <ul className="mt-[15px] flex flex-row gap-x-[10px]">
                {[
                  ["https://discord.com", "discord.svg"],
                  ["https://youtube.com", "youtube.svg"],
                  ["https://x.com", "x.svg"],
                  ["https://instagram.com", "instagram.svg"],
                ].map(([href, src], i) => {
                  return (
                    <li
                      className="hover:scale-110"
                      key={i}
                    >
                      <Link
                        href={href}
                        target="_blank"
                      >
                        <Image
                          src={`/icons/${src}`}
                          width={32}
                          height={32}
                          alt={src}
                        ></Image>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
          <section>
            <h3 className="h3-space">Explore</h3>
            <ul className="mt-[25px] flex flex-col gap-y-[20px]">
              {[
                ["marketplace", "Marketplace"],
                ["rankings", "Rankings"],
                ["wallet", "Connect a wallet"],
              ].map(([href, title], i) => {
                return (
                  <li
                    className="w-max p-sans text-gray"
                    key={i}
                  >
                    <Link href={href}>{title}</Link>
                  </li>
                )
              })}
            </ul>
          </section>
          <section className="">
            <h3 className="h3-space">Join our weekly digest</h3>
            <p className="max-w-[330px] md:max-w-max xl:max-w-[330px] mt-[20px] md:mt-[25px] p-sans text-gray">
              Get exclusive promotions & updates straight to your inbox.
            </p>
            <form className="mt-[20px]">
              <div className="max-w-[420px] flex flex-col sm:flex-row sm:bg-white rounded-[20px]">
                <input
                  className="py-[12px] sm:p-[20px] px-[20px] bg-white w-full sm:bg-transparent border border-gray sm:border-0 p-sans text-black outline-none rounded-[20px] sm:rounded-[0]"
                  type="text"
                  placeholder="Enter your email here"
                />
                <button className="mt-[16px] sm:mt-0 w-full py-[12px] sm:py-0 sm:w-max sm:ml-auto button-primary">
                  subscribe
                </button>
              </div>
            </form>
          </section>
        </section>
        <hr className="w-full h-[1px] text-gray" />
        <p className="mt-[20px] p-sans text-gray">
          Ⓒ NFT Market. Use this template freely.
        </p>
      </div>
    </footer>
  )
}
