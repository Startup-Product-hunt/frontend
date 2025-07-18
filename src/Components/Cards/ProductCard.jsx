import React from 'react';

const ProductCard = ({ name, price, mainImage }) => {
  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      
      {/* Product Image with rounded corners */}
      <div className="w-full h-64">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Text and Buttons section */}
      <div className="flex flex-col gap-2 px-1">
        {/* Name and Price */}
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-gray-700">$ {price}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-20 mt-1">
          <button className="flex-1 cursor-pointer py-1 rounded-md border bg-white text-gray-900 border-gray-400 hover:bg-gray-200 transition text-sm">
            Buy
          </button>
          <button className="flex-1 py-1 cursor-pointer rounded-md bg-blue-700 text-white hover:bg-blue-800 transition text-sm">
            Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
