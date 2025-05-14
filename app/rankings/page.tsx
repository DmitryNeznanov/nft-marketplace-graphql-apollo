import Image from "next/image"
import User from "../mongodb/models/User"

export default async function Rankings() {
  const users = await User.find()

  return (
    <>
      <section className="py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="max-w-sm md:container mx-auto">
          {/* FIXME: fix Responsiveness */}
          <article>
            <h1 className="h1-sans">Top Creators</h1>
            <p className="mt-[10px] p-sans-xl">
              Check out top ranking NFT artists on the NFT Marketplace.
            </p>
          </article>
        </div>
      </section>
      <section className="pb-[40px]">
        <div className="max-w-sm md:container mx-auto">
          {/* FIXME: Table width */}
          {/* TODO: Sort by value */}
          {/* ISSUE: data by date  ?  */}
          <table className="w-full border-spacing-y-[20px] border-separate last:-m-[20px]">
            <thead>
              <tr className="*:first:pl-[20px] [&>th,td]:text-start [&>th,td]:py-[12px] text-gray [&>th,td]:first:border [&>th,td]:last:border [&>th,td]:first:border-r-0 [&>th,td]:last:border-l-0 [&>th,td]:border-black-white [&>th,td]:not-first:not-last:border-t [&>th,td]:not-first:not-last:border-b *:first:rounded-l-primary *:last:rounded-r-primary">
                <th
                  className="p-space"
                  scope="col"
                >
                  <span className="lg:py-[4px] lg:px-[10px]">#</span>
                </th>
                <th
                  className="p-space"
                  scope="col"
                >
                  Artist
                </th>
                <th
                  className="p-space hidden md:table-cell"
                  scope="col"
                >
                  Change
                </th>
                <th
                  className="p-space hidden lg:table-cell"
                  scope="col"
                >
                  NFTs Sold
                </th>
                <th
                  className="p-space"
                  scope="col"
                >
                  Volume
                </th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((user, i) => {
                return (
                  <tr
                    className="bg-black-white *:first:rounded-l-primary *:last:rounded-r-primary *:first:pl-[20px] [&>th,td]:py-[13px] md:[&>th,td]:py-[14.5px] lg:[&>th,td]:py-[12px] [&>th,td]:text-start"
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
                      <Image
                        className="max-w-[24px] max-h-[24px] lg:max-w-[60px] lg:max-h-[60px] rounded-full"
                        src={user.profileImage}
                        width={60}
                        height={60}
                        alt={user.profileImage}
                      ></Image>
                      <div className="ml-[12px] lg:ml-[20px] p-sans-xl font-normal md:font-semibold">
                        {/* TODO: link to profile  */}
                        {user.name}
                      </div>
                    </td>
                    <td className="hidden md:table-cell p-space text-[#00AC4F]">
                      +1.41%
                    </td>
                    <td className="hidden lg:table-cell p-space">
                      {user.sold}
                    </td>
                    <td className="font-work-sans text-[12px]/[110%] md:text-[16px]/[110%]">
                      {user.volume} ETH
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
