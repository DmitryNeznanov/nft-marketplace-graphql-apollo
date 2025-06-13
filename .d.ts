interface User {
  id: Types.ObjectId
  name: string
  profileImage: string
  sold: number
  volume: number
  followers: number
  change: number
  info: string
  backgroundImage: string
}
interface NFT {
  id: Types.ObjectId
  title: string
  author: string
  price: number
  bid: number
  content: string
  tags: [string]
  postTime: string
  image: string
  itemAuthor: User
}
