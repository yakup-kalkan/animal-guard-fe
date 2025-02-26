import { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../../context/ToasterContext";
import {
  createAdoptionPost,
  getAllAdoptionPosts,
  getAdoptionPostById,
  updateAdoptionPost,
  deleteAdoptionPost,
} from "../../../services/AdoptionApi";
import "./ManageAdoption.css";

const ManageAdoptions = () => {
  const { toaster } = useContext(ToasterContext);
  const [adoptionPosts, setAdoptionPosts] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    images: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAdoptionPosts();
  }, []);

  const fetchAdoptionPosts = async () => {
    try {
      const allPosts = await getAllAdoptionPosts();
      setAdoptionPosts(allPosts);
    } catch (error) {
      toaster.error("An error occurred while fetching adoption posts!");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  const handleEdit = async (id) => {
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
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdoptionPost(id);
      toaster.success("The adoption post was deleted!");
      fetchAdoptionPosts();
    } catch (error) {
      toaster.error("An error occurred while deleting the adoption post!");
      console.error(error);
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
          <button type="submit" className="btn-save">
            {editId ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>
      <div className="manage-adoption-list">
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
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageAdoptions;
