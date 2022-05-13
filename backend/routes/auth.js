import express from "express";
import {
  handleLogin,
  handleRefreshToken,
} from "../controllers/authController/index.js";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/refresh", handleRefreshToken);

export default router;
