import Image from "next/image"
import Link from "next/link"
import OpenMobileMenu from "./OpenMobileMenu"
import MobileMenu from "./MobileMenu"
import HeaderNav from "./HeaderNav"
import AuthButton from "../auth/AuthButton"

export default async function Header() {
  return (
    <header
      className="w-full bg-black px-[5px] lg:px-[50px] 2xl:px-[175px] py-[15px] lg:py-[20px]"
      id="header"
    >
      <div>
        <nav className="flex justify-between items-center">
          <div>
            <Link href="/">
              <Image
                className="w-[182px] h-[24px] lg:w-auto lg:h-auto p-[10px] -m-[10px] box-content"
                src="/logo.svg"
                width={243}
                height={32}
                alt="logo.svg"
                priority
              />
            </Link>
          </div>
          <div className="flex items-center gap-[40px]">
            <div className="hidden lg:block">
              <HeaderNav />
            </div>
            <div className="hidden lg:flex items-center gap-[10px]">
              <AuthButton />
              <Link
                className="px-[30px] button-primary before:content-[url(/icons/user.svg)]"
                href="signup"
              >
                sign up
              </Link>
            </div>
            <div className="lg:hidden">
              <OpenMobileMenu />
            </div>
          </div>
        </nav>
        <MobileMenu />
      </div>
    </header>
  )
}
