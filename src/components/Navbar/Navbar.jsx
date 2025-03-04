import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToasterContext } from "../../context/ToasterContext";
import "./Navbar.css";
import Footer from "../Footer";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { t, language, setLanguage } = useLanguage();

  return (
    <nav className="navbar">
      {/* Obere Sektion: Logo & Auth */}
      <div className="top-item">
        <div className="logo">
          <img src="src/assets/img/Logo.png" alt="Animal-guard-icon" />
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

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/">{t("navbar", "home")}</Link>
        </li>
        <li>
          <Link to="/news">{t("navbar", "news")}</Link>
        </li>
        <li>
          <Link to="/events">{t("navbar", "events")}</Link>
        </li>
        <li>
          <Link to="/adoption">{t("navbar", "adoption")}</Link>
        </li>
        <li>
          <Link to="/lost-pets">{t("navbar", "lostPets")}</Link>
        </li>
        <li>
          <Link to="/success">{t("navbar", "successStories")}</Link>
        </li>
        <li>
          <Link to="/donations">{t("navbar", "donations")}</Link>
        </li>
        <li>
          <Link to="/about">{t("navbar", "about")}</Link>
        </li>
      </ul>

      {/* Dropdown für Sprachauswahl */}
      <div className="language-selector">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-dropdown"
        >
          {languageOptions.map(({ code, label, flag }) => (
            <option key={code} value={code}>
              {flag} {label}
            </option>
          ))}
        </select>
      </div>

      <div className="bottom-item">
        <Footer />
      </div>
    </nav>
  );
};

export default Navbar;
