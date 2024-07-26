import { Router } from "express";
import {
  getUserData,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController";
import protect from "../middleware/authMiddleware";

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserData);
router.put("/update", protect, updateUser);

export { router as UserRouter };
