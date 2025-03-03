import React, { useEffect, useState } from "react";
import { newsService } from "../../services/api-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./News.css";

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
    <div className="news-container">
      <div className="news-slider-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          className="news-swiper"
        >
          {news.map((newsItem) => (
            <SwiperSlide key={newsItem.id}>
              <div
                className="news-slide"
                onClick={() => setSelectedNews(newsItem)}
              >
                <img
                  src={newsItem.picture || "/src/assets/img/default.png"}
                  alt={newsItem.title}
                  className="news-slide-image"
                />
                <div className="news-slide-content">
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.description.slice(0, 100)}...</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Selected news */}
      {selectedNews && (
        <div className="news-detail">
          <div className="news-detail-header">
            <h2>Detail News</h2>
          </div>
          <img
            src={selectedNews.picture || "/src/assets/img/default.png"}
            alt={selectedNews.title}
            className="news-detail-image"
          />
          <div className="news-detail-content">
            <h3>{selectedNews.title}</h3>
            {selectedNews.date && (
              <p className="news-detail-date">
                {new Date(selectedNews.date).toLocaleDateString()} |{" "}
                {new Date(selectedNews.date).toLocaleTimeString()}
              </p>
            )}
            {selectedNews.location && (
              <p className="news-detail-location">
                {new Date(selectedNews.location).toLocaleDateString()} |{" "}
                {new Date(selectedNews.location).toLocaleTimeString()}
              </p>
            )}
            <p className="news-detail-description">
              {selectedNews.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
