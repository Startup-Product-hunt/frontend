import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { FaUsers, FaTicketAlt, FaClipboardList, FaCalendarPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddEventModal from "../../Components/Modals/AddEventModal";

const AdminPage = () => {
  const navigate = useNavigate();
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const options = [
    {
      title: "View Users",
      description: "Manage and view all registered users.",
      icon: <FaUsers size={50} className="text-indigo-500" />,
      onClick: () => navigate("/admin/users"),
    },
    {
      title: "View All Tickets",
      description: "See all tickets submitted by users.",
      icon: <FaTicketAlt size={50} className="text-green-500" />,
      onClick: () => navigate("/admin/tickets"),
    },
    {
      title: "View Created Tickets",
      description: "Monitor tickets created by admin.",
      icon: <FaClipboardList size={50} className="text-yellow-500" />,
      onClick: () => navigate("/admin/created-tickets"),
    },
    {
      title: "Add Event",
      description: "Create and publish new events.",
      icon: <FaCalendarPlus size={50} className="text-pink-500" />,
      onClick: () => setShowAddEventModal(true), // Open modal
    },
  ];

  return (
    <Layout>
      <div className="px-4 md:px-32 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {options.map((opt, index) => (
            <div
              key={index}
              onClick={opt.onClick}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <div className="mb-4">{opt.icon}</div>
              <h2 className="text-lg font-semibold mb-2">{opt.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{opt.description}</p>
              <button className="px-4 py-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                Open
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <AddEventModal
          onClose={() => setShowAddEventModal(false)}
          onSuccess={() => {
            setShowAddEventModal(false);
            console.log("Event added successfully");
          }}
        />
      )}
    </Layout>
  );
};

export default AdminPage;
