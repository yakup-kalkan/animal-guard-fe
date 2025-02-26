// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { ToasterContext } from "./ToasterContext";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// const API_BASE_URL = "http://localhost:5000/api/users"; // Correct API Base URL

// const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { toaster } = useContext(ToasterContext);
//   const navigate = useNavigate();

//   // Check authentication on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       //fetchUser();
//     }
//   }, []);

//   // const fetchUser = async () => {
//   //   try {
//   //     const res = await axios.get(`${API_BASE_URL}/me`, {
//   //       withCredentials: true,
//   //     });
//   //     setUser(res.data);
//   //     setIsAuthenticated(true);
//   //   } catch (error) {
//   //     setUser(null);
//   //     setIsAuthenticated(false);
//   //   }
//   // };

//   const signup = async (formState) => {
//     try {
//       const res = await axios.post(`${API_BASE_URL}/create`, formState, {
//         withCredentials: true,
//       });
//       setUser(res.data);
//       setIsAuthenticated(true);
//       localStorage.setItem("token", res.data.token);
//       axios.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${res.data.token}`;
//       toaster.success(`Welcome on Board, ${formState.firstName}!`);
//       navigate("/dashboard");
//     } catch (error) {
//       toaster.error(error.response?.data?.message || "Signup failed");
//     }
//   };

//   const login = async (formState) => {
//     let success = false;
//     try {
//       const res = await axios.post(`${API_BASE_URL}/login`, formState, {
//         withCredentials: true,
//       });
//       const { token, userId, role } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role); // Store user role
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       setUser({ userId, role });
//       setIsAuthenticated(true);
//       toaster.success(`Welcome back, ${role === "admin" ? "Admin" : "User"}!`);

//       navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
//       success = true;
//     } catch (error) {
//       toaster.error(error.response?.data?.message || "Login failed");
//     }
//     return success;
//   };

//   const logout = async () => {
//     try {
//       await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       delete axios.defaults.headers.common["Authorization"];
//       setUser(null);
//       setIsAuthenticated(false);
//       toaster.success("Logged out successfully");
//       navigate("/");
//     } catch (error) {
//       toaster.error(error.response?.data?.message || "Logout failed");
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ signup, user, isAuthenticated, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;

import { createContext, useContext, useState, useEffect } from "react";
//import { ToasterContext } from "./ToasterContext";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const { toaster } = useContext(ToasterContext);
  const navigate = useNavigate();

  // Simulate checking authentication on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Simulated signup
  const signup = async (formState) => {
    const mockUser = {
      firstName: formState.firstName,
      email: formState.email,
      role: "user", // Default role
    };

    // Simulating API delay
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      //toaster.success(`Welcome on Board, ${mockUser.firstName}!`);
      navigate("/");
    }, 1000);
  };

  // Simulated login
  const login = async (formState) => {
    const mockUser = {
      firstName: "John",
      email: formState.email,
      role: formState.email === "admin@example.com" ? "admin" : "user",
    };

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      //toaster.success(`Welcome back, ${mockUser.firstName}!`);
      navigate("/");
    }, 1000);
  };

  // Simulated logout
  const logout = async () => {
    setTimeout(() => {
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      //toaster.success("Logged out successfully");
      navigate("/");
    }, 500);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
