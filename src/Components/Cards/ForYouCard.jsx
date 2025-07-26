import React from 'react';

const ForYouCard = ({ title, description, profileName, mainImage, profileImage, category, price }) => {
  return (
    <div className="w-full bg-white max-w-sm h-96 rounded-lg overflow-hidden shadow-lg flex flex-col">
      {/* Image with Category & Price */}
      <div className="h-[60%] w-full relative">
        <img src={mainImage} alt={title} className="w-full h-full object-cover" />

        {/* Category - bottom-left */}
        <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
          {category}
        </span>

        {/* Price - bottom-right */}
        <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          ${price}
        </span>
      </div>

      {/* Content */}
      <div className="h-[40%] p-3 flex flex-col bg-[#383838] justify-between">
        {/* Title & Description */}
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-2 mt-0">
          <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-sm font-medium">{profileName}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button className="px-3 py-1 rounded-md border bg-white text-gray-900 border-gray-400 hover:bg-gray-200 transition">
            Buy
          </button>
          <button className="px-3 py-1 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForYouCard;
