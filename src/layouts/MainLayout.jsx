import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function MainLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
