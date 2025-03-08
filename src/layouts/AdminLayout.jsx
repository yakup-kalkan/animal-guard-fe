import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, Link } from "react-router-dom";
import "../assets/css/pages/Admin.css";

const AdminLayout = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-grid">
        <Link to="manage-news" className="dashboard-card">
          <h3>Manage News</h3>
          <p>Edit and publish news articles</p>
        </Link>
        <Link to="manage-events" className="dashboard-card">
          <h3>Manage Events</h3>
          <p>Edit and publish Events</p>
        </Link>
        <Link to="manage-lostpets" className="dashboard-card">
          <h3>Manage Lost Pets</h3>
          <p>Update missing pet listings</p>
        </Link>
        <Link to="manage-adoptions" className="dashboard-card">
          <h3>Manage Adoptions</h3>
          <p>Approve and review adoptions</p>
        </Link>
        {user?.isAdmin && (
          <Link to="manage-users" className="dashboard-card">
            <h3>Manage Users</h3>
            <p>View and manage registered users</p>
          </Link>
        )}
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
