
import {Request, Response} from 'express';
import User from '../../models/User';

import cloudinary from "../../utils/cloudinary";
import fs from "fs";

type MulterFiles = {
  [fieldname: string]: Express.Multer.File[] | undefined;
};

export const updateProfile =  async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { userId, name, college } = req.body;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (name) user.username = name;
      if (college) user.college = college;

      const files = (req.files as unknown) as MulterFiles | undefined;

      // normalize cloudinary reference (supports cloudinary.v2 or cloudinary default export)
      const cloud = (cloudinary as any).v2 ?? (cloudinary as any);

      // Upload profile picture (optional)
      if (files?.profilePic && files.profilePic[0]) {
        const filePath = files.profilePic[0].path;
        const profileUpload = await cloud.uploader.upload(filePath, { folder: "profiles" });
        user.profilePic = profileUpload.secure_url;
        try { fs.unlinkSync(filePath); } catch { /* ignore */ }
      }

      // Upload ID card (optional)
      if (files?.idCard && files.idCard[0]) {
        const filePath = files.idCard[0].path;
        const idUpload = await cloud.uploader.upload(filePath, { folder: "id-cards" });
        user.idCard = idUpload.secure_url;
        try { fs.unlinkSync(filePath); } catch { /* ignore */ }
      }

      await user.save();

      return res.json({ success: true, user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating profile", error: err });
    }
  }