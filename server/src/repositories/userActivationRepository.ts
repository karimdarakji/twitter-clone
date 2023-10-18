import UserActivation, {
  UserActivationDocument,
} from "../models/UserActivation";
import BaseRepository from "./baseRepository";

export default class UserActivationRepository extends BaseRepository<UserActivationDocument> {
  constructor() {
    super(UserActivation);
  }
}
