import express from "express";
import {
  createTweet,
  getAllTweets,
  getTweet,
  likeTweet,
  commentTweet,
} from "../controllers/tweets.js";

const router = express.Router();

router.post("/create", createTweet);
router.post("/comment-tweet", commentTweet);
router.post("/getalltweets", getAllTweets);
router.post("/gettweet", getTweet);

router.post("/like-tweet", likeTweet);
/*router.post('/get?=id', getById) */

export default router;
