import React, { useEffect, useState } from "react";
import { eventService } from "../services/api-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoArrowBack } from "react-icons/io5";
import Newsletter from "../components/Newsletter";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/css/pages/Page.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAll();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="page-container">
      {!selectedEvent ? (
        <>
          {/* Events Slider */}
          <div className="page-slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                360: { slidesPerView: 1 } /* small */,
                480: { slidesPerView: 1 } /* Standard */,
                768: { slidesPerView: 1 } /* Tablets */,
                1024: { slidesPerView: 1 } /* Small Laptop */,
                1440: { slidesPerView: 1 } /* Big screen */,
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
              className="page-swiper"
            >
              {events.map((event) => (
                <SwiperSlide key={event.id}>
                  <div
                    className="page-slide"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <img
                      src={event.picture || "/src/assets/img/default.png"}
                      alt={event.title}
                      className="page-slide-image"
                    />
                    <div className="page-slide-content">
                      <h2>{event.title}</h2>
                      <p>{event.description.slice(0, 100)}...</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* all events */}
          <div className="page-grid">
            {events.map((event) => (
              <div
                key={event.id}
                className="page-card"
                onClick={() => setSelectedEvent(event)}
              >
                <img
                  src={event.picture || "/src/assets/img/default.png"}
                  alt={event.title}
                  className="page-image"
                />
                <h2>{event.title}</h2>
                <p className="page-description">
                  {event.description.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>

          {/* Newsletter (undermost) */}
          <Newsletter />
        </>
      ) : (
        // Display Event's details
        <div className="page-detail">
          <div className="page-detail-header">
            <IoArrowBack
              className="back-button"
              onClick={() => setSelectedEvent(null)}
            />
            <h2>Event Details</h2>
          </div>
          <img
            src={selectedEvent.picture || "/src/assets/img/default.png"}
            alt={selectedEvent.title}
            className="page-detail-image"
          />
          <div className="page-detail-content">
            <h3>{selectedEvent.title}</h3>
            <p className="page-detail-date">
              {new Date(selectedEvent.date).toLocaleDateString()} |{" "}
              {new Date(selectedEvent.date).toLocaleTimeString()}
            </p>
            <p className="page-detail-description">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
