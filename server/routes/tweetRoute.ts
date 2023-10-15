import express from "express";
import TweetController from "../controllers/tweetController";
import S3Manager from "../utils/s3Manager";

const tweetController = new TweetController();
const router = express.Router();
const s3 = new S3Manager();

router.post(
  "/create",
  s3.upload.fields([
    { name: "images", maxCount: 5 }, // maxCount is the max number of images allowed
    { name: "videos", maxCount: 1 },
  ]),
  tweetController.create
);

export default router;
