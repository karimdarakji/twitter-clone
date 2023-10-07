import mongoose from "mongoose";
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import AuthRoutes from "./routes/authRoute";
import UserRoutes from "./routes/userRoute";
//import TweetsRoutes from "./routes/tweets.js";

import "dotenv/config";
import { verifyJWT } from "./middleware/verifyJWT";
import { corsOptions } from "./config/corsOptions";
import { credentials } from "./middleware/credentials";

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
//app.use(express.static(__dirname + "/media"));

// API Routes
app.use("/api/auth", AuthRoutes);
app.use("/api", UserRoutes);

app.use(verifyJWT);
//app.use("/api/tweets", TweetsRoutes);

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING ?? "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
