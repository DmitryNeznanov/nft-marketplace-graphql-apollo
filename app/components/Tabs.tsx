"use client"
import { useState } from "react"
export default function Tabs() {
  const [index, setIndex] = useState(0)

  function handleClick(index: number) {
    setIndex(index)
  }
  return (
    <div className="border-t border-black-white">
      <div className="max-w-sm md:container mx-auto">
        <ul className="flex flex-row">
          {["NFTs"].map((title, i) => {
            return (
              <li
                className={`w-full pb-[14px] pt-[24px] h4-sans text-center hover:cursor-pointer ${
                  index === i
                    ? "border-b-[2px] border-gray text-white pointer-events-none"
                    : "text-gray"
                }`}
                key={i}
                onClick={() => {
                  handleClick(i)
                }}
              >
                {title}
                <span
                  className={`ml-[16px] px-[10px] py-[5px] p-space text-white rounded-full ${
                    index === i ? "bg-gray" : "bg-black-white"
                  }`}
                >
                  {title.length}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
