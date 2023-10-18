import ffmpeg from "fluent-ffmpeg";
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import fs from "fs";
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
export default class S3Manager {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string,
      },
    });
  }

  // This method processes an image and returns a buffer
  async processImage(fileBuffer: Buffer): Promise<Buffer> {
    return sharp(fileBuffer)
      .resize(800) // For example, resize based on your needs
      .toBuffer();
  }

  // This method uploads a buffer to S3 with a specified key
  async uploadToS3(
    fileBuffer: Buffer,
    key: string,
    contentType: string
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ACL: "public-read",
      ContentType: contentType, // important to ensure the file is usable in the bucket
    });

    await this.s3.send(command);

    // Return the public URL of the uploaded file
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
  }

  async processVideo(tempFilePath: string) {
    return new Promise((resolve, reject) => {
      const outputPath = tempFilePath + "_converted.mp4"; // Creating a new temp file for the output

      ffmpeg(tempFilePath)
        .outputOptions(["-vcodec libx264", "-crf 28"])
        .toFormat("mp4")
        .on("end", async function () {
          try {
            // Read the converted video file into a buffer
            const buf = fs.readFileSync(outputPath);

            // Clean up the converted file after reading it
            fs.unlinkSync(outputPath);

            resolve(buf); // Resolving the promise with the buffer
          } catch (error) {
            reject(error);
          }
        })
        .on("error", function (err) {
          console.error("Error:", err);
          reject(err);
        })
        .save(outputPath); // Saving the converted file to outputPath
    });
  }

  removeFromS3 = async (key: string) => {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      });
      await this.s3.send(command);
    } catch (err) {
      console.error(`Failed to delete ${key} from S3 due to ${err}`);
    }
  };
}

module.exports = S3Manager;
