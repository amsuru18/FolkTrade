import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer "
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // Extract token string after "Bearer "
      token = req.headers.authorization.split(" ")[1];

      // Verify token and decode payload
      const decoded = jwt.verify(token, JWT_SECRET);

      // Find user by ID from decoded token payload, exclude password field
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Proceed to next middleware or route handler
      return next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // No token found in request
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};
