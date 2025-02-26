import { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../../context/ToasterContext";
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../../../services/api-service";
import "./ManageNews.css";

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
      const allNews = await getAllNews();
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
        await updateNews(editId, formState);
        toaster.success("News updated successfully!");
      } else {
        await createNews(formState);
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
      const newsItem = await getNewsById(id);
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
      await deleteNews(id);
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
      <div className="manage-news-form">
        <h2>Manage News</h2>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit} className="news-form">
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
          <button type="submit" className="btn-save" disabled={loading}>
            {editId ? "Update News" : "Add News"}
          </button>
        </form>
      </div>
      <div className="manage-news-list">
        {loading ? (
          <p>Loading news...</p>
        ) : (
          <div className="news-list">
            {news.map((item) => (
              <div key={item._id} className="news-card">
                <img
                  src={item.picture || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="news-image"
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="news-actions">
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

export default ManageNews;
