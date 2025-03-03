import React, { useEffect, useState } from "react";
import { adoptionService } from "../../services/api-service";
import "./Adoption.css";

const Adoption = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [filteredAdoptions, setFilteredAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdoption, setSelectedAdoption] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    type: "",
    breed: "",
    gender: "",
    estimatedAge: "",
    colour: "",
  });

  const [types, setTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [genders, setGenders] = useState([]);
  const [colours, setColours] = useState([]);
  const [ages, setAges] = useState([]);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const data = await adoptionService.getAll();
        setAdoptions(data);
        setFilteredAdoptions(data);
        setTypes([...new Set(data.map((a) => a.type))]);
        setBreeds([...new Set(data.map((a) => a.breed))]);
        setGenders([...new Set(data.map((a) => a.gender))]);
        setColours([...new Set(data.map((a) => a.colour))]);
        setAges([...new Set(data.map((a) => a.estimatedAge))]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdoptions();
  }, []);

  useEffect(() => {
    let filtered = adoptions;

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter((a) => a[key] === filters[key]);
      }
    });

    setFilteredAdoptions(filtered);
  }, [filters, adoptions]);

  const handleOpenModal = (adoption) => {
    setSelectedAdoption(adoption);
  };

  const handleCloseModal = () => {
    setSelectedAdoption(null);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="adoption-container">
      <h1>Find Your New Best Friend</h1>

      {/* Modern Filters */}
      <div className="filters">
        {[
          { label: "Type", key: "type", options: types },
          { label: "Breed", key: "breed", options: breeds },
          { label: "Gender", key: "gender", options: genders },
          { label: "Age", key: "estimatedAge", options: ages },
          { label: "Color", key: "colour", options: colours },
        ].map(({ label, key, options }) => (
          <select
            key={key}
            onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
          >
            <option value="">{label}</option>
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Adoption Cards */}
      <div className="adoption-grid">
        {filteredAdoptions.map((adoption) => (
          <div
            key={adoption.id}
            className="adoption-card"
            onClick={() => handleOpenModal(adoption)}
          >
            <img
              src={adoption.images?.[0] || "/src/assets/img/default.png"}
              alt={adoption.title}
            />
            <h2>{adoption.title}</h2>
            <p>{adoption.description.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      {/* Modern Modal */}
      {selectedAdoption && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedAdoption.title}</h2>
            <p>{selectedAdoption.description}</p>
            <div className="modal-images">
              {selectedAdoption.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Image ${i}`}
                  className="modal-image"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adoption;
