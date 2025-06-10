import Image from "next/image"
import Link from "next/link"
import apolloServer from "@/lib/apolloServer"
import { GET_USERS } from "@/graphql/queries"

export default async function Creators() {
  const { data } = await apolloServer.query({
    query: GET_USERS,
    variables: { limit: 12 },
  })

  return (
    <section className="py-[40px] md:py-[80px]">
      <div className="max-w-sm md:container mx-auto">
        <article className="flex flex-row justify-between">
          <div>
            <h2 className="h2-sans">Top Creators</h2>
            <p className="mt-[10px] p-sans capitalize">
              Checkout Top Rated Creators on the NFT Marketplace
            </p>
          </div>
          <div className="hidden md:block self-end">
            <Link
              className="button-transparent before:content-[url('/icons/rocketLaunch-accent.svg')]"
              href="rankings"
            >
              View Rankings
            </Link>
          </div>
        </article>
        <section className="mt-[40px] lg:mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] lg:gap-[25px] *:[&:nth-child(n+6)]:hidden md:*:[&:nth-child(n+6)]:flex md:*:[&:nth-child(n+7)]:hidden lg:md:*:[&:nth-child(n+7)]:flex lg:*:[&:nth-child(n+1)]:flex">
            {data.users.map((user: User, i) => {
              return (
                <article
                  className="w-full p-[20px] flex flex-row lg:flex-col items-center bg-black-white rounded-primary relative hover:scale-primary"
                  key={i}
                >
                  <div className="w-[30px] h-[30px] flex items-center justify-center bg-black rounded-full absolute m-[12px] lg:m-[20px] top-0 left-0">
                    <p className="p-mono text-gray">{i + 1}</p>
                  </div>
                  <Link href={`/users/${user._id}`}>
                    <Image
                      className="max-w-[60px] max-h-[60px] lg:max-w-max lg:max-h-max lg:mx-auto rounded-full"
                      src={user.profileImage}
                      width={120}
                      height={120}
                      alt={user.profileImage}
                    ></Image>
                  </Link>
                  <div className="h-full ml-[20px] lg:ml-0 lg:mt-[20px] flex flex-col lg:items-center justify-between">
                    <Link
                      className="hover:underline-primary"
                      href={`/users/${user._id}`}
                    >
                      <h3 className="h3-sans">{user.name}</h3>
                    </Link>

                    <p className="mt-[5px] p-sans text-gray">
                      Total sales:{" "}
                      <span className="p-space text-white uppercase">
                        {user.sold} ETH
                      </span>
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="mt-[40px] md:hidden">
            <Link
              className="w-full button-transparent before:content-[url('/icons/rocketLaunch-accent.svg')]"
              href="rankings"
            >
              View Rankings
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}
