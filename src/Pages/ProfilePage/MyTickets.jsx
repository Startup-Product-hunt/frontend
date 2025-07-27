import  { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import TicketCard from "../../Components/Cards/TicketCard";


const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/tickets"); 
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      toast.error("Failed to fetch tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
      <>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tickets</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        ) : tickets.length === 0 ? (
         <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
          No Ticket found
        </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket._id}
                event={ticket.eventId}
                ticketNumber={ticket.ticketNumber}
                issuedAt={ticket.issuedAt}
              />
            ))}
          </div>
        )}
      </>
   
  );
};

export default MyTickets;
