import mongoose from "mongoose";

export interface UserActivationDocument extends Document {
  userId: string;
  token: string;
}

const createSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserActivation = mongoose.model<UserActivationDocument>(
  "userActivation",
  createSchema
);

export default UserActivation;
