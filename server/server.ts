require("dotenv").config();
import mongoose from "mongoose";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import AuthRoutes from "./routes/authRoute";
import UserRoutes from "./routes/userRoute";
import TweetRoutes from "./routes/tweetRoute";

import { verifyJWT } from "./middleware/verifyJWT";
import { corsOptions } from "./config/corsOptions";
import { credentials } from "./middleware/credentials";
import CustomError from "./utils/errors";

const PORT = process.env.PORT || 8000;

const app: Application = express();

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// Built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// API Routes
app.use("/api/auth", AuthRoutes);

app.use(verifyJWT);
app.use("/api", UserRoutes);
app.use("/api/tweets", TweetRoutes);

// Error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // If it's not a CustomError, it's an unexpected error.
  // This could be a programming error or some other exception.
  if (!(err instanceof CustomError)) {
    console.error("Unexpected Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  // For CustomErrors, use the provided message and status code.
  res.status(err.statusCode).json({ message: err.message });
});

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
