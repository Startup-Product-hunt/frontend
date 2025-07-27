import { CiLocationOn } from "react-icons/ci";

const TicketGeneratedUserDetail = ({
  profileImage,
  name,
  bio,
  location,
  tags,
  email,
  eventName,
}) => {
  // Dummy image if profileImage is not provided
  const defaultImage = "/images/profile.png";

  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-md bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Profile image and name */}
      <div className="flex items-center space-x-4 mb-2">
        <img
          src={profileImage || defaultImage}
          alt={name || "No Name"}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-xl font-semibold">{name || "N/A"}</p>
          <p className="text-sm text-gray-400 break-all">{email || "N/A"}</p>

          {/* Event Name */}
          <p className="mt-1 text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md inline-block">
            🎟 Event: {eventName || "N/A"}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-700 mb-2">{bio || "N/A"}</p>

      {/* Location */}
      <p className="text-sm text-gray-500 mb-2 flex gap-1 items-center">
        <CiLocationOn className="text-lg" /> {location || "N/A"}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400">Tags: N/A</p>
      )}
    </div>
  );
};

export default TicketGeneratedUserDetail;
