import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs/promises";
import { Request } from "express";
import { AuthenticatedRequest } from "../types/types";

// Create uploads directory if it doesn't exist
const uploadDir = "uploads";

const createUploadsDir = async (): Promise<void> => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Failed to create directory:", err);
  }
};

createUploadsDir();

// Helper function to delete all files with the same user ID
const deleteOldFiles = async (userId: string): Promise<void> => {
  try {
    const files = await fs.readdir(uploadDir);
    await Promise.all(
      files
        .filter((file) => file.startsWith(userId))
        .map((file) => fs.unlink(path.join(uploadDir, file))),
    );
    console.log(`Deleted old files for user ID: ${userId}`);
  } catch (err) {
    console.error("Failed to delete files:", err);
  }
};

// File filter function to allow only image formats
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only image files are allowed."));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: async (req, file, cb) => {
    const AuthReq = req as AuthenticatedRequest;
    const userId = AuthReq.user ? AuthReq.user.id : Date.now().toString(); // Fallback to timestamp if user ID is not available

    try {
      await deleteOldFiles(userId);
      cb(null, `${userId}${path.extname(file.originalname)}`);
    } catch (err) {
      cb(err as Error, ""); // Pass empty string for filename if there's an error
    }
  },
});

const upload = multer({
  storage,
  fileFilter: imageFileFilter, // Apply the file filter
});

export default upload;
