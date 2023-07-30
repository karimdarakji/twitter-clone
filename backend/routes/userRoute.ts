import express from "express";
import { getUser } from "../controllers/userController";

const router = express.Router();

router.get("/users/user", getUser);

export default router;
