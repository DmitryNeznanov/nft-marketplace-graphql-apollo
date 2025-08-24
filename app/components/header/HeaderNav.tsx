"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function HeaderNav({
  closeMobileMenu,
}: {
  closeMobileMenu?: React.MouseEventHandler
}) {
  const router = usePathname()
  return (
    <>
      <div className="flex flex-col md:flex-row gap-[35px]">
        <ul className="flex flex-col lg:flex-row lg:items-center gap-y-[25px] gap-x-[50px]">
          {[
            ["Marketplace", "marketplace"],
            ["Rankings", "rankings"],
            ["Connect a wallet", "wallet"],
          ].map(([title, href], i) => {
            return (
              <li
                className={`w-max font-work-sans font-semibold text-[16px] hover:underline-primary ${
                  router.includes(href) ? "text-accent" : ""
                }`}
                key={i}
              >
                <Link
                  className="w-max -m-[10px] p-[10px]"
                  href={`/${href}`}
                  onClick={closeMobileMenu}
                >
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
