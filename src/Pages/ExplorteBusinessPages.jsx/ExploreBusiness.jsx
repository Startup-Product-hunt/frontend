import React from "react";
import Layout from "../../Components/Layout/Layout";
import { CiSearch } from "react-icons/ci";
import BusinessCard from "../../Components/Cards/BusinessCard";

const ExploreBusiness = () => {
  return (
    <Layout>
      <div className="bg-gray-50 px-8 md:px-32 py-12">
        <p className="text-4xl font-bold mb-6">Explore Businesses</p>

        {/* Search input with leading icon */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="text-gray-500 text-xl" />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-16 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <BusinessCard
              key={index}
              profileImage="https://example.com/image.jpg"
              name="Shalu Kumari"
              bio="Helping businesses grow through digital strategy."
              location="Patna, Bihar"
              tags={["Marketing", "Strategy", "Startup"]}
              link="https://example.com/profile"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ExploreBusiness;
