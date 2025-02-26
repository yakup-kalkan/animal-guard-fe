import { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../../context/ToasterContext";
import {
  createAdoptionPost,
  getAllAdoptionPosts,
  getAdoptionPostById,
  updateAdoptionPost,
  deleteAdoptionPost,
} from "../../../services/api-service";
import "./ManageAdoptions.css";

const ManageAdoptions = () => {
  const { toaster } = useContext(ToasterContext);
  const [adoptionPosts, setAdoptionPosts] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    images: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdoptionPosts();
  }, []);

  const fetchAdoptionPosts = async () => {
    setLoading(true);
    try {
      const allPosts = await getAllAdoptionPosts();
      setAdoptionPosts(allPosts);
    } catch (error) {
      toaster.error("An error occurred while fetching adoption posts!");
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
        await updateAdoptionPost(editId, formState);
        toaster.success("Adoption post updated successfully!");
      } else {
        await createAdoptionPost(formState);
        toaster.success("Adoption post added successfully!");
      }
      resetForm();
      fetchAdoptionPosts();
    } catch (error) {
      toaster.error("An error occurred while saving the adoption post!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const post = await getAdoptionPostById(id);
      setFormState({
        title: post.title,
        description: post.description,
        images: post.images.join(", "),
      });
      setEditId(id);
    } catch (error) {
      toaster.error("An error occurred while fetching the adoption post!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteAdoptionPost(id);
      toaster.success("The adoption post was deleted!");
      fetchAdoptionPosts();
    } catch (error) {
      toaster.error("An error occurred while deleting the adoption post!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormState({ title: "", description: "", images: "" });
    setEditId(null);
  };

  return (
    <>
      <div className="manage-adoption-form">
        <h2>Manage Adoption Posts</h2>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit} className="adoption-form">
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
            name="images"
            placeholder="Image URLs (comma separated)"
            value={formState.images}
            onChange={handleChange}
          />
          <button type="submit" className="btn-save" disabled={loading}>
            {editId ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>
      <div className="manage-adoption-list">
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div className="adoption-list">
            {adoptionPosts.map((item) => (
              <div key={item._id} className="adoption-card">
                <img
                  src={item.images[0] || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="adoption-image"
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="adoption-actions">
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

export default ManageAdoptions;
