import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/users.js";
import TweetsRoutes from "./routes/tweets.js";

import "dotenv/config";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const __dirname = path.resolve();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/media"));

app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

// API Routes
app.use("/auth", AuthRoutes);
app.use("/auth", UserRoutes);

app.use("/tweets", TweetsRoutes);

const CONNECTION_URL = process.env.MONGO_DB_CONNECTION_STRING;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch(error => console.log(error.message));

mongoose.set("useFindAndModify", false);
