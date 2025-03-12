import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "../assets/css/components/Navbar.css";
import Footer from "./Footer";

const languageOptions = [
  {
    code: "en",
    label: "English",
    flag: "🇬🇧",
    img: "/img/Flags/gb.png",
  },
  {
    code: "de",
    label: "Deutsch",
    flag: "🇩🇪",
    img: "/img/Flags/de.png",
  },
  {
    code: "tr",
    label: "Türkçe",
    flag: "🇹🇷",
    img: "/img/Flags/tr.png",
  },
];

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [selectedNav, setSelectedNav] = useState(location.pathname);
  const [arrowPosition, setArrowPosition] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const activeElement = document.querySelector(".nav-links .active");
    if (activeElement) {
      setArrowPosition(activeElement.offsetTop);
    }
  }, [selectedNav]);

  return (
    <nav className="navbar">
      <div className="top-item">
        <div className="logo">
          <img src="/img/Logo.png" alt="Animal-guard-icon" />
          <h2>
            ANIMAL <span>GUARD</span>
          </h2>
        </div>

        <div className="auth-section">
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="btn btn-full">
                Dashboard
              </Link>
              <button className="btn btn-full" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-full">
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="nav-container">
        {/* <div className="nav-arrow" style={{ top: `${arrowPosition}px` }}></div> */}
        <ul className="nav-links">
          {[
            { path: "/", label: "home" },
            { path: "/news", label: "news" },
            { path: "/events", label: "events" },
            { path: "/adoption", label: "adoption" },
            { path: "/lost-pets", label: "lostPets" },
            { path: "/success", label: "successStories" },
            { path: "/donations", label: "donations" },
            { path: "/about", label: "about" },
          ].map(({ path, label }, index) => (
            <li key={index}>
              <Link
                to={path}
                className={selectedNav === path ? "active" : ""}
                onClick={() => setSelectedNav(path)}
              >
                {t("navbar", label)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bayraklı Özel Dil Seçici */}
      <div className="language-selector">
        <button
          className="language-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src={languageOptions.find((lang) => lang.code === language)?.img}
            alt="flag"
            className="language-flag"
          />
          {languageOptions.find((lang) => lang.code === language)?.label} ▼
        </button>
        {isDropdownOpen && (
          <ul className="language-dropdown">
            {languageOptions.map(({ code, label, img }) => (
              <li
                key={code}
                onClick={() => {
                  setLanguage(code);
                  setIsDropdownOpen(false);
                }}
              >
                <img src={img} alt={label} className="flag" /> {label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bottom-item">
        <Footer />
      </div>
    </nav>
  );
};

export default Navbar;