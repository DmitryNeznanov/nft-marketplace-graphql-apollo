import Image from "next/image"
import Link from "next/dist/client/app-dir/link"
import CloseMobileMenu from "./CloseMobileMenu"
import HeaderNav from "./HeaderNav"

export default function MobileMenu() {
  return (
    <section
      className="h-screen mx-auto absolute top-0 right-0 transition-[width] duration-[2000ms] overflow-hidden bg-black z-[9999]"
      id="mobileMenu"
      style={{ width: "0%" }}
    >
      <div className="px-[30px] md:px-[50px] py-[15px] lg:py-[20px]">
        <header className="flex flex-row justify-between">
          <div>
            <Link href="/">
              <Image
                className="w-[182px] h-[24px] lg:w-auto lg:h-auto"
                src="/logo.svg"
                width={243}
                height={32}
                alt="logo.svg"
              ></Image>
            </Link>
          </div>
          <div>
            <CloseMobileMenu />
          </div>
        </header>
        <div className="mt-[50px]">
          <HeaderNav />
        </div>
      </div>
    </section>
  )
}
