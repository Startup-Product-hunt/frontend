import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import UserCard from "../../Components/Cards/UserCard";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/all-users");
      setUsers(res.data);
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

  return (
    <Layout>
      <div className="px-4 md:px-32 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Users</h1>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard
                key={user._id}
                profileImage={
                  user.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Default profile pic
                }
                name={user.name}
                bio={user.bio || "No bio available"}
                location={user.location || "Unknown"}
                tags={user.tags && user.tags.length > 0 ? user.tags : ["No Tags"]}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllUser;
