import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { FaBoxOpen, FaTrashAlt } from "react-icons/fa";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchMyProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/products/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch your products"
      );
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    toast((t) => (
      <span>
        Are you sure you want to delete this product?
        <div className="mt-2 flex gap-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const token = localStorage.getItem("token");
                await axios.delete(`/api/products/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Product deleted");
                setProducts(products.filter((p) => p._id !== id));
              } catch (error) {
                toast.error(
                  error.response?.data?.message || "Failed to delete product"
                );
              }
            }}
          >
            <FaTrashAlt /> Yes
          </button>
          <button
            className="bg-gray-300 text-black px-2 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto mt-16 pb-20">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 dark:text-purple-200 flex items-center gap-2">
        <FaBoxOpen className="text-blue-400 dark:text-purple-400" /> My Products
      </h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          You have not listed any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 border border-blue-200 dark:border-gray-800 rounded-2xl shadow-xl dark:shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition-all flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-44 w-full object-cover rounded-t-2xl cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-lg mb-1 text-blue-900 dark:text-purple-200 truncate">
                  {product.title}
                </h3>
                <p className="text-green-600 font-bold text-base mb-2">
                  ₹{product.price}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {product.category}
                </span>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="mt-auto bg-red-500 text-white p-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition-all w-fit self-end"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
