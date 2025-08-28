"use client"

import { useRouter } from "next/navigation"
import Modal from "../../components/Modal"
import { DELETE_ACCOUNT } from "@/graphql/client/account/deleteAccount"
import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { ME } from "@/graphql/client/auth/me"
import { useMe } from "@/app/providers/MeProvider"
type FormData = {
  password: string
}

export default function DeleteAccountModel() {
  const { logout } = useMe()
  const router = useRouter()
  const [deleteAccount, { loading: deletingAccount, error }] = useMutation(
    DELETE_ACCOUNT,
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

  async function onSubmit(data: FormData) {
    const response = await deleteAccount({
      variables: { password: data.password },
    })
    if (!response.data?.deleteAccount?.success) {
      alert("Account deletion failed. Please try again.")
      return
    }
    logout()
    alert("Account deleted successfully. You will be redirected to homepage.")
    router.replace("/")
  }
  const allErrors = [
    ...Object.values(errors).map((e) => e?.message || ""),
    ...(error?.graphQLErrors.map((e) => e.message) || []),
  ]
  return (
    <Modal>
      <h2 className="h2-sans">Delete account</h2>
      <p className="mt-[25px] p-sans">Enter your password to delete account:</p>
      <form
        className="mt-[3px] flex flex-col gap-y-[30px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            className="w-full input-primary"
            placeholder="Enter your password"
            type="password"
            autoFocus
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 64,
                message: "Password must be at most 64 characters",
              },
              pattern: {
                value: /[A-Za-z]/,
                message: "Password must contain at least one letter",
              },
              validate: {
                safeCharacters: (v) =>
                  /^[A-Za-z\d@$!%*?&]+$/.test(v) ||
                  "Password contains invalid characters",
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
            disabled={deletingAccount}
          >
            {deletingAccount ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
