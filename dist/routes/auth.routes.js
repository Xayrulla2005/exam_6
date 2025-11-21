import { Router } from "express";
import { register, login, forgotPassword, changePassword } from "../controller/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();
// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);
// Example protected route
router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});
export default router;
//# sourceMappingURL=auth.routes.js.map