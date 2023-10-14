import mongoose from "mongoose";

export interface ForgotPasswordDocument extends Document {
  userId: string;
  token: string;
}

const createSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: "1h" }, // this token will be removed after 1 hour
});

const ForgotPassword = mongoose.model<ForgotPasswordDocument>(
  "forgotPassword",
  createSchema
);

export default ForgotPassword;
