import { Router } from "express";
import {
  getUserData,
  loginUser,
  registerUser,
  removeProfilePicture,
  updateUser,
  uploadProfilePicture,
} from "../controllers/userController";
import protect from "../middleware/authMiddleware";
import upload from "../middleware/upload";

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserData);
router.put("/update", protect, updateUser);
router.post(
  "/upload-profile-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture,
);

router.post("/remove-profile-picture", protect, removeProfilePicture);

export { router as UserRouter };
