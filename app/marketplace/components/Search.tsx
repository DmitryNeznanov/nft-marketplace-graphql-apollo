"use client"

import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [query, setQuery] = useState(searchParams.get("q") || "")

  const handleSearch = useCallback(
    (value: string) => {
      const currentQ = searchParams.get("q") || ""
      if (value.trim() === currentQ.trim()) return

      const params = new URLSearchParams(searchParams.toString())

      if (value.trim()) {
        params.set("q", value.trim())
      } else {
        params.delete("q")
      }

      params.set("page", "1")
      replace(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, replace]
  )
  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch(query)
    }, 350)

    return () => clearTimeout(debounce)
  }, [query, handleSearch])

  function handleClear() {
    setQuery("")
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch(query)
      }}
    >
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
            className="hover:cursor-pointer"
            type="button"
            onClick={handleClear}
          >
            <Image
              src="/icons/cross.svg"
              width={20}
              height={20}
              alt="clear"
            />
          </button>
        )}

        <button
          className="-m-[10px] p-[10px] hover:cursor-pointer"
          type="submit"
          onClick={() => {
            handleSearch(query)
          }}
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
