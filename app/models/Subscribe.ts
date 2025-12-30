import mongoose, { Schema } from "mongoose"
mongoose.connect(
  process.env.MONGODBURI ||
    "mongodb+srv://guest:guest@cluster0.pbes3in.mongodb.net/nftMarketPlaceDemo?retryWrites=true&w=majority"
)
mongoose.Promise = global.Promise
const SubscribeSchema = new Schema<Subscribe>(
  {
    email: { type: String, unique: true },
  },
  { timestamps: true }
)

export default mongoose.models.subscribers ||
  mongoose.model("subscribers", SubscribeSchema)
