import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ToasterProvider, { ToasterContext } from "./context/ToasterContext.jsx";
import AuthContextProvider, { AuthContext } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToasterProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ToasterProvider>
    </BrowserRouter>
  </StrictMode>
);
