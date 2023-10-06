import express from "express";
import AuthController, {
  handleUserActivation,
  handleRefreshToken,
  getEmail,
} from "../controllers/authController";

const authController = new AuthController();

const router = express.Router();

router.post("/create", authController.create);

router.post("/activate", handleUserActivation);

router.post("/login", authController.login);

router.post("/refresh", handleRefreshToken);

router.post("/logout", authController.logout);

router.post("/user/email", getEmail);

export default router;
