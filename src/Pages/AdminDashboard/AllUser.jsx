import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import UserCard from "../../Components/Cards/UserCard";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/all-users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users by name
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUsers(users);
    } else {
      const searchLower = search.toLowerCase();
      setFilteredUsers(
        users.filter((user) => user.name.toLowerCase().includes(searchLower))
      );
    }
  }, [search, users]);

  return (
    <Layout>
      <div className="px-4 md:px-32 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Users</h1>

        {/* Search Box */}
        <div className="relative w-full max-w-md mb-5">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="text-gray-500 text-xl" />
          </span>
          <input
            type="text"
            placeholder="Search User"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>

        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center">No users found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <UserCard
                key={user._id}
                profileImage={
                  user.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Default profile pic
                }
                name={user.name}
                bio={user.bio || "No bio available"}
                location={user.location || "Unknown"}
                tags={user.tags?.length > 0 ? user.tags : ["No Tags"]}
                email={user.email}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllUser;
