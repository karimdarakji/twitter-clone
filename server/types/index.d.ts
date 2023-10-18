declare global {
  namespace Express {
    interface Request {
      user: any;
    }
    interface Response {
      user: any;
    }
  }
}
export type MongoDBQuery<T> = {
  $or?: Array<Partial<T>>;
  $and?: Array<Partial<T>>;
  // ... add other MongoDB operators as needed
} & Partial<T>;

export type UploadedFiles = {
  images?: UploadedFile[];
  videos?: UploadedFile[];
};

export interface UploadedFile {
  url: string;
  alt: string;
  key: string;
}
