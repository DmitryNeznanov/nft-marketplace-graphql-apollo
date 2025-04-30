import { MongoClient, ServerApiVersion } from "mongodb"
const uri = process.env.MONGODBURI!

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export const db = client.db("nftMarketPlace")
export const NTFs = db.collection("NTFs")
