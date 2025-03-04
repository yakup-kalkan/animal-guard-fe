import React, { useEffect, useState } from "react";
import { eventService } from "../../services/api-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoArrowBack } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Events.css";

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
    <div className="events-container">
      {!selectedEvent ? (
        <>
          {/* Etkinlikler Slider */}
          <div className="events-slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="events-swiper"
            >
              {events.map((event) => (
                <SwiperSlide key={event.id}>
                  <div
                    className="event-slide"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <img
                      src={event.picture || "/src/assets/img/default.png"}
                      alt={event.title}
                      className="event-slide-image"
                    />
                    <div className="event-slide-content">
                      <h2>{event.title}</h2>
                      <p>{event.description.slice(0, 100)}...</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Tüm Etkinlikler */}
          <div className="events-grid">
            {events.map((event) => (
              <div
                key={event.id}
                className="event-card"
                onClick={() => setSelectedEvent(event)}
              >
                <img
                  src={event.picture || "/src/assets/img/default.png"}
                  alt={event.title}
                  className="event-image"
                />
                <h2>{event.title}</h2>
                <p className="event-description">
                  {event.description.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>

          {/* Newsletter (En Altta) */}
          <Newsletter />
        </>
      ) : (
        // Etkinlik Detay Görünümü
        <div className="event-detail">
          <div className="event-detail-header">
            <IoArrowBack
              className="back-button"
              onClick={() => setSelectedEvent(null)}
            />
            <h2>Event Details</h2>
          </div>
          <img
            src={selectedEvent.picture || "/src/assets/img/default.png"}
            alt={selectedEvent.title}
            className="event-detail-image"
          />
          <div className="event-detail-content">
            <h3>{selectedEvent.title}</h3>
            <p className="event-detail-date">
              {new Date(selectedEvent.date).toLocaleDateString()} |{" "}
              {new Date(selectedEvent.date).toLocaleTimeString()}
            </p>
            <p className="event-detail-description">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;

// import React, { useEffect, useState } from "react";
// import { eventService } from "../../services/api-service";
// import "./Events.css";

// const Newsletter = () => {
//   return (
//     <section className="newsletter">
//       <h2>Stay Updated!</h2>
//       <p>Subscribe for the latest pet tips and updates.</p>
//       <div className="newsletter-input">
//         <input type="email" placeholder="Enter your email" />
//         <button className="btn">Subscribe</button>
//       </div>
//     </section>
//   );
// };

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const data = await eventService.getAll();
//         setEvents(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleOpenModal = (event) => {
//     setSelectedEvent(event);
//   };

//   const handleCloseModal = () => {
//     setSelectedEvent(null);
//   };

//   if (loading) return <p className="loading">Loading...</p>;
//   if (error) return <p className="error">Error: {error}</p>;

//   return (
//     <div className="events-container">
//       <h1>Upcoming Events</h1>
//       <Newsletter />
//       <div className="events-grid">
//         {events.map((event) => (
//           <div
//             key={event.id}
//             className="event-card"
//             onClick={() => handleOpenModal(event)}
//           >
//             <img
//               src={event.picture || "/src/assets/img/default.png"}
//               alt={event.title}
//               className="event-image"
//             />
//             <h2>{event.title}</h2>
//             <p className="event-description">
//               {event.description.slice(0, 100)}...
//             </p>
//           </div>
//         ))}
//       </div>

//       {selectedEvent && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close-button" onClick={handleCloseModal}>
//               &times;
//             </span>
//             <h2>{selectedEvent.title}</h2>
//             <p>{selectedEvent.description}</p>
//             {selectedEvent.picture && (
//               <img
//                 src={selectedEvent.picture}
//                 alt={selectedEvent.title}
//                 className="modal-image"
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Events;
