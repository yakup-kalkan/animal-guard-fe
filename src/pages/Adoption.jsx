import React, { useEffect, useState } from "react";
import { adoptionService } from "../services/api-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Slider from "react-slick";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "../assets/css/pages/Page.css";

const Adoption = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [filteredAdoptions, setFilteredAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
    <div className="page-container">
      {!selectedAdoption ? (
        <>
          {/* Adoption Slider */}
          {console.log(selectedAdoption)}
          <div className="page-slider-container">
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
              className="page-swiper"
            >
              {adoptions.map((adoption) => (
                <SwiperSlide key={adoption.id}>
                  <div
                    className="page-slide"
                    onClick={() => setSelectedAdoption(adoption)}
                  >
                    <img
                      src={
                        adoption.imageUrls?.[0] || "/src/assets/img/default.png"
                      }
                      alt={adoption.title}
                      className="page-slide-image"
                    />
                    <div className="page-slide-content">
                      <h2>{adoption.title}</h2>
                      <p>{adoption.description.slice(0, 100)}...</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Filters */}
          <div className="page-filters">
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
          <div className="page-grid">
            {filteredAdoptions.map((adoption) => (
              <div
                key={adoption.id}
                className="page-card"
                onClick={() => setSelectedAdoption(adoption)}
              >
                <img
                  className="page-card-image"
                  src={
                    Array.isArray(adoption.imageUrls) &&
                    adoption.images.length > 0
                      ? adoption.imageUrls[0]
                      : adoption.imageUrls || "/src/assets/img/default.png"
                  }
                  alt={adoption.title}
                />
                <div className="page-card-content">
                  <h2 className="page-card-title">{adoption.title}</h2>
                  <p className="page-card-description">
                    {adoption.description.slice(0, 100)}...
                  </p>
                </div>
                {/* Animation Ok */}
                <IoArrowForward className="arrow-icon" />
              </div>
            ))}
          </div>
        </>
      ) : (
        // Adoption Detail View with Slick Slider
        <div className="page-detail">
          <div className="page-detail-header">
            <IoArrowBack
              className="page-back-button"
              onClick={() => {
                setSelectedAdoption(null);
                setThumbsSwiper(null);
              }}
            />
            <h2>Adoption Details</h2>
          </div>
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            className="page-detail-swiper"
          >
            {selectedAdoption.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="page-detail-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3}
            freeMode
            watchSlidesProgress
            className="page-thumbnails"
          >
            {selectedAdoption.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="page-thumbnail"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="page-detail-content">
            <h3>{selectedAdoption.title}</h3>
            <p className="page-detail-date">
              Estimated Age: {selectedAdoption.estimatedAge} | Gender:{" "}
              {selectedAdoption.gender}
            </p>
            <p className="page-detail-description">
              {selectedAdoption.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adoption;
