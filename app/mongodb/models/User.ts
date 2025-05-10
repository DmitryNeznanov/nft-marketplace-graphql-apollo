import mongoose, { Schema } from "mongoose"
import { Types } from "mongoose"
mongoose.connect(process.env.MONGODBURI!)
mongoose.Promise = global.Promise
const userSchema = new Schema({
  _id: Types.ObjectId,
  name: String,
  sold: Number,
  volume: Number,
  followers: Number,
  info: String,
  profileImage: String,
  backgroundImage: String,
})

export default mongoose.models.users || mongoose.model("users", userSchema)
