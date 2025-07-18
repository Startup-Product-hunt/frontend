import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ForYouCard from "../../Components/Cards/ForYouCard";
import mainImage from "/images/demo.jpeg";
import profileImage from "/images/demo.jpeg";

const ForYou = () => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate("/for-you/all");
  };

  return (
    <div className="p-6">
      {/* Title and See More aligned horizontally */}
      <div className="flex items-center justify-between mt-10 mb-6">
        <p className="font-semibold text-3xl">For You</p>

        <button
          onClick={handleSeeMore}
          className="flex items-center gap-1  hover:text-gray-200 cursor-pointer font-medium text-sm transition"
        >
          See More <IoIosArrowForward />
        </button>
      </div>

      {/* 4-column responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <ForYouCard
            key={index}
            title="Team workshop"
            description="Join Our upcoming Workshope."
            profileName="FurnitureCo"
            mainImage={mainImage}
            profileImage={profileImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ForYou;
