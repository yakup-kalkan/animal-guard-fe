import { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../../context/ToasterContext";
import { adoptionService } from "../../../services/api-service";
import "./ManageAdoptions.css";

const ManageAdoptions = () => {
  const { toaster } = useContext(ToasterContext);
  const [adoptionPosts, setAdoptionPosts] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    images: "",
    estimatedAge: "",
    birthDate: "",
    breed: "",
    colour: "",
    gender: "",
    specialFeatures: "",
    vaccinated: false,
    chipped: false,
    neutered: false,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdoptionPosts();
  }, []);

  const fetchAdoptionPosts = async () => {
    setLoading(true);
    try {
      const allPosts = await adoptionService.getAll();
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
        await adoptionService.update(editId, formState);
        toaster.success("Adoption post updated successfully!");
      } else {
        await adoptionService.create(formState);
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
      const post = await adoptionService.getById(id);
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
      await adoptionService.delete(id);
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
    setFormState({
      title: "",
      description: "",
      images: "",
      estimatedAge: "",
      birthDate: "",
      breed: "",
      colour: "",
      gender: "",
      specialFeatures: "",
      vaccinated: false,
      chipped: false,
      neutered: false,
    });
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
            required
          />
          <input
            type="text"
            name="estimatedAge"
            placeholder="Estimated Age"
            value={formState.estimatedAge}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birthDate"
            value={formState.birthDate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={formState.breed}
            onChange={handleChange}
          />
          <input
            type="text"
            name="colour"
            placeholder="Colour"
            value={formState.colour}
            onChange={handleChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formState.gender}
            onChange={handleChange}
          />
          <textarea
            name="specialFeatures"
            placeholder="Special Features"
            value={formState.specialFeatures}
            onChange={handleChange}
          />
          <label>
            <input
              type="checkbox"
              name="vaccinated"
              checked={formState.vaccinated}
              onChange={handleChange}
            />{" "}
            Vaccinated
          </label>
          <label>
            <input
              type="checkbox"
              name="chipped"
              checked={formState.chipped}
              onChange={handleChange}
            />{" "}
            Chipped
          </label>
          <label>
            <input
              type="checkbox"
              name="neutered"
              checked={formState.neutered}
              onChange={handleChange}
            />{" "}
            Neutered
          </label>
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
