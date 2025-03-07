import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "../assets/css/pages/Admin.css";

const AdminLayout = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Admin menü linkleri
  const adminLinks = [
    {
      path: "manage-news",
      title: "Manage News",
      description: "Edit and publish news articles",
    },
    {
      path: "manage-events",
      title: "Manage Events",
      description: "Edit and publish Events",
    },
    {
      path: "manage-lostpets",
      title: "Manage Lost Pets",
      description: "Update missing pet listings",
    },
    {
      path: "manage-adoptions",
      title: "Manage Adoptions",
      description: "Approve and review adoptions",
    },
  ];

  if (user?.isAdmin) {
    adminLinks.push({
      path: "manage-users",
      title: "Manage Users",
      description: "View and manage registered users",
    });
  }

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      {/* Swiper Slider for Admin Menu with 3D Effect */}
      <div className="dashboard-slider">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 60,
            stretch: 15,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {adminLinks.map((link, index) => (
            <SwiperSlide key={index}>
              <Link to={link.path} className="dashboard-card">
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
//___________________________________________________________
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Navigate, Outlet, Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "../assets/css/pages/Admin.css";

// const AdminLayout = () => {
//   const { user, isAuthenticated } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   // Admin menü linkleri
//   const adminLinks = [
//     {
//       path: "manage-news",
//       title: "Manage News",
//       description: "Edit and publish news articles",
//     },
//     {
//       path: "manage-events",
//       title: "Manage Events",
//       description: "Edit and publish Events",
//     },
//     {
//       path: "manage-lostpets",
//       title: "Manage Lost Pets",
//       description: "Update missing pet listings",
//     },
//     {
//       path: "manage-adoptions",
//       title: "Manage Adoptions",
//       description: "Approve and review adoptions",
//     },
//   ];

//   if (user?.isAdmin) {
//     adminLinks.push({
//       path: "manage-users",
//       title: "Manage Users",
//       description: "View and manage registered users",
//     });
//   }

//   return (
//     <div className="dashboard-container">
//       <h2>Admin Dashboard</h2>

//       {/* Swiper Slider for Admin Menu */}
//       <div className="dashboard-slider">
//         <Swiper
//           modules={[Navigation, Pagination]}
//           spaceBetween={20}
//           slidesPerView={3}
//           navigation
//           pagination={{ clickable: true }}
//           loop={true}
//           breakpoints={{
//             320: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//         >
//           {adminLinks.map((link, index) => (
//             <SwiperSlide key={index}>
//               <Link to={link.path} className="dashboard-card">
//                 <h3>{link.title}</h3>
//                 <p>{link.description}</p>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       <div className="dashboard-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Navigate, Outlet, Link } from "react-router-dom";
// import "../assets/css/pages/Admin.css";

// const AdminLayout = () => {
//   const { user, isAuthenticated } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="dashboard-container">
//       <h2>Admin Dashboard</h2>

//       <div className="dashboard-grid">
//         <Link to="manage-news" className="dashboard-card">
//           <h3>Manage News</h3>
//           <p>Edit and publish news articles</p>
//         </Link>
//         <Link to="manage-events" className="dashboard-card">
//           <h3>Manage Events</h3>
//           <p>Edit and publish Events</p>
//         </Link>
//         <Link to="manage-lostpets" className="dashboard-card">
//           <h3>Manage Lost Pets</h3>
//           <p>Update missing pet listings</p>
//         </Link>
//         <Link to="manage-adoptions" className="dashboard-card">
//           <h3>Manage Adoptions</h3>
//           <p>Approve and review adoptions</p>
//         </Link>
//         {user?.isAdmin && (
//           <Link to="manage-users" className="dashboard-card">
//             <h3>Manage Users</h3>
//             <p>View and manage registered users</p>
//           </Link>
//         )}
//       </div>

//       <div className="dashboard-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
