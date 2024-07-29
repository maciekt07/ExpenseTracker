import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { AuthenticatedRequest } from "../types/types";

// Create uploads directory if it doesn't exist
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper function to delete all files with the same user ID
const deleteOldFiles = (userId: string): void => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Failed to read directory:", err);
      return;
    }

    files.forEach((file) => {
      if (file.startsWith(userId)) {
        const filePath = path.join(uploadDir, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Failed to delete file:", err);
          } else {
            console.log(`Deleted old file: ${file}`);
          }
        });
      }
    });
  });
};

// File filter function to allow only image formats
const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
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
  filename: (req, file, cb) => {
    const AuthReq = req as AuthenticatedRequest;
    const userId = AuthReq.user ? AuthReq.user.id : Date.now().toString(); // Fallback to timestamp if user ID is not available

    // Delete old files with the same user ID
    deleteOldFiles(userId);

    // Save the new file with the user ID and original extension
    cb(null, `${userId}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: imageFileFilter, // Apply the file filter
});

export default upload;
