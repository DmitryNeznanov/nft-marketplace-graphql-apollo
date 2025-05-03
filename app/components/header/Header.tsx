import Image from "next/image"
import OpenMobileMenu from "./OpenMobileMenu"
import HeaderNav from "./HeaderNav"
import MobileMenu from "./MobileMenu"
import Link from "next/link"

export default function Header() {
  return (
    <header
      className="max-w-[1650px] mx-auto px-[5px] lg:px-[50px] 2xl:px-[175px] py-[15px] lg:py-[20px]"
      id="header"
    >
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/">
            <Image
              className="w-[182px] h-[24px] lg:w-auto lg:h-auto p-[10px] -m-[10px] box-content"
              src="/logo.svg"
              width={243}
              height={32}
              alt="logo.svg"
              priority={true}
            ></Image>
          </Link>
        </div>
        <div>
          <div className="hidden lg:block">
            <HeaderNav />
          </div>
          <div className="lg:hidden">
            <OpenMobileMenu />
          </div>
        </div>
      </nav>
      <MobileMenu />
    </header>
  )
}
