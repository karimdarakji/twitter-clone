import express from "express";
import TweetController from "../controllers/tweetController";
import multer from "multer";

const tweetController = new TweetController();
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Temporarily store files in memory

router.post(
  "/create",
  upload.fields([
    { name: "images", maxCount: 2 }, // maxCount is the max number of images allowed
    { name: "videos", maxCount: 1 },
  ]),
  tweetController.create
);

export default router;
