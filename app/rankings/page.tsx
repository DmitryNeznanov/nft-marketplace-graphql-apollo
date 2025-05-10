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
        <table>
          <thead>
            <th scope="col">Artist</th>
            <th scope="col">Change</th>
            <th scope="col">Change</th>
            <th scope="col">NFTs Sold</th>
            <th scope="col">Volume</th>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr key={i}>
                  <th
                    className={`flex items-center  before:w-[60px] before:h-[60px]`}
                    // before:content-[url('${user.profileImage}')]
                    scope="row"
                  >
                    {user.name}
                  </th>
                  <td>+1.41</td>
                  <td>{user.sold}</td>
                  <td>{user.volume} ETH</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </>
  )
}
