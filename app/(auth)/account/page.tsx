"use client"
import { useMe } from "@/app/providers/MeProvider"
import Image from "next/image"
import Link from "next/link"

export default function Profile() {
  const { account, loading } = useMe()

  if (loading) {
    return (
      <section className="py-[40px]">
        <div className="max-w-sm md:container mx-auto">
          <div className="py-[30px]">
            <article>
              <h1 className="h1-sans">Account Page</h1>
              <p className="mt-[10px] md:mt-[20px] p-sans-xl capitalize">
                Loading account details...
              </p>
            </article>
          </div>
        </div>
      </section>
    )
  }
  if (!account) {
    return (
      <section className="py-[40px]">
        <div className="max-w-sm md:container mx-auto">
          <div className="py-[30px]">
            <article>
              <h1 className="h1-sans">Account Page</h1>
              <p className="mt-[10px] md:mt-[20px] p-sans-xl capitalize">
                You are not logged in. Please sign in to view your account
                details.
              </p>
            </article>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-[40px]">
      <div className="max-w-sm md:container mx-auto">
        <div className="py-[30px] border-b border-accent">
          <article>
            <h1 className="h1-sans">Account Page</h1>
            <p className="p-sans-xl capitalize">Account details and settings</p>
          </article>
        </div>
        <section className="py-[30px]">
          <div className="flex flex-col gap-[25px]">
            <h2 className="h2-sans">Account Information</h2>
            <ul className="flex flex-col gap-[15px]">
              <li>
                <p className="h3-sans">
                  Account ID:
                  <span className="p-space-xl"> {account?.id}</span>
                </p>
              </li>
              <li className="flex flex-row items-center gap-x-[3px]">
                <p className="h3-sans">
                  Username:
                  <span className="p-space-xl"> {account?.username}</span>
                </p>
                <Link
                  className="flex flex-row p-sans text-accent text-[14px] self-start mt-[2px] hover:underline-primary"
                  href="/account/change-email"
                >
                  <Image
                    src="/icons/edit.svg"
                    width={16}
                    height={16}
                    alt="edit"
                  ></Image>
                  Edit
                </Link>
              </li>
              <li className="flex flex-row items-center gap-x-[3px]">
                <p className="h3-sans">
                  Email:
                  <span className="p-space-xl"> {account?.email}</span>
                </p>
                <Link
                  className="flex flex-row p-sans text-accent text-[14px] self-start mt-[2px] hover:underline-primary"
                  href="/account/change-email"
                >
                  <Image
                    src="/icons/edit.svg"
                    width={16}
                    height={16}
                    alt="edit"
                  ></Image>
                  Edit
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  )
}
