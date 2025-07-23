import Image from "next/image"
import EmailForm from "../EmailForm"

export default function CTA() {
  return (
    <section className="py-[40px] md:pb-[80px]">
      <div className="max-w-sm md:container mx-auto">
        <article className="md:px-[30px] md:py-[40px] bg-transparent md:bg-black-white rounded-primary">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[30px] lg:gap-[80px]">
            <div className="md:max-w-[50%] w-full">
              <Image
                className="w-full rounded-primary"
                src="/CTA.png"
                width={425}
                height={310}
                alt="CTA.png"
              ></Image>
            </div>
            <div className="md:max-w-[50%] w-full">
              <h2 className="h2-sans capitalize">Join our weekly digest</h2>
              <p className="mt-[10px] p-sans-xl">
                Get exclusive promotions & updates straight to your inbox.
              </p>
              <div className="mt-[40px]">
                <EmailForm />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
