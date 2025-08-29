"use client"
import Image from "next/image"
import Link from "next/link"

export default function Account({ account }: { account: Account }) {
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
          <div className=" flex flex-col gap-[25px]">
            <h2 className="h2-sans">Account Information</h2>
            <ul className="flex flex-col gap-[15px]">
              <li>
                <p className="h3-sans">
                  Account ID:&nbsp;&nbsp;
                  <span className="p-space-xl">{account?.id}</span>
                </p>
              </li>
              <li>
                <p className="h3-sans">
                  Username:&nbsp;&nbsp;
                  <span className="p-space-xl inline-flex flex-wrap items-center gap-x-[6px] break-all">
                    {account?.username}
                    <Link
                      className="flex flex-row items-center p-sans text-accent text-[14px] hover:underline-primary"
                      href="/account/change-username"
                    >
                      <Image
                        src="/icons/edit.svg"
                        width={16}
                        height={16}
                        alt="edit"
                      />
                      Edit
                    </Link>
                  </span>
                </p>
              </li>
              <li>
                <p className="h3-sans">
                  Email:&nbsp;&nbsp;
                  <span className="p-space-xl inline-flex flex-wrap items-center gap-x-[6px] break-all">
                    {account?.email}
                    <Link
                      className="flex flex-row items-center p-sans text-accent text-[14px] hover:underline-primary"
                      href="/account/change-email"
                    >
                      <Image
                        src="/icons/edit.svg"
                        width={16}
                        height={16}
                        alt="edit"
                      />
                      Edit
                    </Link>
                  </span>
                </p>
              </li>
              <li>
                <p className="h3-sans">
                  Password:
                  <span className="ml-[12px] p-space-xl inline-flex flex-wrap items-center gap-x-[6px] break-all">
                    ●●●●●●●●●
                    <Link
                      className="flex flex-row items-center p-sans text-accent text-[14px] hover:underline-primary"
                      href="/account/change-password"
                    >
                      <Image
                        src="/icons/edit.svg"
                        width={16}
                        height={16}
                        alt="edit"
                      />
                      Edit
                    </Link>
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </section>
        <div>
          <Link
            className="button-danger before:hidden"
            href="account/delete-account"
          >
            Delete Account
          </Link>
        </div>
      </div>
    </section>
  )
}
