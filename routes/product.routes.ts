import { Router } from "express";
import {crateProduct,updateProduct,deleteProduct,getProducts,getProduct,} from "../controller/product.controller.js";
import { authMiddleware, adminMiddleware, AuthRequest } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin routes
router.post("/", authMiddleware, adminMiddleware, crateProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
