import Image from "next/image"

export default function signup() {
  return (
    // TODO: image height screen for hide footer ?
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:gap-x-[40px] lg:gap-x-[60px]">
        <div className="md:max-w-[50%]">
          <Image
            className="w-screen h-screen max-h-[232px] md:max-h-[615px] lg:max-h-[691px]"
            src="/signup.png"
            width={610}
            height={691}
            alt="signup.png"
          ></Image>
        </div>
        <div className="max-w-sm mx-auto md:mx-0 md:max-w-[50%]">
          <div className="pt-[30px] pb-[40px] md:pt-0 md:pb-0 flex flex-col">
            <article className="max-w-[460px]">
              <h2 className="h2-sans">Create Account</h2>
              <p className="mt-[20px] p-sans-xl capitalize">
                Welcome! enter your details and start creating, collecting and
                selling NFTs.
              </p>
            </article>
            <form className="mt-[30px] lg:mt-[40px]">
              <div className="md:max-w-[330px] flex flex-col gap-y-[15px]">
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/user-gray.svg"
                    width={20}
                    height={20}
                    alt="user-gray.svg"
                  ></Image>
                  <input
                    className="font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="text"
                    placeholder="username"
                  />
                </label>
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/mail-gray.svg"
                    width={20}
                    height={20}
                    alt="mail-gray.svg"
                  ></Image>
                  <input
                    className="font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="email"
                    placeholder="email adress"
                  />
                </label>
                <label className="w-full py-[12px]  flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/password-gray.svg"
                    width={20}
                    height={20}
                    alt="password-gray.svg"
                  ></Image>
                  <input
                    className="font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="password"
                    placeholder="password"
                  />
                </label>
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/password-gray.svg"
                    width={20}
                    height={20}
                    alt="password-gray.svg"
                  ></Image>
                  <input
                    className="font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="password"
                    placeholder="confirm password"
                  />
                </label>
              </div>
              <button className="w-full py-[12px] md:max-w-[330px] mt-[30px] button-primary before:hidden">
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
