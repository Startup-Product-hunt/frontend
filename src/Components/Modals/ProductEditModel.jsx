import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import FileUpload from "../Atoms/FileUpload";
import Loading from "../Atoms/Loading";

const ProductEditModel = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    price: "",
    category: "",
    coverImage: "",
  });

  const [loading, setLoading] = useState(false);

  // Pre-fill form data when editing an existing product
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        details: product.details || "",
        price: product.price || "",
        category: product.category || "",
        coverImage: product.coverImage || "",
      });
    }
  }, [product]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleFileChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  // Submit the form
  const handleSubmit = async () => {
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("details", formData.details);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    if (formData.coverImage instanceof File) {
      formDataToSend.append("coverImage", formData.coverImage);
    }

    try {
      await onSave(formDataToSend);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Product</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            className="input"
            placeholder="Product Name"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="details"
            className="input"
            placeholder="Product Details"
            rows={3}
            value={formData.details}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            className="input "
            placeholder="Product Price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            className="input "
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <FileUpload
            label="Upload Product Image"
            onChange={handleFileChange}
            value={formData.coverImage}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loading /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModel;
