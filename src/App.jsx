import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Adoption from "./pages/Adoption/Adoption";
import LostPets from "./pages/LostPets/LostPets";
import SuccessStories from "./pages/SuccessStories/SuccessStories";
import Donations from "./pages/Donations/Donations";
import About from "./pages/About/About";
import Legal from "./pages/Legal/Legal";

import ManageNews from "./pages/Admin/ManageNews/ManageNews";
import ManageAdoptions from "./pages/Admin/ManageAdoptions/ManageAdoptions";
import ManageLostPets from "./pages/Admin/ManageLostPets/ManageLostPets";
import ManageUsers from "./pages/Admin/ManageUsers/ManageUsers";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import ManageEvents from "./pages/Admin/ManageEvents/ManageEvents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/lost-pets" element={<LostPets />} />
        <Route path="/success" element={<SuccessStories />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="manage-news" element={<ManageNews />} />
          <Route path="manage-events" element={<ManageEvents />} />
          <Route path="manage-lostpets" element={<ManageLostPets />} />
          <Route path="manage-adoptions" element={<ManageAdoptions />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>
        {/* NOT FOUND */}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;
