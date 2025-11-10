import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import fs from "fs";
// import type { Multer } from "multer";
// Define Multer storage engine
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Folder to save files
  },
  filename: (req, file, cb) => {
    // Make filename unique using Date.now()
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Optional: file filter for image-only uploads
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Initialize upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 2 MB limit
});

export default upload;
