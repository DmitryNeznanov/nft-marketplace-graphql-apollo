"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AuthNav from "../auth/AuthNav"
export default function HeaderNav({
  closeMenu,
  account,
}: {
  closeMenu?: () => void
  account: Account | null
}) {
  const router = usePathname()
  return (
    <div className="flex flex-col lg:flex-row gap-y-[15px] lg:gap-y-0 lg:gap-x-[55px]">
      <ul className="flex flex-col lg:flex-row items-center gap-y-[25px] gap-x-[50px]">
        {[
          ["Marketplace", "marketplace"],
          ["Rankings", "rankings"],
          ["Connect a wallet", "wallet"],
        ].map(([title, href], i) => (
          <li
            className={`w-max font-work-sans font-semibold text-[16px] hover:underline-primary ${
              router.includes(href) ? "text-accent" : "text-white"
            }`}
            key={i}
          >
            <Link
              className="w-max -m-[10px] p-[10px]"
              href={`/${href}`}
              onClick={closeMenu}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col lg:flex-row items-center gap-[10px]">
        <AuthNav account={account} />
      </div>
    </div>
  )
}
