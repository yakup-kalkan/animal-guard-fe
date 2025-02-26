import { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../../context/ToasterContext";
import {
  createMissingPost,
  getAllMissingPosts,
  getMissingPostById,
  updateMissingPost,
  deleteMissingPost,
} from "../../../services/api-service";
import "./ManageLostPets.css";

const ManageLostPets = () => {
  const { toaster } = useContext(ToasterContext);
  const [lostPets, setLostPets] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    image: "",
    found: false,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLostPets();
  }, []);

  const fetchLostPets = async () => {
    setLoading(true);
    try {
      const allPets = await getAllMissingPosts();
      setLostPets(allPets);
    } catch (error) {
      toaster.error("An error occurred while fetching lost pets!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateMissingPost(editId, formState);
        toaster.success("Lost pet updated successfully!");
      } else {
        await createMissingPost(formState);
        toaster.success("Lost pet added successfully!");
      }
      resetForm();
      fetchLostPets();
    } catch (error) {
      toaster.error("An error occurred while saving the lost pet!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const pet = await getMissingPostById(id);
      setFormState({
        name: pet.name,
        description: pet.description,
        image: pet.image,
        found: pet.found,
      });
      setEditId(id);
    } catch (error) {
      toaster.error("An error occurred while fetching the lost pet!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteMissingPost(id);
      toaster.success("Lost pet deleted successfully!");
      fetchLostPets();
    } catch (error) {
      toaster.error("An error occurred while deleting the lost pet!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormState({
      name: "",
      description: "",
      image: "",
      found: false,
    });
    setEditId(null);
  };

  return (
    <>
      <div className="manage-lost-pets-form">
        <h2>Manage Lost Pets</h2>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit} className="lost-pet-form">
          <input
            type="text"
            name="name"
            placeholder="Pet Name"
            value={formState.name}
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
            name="image"
            placeholder="Image URL (optional)"
            value={formState.image}
            onChange={handleChange}
          />
          <label className="found-checkbox">
            <input
              type="checkbox"
              name="found"
              checked={formState.found}
              onChange={handleChange}
            />{" "}
            Found
          </label>
          <button type="submit" className="btn-save" disabled={loading}>
            {editId ? "Update Pet" : "Add Lost Pet"}
          </button>
        </form>
      </div>
      <div className="manage-lost-pets-list">
        {loading ? (
          <p>Loading lost pets...</p>
        ) : (
          <div className="lost-pets-list">
            {lostPets.map((item) => (
              <div
                key={item._id}
                className={`lost-pet-card ${item.found ? "found" : ""}`}
              >
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="lost-pet-image"
                />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p
                  className={`status ${
                    item.found ? "found-text" : "lost-text"
                  }`}
                >
                  {item.found ? "✅ Found" : "❌ Still Missing"}
                </p>
                <div className="lost-pet-actions">
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

export default ManageLostPets;
