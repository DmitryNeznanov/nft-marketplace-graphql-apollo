import mongoose from "mongoose"

const MONGODBURI =
  process.env.MONGODBURI ||
  "mongodb+srv://guest:guest@cluster0.pbes3in.mongodb.net/nftMarketPlaceDemo?retryWrites=true&w=majority"

if (!MONGODBURI) {
  throw new Error("Please define the MONGODBURI environment variable")
}

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// 👇 тип вместо any — расширяем global локально
const globalWithMongoose = global as typeof global & {
  mongoose?: MongooseCache
}

let cached = globalWithMongoose.mongoose!

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODBURI).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
