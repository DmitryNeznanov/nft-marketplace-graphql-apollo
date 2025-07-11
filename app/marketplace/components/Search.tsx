"use client"

import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [query, setQuery] = useState(searchParams.get("q") || "")

  useEffect(() => {
    const debounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams)

      if (query.trim()) {
        params.set("q", query.trim())
      } else {
        params.delete("q")
      }

      params.set("page", "1")

      replace(`${pathname}?${params.toString()}`)
    }, 150)

    return () => clearTimeout(debounce)
  }, [query, pathname, replace, searchParams])

  function handleClear() {
    setQuery("")
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="pr-[20px] flex flex-row items-center justify-between gap-x-[10px] border border-gray rounded-primary">
        <input
          className="w-full p-[20px] outline-none p-sans placeholder:text-gray"
          type="text"
          placeholder="Search your favourite NFTs"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
          >
            <Image
              src="/icons/closeMobileMenu.svg"
              width={20}
              height={20}
              alt="clear"
            />
          </button>
        )}

        <button
          type="submit"
          className="-m-[10px] p-[10px]"
        >
          <Image
            src="/icons/search.svg"
            width={24}
            height={24}
            alt="Search"
          />
        </button>
      </div>
    </form>
  )
}
