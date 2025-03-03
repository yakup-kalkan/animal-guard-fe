import React, { useEffect, useState } from "react";
import { missingService } from "../../services/api-service";
import "./LostPets.css";

const ReportLostPet = () => {
  return (
    <section className="report-lost-pet">
      <h2>Report a Lost Pet</h2>
      <p>If you have lost a pet, submit a report to help find them!</p>
      <button className="btn-report">Report Now</button>
    </section>
  );
};

const LostPets = () => {
  const [lostPets, setLostPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const fetchLostPets = async () => {
      try {
        const data = await missingService.getAll();
        setLostPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLostPets();
  }, []);

  const handleOpenModal = (pet) => {
    setSelectedPet(pet);
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="lostpets-container">
      <h1>Lost Pets</h1>
      <ReportLostPet />
      <div className="lostpets-grid">
        {lostPets.map((pet) => (
          <div
            key={pet.id}
            className="lostpet-card"
            onClick={() => handleOpenModal(pet)}
          >
            <img
              src={pet.image || "/src/assets/img/default.png"}
              alt={pet.name}
              className="lostpet-image"
            />
            <div className="lostpet-content">
              <h2>{pet.name}</h2>
              <p className="lostpet-description">
                {pet.description.slice(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedPet && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedPet.name}</h2>
            <p>{selectedPet.description}</p>
            {selectedPet.image && (
              <img
                src={selectedPet.image}
                alt={selectedPet.name}
                className="modal-image"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LostPets;
