"use client"

import { useRouter } from "next/navigation"
import Modal from "../../components/Modal"
import { UPDATE_EMAIL } from "@/graphql/client/account/updateEmail"
import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { ME } from "@/graphql/client/auth/me"
type FormData = {
  email: string
}

export default function ChangeEmailModal() {
  const router = useRouter()
  const [changeEmail, { loading: changingEmail, error }] = useMutation(
    UPDATE_EMAIL,
    {
      fetchPolicy: "no-cache",
      refetchQueries: [{ query: ME }],
    }
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ criteriaMode: "all", reValidateMode: "onSubmit" })

  const onSubmit = async (data: FormData) => {
    const response = await changeEmail({
      variables: { email: data.email },
    })
    const updatedEmail = response.data?.updateEmail?.email

    if (!updatedEmail) throw new Error("Email update failed")
    alert(
      `Email updated successfully to: \n\ ${JSON.stringify(
        updatedEmail
      )}. \n\ You can close this modal.`
    )
    router.back()
  }
  const allErrors = [
    ...Object.values(errors).map((e) => e?.message || ""),
    ...(error?.graphQLErrors.map((e) => e.message) || []),
  ]
  return (
    <Modal>
      <h2 className="h2-sans">Change Email</h2>
      <p className="mt-[25px] p-sans">Enter your new email below:</p>
      <form
        className="mt-[3px] flex flex-col gap-y-[30px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            className="w-full input-primary"
            placeholder="Enter new email"
            autoFocus
            {...register("email", {
              required: "Email is required",
              minLength: {
                value: 6,
                message: "Email must be at least 6 characters",
              },
              maxLength: {
                value: 254,
                message: "Email must be at most 254 characters",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          <ul className="mt-[5px] flex flex-col gap-y-[2px] list-disc list-outside">
            {allErrors.map((error, i) => {
              return (
                <li
                  className="p-sans text-[14px] text-rose-500"
                  key={i}
                >
                  {error}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex justify-between">
          <button
            className="button-transparent before:hidden"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            className="button-primary before:hidden"
            type="submit"
            disabled={changingEmail}
          >
            {changingEmail ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
