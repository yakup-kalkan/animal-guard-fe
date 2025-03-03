import React, { useEffect, useState } from "react";
import { newsService } from "../../services/api-service";
import "./News.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>Stay Updated!</h2>
      <p>Subscribe for the latest pet tips and updates.</p>
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

  const handleOpenModal = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="news-container">
      <h1>Latest News</h1>
      <Newsletter />
      <div className="news-grid">
        {news.map((newsItem) => (
          <div
            key={newsItem.id}
            className="news-card"
            onClick={() => handleOpenModal(newsItem)}
          >
            <img
              src={newsItem.image || "/src/assets/img/default.png"}
              alt={newsItem.title}
              className="news-image"
            />
            <div className="news-content">
              <h2>{newsItem.title}</h2>
              <p className="news-description">
                {newsItem.description.slice(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedNews && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedNews.title}</h2>
            <p>{selectedNews.description}</p>
            {selectedNews.image && (
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="modal-image"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
