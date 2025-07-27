import { FaTimes } from "react-icons/fa";

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full relative p-6">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <img
          src={product.coverImage}
          alt={product.title}
          className="w-full object-cover rounded-lg mb-4"
        />

        <p className="text-xl font-semibold mb-0">{product.title}</p>
        <p className="text-gray-600 text-sm mb-0">{product.details}</p>
        <p className="text-gray-800 text-sm font-medium mb-0">
          Category: <span className="text-blue-600">{product.category}</span>
        </p>
        <p className="text-xl font-bold text-green-700 mb-0">
          $ {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailModal;
