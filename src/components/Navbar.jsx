import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToasterContext } from "../context/ToasterContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { toaster } = useContext(ToasterContext);

  const showToaster = () => {
    toaster.success("Welcome to A guard!");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        ANIMAL <span>GUARD</span>
      </div>

      <div>
        <ul>
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

      {/* Authentication Section */}
      <div>
        {isAuthenticated ? (
          <>
            {/* {user?.isAdmin && ( */}
            <Link to="/admin" className="btn btn-full">
              Dashboard
            </Link>
            //)}
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-full">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
