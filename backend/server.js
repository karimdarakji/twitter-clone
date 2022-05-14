import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/users.js";
import TweetsRoutes from "./routes/tweets.js";

import "dotenv/config";
import { verifyJWT } from "./middleware/verifyJWT.js";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/credentials.js";
import { connectDB } from "./config/dbConn.js";

const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
connectDB();

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
const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "/public")));
//app.use(express.static(__dirname + "/media"));

// API Routes
app.use("/auth", AuthRoutes);
app.use("/auth", UserRoutes);

app.use(verifyJWT);
app.use("/tweets", TweetsRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
