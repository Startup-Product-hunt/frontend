import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { CiSearch } from "react-icons/ci";
import EventCard from "../../Components/Cards/EventCard";
import api from "../../api/axios";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await api.get("/general/events");
        setEvents(res.data);
        setFilteredEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter events by location
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredEvents(events);
    } else {
      const searchLower = search.toLowerCase();
      setFilteredEvents(
        events.filter((event) =>
          event.location.toLowerCase().includes(searchLower)
        )
      );
    }
  }, [search, events]);

  return (
    <Layout>
      <div className="bg-gray-50 px-8 md:px-32 py-12">
        <p className="text-4xl font-bold mb-6">Upcoming Events</p>

        {/* Search bar */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="text-gray-500 text-xl" />
          </span>
          <input
            type="text"
            placeholder="Search by location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="flex justify-center items-center mt-16">
            <div className="w-10 h-10 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-16 w-full flex flex-col gap-6 max-w-6xl mx-auto">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  _id={event._id}
                  date={new Date(event.dateTime).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                  })}
                  title={event.title}
                  description={event.description}
                  location={event.location}
                />
              ))
            ) : (
              <p className="text-gray-500 text-lg flex justify-center items-center">
                No events found.
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Event;
