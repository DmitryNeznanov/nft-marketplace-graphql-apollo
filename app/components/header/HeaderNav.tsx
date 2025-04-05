"use client"
import Link from "next/dist/client/app-dir/link"

export default function HeaderNav() {
  return (
    <ul className="flex flex-col lg:flex-row lg:items-center gap-y-[25px] gap-x-[50px] ">
      {[
        ["Marketplace", "marketplace"],
        ["Rankings", "rankings"],
        ["Connect a wallet", "wallet"],
      ].map(([title, href], i) => {
        return (
          <li
            className=" font-work-sans font-semibold text-[16px]"
            key={i}
          >
            <Link href={href}>{title}</Link>
          </li>
        )
      })}
      <li>
        <Link
          className="button-primary"
          href="signup"
        >
          sign up
        </Link>
      </li>
    </ul>
  )
}
