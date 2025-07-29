"use client"
import Image from "next/image"
import { useMutation } from "@apollo/client"
import { SIGNUP } from "@/graphql/client/auth/signup"
import { useForm } from "react-hook-form"
import { getGraphQLErrorMessage } from "@/lib/graphqlErrorHandler"
type FormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}
export default function SignupContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [signup, { loading, error }] = useMutation(SIGNUP)
  async function onSubmit(data: FormData) {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    try {
      const response = await signup({
        variables: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      })
      const token = response.data?.signup?.token
      const account = response.data?.signup?.account

      console.log("account:", account)
      console.log("token:", token)
    } catch (err) {
      const messages = getGraphQLErrorMessage(err)
      alert(messages)
    }
  }
  return (
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
            <form
              className="mt-[30px] lg:mt-[40px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:max-w-[330px] flex flex-col gap-y-[15px]">
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/user-gray.svg"
                    width={20}
                    height={20}
                    alt="user-gray.svg"
                  ></Image>
                  <input
                    className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="text"
                    placeholder="username"
                    {...register("username", { required: true })}
                  />
                  {errors.username && <span>{errors.username.message}</span>}
                </label>
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/mail-gray.svg"
                    width={20}
                    height={20}
                    alt="mail-gray.svg"
                  ></Image>
                  <input
                    className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="email"
                    placeholder="email adress"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </label>
                <label className="w-full py-[12px]  flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/password-gray.svg"
                    width={20}
                    height={20}
                    alt="password-gray.svg"
                  ></Image>
                  <input
                    className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="password"
                    placeholder="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <span>{errors.password.message}</span>}
                </label>
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/password-gray.svg"
                    width={20}
                    height={20}
                    alt="password-gray.svg"
                  ></Image>
                  <input
                    className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="password"
                    placeholder="confirm password"
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword && (
                    <span>{errors.confirmPassword.message}</span>
                  )}
                </label>
              </div>
              <button className="w-full py-[12px] md:max-w-[330px] mt-[30px] button-primary before:hidden">
                {loading ? "Creating..." : "create account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
