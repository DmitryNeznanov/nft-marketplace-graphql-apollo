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
      <section>
        <div className="max-w-sm md:container mx-auto">
          <table className="w-full border-spacing-y-[20px] border-separate">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Artist</th>
                <th
                  className="hidden md:table-cell"
                  scope="col"
                >
                  Change
                </th>
                <th
                  className="hidden lg:table-cell"
                  scope="col"
                >
                  NFTs Sold
                </th>
                <th scope="col">Volume</th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((user, i) => {
                return (
                  <tr
                    className=" bg-black-white *:first:rounded-l-primary *:last:rounded-r-primary [&>th,td]:py-[14.5px]"
                    key={i}
                  >
                    <th className="rounded-tl-primary rounded-l-primary">
                      {i + 1}
                    </th>
                    <td
                      className="flex items-center"
                      scope="row"
                    >
                      <Image
                        className="rounded-full"
                        src={user.profileImage}
                        width={60}
                        height={60}
                        alt={user.profileImage}
                      ></Image>
                      {user.name}
                    </td>
                    <td className="hidden md:table-cell">+1.41</td>
                    <td className="hidden lg:table-cell ">{user.sold}</td>
                    <td className="">{user.volume} ETH</td>
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
