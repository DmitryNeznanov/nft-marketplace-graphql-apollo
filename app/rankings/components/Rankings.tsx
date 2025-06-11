"use client"

import Table from "./Table"

export default function Rankings({ users }: { users: User[] }) {
  return (
    <section className="py-[40px] md:py-[60px] lg:py-[80px]">
      <div className="max-w-sm md:container mx-auto">
        <article>
          <h1 className="h1-sans">Top Creators</h1>
          <p className="mt-[10px] p-sans-xl">
            Check out top ranking NFT artists on the NFT Marketplace.
          </p>
        </article>
        <Table users={users} />
      </div>
    </section>
  )
}
