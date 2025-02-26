import { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../../context/ToasterContext";
import "./ManageLostPets.css";

const ManageLostPets = () => {
  const { toaster } = useContext(ToasterContext);

  // State for storing lost pets
  const [lostPets, setLostPets] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    lastSeen: "",
    image: "",
    found: false,
  });
  const [editId, setEditId] = useState(null);

  // Load mock data or existing data from localStorage on component mount
  useEffect(() => {
    const storedPets = JSON.parse(localStorage.getItem("lostPets")) || [
      {
        id: 1,
        name: "Buddy",
        description: "Golden retriever lost near Central Park.",
        lastSeen: "Central Park, NY",
        image: "https://via.placeholder.com/150",
        found: false,
      },
      {
        id: 2,
        name: "Milo",
        description: "Small black cat missing since last night.",
        lastSeen: "Brooklyn, NY",
        image: "https://via.placeholder.com/150",
        found: true,
      },
    ];
    localStorage.setItem("lostPets", JSON.stringify(storedPets));
    setLostPets(storedPets);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission (add or update lost pet)
  const handleSubmit = (e) => {
    e.preventDefault();
    let storedPets = JSON.parse(localStorage.getItem("lostPets")) || [];

    if (editId) {
      // Update existing pet
      storedPets = storedPets.map((item) =>
        item.id === editId ? { ...item, ...formState } : item
      );
      toaster.success("Lost pet updated successfully!");
    } else {
      // Add new lost pet
      const newPet = { id: Date.now(), ...formState };
      storedPets.push(newPet);
      toaster.success("Lost pet added successfully!");
    }

    // Save updated list
    localStorage.setItem("lostPets", JSON.stringify(storedPets));
    setFormState({
      name: "",
      description: "",
      lastSeen: "",
      image: "",
      found: false,
    });
    setEditId(null);
    setLostPets(storedPets);
  };

  // Load pet details into form for editing
  const handleEdit = (pet) => {
    setFormState({
      name: pet.name,
      description: pet.description,
      lastSeen: pet.lastSeen,
      image: pet.image,
      found: pet.found,
    });
    setEditId(pet.id);
  };

  // Delete a lost pet
  const handleDelete = (id) => {
    let storedPets = JSON.parse(localStorage.getItem("lostPets")) || [];
    storedPets = storedPets.filter((item) => item.id !== id);

    localStorage.setItem("lostPets", JSON.stringify(storedPets));
    toaster.success("Lost pet deleted successfully!");
    setLostPets(storedPets);
  };

  return (
    <>
      <div className="manage-lost-pets-form">
        <h2>Manage Lost Pets (Test Mode: LocalStorage)</h2>

        {/* Lost pet add/edit form */}
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
            name="lastSeen"
            placeholder="Last Seen Location"
            value={formState.lastSeen}
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
            />
            Found
          </label>
          <button type="submit" className="btn-save">
            {editId ? "Update Pet" : "Add Lost Pet"}
          </button>
        </form>
      </div>

      {/* Display lost pets list */}
      <div className="manage-lost-pets-list">
        <div className="lost-pets-list">
          {lostPets.map((item) => (
            <div
              key={item.id}
              className={`lost-pet-card ${item.found ? "found" : ""}`}
            >
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                className="lost-pet-image"
              />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>
                <strong>Last Seen:</strong> {item.lastSeen}
              </p>
              <p
                className={`status ${item.found ? "found-text" : "lost-text"}`}
              >
                {item.found ? "✅ Found" : "❌ Still Missing"}
              </p>
              <div className="lost-pet-actions">
                <button className="btn-edit" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item.id)}
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

export default ManageLostPets;
