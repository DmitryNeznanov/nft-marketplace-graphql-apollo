"use client"

import Pagination from "@/app/components/Pagination"
import { GET_ITEMS_BY_AUTHOR_ID_WITH_AUTHOR } from "@/graphql/queries/items/getItemsByAuthorIdWithAuthor"
import { useQuery } from "@apollo/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
export default function UserContent({
  offset,
  itemsPerPage,
  dataLenght,
}: {
  offset: number
  itemsPerPage: number
  dataLenght: number
}) {
  const params = useParams()
  const {
    data: itemsData,
    loading,
    error,
  } = useQuery(GET_ITEMS_BY_AUTHOR_ID_WITH_AUTHOR, {
    variables: { id: params?.id, offset: offset },
  })
  const totalPages = Math.ceil(dataLenght / itemsPerPage)
  console.log(totalPages)

  return (
    <section className="bg-black-white">
      <div className="py-[80px] max-w-sm md:container mx-auto">
        {loading && <h2 className="h1-sans">Loading items...</h2>}
        {error && <h2 className="h1-sans">Error: {error.message}</h2>}
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {itemsData.itemsByAuthorId.map((item: NFT, i: number) => {
            return (
              <article
                className="max-w-[330px] w-full rounded-primary overflow-hidden scale-primary"
                key={i}
              >
                <div>
                  <Link href={`/marketplace/${item.id}`}>
                    <Image
                      className="w-full"
                      src={item.image}
                      width={420}
                      height={296}
                      alt={`item-${i + 1}`}
                    ></Image>
                  </Link>
                </div>
                <div className="p-[20px] md:px-[30px] bg-black">
                  <div>
                    <Link
                      className="w-max block"
                      href={`/marketplace/${item.id}`}
                    >
                      <h3 className="h3-sans hover:hover:underline-primary">
                        {item.title}
                      </h3>
                    </Link>
                    <Link
                      className={`w-max mt-[5px] flex items-center font-work-sans text-[16px]/[140%] hover:underline-primary`}
                      href={`/users/${item.author}`}
                    >
                      <Image
                        className="mr-[12px] rounded-full"
                        src={item.itemAuthor.profileImage}
                        width={24}
                        height={24}
                        alt="userProfileImage"
                      ></Image>
                      <p className="p-space">{item.itemAuthor.name}</p>
                    </Link>
                  </div>
                  <div className="mt-[25px] flex flex-row justify-between items-center">
                    <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                      Price
                      <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                        {item.price} ETH
                      </span>
                    </p>
                    <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                      Highest Bid
                      <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                        {item.bid} ETH
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="mt-[25px] md:mt-[45px]">
          <Pagination totalPages={totalPages}></Pagination>
        </div>
      </div>
    </section>
  )
}
