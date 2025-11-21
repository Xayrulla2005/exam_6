import { Router } from "express";
import { 
  register, 
  verifyEmail, 
  resendVerificationCode, 
  login 
} from "../controller/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-code", resendVerificationCode);
router.post("/login", login);

export default router;