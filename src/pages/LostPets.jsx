import React, { useEffect, useState } from "react";
import { missingService } from "../services/api-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoArrowBack } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/css/pages/Page.css";

const ReportLostPet = () =>
{
  return (
    <section className="report-lost-pet">
      <h2>Report a Lost Pet</h2>
      <p>If you have lost a pet, submit a report to help find them!</p>
      <button className="btn">Report Now</button>
    </section>
  );
};

const LostPets = () =>
{
  const [lostPets, setLostPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() =>
  {
    const fetchLostPets = async () =>
    {
      try
      {
        const data = await missingService.getAll();
        setLostPets(data);
      } catch (err)
      {
        setError(err.message);
      } finally
      {
        setLoading(false);
      }
    };
    fetchLostPets();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="page-container">
      {!selectedPet ? (
        <>
          {/* Lost Pets Slider */}
          <div className="page-slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="page-swiper"
            >
              {lostPets.map((pet) => (
                <SwiperSlide key={pet.id}>
                  <div
                    className="page-slide"
                    onClick={() => setSelectedPet(pet)}
                  >
                    <img
                      src={pet.imageUrls || "/src/assets/img/default.png"}
                      alt={pet.name}
                      className="page-slide-image"
                    />
                    <div className="page-slide-content">
                      <h2>{pet.name}</h2>
                      <p>{pet.description.slice(0, 100)}...</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Report Lost Pet Section */}
          <ReportLostPet />

          {/* All Lost Pets */}
          <div className="page-grid">
            {lostPets.map((pet) => (
              <div
                key={pet.id}
                className="page-card"
                onClick={() => setSelectedPet(pet)}
              >
                <img
                  src={pet.imageUrls || "/src/assets/img/default.png"}
                  alt={pet.name}
                  className="page-image"
                />
                <h2>{pet.name}</h2>
                <p className="page-description">
                  {pet.description.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Lost Pet Details
        <div className="page-detail">
          <div className="page-detail-header">
            <IoArrowBack
              className="page-back-button"
              onClick={() => setSelectedPet(null)}
            />
            <h2>Lost Pet Details</h2>
          </div>
          <img
            src={selectedPet.imageUrls || "/src/assets/img/default.png"}
            alt={selectedPet.name}
            className="page-detail-image"
          />
          <div className="page-detail-content">
            <h3>{selectedPet.name}</h3>
            <p className="page-detail-date">
              Last seen on: {new Date(selectedPet.date).toLocaleDateString()}
            </p>
            <p className="page-detail-description">{selectedPet.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostPets;
