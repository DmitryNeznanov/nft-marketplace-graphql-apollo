import NFT from "@/app/mongodb/models/NFT"
import type { Metadata } from "next"
import Link from "next/link"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const item = await NFT.findById(id)

  return {
    title: "NFT Marketplace",
    description: `Page with information about NFT with name "${item.title}" and ID "${item._id}" `,
  }
}
export async function generateStaticParams() {
  const items = await NFT.find()
  return items.map((item) => ({
    id: String(item._id),
  }))
}
export default async function MarketPlaceItem({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = await NFT.findById(id)
  return (
    <section>
      <div className="max-w-sm md:container mx-auto">
        <h2>{item.title}</h2>
        <p>
          Minted On
          <data value="">{item.postTime}</data>
        </p>
        <div>
          <h4>Created By</h4>
          <p>{item.author}</p>
        </div>
        <div>
          <h4>Description</h4>
          <p>{item.content}</p>
        </div>
        <div>
          <h4>Details</h4>
          {[
            ["View on Etherscan", "https://etherscan.io/"],
            ["View Original", "https://google.com"],
          ].map(([text, href], i) => {
            return (
              <li
                className="w-max list-none list-image-[url('/icons/globe.svg')]"
                key={i}
              >
                <Link
                  href={href}
                  target="_blank"
                >
                  {text}
                </Link>
              </li>
            )
          })}
        </div>
        <div>
          <h4>Tags</h4>
          <ul>
            {item.tags.map((tag: string, i: number) => {
              return <li key={i}>{tag}</li>
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
