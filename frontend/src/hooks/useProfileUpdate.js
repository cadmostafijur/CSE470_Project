// src/hooks/useProfileUpdate.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated for React Router v6

const useProfileUpdate = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    profilePic: "",
  });
  const [newProfilePic, setNewProfilePic] = useState(null);
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch user data from the backend API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/profile"); // Your backend endpoint
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Handle file input for profile picture
  const handleFileChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  // Handle form submission for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePic", newProfilePic); // Attach new profile pic file
    formData.append("username", userData.username); // Username from state
    formData.append("fullName", userData.fullName); // Full name from state

    try {
      // Make PUT request to update profile data
      await axios.put("/api/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Content type for file upload
        },
      });
      // After successful update, navigate to the profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return {
    userData,
    newProfilePic,
    handleFileChange,
    handleSubmit,
  };
};

export default useProfileUpdate;
