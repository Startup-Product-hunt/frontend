import React from 'react';
import { CiLocationOn } from "react-icons/ci";

const UserCard = ({ profileImage, name, bio, location, tags, link }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4  max-w-md">
      {/* Profile image and name */}
      <div className="flex items-center space-x-4 mb-2">
        <img
          src={profileImage}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <p className="text-xl font-semibold">{name}</p>
      </div>

      {/* Bio */}
      <p className="text-gray-700 mb-2">{bio}</p>

      {/* Location */}
      <p className="text-sm text-gray-500 mb-2 flex gap-1 items-center"><CiLocationOn className='text-lg'/> {location}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-200 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
