import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone, FaTimes } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Products from "./Products";
import Layout from "../../Components/Layout/Layout";
import api from "../../api/axios";
import toast from "react-hot-toast";

const Posts = () => <div className="p-4">Posts Section</div>;
const Reels = () => <div className="p-4">Reels Section</div>;

const Profile = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [zoomed, setZoomed] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <Layout>
      <div className="bg-gray-50 px-8 md:px-32 py-12">
        {/* Top Section */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.profilePic || "/images/demo.jpeg"}
              alt="Profile"
              onClick={() => setZoomed(true)}
              className="w-16 h-16 rounded-full object-cover cursor-pointer transition hover:scale-105"
            />
            {zoomed && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <button
                  className="absolute top-6 right-6 text-white text-3xl z-50 hover:text-blue-700 transition"
                  onClick={() => setZoomed(false)}
                >
                  <FaTimes />
                </button>
                <img
                  src={user.profilePic || "/images/demo.jpeg"}
                  alt="Zoomed"
                  className="max-w-full max-h-[90%] rounded-lg object-contain transition duration-300"
                />
              </div>
            )}

            <div>
              <p className="text-2xl font-semibold">{user.name}</p>
              <p className="text-gray-500 text-md">{user.bio || "No bio yet"}</p>
            </div>
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm">
            Follow
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-1 text-sm text-gray-600">
          <p className="flex gap-2 items-center">
            <MdOutlineMail />
            {user.email}
          </p>
          <p className="flex gap-2 items-center">
            <FaPhone />
            +91 9876543210
          </p>
          <p className="flex gap-2 items-center">
            <CiLocationOn />
            {user.location || "Not specified"}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {user.tags.length > 0 ? (
            user.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-full"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">No tags added</span>
          )}
        </div>

        {/* Horizontal Line */}
        <hr className="mt-8 border-gray-300" />

        {/* Tabs */}
        <div className="flex gap-6 mt-4 text-gray-600 font-medium border-b border-gray-300">
          {["products", "posts", "reels"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : "hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-10">
          {activeTab === "products" && <Products />}
          {activeTab === "posts" && <Posts />}
          {activeTab === "reels" && <Reels />}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
