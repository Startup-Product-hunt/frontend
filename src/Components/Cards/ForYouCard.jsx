import React from 'react';

const ForYouCard = ({ title, description, profileName, mainImage, profileImage }) => {
  return (
    <div className="w-full max-w-sm h-96 rounded-lg overflow-hidden shadow-lg flex flex-col">
      {/* 60% Image */}
      <div className="h-[60%] w-full">
        <img src={mainImage} alt="Main" className="w-full h-full object-cover" />
      </div>

      {/* 40% Content */}
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
          <button className="button rounded-md border bg-white text-gray-900 border-gray-400 hover:bg-gray-200 transition">
            Buy
          </button>
          <button className="button rounded-md bg-blue-700 text-white hover:bg-blue-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForYouCard;
