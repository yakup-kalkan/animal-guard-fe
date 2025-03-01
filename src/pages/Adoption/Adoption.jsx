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
  const [selectedType, setSelectedType] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedEstimatedAge, setSelectedEstimatedAge] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVaccinated, setSelectedVaccinated] = useState("");
  const [selectedChipped, setSelectedChipped] = useState("");
  const [selectedNeutered, setSelectedNeutered] = useState("");

  const [types, setTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [genders, setGenders] = useState([]);
  const [colour, setColors] = useState([]);
  const [ages, setAges] = useState([]);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const data = await adoptionService.getAll();
        setAdoptions(data);
        setFilteredAdoptions(data);
        setTypes([
          ...new Set(data.map((adoption) => adoption.type).filter(Boolean)),
        ]);
        setBreeds([
          ...new Set(data.map((animal) => animal.breed).filter(Boolean)),
        ]);
        setGenders([
          ...new Set(data.map((animal) => animal.gender).filter(Boolean)),
        ]);
        setColors([
          ...new Set(data.map((animal) => animal.colour).filter(Boolean)),
        ]);
        setAges([
          ...new Set(data.map((animal) => animal.estimatedAge).filter(Boolean)),
        ]);
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

    if (selectedType) {
      filtered = filtered.filter((animal) => animal.type === selectedType);
    }
    if (selectedBreed) {
      filtered = filtered.filter((animal) => animal.breed === selectedBreed);
    }
    if (selectedGender) {
      filtered = filtered.filter((animal) => animal.gender === selectedGender);
    }
    if (selectedEstimatedAge) {
      filtered = filtered.filter(
        (animal) => animal.estimatedAge === selectedEstimatedAge
      );
    }
    if (selectedColor) {
      filtered = filtered.filter((animal) => animal.colour === selectedColor);
    }
    if (selectedVaccinated) {
      filtered = filtered.filter(
        (animal) => animal.vaccinated.toString() === selectedVaccinated
      );
    }
    if (selectedChipped) {
      filtered = filtered.filter(
        (animal) => animal.chipped.toString() === selectedChipped
      );
    }
    if (selectedNeutered) {
      filtered = filtered.filter(
        (animal) => animal.neutered.toString() === selectedNeutered
      );
    }

    setFilteredAdoptions(filtered);
  }, [
    selectedType,
    selectedBreed,
    selectedGender,
    selectedEstimatedAge,
    selectedColor,
    selectedVaccinated,
    selectedChipped,
    selectedNeutered,
    adoptions,
  ]);

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
      <h1>Adoption Posts</h1>
      <div className="filters">
        <div className="filter-group">
          <label>Type</label>
          <select onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">All</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Breed</label>
          <select onChange={(e) => setSelectedBreed(e.target.value)}>
            <option value="">All</option>
            {breeds.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Gender</label>
          <select onChange={(e) => setSelectedGender(e.target.value)}>
            <option value="">All</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Estimated Age</label>
          <select onChange={(e) => setSelectedEstimatedAge(e.target.value)}>
            <option value="">All</option>
            {ages.map((age, index) => (
              <option key={index} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Color</label>
          <select onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="">All</option>
            {colour.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Vaccinated</label>
          <select onChange={(e) => setSelectedVaccinated(e.target.value)}>
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Chipped</label>
          <select onChange={(e) => setSelectedChipped(e.target.value)}>
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Neutered</label>
          <select onChange={(e) => setSelectedNeutered(e.target.value)}>
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      {/* <div className="filters">
        <label>Type:</label>
        <select onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">All</option>
          {types.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label>Breed:</label>
        <select onChange={(e) => setSelectedBreed(e.target.value)}>
          <option value="">All</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        <label>Gender:</label>
        <select onChange={(e) => setSelectedGender(e.target.value)}>
          <option value="">All</option>
          {genders.map((gender, index) => (
            <option key={index} value={gender}>
              {gender}
            </option>
          ))}
        </select>

        <label>Estimated Age:</label>
        <select onChange={(e) => setSelectedEstimatedAge(e.target.value)}>
          <option value="">All</option>
          {ages.map((age, index) => (
            <option key={index} value={age}>
              {age}
            </option>
          ))}
        </select>

        <label>Color:</label>
        <select onChange={(e) => setSelectedColor(e.target.value)}>
          <option value="">All</option>
          {colour.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>

        <label>Vaccinated:</label>
        <select onChange={(e) => setSelectedVaccinated(e.target.value)}>
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label>Chipped:</label>
        <select onChange={(e) => setSelectedChipped(e.target.value)}>
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label>Neutered:</label>
        <select onChange={(e) => setSelectedNeutered(e.target.value)}>
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div> */}

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
              className="adoption-image"
            />
            <h2>{adoption.title}</h2>
            <p className="adoption-description">
              {adoption.description.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
      {selectedAdoption && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedAdoption.title}</h2>
            <p>{selectedAdoption.description}</p>
            <div className="modal-images">
              {selectedAdoption.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${selectedAdoption.title} - ${index}`}
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
