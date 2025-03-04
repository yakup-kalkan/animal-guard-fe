import React, { useEffect, useState } from "react";
import { adoptionService } from "../../services/api-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoArrowBack } from "react-icons/io5";
import Slider from "react-slick";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Adoption.css";

const Adoption = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [filteredAdoptions, setFilteredAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdoption, setSelectedAdoption] = useState(null);

  // Filters
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

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="adoption-container">
      {!selectedAdoption ? (
        <>
          {/* Adoption Slider */}
          <div className="adoption-slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                360: { slidesPerView: 1 } /* small */,
                480: { slidesPerView: 1 } /* Standard */,
                768: { slidesPerView: 1 } /* Tablets */,
                1024: { slidesPerView: 1 } /* Small Laptop */,
                1440: { slidesPerView: 1 } /* Big screen */,
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="adoption-swiper"
            >
              {adoptions.map((adoption) => (
                <SwiperSlide key={adoption.id}>
                  <div
                    className="adoption-slide"
                    onClick={() => setSelectedAdoption(adoption)}
                  >
                    <img
                      src={
                        adoption.images?.[0] || "/src/assets/img/default.png"
                      }
                      alt={adoption.title}
                      className="adoption-slide-image"
                    />
                    <div className="adoption-slide-content">
                      <h2>{adoption.title}</h2>
                      <p>{adoption.description.slice(0, 100)}...</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Filters */}
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
                onChange={(e) =>
                  setFilters({ ...filters, [key]: e.target.value })
                }
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
                onClick={() => setSelectedAdoption(adoption)}
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
        </>
      ) : (
        // Adoption Detail View with Slick Slider
        <div className="adoption-detail">
          <div className="adoption-detail-header">
            <IoArrowBack
              className="back-button"
              onClick={() => setSelectedAdoption(null)}
            />
            <h2>Adoption Details</h2>
          </div>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {selectedAdoption.images?.map((img, i) => (
              <div key={i}>
                <img
                  src={img}
                  alt={`Image ${i}`}
                  className="adoption-detail-image"
                />
              </div>
            ))}
          </Slider>
          <div className="adoption-detail-content">
            <h3>{selectedAdoption.title}</h3>
            <p className="adoption-detail-date">
              Estimated Age: {selectedAdoption.estimatedAge} | Gender:{" "}
              {selectedAdoption.gender}
            </p>
            <p className="adoption-detail-description">
              {selectedAdoption.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adoption;
