import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
const ProfileDetails = () => {
	const { authUser } = useAuthContext();
  return (
    <div className="p-4 bg-black text-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Profile Details</h2>
      {user && (
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <p className="mt-1 block text-lg font-semibold">{authUser.username}</p>
          </div>

          <div>
            <label htmlFor="profile-picture" className="block text-sm font-medium">
              Profile Picture
            </label>
            <div className="mt-2">
              <img
                src={authUser.profilePic || "https://via.placeholder.com/150"}  // Fallback if no profile picture
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
