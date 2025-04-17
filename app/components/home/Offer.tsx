export default function Offer() {
  return (
    <section className="relative from-white/0 to-accent">
      <div className="absolute w-full h-full bg-[url('/offer.png')] -z-10"></div>
      <div className="contianer">
        <div className="max-w-sm md:max-w-full mx-auto">
          <article>
            <div className="w-max py-[10px] px-[20px] bg-black rounded-full">
              <p className="p-sans">Shroomie</p>
            </div>
            <h2 className="flex items-center font-work-sans font-semibold text-[38px]/[120%] lg:text-[51px]/[110%] before:content-[url('/heroAvatar.png')] before:w-[24px] before:h-[24px] before:mr-[12px]">
              Magic Mashrooms
            </h2>
            <div className="w-max p-[30px] rounded-[20px] bg-black-white/50 overflow-hidden">
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
      </div>
    </section>
  )
}
