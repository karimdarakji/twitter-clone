declare global {
  type MongoDBQuery<T> = {
    $or?: Array<Partial<T>>;
    $and?: Array<Partial<T>>;
    // ... add other MongoDB operators as needed
  } & Partial<T>;

  type UploadedFile = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    contentDisposition: null | any;
    storageClass: string;
    location: string;
    etag: string;
  };

  type UploadedFiles = {
    images?: UploadedFile[];
    videos?: UploadedFile[];
  };
}

export {};
