"use client"

import { useEffect, useState } from "react"

export default function Timer({ expiredAt }: { expiredAt: string }) {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  })
  useEffect(() => {
    const countDownDate = Date.now() + new Date(expiredAt).getTime()

    function updateTimer() {
      const now = new Date().getTime()

      const distance = countDownDate - now

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      setTime({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      })

      if (distance <= 0) {
        setTime({ hours: "00", minutes: "00", seconds: "00" })
      }
    }
    updateTimer()

    const timer = setInterval(updateTimer, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [expiredAt])

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
            {time.hours}
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
            {time.minutes}
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
            {time.seconds}
          </p>
          <p className="font-space-mono font-normal text-[12px]/[120%]">
            Seconds
          </p>
        </div>
      </div>
    </div>
  )
}
