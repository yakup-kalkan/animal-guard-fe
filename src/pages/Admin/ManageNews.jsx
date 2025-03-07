import { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../context/ToasterContext";
import { newsService } from "../../services/api-service";
import "../../assets/css/pages/Admin.css";

const ManageNews = () => {
  const { toaster } = useContext(ToasterContext);
  const [news, setNews] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    picture: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const allNews = await newsService.getAll();
      setNews(allNews);
    } catch (error) {
      toaster.error("An error occurred while pulling the news!");
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
        await newsService.update(editId, formState);
        toaster.success("News updated successfully!");
      } else {
        await newsService.create(formState);
        toaster.success("News added successfully!");
      }
      resetForm();
      fetchNews();
    } catch (error) {
      toaster.error("An error occurred while saving the news!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const newsItem = await newsService.getById(id);
      setFormState({
        title: newsItem.title,
        description: newsItem.description,
        picture: newsItem.picture,
      });
      setEditId(id);
    } catch (error) {
      toaster.error("An error occurred while fetching the news item!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await newsService.delete(id);
      toaster.success("The news was deleted!");
      fetchNews();
    } catch (error) {
      toaster.error("An error occurred while deleting the news!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormState({ title: "", description: "", picture: "" });
    setEditId(null);
  };

  return (
    <>
      <div className="manage-form">
        <h2>Manage News</h2>
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
          <button type="submit" className="save" disabled={loading}>
            {editId ? "Update News" : "Add News"}
          </button>
        </form>
      </div>
      <div className="manage-list">
        {loading ? (
          <p>Loading news...</p>
        ) : (
          <div className="list">
            {news.map((item) => (
              <div key={item._id} className="card">
                <img
                  src={item.picture || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="image"
                />
                <h3>{item.title}</h3>
                <p>{item.description.slice(0, 100)}...</p>
                <div className="actions">
                  <button
                    className="edit"
                    onClick={() => handleEdit(item._id)}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
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

export default ManageNews;
