import { NextFunction, Request, Response } from "express";
import TweetService from "../services/tweetService";
import S3Manager from "../utils/s3Manager";
import { UploadedFile } from "types";
const s3 = new S3Manager();

export default class TweetController {
  private tweetService: TweetService;
  constructor() {
    this.tweetService = new TweetService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const text = req.body.text;

    await this.tweetService
      .handleFiles(req.files as { [fieldname: string]: Express.Multer.File[] })
      .then(async (files) => {
        const images = files?.["images"] || [];
        const videos = files?.["videos"] || [];
        try {
          const tweet = await this.tweetService.create({
            userId: req.user.userId,
            content: {
              text,
              images: images.map((image: UploadedFile) => ({
                url: image.url,
                alt: image.alt,
              })),
              videos: videos.map((video: UploadedFile) => ({
                url: video.url,
                description: video.alt,
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
      })
      .catch((error) => next(error));
  };
}
