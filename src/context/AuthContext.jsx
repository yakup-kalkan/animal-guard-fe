import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToasterContext } from "./ToasterContext";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toaster } = useContext(ToasterContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ isAdmin });
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const signup = async (formState) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, formState);
      const { token, isAdmin } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({ isAdmin });
      setIsAuthenticated(true);
      toaster.success(`Welcome on Board, ${formState.firstName}!`);
      navigate(isAdmin ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      toaster.error(error.response?.data?.message || "Signup failed");
    }
  };

  const login = async (formState) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, formState);
      const { token, isAdmin } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({ isAdmin });
      setIsAuthenticated(true);
      toaster.success(`Welcome back, ${isAdmin ? "Admin" : "User"}!`);
      navigate(isAdmin ? "/admin-dashboard" : "/user-dashboard");

      return true;
    } catch (error) {
      toaster.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
    toaster.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
