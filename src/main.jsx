import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// import global styles
import "./assets/css/styles/global.css";
import "./assets/css/styles/index.css";

// import context providers
import ToasterProvider from "./context/ToasterContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ToasterProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ToasterProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
