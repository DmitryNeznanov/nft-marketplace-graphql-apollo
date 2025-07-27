import Token from "@/app/models/Token"
import dbConnect from "@/lib/mongoose"

export const logout = async (_: any, __: any, { user }: { user: any }) => {
  await dbConnect()
  console.log("USER CONTEXT IN LOGOUT:", user)

  if (user?.token) {
    const result = await Token.deleteOne({ token: user.token })
    console.log("Delete result:", result)
  } else {
    console.warn("No token found in user context")
  }

  return { success: true }
}
