import React from "react";
import { CiLocationOn } from "react-icons/ci";
const EventCard = ({ date, title, description, location }) => {
  const eventDate = new Date(date);
  const month = eventDate.toLocaleString("default", { month: "short" });
  const day = eventDate.getDate();

  return (
   <div className="w-full border border-gray-200 rounded-xl p-4  bg-white relative flex flex-col md:flex-row gap-4">
      {/* Date box */}
      <div className="bg-amber-100 text-center px-4 py-2 h-fit rounded-md w-20 flex-shrink-0">
        <p className=" font-medium text-gray-700">{month}</p>
        <p className="text-4xl font-bold text-gray-900">{day}</p>
      </div>

      {/* Event Info */}
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <CiLocationOn /> {location}
        </p>
      </div>

      {/* Button */}
      <div className="md:absolute bottom-4 right-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-bold text-sm">
          Get Ticket
        </button>
      </div>
    </div>
  );
};

export default EventCard;
