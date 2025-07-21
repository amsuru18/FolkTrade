import Product from "../models/Product.js";

const ALLOWED_CATEGORIES = [
  "Edible",
  "Clothes",
  "Train Tickets",
  "Notes",
  "Books",
  "Electronics",
  "Furniture",
  "Others",
];

// Create new product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      image,
      category,
      condition,
      whatsapp,
      dial,
      hostel,
      email,
    } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }
    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      return res
        .status(400)
        .json({ message: "Invalid category. Please select a valid category." });
    }
    // WhatsApp and dial number validation (basic: must be digits, 8-15 chars)
    const phoneRegex = /^\d{8,15}$/;
    if (whatsapp && !phoneRegex.test(whatsapp)) {
      return res
        .status(400)
        .json({ message: "Invalid WhatsApp number format" });
    }
    if (dial && !phoneRegex.test(dial)) {
      return res.status(400).json({ message: "Invalid dial number format" });
    }

    const product = await Product.create({
      title,
      description,
      price,
      image,
      category,
      condition,
      whatsapp,
      dial,
      hostel,
      email,
      seller: req.user._id,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "fullName email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "fullName email"
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in user’s products
export const getMyProducts = async (req, res) => {
  try {
    const myProducts = await Product.find({ seller: req.user._id });
    res.json(myProducts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user._id,
    });

    if (!product) {
      console.error(
        `Delete failed: Product not found or not owned by user. Product ID: ${req.params.id}, User ID: ${req.user._id}`
      );
      return res.status(404).json({
        message:
          "Product not found or you are not authorized to delete this product.",
      });
    }

    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};
