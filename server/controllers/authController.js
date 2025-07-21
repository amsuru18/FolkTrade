import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const JWT_SECRET = process.env.JWT_SECRET;
const OTP_EXPIRATION_MINUTES = 10;

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Signup - Register user and send OTP to email
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    // Password length validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpires = new Date(
      Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000
    );

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      isEmailVerified: false,
    });

    await newUser.save();

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "OTP Code for Verification of FolkTrade Account",
      text: `Thank you for registering on FolkTrade. Please verify your email by entering the following OTP code: ${otp}. This code will expire in 10 minutes. In case of any issues, please contact us at am.suru18@gmail.com.
      Regards,
      FolkTrade Team`,
    });

    res.status(201).json({
      message: "User created. Please verify OTP sent to email.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP - check OTP for a given userId (sent in body)
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ message: "UserId and OTP are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({ message: "No OTP requested" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid, mark email as verified and clear OTP
    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({
      message: "OTP verified successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Resend OTP - generate new OTP and send email for logged in user
export const resendOtp = async (req, res) => {
  try {
    // This route should be protected so req.user.id is available
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000;
    user.isEmailVerified = false;
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "OTP Code for Verification of FolkTrade Account",
      text: `Thank you for registering on FolkTrade. Please verify your email by entering the following OTP code: ${otp}. This code will expire in 10 minutes. In case of any issues, please contact us at am.suru18@gmail.com.
      Regards,
      FolkTrade Team`,
    });

    res.json({ message: "OTP resent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login - authenticate and return JWT token only if email verified
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isEmailVerified)
      return res.status(401).json({ message: "Please verify OTP first" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
