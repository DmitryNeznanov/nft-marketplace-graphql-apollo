"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const q = searchParams.get("q") || ""
  const currentPage = Number(searchParams.get("page"))
  const params = new URLSearchParams(searchParams)
  const pathName = usePathname()
  function changePage(newPage: number) {
    params.set("page", newPage.toString())
    if (q) params.set("q", q)
    router.push(`${pathName}?${params.toString()}`)
  }

  useEffect(() => {
    if (!currentPage) {
      const params = new URLSearchParams(searchParams)
      params.set("page", "1")
      router.replace(`${pathName}?${params.toString()}`)
    }
  }, [searchParams, router, pathName, currentPage])
  return (
    <div className="max-w-sm md:container mx-auto">
      <div className="flex flex-col xl:flex-row gap-[16px] justify-center">
        <div className="flex flex-row justify-evenly items-center">
          <button
            className={`block before:hidden ${
              currentPage === 1
                ? "button-transparent pointer-events-none"
                : "button-primary"
            }`}
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            prev
          </button>
          <button
            className={`block xl:hidden before:hidden ${
              currentPage === totalPages
                ? "button-transparent pointer-events-none"
                : "button-primary"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            next
          </button>
        </div>
        <div className="flex flex-wrap gap-x-[16px] gap-y-[8px] items-center justify-center">
          <div className={`contents ${currentPage <= 4 ? "hidden" : "block"}`}>
            <button
              className="w-[38px] h-[38px] p-space rounded-full hover:cursor-pointer bg-black"
              onClick={() => {
                changePage(1)
              }}
              disabled={currentPage === 1}
            >
              1
            </button>
            <span>...</span>
          </div>
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1
            return (
              <button
                className={` w-[38px] h-[38px] p-space rounded-full hover:cursor-pointer ${
                  currentPage === i + 1 ? "bg-accent" : "bg-black"
                }
                      ${
                        Math.abs(currentPage - page) >= 4 ? "hidden" : "block"
                      }`}
                key={i}
                onClick={() => {
                  changePage(i + 1)
                }}
              >
                {i + 1}
              </button>
            )
          })}
          <div
            className={`contents ${
              currentPage > totalPages - 4 ? "hidden" : "block"
            }`}
          >
            <span>...</span>
            <button
              className="w-[38px] h-[38px] p-space rounded-full hover:cursor-pointer bg-black"
              onClick={() => {
                changePage(totalPages)
              }}
            >
              {totalPages}
            </button>
          </div>
        </div>
        <button
          className={`hidden xl:block before:hidden ${
            currentPage === totalPages
              ? "button-transparent pointer-events-none"
              : "button-primary"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          next
        </button>
      </div>
    </div>
  )
}
