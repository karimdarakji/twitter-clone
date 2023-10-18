import { UserActivationDocument } from "../models/UserActivation";
import UserActivationRepository from "../repositories/userActivationRepository";
import Service from "./service";

export default class UserActivationService extends Service<UserActivationDocument> {
  constructor() {
    super(new UserActivationRepository());
  }
}
