import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, Link } from "react-router-dom";
import "../pages/Admin/Dashboard/Dashboard.css";
const AdminLayout = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      {/* Grid Layout */}
      <div className="dashboard-grid">
        <Link to="manage-news" className="dashboard-card">
          <h3>Manage News</h3>
          <p>Edit and publish news articles</p>
        </Link>
        <Link to="manage-lostpets" className="dashboard-card">
          <h3>Manage Lost Pets</h3>
          <p>Update missing pet listings</p>
        </Link>
        <Link to="manage-adoptions" className="dashboard-card">
          <h3>Manage Adoptions</h3>
          <p>Approve and review adoptions</p>
        </Link>
        <Link to="users" className="dashboard-card">
          <h3>Manage Users</h3>
          <p>View and manage registered users</p>
        </Link>
      </div>

      {/* Displays selected page */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
