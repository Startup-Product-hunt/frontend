import { useEffect, useState } from "react";
import api from "../../api/axios";
import TicketGeneratedUserDetail from "../../Components/Cards/TicketGeneratedUserDetail";
import Layout from "../../Components/Layout/Layout";

const AllCreatedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/admin/all-tickets");
      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center mt-56">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <p className="text-center mt-5 text-2xl font-bold">
        All Generated Tickets
      </p>
      <div className="px-32 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketGeneratedUserDetail
              key={ticket._id}
              profileImage={ticket.userId?.profilePic}
              name={ticket.userId?.name}
              email={ticket.userId?.email}
              bio={ticket.userId?.bio}
              location={ticket.userId?.location}
              tags={ticket.userId?.tags || []}
              eventName={ticket.eventId?.title || "No Event Assigned"}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No tickets found.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default AllCreatedTickets;
