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

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & { userId: string };

    console.log("AUTH DEBUG 1: Decoded JWT Payload:", decoded); // Log the full decoded object

    // Ensure this line correctly extracts the string property!
    (req as any).userId = decoded.userId; 

    console.log("AUTH DEBUG 2: Value assigned to req.userId:", (req as any).userId); // Log the value assigned

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default auth;

