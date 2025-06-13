"use client"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [term, setTerm] = useState(searchParams.get("q")?.toString() || "")
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams)
      if (term) {
        params.set("q", term)
      } else {
        params.delete("q")
      }
      replace(`${pathname}?${params.toString()}`)
    }, 150)

    return () => clearTimeout(delayDebounce)
  }, [term, pathname, replace, searchParams])
  return (
    <form>
      <div className="pr-[20px] flex flex-row items-center justify-between gap-x-[26px] border border-gray rounded-primary">
        <input
          className="w-full p-[20px] outline-none p-sans placeholder:text-gray"
          type="text"
          placeholder="Search your favourite NFTs"
          onChange={(e) => setTerm(e.target.value)}
          defaultValue={searchParams.get("q")?.toString()}
        />
        {/* ISSUE: sort on button click ? */}
        <button className="-m-[10px] p-[10px] block hover:cursor-pointer">
          <Image
            src="/icons/search.svg"
            width={24}
            height={24}
            alt="search.svg"
          />
        </button>
      </div>
    </form>
  )
}
