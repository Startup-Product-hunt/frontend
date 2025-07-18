import React from "react";
import Layout from "../../Components/Layout/Layout";
import { CiSearch } from "react-icons/ci";
import EventCard from "../../Components/Cards/EventCard";

const Event = () => {
  return (
    <Layout>
      <div className="bg-gray-50 px-8 md:px-32 py-12">
        <p className="text-4xl font-bold mb-6">Upcoming Events</p>

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
        <div className="mt-16 w-full flex flex-col gap-6 max-w-6xl mx-auto">
          <EventCard
            date="2025-08-15"
            title="Startup Pitch Fest"
            description="Join the biggest startup pitch event of the year with investors and VCs."
            location="Delhi NCR"
          />
          <EventCard
            date="2025-08-20"
            title="Tech Expo 2025"
            description="Showcase and experience the latest innovations in technology."
            location="Bangalore"
          />
          <EventCard
            date="2025-09-05"
            title="Women in Business Conference"
            description="Empowering female entrepreneurs with resources and mentorship."
            location="Mumbai"
          />
          <EventCard
            date="2025-09-15"
            title="Green Energy Summit"
            description="Explore future energy solutions with leaders and researchers."
            location="Hyderabad"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Event;
