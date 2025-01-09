import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error logging out:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/users/delete", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Account deleted successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Error deleting account");
      console.error("Error deleting account:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    authUser,
    setAuthUser,
    handleLogout,
    handleDeleteAccount,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};