import multerS3 from "multer-s3";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import multer from "multer";

export default class S3Manager {
  private s3: S3Client;
  public upload;
  constructor() {
    this.s3 = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string,
      },
    });

    this.upload = multer({
      storage: multerS3({
        s3: this.s3,
        bucket: process.env.AWS_BUCKET_NAME as string,
        acl: "public-read", // allows the uploaded files to be publicly readable
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          // using the date and the original file name (change this to fit your needs)
          cb(null, Date.now().toString() + "-" + file.originalname);
        },
      }),
    });
  }

  async uploadPublicImage(
    file: Express.Multer.File,
    key: string
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ACL: "public-read",
    });

    await this.s3.send(command);

    // Return the public URL of the uploaded image
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
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

  // Add other methods as necessary...
}

module.exports = S3Manager;
