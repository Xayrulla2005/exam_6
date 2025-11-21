import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";

export const isAdminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Only admin can perform this action" });
  }
  next();
};
