import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    min: 2,
  },
  username: {
    type: String,
    min: 6,
    default: undefined,
  },
  email: {
    type: String,
    unique: true,
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
  picture: {
    type: String,
    default: undefined,
  },
  refreshToken: {
    type: [String],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
