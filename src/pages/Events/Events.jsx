import React, { useEffect, useState } from "react";
import { eventService } from "../../services/api-service";
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

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>
      <Newsletter />
      <div className="events-grid">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => handleOpenModal(event)}
          >
            <img
              //src={event.image || "/src/assets/img/default.png"}
              src={"/src/assets/img/default.png"}
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

      {selectedEvent && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="modal-image"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
