import React, { useEffect, useState } from "react";
import { newsService } from "../services/api-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Newsletter from "../components/Newsletter";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/css/pages/Page.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsService.getAll();
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="page-container">
      {!selectedNews ? (
        <>
          {/* News Slider */}
          <div className="page-slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                360: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
                1440: { slidesPerView: 1 },
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="page-swiper"
            >
              {news.map((newsItem) => (
                <SwiperSlide key={newsItem.id}>
                  <div
                    className="page-slide"
                    onClick={() => setSelectedNews(newsItem)}
                  >
                    <img
                      src={newsItem.imageUrls || "/src/assets/img/default.png"}
                      alt={newsItem.title}
                      className="page-slide-image"
                    />
                    <div className="page-slide-content">
                      <h2 className="slide-title">{newsItem.title}</h2>
                      <p className="slide-description">
                        {newsItem.description.slice(0, 100)}...
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* All News */}
          <div className="page-grid">
            {news.map((newsItem) => (
              <div
                key={newsItem.id}
                className="page-card"
                onClick={() => setSelectedNews(newsItem)}
              >
                <img
                  src={newsItem.imageUrls || "/src/assets/img/default.png"}
                  alt={newsItem.title}
                  className="page-card-image"
                />
                <div className="page-card-content">
                  <h2 className="page-card-title">{newsItem.title}</h2>
                  <p className="page-card-description">
                    {newsItem.description.slice(0, 100)}...
                  </p>
                </div>
                {/* Animation Ok */}
                <IoArrowForward className="arrow-icon" />
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <Newsletter />
        </>
      ) : (
        <div className="page-detail">
          <div className="page-detail-header">
            <IoArrowBack
              className="page-back-button"
              onClick={() => setSelectedNews(null)}
            />
            <h2>News Details</h2>
          </div>
          <img
            src={selectedNews.imageUrls || "/src/assets/img/default.png"}
            alt={selectedNews.title}
            className="page-detail-image"
          />
          <div className="page-detail-content">
            <h3 className="page-detail-title">{selectedNews.title}</h3>
            <p className="page-detail-date">
              {new Date(selectedNews.date).toLocaleDateString()} |{" "}
              {new Date(selectedNews.date).toLocaleTimeString()}
            </p>
            <p className="page-detail-description">
              {selectedNews.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
// import React, { useEffect, useState } from "react";
// import { newsService } from "../services/api-service";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { IoArrowBack } from "react-icons/io5";
// import Newsletter from "../components/Newsletter";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "../assets/css/pages/Page.css";

// const News = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedNews, setSelectedNews] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const data = await newsService.getAll();
//         setNews(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading) return <p className="loading">Loading...</p>;
//   if (error) return <p className="error">Error: {error}</p>;

//   return (
//     <div className="page-container">
//       {!selectedNews ? (
//         <>
//           {/* News Slider */}
//           <div className="page-slider-container">
//             <Swiper
//               modules={[Navigation, Pagination, Autoplay]}
//               spaceBetween={10}
//               slidesPerView={1} /* Default: single slide */
//               breakpoints={{
//                 360: { slidesPerView: 1 } /* small */,
//                 480: { slidesPerView: 1 } /* Standard */,
//                 768: { slidesPerView: 1 } /* Tablets */,
//                 1024: { slidesPerView: 1 } /* Small Laptop */,
//                 1440: { slidesPerView: 1 } /* Big screen */,
//               }}
//               navigation
//               pagination={{ clickable: true }}
//               autoplay={{ delay: 5000, disableOnInteraction: false }}
//               loop={true}
//               className="page-swiper"
//             >
//               {news.map((newsItem) => (
//                 <SwiperSlide key={newsItem.id}>
//                   <div
//                     className="page-slide"
//                     onClick={() => setSelectedNews(newsItem)}
//                   >
//                     <img
//                       src={newsItem.picture || "/src/assets/img/default.png"}
//                       alt={newsItem.title}
//                       className="page-slide-image"
//                     />
//                     <div className="page-slide-content">
//                       <h2>{newsItem.title}</h2>
//                       <p>{newsItem.description.slice(0, 100)}...</p>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/*All News*/}
//           <div className="page-grid">
//             {news.map((newsItem) => (
//               <div
//                 key={newsItem.id}
//                 className="page-card"
//                 onClick={() => setSelectedNews(newsItem)}
//               >
//                 <img
//                   src={newsItem.picture || "/src/assets/img/default.png"}
//                   alt={newsItem.title}
//                   className="page-image"
//                 />
//                 <div className="page-content">
//                   <h2 className="page-title">{newsItem.title}</h2>
//                   <p className="page-description">
//                     {newsItem.description.slice(0, 100)}...
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Newsletter (undermost) */}
//           <Newsletter />
//         </>
//       ) : (
//         <div className="page-detail">
//           <div className="page-detail-header">
//             <IoArrowBack
//               className="page-back-button"
//               onClick={() => setSelectedNews(null)}
//             />
//             <h2>News Details</h2>
//           </div>
//           <img
//             src={selectedNews.picture || "/src/assets/img/default.png"}
//             alt={selectedNews.title}
//             className="page-detail-image"
//           />
//           <div className="page-detail-content">
//             <h3>{selectedNews.title}</h3>
//             <p className="page-detail-date">
//               {new Date(selectedNews.date).toLocaleDateString()} |{" "}
//               {new Date(selectedNews.date).toLocaleTimeString()}
//             </p>
//             <p className="page-detail-description">
//               {selectedNews.description}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default News;
