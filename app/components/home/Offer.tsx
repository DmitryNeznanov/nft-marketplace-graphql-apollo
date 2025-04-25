import Link from "next/link"

export default function Offer() {
  return (
    <section className="relative pb-[40px] pt-[120px] md:pt-[360px] md:pb-[60px] bg-gradient-to-b from-white/0 to-accent">
      <div className="absolute left-0 top-0 w-full h-full bg-[url('/offer-mobile.png')] md:bg-[url('/offer-laptop.png')] lg:bg-[url('/offer-desktop.png')] bg-cover bg-center -z-[9999]"></div>
      <div className="max-w-sm md:container mx-auto">
        <article className="flex flex-col gap-[30px] md:flex-row justify-between">
          <div className="contents md:flex flex-col gap-[30px]">
            <div className="w-max py-[10px] px-[20px] bg-black rounded-full order-1">
              <p className="flex items-center p-sans before:content-[url('/heroAvatar.png')] before:w-[24px] before:h-[24px] before:mr-[12px]">
                Shroomie
              </p>
            </div>
            <h2 className="font-work-sans font-semibold text-[38px]/[120%] lg:text-[51px]/[110%] order-2">
              Magic Mashrooms
            </h2>
            <div className="order-4 md:order-3">
              <Link
                className="w-full md:w-max button-white before:content-[url('/icons/eye-accent.svg')]"
                href="#"
              >
                see NFT
              </Link>
            </div>
          </div>
          <div className="w-full h-max md:w-max p-[30px] flex flex-col items-center md:items-start self-end rounded-primary bg-black-white/50 overflow-hidden order-3 md:order-3">
            <p className="font-space-mono font-normal text-[12px]/[120%]">
              Auction ends in:
            </p>
            <div className="mt-[10px] flex flex-row gap-x-[8px]">
              <div className="flex flex-col gap-y-[5px]">
                <p className="font-space-mono font-bold text-[38px]/[120%]">
                  59
                </p>
                <p className="font-space-mono font-normal text-[12px]/[120%]">
                  Hours
                </p>
              </div>
              <span className="font-space-mono font-bold text-[28px]/[140%]">
                :
              </span>
              <div className="flex flex-col gap-y-[5px]">
                <p className="font-space-mono font-bold text-[38px]/[120%]">
                  59
                </p>
                <p className="font-space-mono font-normal text-[12px]/[120%]">
                  Minutes
                </p>
              </div>
              <span className="font-space-mono font-bold text-[28px]/[140%]">
                :
              </span>
              <div className="flex flex-col gap-y-[5px]">
                <p className="font-space-mono font-bold text-[38px]/[120%]">
                  59
                </p>
                <p className="font-space-mono font-normal text-[12px]/[120%]">
                  Seconds
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
