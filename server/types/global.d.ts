declare global {
  type MongoDBQuery<T> = {
    $or?: Array<Partial<T>>;
    $and?: Array<Partial<T>>;
    // ... add other MongoDB operators as needed
  } & Partial<T>;
}

export {};
