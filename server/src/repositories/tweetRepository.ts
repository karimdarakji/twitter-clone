import Tweet, { TweetDocument } from "../models/Tweet";
import BaseRepository from "./baseRepository";

export default class TweetRepository extends BaseRepository<TweetDocument> {
  constructor() {
    super(Tweet);
  }
}
