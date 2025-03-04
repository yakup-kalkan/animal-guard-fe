import React, { useEffect, useState } from "react";
import { newsService } from "../../services/api-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoArrowBack } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./News.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>Stay Updated!</h2>
      <p>Subscribe for the latest news and updates.</p>
      <div className="newsletter-input">
        <input type="email" placeholder="Enter your email" />
        <button className="btn">Subscribe</button>
      </div>
    </section>
  );
};

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
      {!selectedNews ? (
        <>
          {/* News Slider */}
          <div className="news-slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1} /* Default: single slide */
              breakpoints={{
                360: { slidesPerView: 1 } /* small */,
                480: { slidesPerView: 1 } /* Standard */,
                768: { slidesPerView: 1 } /* Tablets */,
                1024: { slidesPerView: 1 } /* Small Laptop */,
                1440: { slidesPerView: 1 } /* Big screen */,
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
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

          {/* Tüm Haberler */}
          <div className="news-grid">
            {news.map((newsItem) => (
              <div
                key={newsItem.id}
                className="news-card"
                onClick={() => setSelectedNews(newsItem)}
              >
                <img
                  src={newsItem.picture || "/src/assets/img/default.png"}
                  alt={newsItem.title}
                  className="news-image"
                />
                <h2>{newsItem.title}</h2>
                <p className="news-description">
                  {newsItem.description.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>

          {/* Newsletter (En Altta) */}
          <Newsletter />
        </>
      ) : (
        <div className="news-detail">
          <div className="news-detail-header">
            <IoArrowBack
              className="back-button"
              onClick={() => setSelectedNews(null)}
            />
            <h2>News Details</h2>
          </div>
          <img
            src={selectedNews.picture || "/src/assets/img/default.png"}
            alt={selectedNews.title}
            className="news-detail-image"
          />
          <div className="news-detail-content">
            <h3>{selectedNews.title}</h3>
            <p className="news-detail-date">
              {new Date(selectedNews.date).toLocaleDateString()} |{" "}
              {new Date(selectedNews.date).toLocaleTimeString()}
            </p>
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
