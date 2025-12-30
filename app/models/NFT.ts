import mongoose, { Schema } from "mongoose"
mongoose.connect(
  process.env.MONGODBURI ||
    "mongodb+srv://guest:guest@cluster0.pbes3in.mongodb.net/nftMarketPlaceDemo?retryWrites=true&w=majority"
)
mongoose.Promise = global.Promise
const NFTSchema = new Schema<NFT>({
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
