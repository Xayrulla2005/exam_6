import { Router } from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controller/wishlist.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:productId", authMiddleware, addToWishlist);
router.get("/", authMiddleware, getWishlist);
router.delete("/:productId", authMiddleware, removeFromWishlist);

export default router;
