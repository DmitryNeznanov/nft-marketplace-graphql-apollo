"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function HeaderNav() {
  const router = usePathname()
  return (
    <ul className="flex flex-col lg:flex-row lg:items-center gap-y-[25px] gap-x-[50px] ">
      {[
        ["Marketplace", "marketplace"],
        ["Rankings", "rankings"],
        ["Connect a wallet", "wallet"],
      ].map(([title, href], i) => {
        return (
          <li
            className={`w-max font-work-sans font-semibold text-[16px] hover:underline-primary ${
              router.includes(href) ? "text-accent pointer-events-none" : ""
            }`}
            key={i}
          >
            <Link
              className="w-max -m-[10px] p-[10px]"
              href={href}
            >
              {title}
            </Link>
          </li>
        )
      })}
      <li>
        <Link
          className="button-primary before:content-[url(/icons/user.svg)]"
          href="signup"
        >
          sign up
        </Link>
      </li>
    </ul>
  )
}
