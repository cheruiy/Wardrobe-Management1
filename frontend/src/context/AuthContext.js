import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log("✅ Login Successful:", response.data);

      const { access_token, user_id } = response.data;

      if (!access_token) {
        console.error("❌ Login failed: No access token received!");
        return;
      }

      localStorage.setItem("token", access_token);
      localStorage.setItem("user_id", user_id);

      setToken(access_token);
    } catch (error) {
      console.error("❌ Login failed:", error.response ? error.response.data : error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setToken(null);
    console.log("✅ Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
