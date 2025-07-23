import mongoose, { Schema } from "mongoose"
mongoose.connect(process.env.MONGODBURI!)
mongoose.Promise = global.Promise

const userSchema = new Schema<User>({
  name: String,
  sold: Number,
  profileImage: String,
  volume: Number,
  followers: Number,
  change: Number,
  info: String,
  backgroundImage: String,
})

export default mongoose.models.users || mongoose.model("users", userSchema)
