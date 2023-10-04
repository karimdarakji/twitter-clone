import express from "express";
import {
  handleUserActivation,
  handleLogin,
  handleRefreshToken,
  handleLogout,
  createUser,
  getEmail,
} from "../controllers/authController";

const router = express.Router();

router.post("/create", createUser);

router.post("/activate", handleUserActivation);

router.post("/login", handleLogin);

router.post("/refresh", handleRefreshToken);

router.post("/logout", handleLogout);

router.post("/user/email", getEmail);

export default router;
