import React, { useEffect, useState } from "react";
import { adoptionService } from "../../services/api-service";
import "./Adoption.css";

const Adoption = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdoption, setSelectedAdoption] = useState(null);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const data = await adoptionService.getAll();
        setAdoptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdoptions();
  }, []);

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
      <div className="adoption-grid">
        {adoptions.map((adoption) => (
          <div
            key={adoption.id}
            className="adoption-card"
            onClick={() => handleOpenModal(adoption)}
          >
            <img
              src={adoption.images?.[0] || "/default-image.jpg"}
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
