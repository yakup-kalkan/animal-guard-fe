import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/css/styles/global.css";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import News from "./pages/News";
import Adoption from "./pages/Adoption";
import LostPets from "./pages/LostPets";
import SuccessStories from "./pages/SuccessStories";
import Donations from "./pages/Donations";
import About from "./pages/About";
import Legal from "./pages/Legal";
import Events from "./pages/Events";

import ManageNews from "./pages/Admin/ManageNews";
import ManageAdoptions from "./pages/Admin/ManageAdoptions";
import ManageLostPets from "./pages/Admin/ManageLostPets";
import ManageEvents from "./pages/Admin/ManageEvents";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageStories from "./pages/Admin/ManageStories";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news" element={<Events />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/lost-pets" element={<LostPets />} />
        <Route path="/success" element={<SuccessStories />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />

        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="manage-news" element={<ManageNews />} />
          <Route path="manage-events" element={<ManageEvents />} />
          <Route path="manage-lostpets" element={<ManageLostPets />} />
          <Route path="manage-adoptions" element={<ManageAdoptions />} />
          <Route path="manage-stories" element={<ManageStories />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>
        {/* NOT FOUND */}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
