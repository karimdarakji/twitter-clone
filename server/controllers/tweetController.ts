import { NextFunction, Request, Response } from "express";
import TweetService from "../services/tweetService";
import S3Manager from "../utils/s3Manager";
const s3 = new S3Manager();

export default class TweetController {
  private tweetService: TweetService;
  constructor() {
    this.tweetService = new TweetService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const text = req.body.text;
    const files = req.files as UploadedFiles;
    const images = files?.["images"] || [];
    const videos = files?.["videos"] || [];
    try {
      const tweet = await this.tweetService.create({
        userId: req.user.userId,
        content: {
          text,
          images: images.map((image: UploadedFile) => ({
            url: image.location,
            alt: image.originalname,
          })),
          videos: videos.map((video: UploadedFile) => ({
            url: video.location,
            description: video.originalname,
          })),
        },
      });
      return res.status(200).json(tweet);
    } catch (error) {
      // Cleanup: Remove uploaded files from S3
      const allFiles = [...images, ...videos];
      for (const file of allFiles) {
        await s3.removeFromS3(file.key);
      }
      next(error);
    }
  };
}
