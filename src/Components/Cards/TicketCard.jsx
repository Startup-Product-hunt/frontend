const TicketCard = ({ event, ticketNumber, issuedAt }) => {


  const eventDate = new Date(event.dateTime).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h2>
      <p className="text-gray-500 text-sm mb-2">
        <span className="font-medium">Location:</span> {event.location}
      </p>
      <p className="text-gray-700 text-sm mb-2">{event.description}</p>
      <p className="text-sm text-gray-500 mb-2">
        <span className="font-medium">Event Date:</span> {eventDate}
      </p>
      <div className="bg-gray-100 p-2 rounded-lg mt-3 text-sm text-gray-600">
        <p><span className="font-medium">Ticket Number:</span> {ticketNumber}</p>
        <p><span className="font-medium">Issued At:</span> {new Date(issuedAt).toLocaleDateString("en-US")}</p>
      </div>
    </div>
  );
};

export default TicketCard;
