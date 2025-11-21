import { Router } from "express";
import { createOrder, getMyOrders, getAllOrders } from "../controller/order.controller.js";
import { authMiddleware, adminMiddleware, AuthRequest } from "../middlewares/auth.middleware.js";

const router = Router();

// User endpoints
router.post("/", authMiddleware, createOrder);
router.get("/me", authMiddleware, getMyOrders);

// Admin endpoints
router.get("/", authMiddleware, adminMiddleware, getAllOrders);

export default router;
