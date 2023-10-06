import User, { UserDocument } from "../models/User";
import BaseRepository from "./baseRepository";

export default class UserRepository extends BaseRepository<UserDocument> {
  constructor() {
    super(User);
  }
}
