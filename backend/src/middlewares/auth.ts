// ...existing code...
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;

    if (!token) {
      res.status(401).json({ success: false, message: "Access denied. No token provided." });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ success: false, message: "Server misconfiguration: JWT_SECRET missing" });
      return;
    }

    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded; // cast to avoid TS error or declare Request augmentation
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default auth;

