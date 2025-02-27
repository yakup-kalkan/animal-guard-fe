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

  // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true"; // Boolean olarak al

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

// MOCKDATA PREVIOUS CODE (BACKUP)

// import { createContext, useContext, useState, useEffect } from "react";
// //import { ToasterContext } from "./ToasterContext";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   //const { toaster } = useContext(ToasterContext);
//   const navigate = useNavigate();

//   // Simulate checking authentication on app load
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // Simulated signup
//   const signup = async (formState) => {
//     const mockUser = {
//       firstName: formState.firstName,
//       email: formState.email,
//       role: "user", // Default role
//     };

//     // Simulating API delay
//     setTimeout(() => {
//       localStorage.setItem("user", JSON.stringify(mockUser));
//       setUser(mockUser);
//       setIsAuthenticated(true);
//       //toaster.success(`Welcome on Board, ${mockUser.firstName}!`);
//       navigate("/");
//     }, 1000);
//   };

//   // Simulated login
//   const login = async (formState) => {
//     const mockUser = {
//       firstName: "John",
//       email: formState.email,
//       role: formState.email === "admin@example.com" ? "admin" : "user",
//     };

//     setTimeout(() => {
//       localStorage.setItem("user", JSON.stringify(mockUser));
//       setUser(mockUser);
//       setIsAuthenticated(true);
//       //toaster.success(`Welcome back, ${mockUser.firstName}!`);
//       navigate("/");
//     }, 1000);
//   };

//   // Simulated logout
//   const logout = async () => {
//     setTimeout(() => {
//       localStorage.removeItem("user");
//       setUser(null);
//       setIsAuthenticated(false);
//       //toaster.success("Logged out successfully");
//       navigate("/");
//     }, 500);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, isAuthenticated, signup, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
