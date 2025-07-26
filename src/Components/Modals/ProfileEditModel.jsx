import React, { useState, useEffect } from "react";
import FileUpload from "../Atoms/FileUpload";
import Loading from "../Atoms/Loading";

const ProfileEditModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    profilePic: "",
    bio: "",
    location: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        profilePic: user.profilePic || "",
        bio: user.bio || "",
        location: user.location || "",
        tags: user.tags?.join(", ") || "", // convert array to comma-separated string
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      profilePic: file,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("location", formData.location);

    // Convert tags string to array
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    tagsArray.forEach((tag) => formDataToSend.append("tags[]", tag)); // send as tags[]

    if (formData.profilePic instanceof File) {
      formDataToSend.append("profilePic", formData.profilePic);
    }

    try {
      await onSave(formDataToSend);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <FileUpload
            label="Upload Profile Pic"
            onChange={handleFileChange}
            value={formData.profilePic}
          />

          <textarea
            name="bio"
            className="input"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
          />

          <input
            type="text"
            name="location"
            className="input"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <input
            type="text"
            name="tags"
            className="input"
            placeholder="Tags (comma-separated) e.g. Fashion, Travel"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loading /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
