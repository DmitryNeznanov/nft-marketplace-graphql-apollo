import Image from "next/image"
import Link from "next/link"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NFT Marketplace | Wallet",
  description: "NFT Marketplace Wallet page",
}

export default function Wallet() {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:gap-x-[40px] lg:gap-x-[60px]">
        <div className="md:max-w-[50%]">
          <Image
            className="w-screen h-screen max-h-[232px] md:max-h-[615px] lg:max-h-[691px]"
            src="/signup.png"
            width={610}
            height={691}
            alt="signup.png"
          ></Image>
        </div>
        <div className="max-w-sm mx-auto md:mx-0 md:max-w-[50%]">
          <div className="pt-[30px] pb-[40px] md:pt-0 md:pb-0 flex flex-col">
            <article className="max-w-[460px]">
              <h2 className="h2-sans">Connect Wallet</h2>
              <p className="mt-[20px] p-sans-xl capitalize">
                Choose a wallet you want to connect. There are several wallet
                providers.
              </p>
            </article>
            <div>
              <ul className="mt-[30px] md:mt-[40px] flex flex-col gap-y-[20px]">
                {[
                  ["Metamask", "https://metamask.io/", "Metamask.svg"],
                  [
                    "Wallet Connect",
                    "https://walletconnect.network/",
                    "WalletConnect.svg",
                  ],
                  ["Coinbase", "https://www.coinbase.com/", "Coinbase.svg"],
                ].map(([text, href, image], i) => {
                  return (
                    <li
                      className="w-full md:max-w-[320px]"
                      key={i}
                    >
                      <Link
                        className={`pr-[40px] pl-[20px] py-[14px] border border-accent rounded-primary flex flex-row items-center gap-x-[20px] bg-black-white text-[22px] font-work-sans font-semibold hover:scale-[102.5%] duration-200`}
                        href={href}
                        target="_blank"
                      >
                        <Image
                          src={`/icons/${image}`}
                          width={32}
                          height={32}
                          alt={image}
                        ></Image>
                        {text}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
