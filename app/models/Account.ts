import { Schema, models, model } from "mongoose"

const accountSchema = new Schema<Account>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

export default models.Account || model<Account>("Account", accountSchema)
