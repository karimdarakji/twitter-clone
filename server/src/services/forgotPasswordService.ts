import { ForgotPasswordDocument } from "../models/ForgotPassword";
import ForgotPasswordRepository from "../repositories/forgotPasswordRepository";
import Service from "./service";

export default class ForgotPasswordService extends Service<ForgotPasswordDocument> {
  constructor() {
    super(new ForgotPasswordRepository());
  }
}
