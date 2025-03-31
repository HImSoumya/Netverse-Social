import { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/login", formData);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ handleLogin, user,setUser, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
