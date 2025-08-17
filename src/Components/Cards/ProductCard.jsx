import { FaTrash, FaEdit } from "react-icons/fa";
const ProductCard = ({
  name,
  price,
  mainImage,
  onEdit,
  onDelete,
  onImageClick,
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col relative">
      {/* Product Image with edit and delete Icons */}
      <div
        className="relative w-full h-56 group cursor-pointer"
        onClick={onImageClick}
      >
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
          title="Edit Product"
        >
          <FaEdit size={14} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-600 hover:text-white transition"
          title="Delete Product"
        >
          <FaTrash size={14} />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 px-4 py-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">Rs. {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
