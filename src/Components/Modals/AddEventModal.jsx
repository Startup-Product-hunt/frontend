import React, { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import Loading from "../Atoms/Loading";

const AddEventModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    dateTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) {
      toast.error("User not found. Please login again.");
      return;
    }

    if (!eventData.title || !eventData.description || !eventData.location || !eventData.dateTime) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/admin/events/create", {
        ...eventData,
        userId: user._id,
      });

      toast.success("Event added successfully!");
      onSuccess?.(); // Refresh parent data if needed
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4">Add Event</h2>

        {/* Event Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            className="input"
            placeholder="Enter event name"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="input"
            placeholder="Enter event description"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            className="input"
            placeholder="Enter event location"
          />
        </div>

        {/* Date & Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="dateTime"
            value={eventData.dateTime}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? <Loading/> : "Add Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
