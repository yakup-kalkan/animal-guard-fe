import { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../context/ToasterContext";
import { eventService } from "../../services/api-service";
import "../../assets/css/pages/Admin.css";

const ManageEvents = () => {
  const { toaster } = useContext(ToasterContext);
  const [events, setEvents] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    picture: "",
    time: "",
    date: "",
    location: "",
    postalCode: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const allEvents = await eventService.getAll();
      setEvents(allEvents);
    } catch (error) {
      toaster.error("An error occurred while fetching the events!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await eventService.update(editId, formState);
        toaster.success("Event updated successfully!");
      } else {
        await eventService.create(formState);
        toaster.success("Event added successfully!");
      }
      resetForm();
      fetchEvents();
    } catch (error) {
      toaster.error("An error occurred while saving the event!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const eventItem = await eventService.getById(id);
      setFormState({
        title: eventItem.title,
        description: eventItem.description,
        picture: eventItem.picture,
        time: eventItem.time,
        date: eventItem.date,
        location: eventItem.location,
        postalCode: eventItem.postalCode,
      });
      setEditId(id);
    } catch (error) {
      toaster.error("An error occurred while fetching the event details!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await eventService.delete(id);
      toaster.success("The event was deleted!");
      fetchEvents();
    } catch (error) {
      toaster.error("An error occurred while deleting the event!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormState({
      title: "",
      description: "",
      picture: "",
      time: "",
      date: "",
      location: "",
      postalCode: "",
    });
    setEditId(null);
  };

  return (
    <>
      <div className="manage-form">
        <h2>Manage Events</h2>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formState.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formState.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="picture"
            placeholder="Image URL (optional)"
            value={formState.picture}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={formState.time}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formState.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formState.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formState.postalCode}
            onChange={handleChange}
            required
          />
          <button type="submit" className="save" disabled={loading}>
            {editId ? "Update Event" : "Add Event"}
          </button>
        </form>
      </div>
      <div className="manage-list">
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className="list">
            {events.map((item) => (
              <div key={item._id} className="card">
                <img
                  src={item.picture || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="image"
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>
                  <strong>Time:</strong> {item.time}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Postal Code:</strong> {item.postalCode}
                </p>
                <div className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(item._id)}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item._id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageEvents;
