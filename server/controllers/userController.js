import User from "../models/User.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

// Get logged-in user profile
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // attached by auth middleware
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile (name, email, whatsappNumber, hostel, dialNumber)
export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const {
      fullName,
      email,
      whatsappNumber,
      hostel,
      dialNumber,
      password,
      newEmailOtp, // if you want to implement OTP on email change here
    } = req.body;

    if (email && email !== user.email) {
      // Handle email change verification separately with OTP flow (to be implemented)
      // For now, deny direct email change here
      return res
        .status(400)
        .json({ message: "Email change requires OTP verification" });
    }

    if (password) {
      // Hash new password
      user.password = await bcrypt.hash(password, 10);
    }

    // Update other fields
    if (fullName) user.fullName = fullName;
    if (whatsappNumber) user.whatsappNumber = whatsappNumber;
    if (hostel) user.hostel = hostel;
    if (dialNumber) user.dialNumber = dialNumber;

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update verifyOtp to handle pendingEmail
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
    // OTP is valid
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
