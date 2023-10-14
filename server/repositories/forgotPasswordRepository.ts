import ForgotPassword, {
  ForgotPasswordDocument,
} from "../models/ForgotPassword";
import BaseRepository from "./baseRepository";

export default class ForgotPasswordRepository extends BaseRepository<ForgotPasswordDocument> {
  constructor() {
    super(ForgotPassword);
  }
}
