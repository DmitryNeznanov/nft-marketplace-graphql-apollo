import Image from "next/image"

export default function Guide() {
  return (
    <section className="py-[40px] lg:py-[80px]">
      <div className="max-w-sm md:container mx-auto">
        <article>
          <h2 className="h2-sans">How it works</h2>
          <p className="mt-[10px] p-sans capitalize">
            Find Out How To Get Started
          </p>
        </article>
        <section className="mt-[40px] lg:mt-[50px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] lg:gap-[30px]">
            {[
              [
                "Setup Your wallet",
                "Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top right corner.",
              ],
              [
                "Create Collection",
                "Upload your work and setup your collection. Add a description, social links and floor price.",
              ],
              [
                "Start Earning",
                "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
              ],
            ].map(([title, text], i) => {
              return (
                <article
                  className="p-[20px] md:px-[25px] md:pb-[30px] md:pt-[10px] lg:px-[30px] lg:pt-[30px] flex flex-row md:flex-col items-center gap-[20px] rounded-primary bg-black-white"
                  key={i}
                >
                  <div>
                    <Image
                      className="w-screen h-full max-w-[100px] md:max-w-max"
                      src="/wallet.svg"
                      width={250}
                      height={250}
                      alt="wallet.svg"
                    ></Image>
                  </div>
                  <div className="md:text-center">
                    <h3 className="font-work-sans font-semibold text-[16px]/[140%] lg:text-[22px]/[140%]">
                      {title}
                    </h3>
                    <p className="mt-[10px] font-work-sans font-normal text-[12px]/[140%] md:text-[12px]/[140%] lg:text-[16px]/[140%]">
                      {text}
                    </p>
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
