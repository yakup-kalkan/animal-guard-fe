import { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../context/ToasterContext";
import { missingService } from "../../services/api-service";
import "../../assets/css/pages/Admin.css";

const ManageLostPets = () => {
  const { toaster } = useContext(ToasterContext);
  const [lostPets, setLostPets] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    imageUploads: [],
    imageUrls: [],
    breed: "",
    colour: "",
    chipped: false,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLostPets();
  }, []);

  const fetchLostPets = async () => {
    setLoading(true);
    try {
      const allPets = await missingService.getAll();
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
        await missingService.update(editId, formState);
        toaster.success("Lost pet updated successfully!");
      } else {
        await missingService.create(formState);
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
      const pet = await missingService.getById(id);
      setFormState({
        title: pet.title,
        description: pet.description,
        imageUploads: pet.imageUploads,
        imageUrls: pet.imageUrls,
        breed: pet.breed || "",
        colour: pet.colour || "",
        chipped: pet.chipped || false,
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
      await missingService.delete(id);
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
      title: "",
      description: "",
      imageUploads: [],
      imageUrls: [],
      breed: "",
      colour: "",
      chipped: false,
    });
    setEditId(null);
  };

  return (
    <>
      <div className="manage-form">
        <h2>Manage Lost Pets</h2>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="title"
            placeholder="Pet Title"
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
            value={formState.imageUrls}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="breed"
            placeholder="Breed (optional)"
            value={formState.breed}
            onChange={handleChange}
          />
          <input
            type="text"
            name="colour"
            placeholder="Colour (optional)"
            value={formState.colour}
            onChange={handleChange}
          />
          <label className="chipped-checkbox">
            <input
              type="checkbox"
              name="chipped"
              checked={formState.chipped}
              onChange={handleChange}
            />
            Chipped
          </label>
          <button type="submit" className="save" disabled={loading}>
            {editId ? "Update Pet" : "Add Lost Pet"}
          </button>
        </form>
      </div>
      <div className="manage-list">
        {loading ? (
          <p>Loading lost pets...</p>
        ) : (
          <div className="list">
            {lostPets.map((item) => (
              <div key={item._id} className="card">
                <img
                  src={
                    (Array.isArray(item.imageUrls)
                      ? item.imageUrls[0]
                      : item.imageUrls) || "https://via.placeholder.com/150"
                  }
                  alt={item.title}
                  className="image"
                />
                <h3>{item.title}</h3>
                <p>{item.description.slice(0, 100)}...</p>
                <p>Breed: {item.breed || "Unknown"}</p>
                <p>Colour: {item.colour || "Unknown"}</p>
                <p className="status">
                  {item.chipped ? "✅ Chipped" : "❌ Not Chipped"}
                </p>
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

export default ManageLostPets;
