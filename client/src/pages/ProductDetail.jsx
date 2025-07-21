import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaRupeeSign,
  FaEnvelope,
  FaWhatsapp,
  FaHome,
  FaPhoneAlt,
  FaBoxOpen,
} from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    } catch (error) {
      toast.error("Failed to fetch product details.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-4 text-center">Loading product...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 p-4 border rounded-3xl shadow-xl bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex flex-col md:flex-row gap-8 items-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-80 object-cover rounded-2xl shadow-lg border border-blue-100 dark:border-gray-800"
      />
      <div className="flex-1 flex flex-col gap-3 bg-white/95 dark:bg-gray-900/90 border border-blue-100 dark:border-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-purple-200 mb-2 flex items-center gap-2">
          <FaBoxOpen className="text-blue-400 dark:text-purple-400" />
          {product.title}
        </h2>
        <p className="text-green-600 font-bold text-2xl flex items-center gap-1">
          <FaRupeeSign />
          {product.price}
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300 text-base">
          {product.description}
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-purple-900 text-blue-700 dark:text-purple-200 text-xs font-semibold w-fit mb-2">
          {product.category}
        </span>
        <div className="mt-4">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-purple-200">
            Contact Seller:
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            {product.whatsapp && (
              <li className="flex items-center gap-2">
                <FaWhatsapp className="text-green-500" /> WhatsApp:{" "}
                {product.whatsapp}
              </li>
            )}
            {product.hostel && (
              <li className="flex items-center gap-2">
                <FaHome className="text-blue-400" /> Hostel: {product.hostel}
              </li>
            )}
            {product.email && (
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> Email: {product.email}
              </li>
            )}
            {product.dial && (
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-700" /> Dial Number:{" "}
                {product.dial}
              </li>
            )}
            {!product.whatsapp &&
              !product.hostel &&
              !product.email &&
              !product.dial && (
                <li className="text-gray-400 italic">
                  No contact info provided.
                </li>
              )}
          </ul>
        </div>
      </div>
    </div>
  );
}
