import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaBook,
  FaTshirt,
  FaUtensils,
  FaTrain,
  FaStickyNote,
  FaCouch,
  FaMobileAlt,
  FaBoxOpen,
  FaThLarge,
} from "react-icons/fa";

const CATEGORY_ICONS = {
  All: <FaThLarge className="inline mr-1" />,
  Edible: <FaUtensils className="inline mr-1" />,
  Clothes: <FaTshirt className="inline mr-1" />,
  "Train Tickets": <FaTrain className="inline mr-1" />,
  Notes: <FaStickyNote className="inline mr-1" />,
  Books: <FaBook className="inline mr-1" />,
  Electronics: <FaMobileAlt className="inline mr-1" />,
  Furniture: <FaCouch className="inline mr-1" />,
  Others: <FaBoxOpen className="inline mr-1" />,
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const matchesCategory =
          category === "All" || product.category === category;
        const matchesSearch = (product.title || "")
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
    : [];

  return (
    <div className="p-4 mt-4 min-h-[calc(100vh-56px-48px)] pb-20">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4 bg-white/80 dark:bg-gray-900/80 shadow focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 transition"
      />

      {/* category buttons */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {[
          "All",
          "Edible",
          "Clothes",
          "Train Tickets",
          "Notes",
          "Books",
          "Electronics",
          "Furniture",
          "Others",
        ].map((cat) => (
          <button
            key={cat}
            className={`flex items-center gap-1 px-4 py-1 rounded-full border-2 text-sm font-semibold shadow-sm transition-all
              ${
                category === cat
                  ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white border-blue-500 dark:from-purple-700 dark:to-purple-500 dark:border-purple-700"
                  : "bg-white/80 dark:bg-gray-900/80 text-blue-700 dark:text-purple-200 border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800"
              }
            `}
            onClick={() => setCategory(cat)}
          >
            {CATEGORY_ICONS[cat]}
            {cat}
          </button>
        ))}
      </div>

      {/* product grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 border border-blue-200 dark:border-gray-800 rounded-2xl shadow-xl dark:shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition-all flex flex-col"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-44 object-cover rounded-t-2xl"
              />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-lg mb-1 text-blue-900 dark:text-purple-200 truncate">
                  {product.title}
                </h3>
                <p className="text-green-600 font-bold text-base mb-2">
                  ₹{product.price}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {product.category}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
