// pages/profile/UpdateProfile.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      if (profilePic) formData.append("profilePic", profilePic);

      const res = await fetch("/api/user/update", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <div className="w-full bg-gray-800 text-white p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold text-center mb-6">Update Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* Username Input */}
            <div className="flex flex-col">
              <label htmlFor="username" className="text-lg font-medium">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Profile Picture Input */}
            <div className="flex flex-col">
              <label htmlFor="profilePic" className="text-lg font-medium">Profile Picture</label>
              <input
                type="file"
                id="profilePic"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="mt-2 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-500"
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
