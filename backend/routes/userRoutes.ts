import express from "express";
import {
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userController";
import protect from "../middleware/authMiddleware";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserData);

export { router as UserRouter };
