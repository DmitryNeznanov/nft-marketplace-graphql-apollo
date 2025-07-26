import { Schema, model, models } from "mongoose"

const tokenSchema = new Schema<Token>({
  accountId: { type: Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
})

export default models.tokens || model<Token>("tokens", tokenSchema)
