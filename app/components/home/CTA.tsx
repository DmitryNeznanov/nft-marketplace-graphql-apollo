import Image from "next/image"

export default function CTA() {
  return (
    <section className="py-[40px] md:pb-[80px]">
        <div className="max-w-sm md:container">
          <article className="md:px-[30px] md:py-[40px] lg:p-[60px] bg-transparent md:bg-black-white rounded-primary">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[30px] lg:gap-[80px]">
              <div>
                <Image
                  className="block w-screen max-w-[420px] rounded-primary"
                  src="/CTA.png"
                  width={425}
                  height={310}
                  alt="CTA.png"
                ></Image>
              </div>
              <div>
                <h2 className="h2-sans capitalize">Join our weekly digest</h2>
                <p className="mt-[10px] p-sans-xl">
                  Get exclusive promotions & updates straight to your inbox.
                </p>
                <form className="mt-[40px]">
                  <div className="flex flex-col lg:flex-row lg:bg-white rounded-primary">
                    <input
                      className="w-full py-[12px] lg:p-[20px] px-[20px] bg-white lg:bg-transparent border border-gray lg:border-0 font-work-sans text-black outline-none placeholder:text-black rounded-primary lg:rounded-[0]"
                      type="text"
                      placeholder="Enter your email here"
                    />
                    <button className="w-full lg:w-max mt-[16px] lg:mt-0 py-[12px] lg:py-0 lg:ml-auto button-primary before:content-[url('/icons/mail.svg')]">
                      subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </article>
        </div>
    </section>
  )
}
