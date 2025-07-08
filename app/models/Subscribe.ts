import mongoose, { Schema } from "mongoose"
mongoose.connect(process.env.MONGODBURI!)
mongoose.Promise = global.Promise
const SubscribeSchema = new Schema<Subscribe>(
  {
    email: { type: String, unique: true },
  },
  { timestamps: true }
)

export default mongoose.models.subscribers ||
  mongoose.model("subscribers", SubscribeSchema)
