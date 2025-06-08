import User from "@/app/models/User"
import dbConnect from "@/lib/mongoose"
const resolvers = {
  Query: {
    users: async () => {
      await dbConnect()
      return User.find()
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { name, email }: { name: string; email: string }
    ) => {
      await dbConnect()
      const user = new User({ name, email })
      return user.save()
    },
  },
}

export default resolvers
