import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaRupeeSign,
  FaStickyNote,
  FaThList,
  FaImage,
  FaWhatsapp,
  FaHome,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function SellForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [hostel, setHostel] = useState("");
  const [email, setEmail] = useState("");
  const [dial, setDial] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !price ||
      !description ||
      !category ||
      !image ||
      !whatsapp ||
      !hostel ||
      !email ||
      !dial
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);
      formData.append("whatsapp", whatsapp);
      formData.append("hostel", hostel);
      formData.append("email", email);
      formData.append("dial", dial);

      // Send POST request with token (assuming token saved in localStorage or context)
      const token = localStorage.getItem("token");

      await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product listed successfully!");
      navigate("/my-products");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to post product, try again"
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 border rounded-3xl shadow-xl bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pb-6">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 dark:text-purple-200 flex items-center gap-2">
        <FaBoxOpen className="text-blue-400 dark:text-purple-400" /> Sell an
        Item
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <FaBoxOpen className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-blue-200 dark:border-purple-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <FaRupeeSign className="absolute left-3 top-3 text-green-500" />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-blue-200 dark:border-purple-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <FaStickyNote className="absolute left-3 top-3 text-blue-300 dark:text-purple-300" />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-blue-200 dark:border-purple-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <FaThList className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-blue-200 dark:border-purple-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          >
            <option value="">Select Category</option>
            <option value="Edible">Edible</option>
            <option value="Clothes">Clothes</option>
            <option value="Train Tickets">Train Tickets</option>
            <option value="Notes">Notes</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="relative">
          <FaImage className="absolute left-3 top-3 text-blue-300 dark:text-purple-300" />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-blue-200 dark:border-purple-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
            accept="image/*"
          />
        </div>
        <div className="relative">
          <FaWhatsapp className="absolute left-3 top-3 text-green-500" />
          <input
            type="text"
            placeholder="WhatsApp Number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-blue-200 dark:border-purple-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <FaHome className="absolute left-3 top-3 text-blue-400 dark:text-purple-400" />
          <input
            type="text"
            placeholder="Hostel"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-blue-200 dark:border-purple-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-blue-200 dark:border-purple-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <FaPhoneAlt className="absolute left-3 top-3 text-blue-700" />
          <input
            type="text"
            placeholder="Dial Number"
            value={dial}
            onChange={(e) => setDial(e.target.value)}
            className="pl-10 p-2 border rounded w-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border-blue-200 dark:border-purple-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-purple-700 dark:to-purple-500 text-white p-2 rounded-full font-bold shadow hover:scale-105 transition-all"
        >
          Post Product
        </button>
      </form>
    </div>
  );
}
