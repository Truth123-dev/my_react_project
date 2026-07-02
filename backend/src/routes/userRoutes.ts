import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getProfile } from "../controllers/authController";

const router = Router();
router.get("/me", authMiddleware, getProfile);

export default router;
