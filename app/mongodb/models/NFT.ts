import mongoose, { Schema } from "mongoose"
import { Types } from "mongoose"
mongoose.connect(process.env.MONGODBURI!)
mongoose.Promise = global.Promise
const NFTSchema = new Schema({
  _id: Types.ObjectId,
  title: String,
  author: String,
  price: Number,
  bid: Number,
  content: String,
  tags: [String],
  postTime: String,
  image: String,
})

export default mongoose.models.nfts || mongoose.model("nfts", NFTSchema)
