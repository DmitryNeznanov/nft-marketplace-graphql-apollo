import mongoose from "mongoose"
import { Types } from "mongoose"
const { Schema } = mongoose

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

export default mongoose.models.NFTs || mongoose.model("NFTs", NFTSchema)
