import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controller/cart.cantroller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/:productId", authMiddleware, removeFromCart);

export default router;
