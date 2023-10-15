import { TweetDocument } from "../models/Tweet";
import TweetRepository from "../repositories/tweetRepository";
import Service from "./service";

export default class TweetService extends Service<TweetDocument> {
  constructor() {
    super(new TweetRepository());
  }
}
