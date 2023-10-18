import fs from "fs";
import S3Manager from "src/utils/s3Manager";
import { TweetDocument } from "../models/Tweet";
import TweetRepository from "../repositories/tweetRepository";
import Service from "./service";
import path from "path";
import { InternalError } from "src/utils/errors";
const s3Manager = new S3Manager();

export default class TweetService extends Service<TweetDocument> {
  constructor() {
    super(new TweetRepository());
  }

  async handleFiles(files: { [fieldname: string]: Express.Multer.File[] }) {
    const processedFiles: any = {
      images: [],
      videos: [],
    };
    const currentDate = Date.now().toString();

    try {
      // Process and upload images
      if (files.images) {
        for (let image of files.images) {
          const processedImage = await s3Manager.processImage(image.buffer);
          const imageUrl = await s3Manager.uploadToS3(
            processedImage,
            currentDate + "-" + image.originalname,
            image.mimetype
          ); // adjust 'images/' based on your preferred structure
          processedFiles.images.push({
            url: imageUrl,
            alt: image.originalname,
          }); // assuming alt is the original file name
        }
      }

      // Updated video processing logic
      if (files.videos) {
        for (let video of files.videos) {
          try {
            // Define temp file path
            const tempFilePath = path.join(process.cwd(), video.originalname);

            // Write buffer to temp file
            fs.writeFileSync(tempFilePath, video.buffer);

            // Process video and get the result as a buffer
            const processedVideoBuffer: any = await s3Manager.processVideo(
              tempFilePath
            );

            // Upload the processed buffer
            const videoUrl = await s3Manager.uploadToS3(
              processedVideoBuffer,
              currentDate +
                "-" +
                video.originalname.split(".").slice(0, -1).join(".") +
                ".mp4", // Assuming you want to change the extension to .mp4
              "video/mp4" // MIME type for MP4 video
            );

            // Clean up the temp file
            fs.unlinkSync(tempFilePath);

            processedFiles.videos.push({
              url: videoUrl,
              alt: video.originalname,
            });
          } catch (error) {
            console.error("Error during video processing", error);
            throw new InternalError("Error during video processing");
          }
        }
      }

      return processedFiles;
    } catch (error) {
      // Cleanup: Remove uploaded files from S3
      if (files?.images?.length) {
        for (const image of files.images) {
          await s3Manager.removeFromS3(currentDate + "-" + image.originalname);
        }
      }
      if (files?.videos?.length) {
        for (const video of files.videos) {
          await s3Manager.removeFromS3(currentDate + "-" + video.originalname);
        }
      }
      console.error("Error processing files", error);
      throw new InternalError("Error during video processing");
    }
  }
}
