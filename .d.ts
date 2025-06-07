interface User {
  _id: Types.ObjectId
  name: string
  sold: number
  volume: number
  followers: number
  change: number
  info: string
  profileImage: string
  backgroundImage: string
}
interface NFT {
  _id: Types.ObjectId
  title: string
  author: string
  price: number
  bid: number
  content: string
  tags: [string]
  postTime: string
  image: string
}
