import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  deleteProduct,
} from "../controllers/productController.js";

import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public route: get all products
router.get("/", getAllProducts);

// Get current user's products
router.get("/my", protect, getMyProducts);

// Create a new product with image upload
router.post(
  "/",
  protect,
  upload.single("image"), // this handles image upload to Cloudinary
  (req, res, next) => {
    // Attach uploaded image URL to request body
    if (req.file && req.file.path) {
      req.body.image = req.file.path;
    }
    next();
  },
  createProduct
);

// Get single product by ID
router.get("/:id", getProductById);

// Delete a product
router.delete("/:id", protect, deleteProduct);

export default router;
