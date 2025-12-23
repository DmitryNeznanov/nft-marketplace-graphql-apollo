"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Table({ users }: { users: User[] }) {
  const [data, setData] = useState(users)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  function sortByValue(key: keyof User) {
    if (sortKey === key) {
      if (sortOrder === "desc") {
        setSortOrder("asc")
        const sortedAsc = [...users].sort((a, b) =>
          compareValues(a[key], b[key], "asc")
        )
        setData(sortedAsc)
      } else if (sortOrder === "asc") {
        setSortKey(null)
        setSortOrder("desc")
        setData(users)
      }
    } else {
      setSortKey(key)
      setSortOrder("desc")
      const sortedDesc = [...users].sort((a, b) =>
        compareValues(a[key], b[key], "desc")
      )
      setData(sortedDesc)
    }
  }

  function compareValues(
    a: string | number,
    b: string | number,
    order: "asc" | "desc"
  ): number {
    if (typeof a === "number" && typeof b === "number") {
      return order === "desc" ? b - a : a - b
    }

    if (typeof a === "string" && typeof b === "string") {
      return order === "desc" ? b.localeCompare(a) : a.localeCompare(b)
    }

    return 0
  }

  function SortIndicator({
    isActive,
    direction,
  }: {
    isActive: boolean
    direction: "asc" | "desc"
  }) {
    if (!isActive) return null
    return (
      <span className="absolute ml-[4px]">
        {direction === "asc" ? "▲" : "▼"}
      </span>
    )
  }

  return (
    <table className="w-full border-spacing-y-[20px] border-separate -mb-[20px]">
      <thead>
        <tr className="text-gray *:first:pl-[20px] *:first:rounded-l-primary *:last:rounded-r-primary [&>th,td]:border-black-white [&>th,td]:text-start [&>th,td]:py-[12px] [&>th,td]:first:border [&>th,td]:last:border [&>th,td]:first:border-r-0 [&>th,td]:last:border-l-0 [&>th,td]:not-first:not-last:border-t [&>th,td]:not-first:not-last:border-b">
          <th
            className={`p-space`}
            scope="col"
          >
            <span className="lg:py-[4px] lg:px-[10px]">#</span>
          </th>
          <th
            className="p-space"
            scope="col"
          >
            <button
              className=" hover:cursor-pointer relative"
              onClick={() => {
                sortByValue("name")
              }}
            >
              Artist
              <SortIndicator
                isActive={sortKey === "name"}
                direction={sortOrder}
              />
            </button>
          </th>
          <th
            className="p-space hidden md:table-cell"
            scope="col"
          >
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                sortByValue("change")
              }}
            >
              Change
              <SortIndicator
                isActive={sortKey === "change"}
                direction={sortOrder}
              />
            </button>
          </th>
          <th
            className="p-space hidden lg:table-cell"
            scope="col"
          >
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                sortByValue("sold")
              }}
            >
              NFTs Sold
              <SortIndicator
                isActive={sortKey === "sold"}
                direction={sortOrder}
              />
            </button>
          </th>
          <th
            className="p-space"
            scope="col"
          >
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                sortByValue("volume")
              }}
            >
              Volume
              <SortIndicator
                isActive={sortKey === "volume"}
                direction={sortOrder}
              />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((user: User, i: number) => {
          return (
            <tr
              className="bg-black-white *:first:rounded-l-primary *:last:rounded-r-primary *:first:pl-[20px] [&>th,td]:py-[13px] md:[&>th,td]:py-[14.5px] lg:[&>th,td]:py-[12px] [&>th,td]:text-start hover:scale-[99%] transition duration-350"
              key={i}
            >
              <th className="p-space text-gray">
                <span className="lg:rounded-full lg:bg-black lg:py-[4px] lg:px-[10px]">
                  {i + 1}
                </span>
              </th>
              <td
                className="flex items-center"
                scope="row"
              >
                <Link
                  href={`/users/${user.id.toString()}`}
                  className="flex items-center hover:underline-primary"
                >
                  <Image
                    className="max-w-[24px] max-h-[24px] lg:max-w-[60px] lg:max-h-[60px] rounded-full"
                    src={user.profileImage}
                    width={60}
                    height={60}
                    alt={user.profileImage}
                  ></Image>
                  <h2 className="ml-[12px] lg:ml-[20px] p-sans-xl font-normal md:font-semibold">
                    {user.name}
                  </h2>
                </Link>
              </td>
              <td
                className={`hidden md:table-cell p-space ${
                  user.change < 0 ? "text-red-700" : "text-[#00AC4F]"
                }`}
              >
                {user.change}%
              </td>
              <td className="hidden lg:table-cell p-space">{user.sold}</td>
              <td className="font-work-sans text-[12px]/[110%] md:text-[16px]/[110%]">
                {user.volume} ETH
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
