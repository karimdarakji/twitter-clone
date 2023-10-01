import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 2,
  },
  username: {
    type: String,
    min: 6,
    unique: true,
    default: undefined,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  active: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: undefined,
  },
  refreshToken: {
    type: [String],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
