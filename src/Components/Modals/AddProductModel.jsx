import { useState } from "react";
import FileUpload from "../Atoms/FileUpload";
import Loading from "../Atoms/Loading";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const AddProductModel = ({ onClose, onProductCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    price: "",
    category: "",
    coverImage: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({ ...prev, coverImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("details", formData.details);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage);
    }

    try {
      const res = await api.post("/user/product/create", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product created successfully!");
      onProductCreated?.(res.data); // Pass the new product to parent
      onClose(); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product");
      console.error("Product create error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Name"
            className="input"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="details"
            placeholder="Product Details"
            className="input"
            value={formData.details}
            onChange={handleChange}
            rows={3}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Product Price"
            className="input"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Product Category"
            className="input"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <FileUpload
            label="Upload Product Image"
            onChange={handleFileChange}
          />

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? <Loading /> : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModel;
