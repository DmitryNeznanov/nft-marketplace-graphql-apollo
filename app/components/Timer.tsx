"use client"
export default function Timer({ expiredAt }: { expiredAt: string }) {
  function setTimer() {
    // TODO: useeffect?
    const countDownDate = Date.now() + new Date(expiredAt).getTime()

    const updateTimer = setInterval(() => {
      const now = new Date().getTime()

      const distance = countDownDate - now

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ).toString()

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      ).toString()
      const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString()

      document.getElementById("hours")!.innerHTML = hours.padStart(2, "0")
      document.getElementById("minutes")!.innerHTML = minutes.padStart(2, "0")
      document.getElementById("seconds")!.innerHTML = seconds.padStart(2, "0")

      if (distance < 0) {
        clearInterval(updateTimer)
      }
    }, 1000)
  }
  setTimer()

  return (
    <div className="w-full h-max md:w-max p-[30px] flex flex-col items-center md:items-start self-end rounded-primary bg-black-white/50 overflow-hidden order-3 md:order-3">
      <p className="font-space-mono font-normal text-[12px]/[120%]">
        Auction ends in:
      </p>
      <div className="mt-[10px] flex flex-row gap-x-[8px]">
        <div className="flex flex-col gap-y-[5px]">
          <p
            className="font-space-mono font-bold text-[38px]/[120%]"
            id="hours"
          >
            00
          </p>
          <p className="font-space-mono font-normal text-[12px]/[120%]">
            Hours
          </p>
        </div>
        <span className="font-space-mono font-bold text-[28px]/[140%]">:</span>
        <div className="flex flex-col gap-y-[5px]">
          <p
            className="font-space-mono font-bold text-[38px]/[120%]"
            id="minutes"
          >
            00
          </p>
          <p className="font-space-mono font-normal text-[12px]/[120%]">
            Minutes
          </p>
        </div>
        <span className="font-space-mono font-bold text-[28px]/[140%]">:</span>
        <div className="flex flex-col gap-y-[5px]">
          <p
            className="font-space-mono font-bold text-[38px]/[120%]"
            id="seconds"
          >
            00
          </p>
          <p className="font-space-mono font-normal text-[12px]/[120%]">
            Seconds
          </p>
        </div>
      </div>
    </div>
  )
}
