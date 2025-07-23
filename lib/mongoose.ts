import mongoose from "mongoose"

const MONGO_URI = process.env.MONGODBURI!

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable")
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
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
