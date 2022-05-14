import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};
