// hooks/useGetUserProfile.js
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext"; // Assuming you have this context to get the current user

export const useGetUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { authUser } = useAuthContext(); // Assuming authUser holds the logged-in user data

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // If you are storing user data in localStorage
        const storedUser = JSON.parse(localStorage.getItem("chat-user"));
        
        if (storedUser) {
          setUserProfile(storedUser);
        } else {
          setError("No user found.");
        }
      } catch (err) {
        setError("Error fetching user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authUser]);

  return { userProfile, loading, error };
};
