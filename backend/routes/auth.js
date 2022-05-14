import express from "express";
import {
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from "../controllers/authController/index.js";

const router = express.Router();

router.post("/login", handleLogin);

router.post("/refresh", handleRefreshToken);

router.post("/logout", handleLogout);

export default router;
