import express from "express";
import {
  signup,
  login,
  verifyOtp,
  resendOtp,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js"; // make sure folder is named 'middleware' (singular)

const router = express.Router();

// POST /api/auth/signup - Register a new user and send OTP
router.post("/signup", signup);

// POST /api/auth/login - Login existing user
router.post("/login", login);

// POST /api/auth/verify-otp - Verify OTP sent to user's email
router.post("/verify-otp", verifyOtp);

// POST /api/auth/resend-otp - Resend OTP, requires user to be logged in
router.post("/resend-otp", protect, resendOtp);

export default router;
