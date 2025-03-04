import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToasterContext } from "../../context/ToasterContext";
import "./Navbar.css";
import Footer from "../Footer";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { toaster } = useContext(ToasterContext);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="top-item">
        <div className="logo">
          <img src="src/assets/img/Logo.png" alt="Animal-guard-icon" />
          <h2>
            ANIMAL <span>GUARD</span>
          </h2>
        </div>

        {/* Authentication Section */}
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

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/adoption">Adoption</Link>
          </li>
          <li>
            <Link to="/lost-pets">Lost Pets</Link>
          </li>
          <li>
            <Link to="/success">Success Stories</Link>
          </li>
          <li>
            <Link to="/donations">Donations</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="bottom-item">
        <Footer />
      </div>
    </nav>
  );
};

export default Navbar;
