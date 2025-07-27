import { CiLocationOn } from "react-icons/ci";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import Loading from "../Atoms/Loading";

const EventCard = ({ _id, date, title, description, location }) => {
  const eventDate = new Date(date);
  const month = eventDate.toLocaleString("default", { month: "short" });
  const day = eventDate.getDate();
  const [loading, setLoading] = useState(false);
   const [sendEmailLoading,setSendEmailLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [meetLink, setMeetLink] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const handleGetTicket = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login to generate a ticket");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/user/add-ticket", { eventId: _id });
      toast.success(res.data.message || "Ticket generated successfully!");
    } catch (error) {
      console.error("Error generating ticket:", error);
      toast.error(error.response?.data?.error || "Failed to generate ticket.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMeetLink = async () => {
    if (!meetLink.trim()) {
      toast.error("Please enter a valid meet link.");
      return;
    }
    setSendEmailLoading(true);
    try {
      const res = await api.post("/admin/send-event-link", {
        eventId: _id,
        meetLink,
      });
      toast.success(res.data.message || "Meet link sent successfully!");
      setShowModal(false);
      setMeetLink("");
    } catch (error) {
      console.error("Error sending meet link:", error);
      toast.error(error.response?.data?.message || "Failed to send meet link.");
    } finally {
      setSendEmailLoading(false);
    }
  };

  return (
    <>
      {/* Event Card */}
      <div className="w-full border border-gray-200 rounded-xl p-4 bg-white relative flex flex-col md:flex-row gap-4">
        {/* Date box */}
        <div className="bg-amber-100 text-center px-4 py-2 h-fit rounded-md w-20 flex-shrink-0">
          <p className="font-medium text-gray-700">{month}</p>
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
          <button
            onClick={isAdmin ? () => setShowModal(true) : handleGetTicket}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-bold text-sm"
          >
            {loading ? <Loading /> : isAdmin ? "Send Meet Link" : "Get Ticket"}
          </button>
        </div>
      </div>

      {/* Modal for Meet Link */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Send Event Meet Link</h2>
            <input
              type="text"
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              placeholder="Enter Google Meet link"
              className="input mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMeetLink}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {sendEmailLoading ? <Loading /> : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
