import { Router } from "express";
import { checkoutOrder } from "../controller/checkout.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, checkoutOrder);

export default router;
