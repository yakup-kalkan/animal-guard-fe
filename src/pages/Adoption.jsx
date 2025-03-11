import React, { useEffect, useState } from "react";
import { adoptionService } from "../services/api-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "../assets/css/pages/Page.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

const Adoption = () =>
{
  const [adoptions, setAdoptions] = useState([]);
  const [filteredAdoptions, setFilteredAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [types, setTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [genders, setGenders] = useState([]);
  const [colours, setColours] = useState([]);
  const [ages, setAges] = useState([]);

  useEffect(() =>
  {
    const fetchAdoptions = async () =>
    {
      try
      {
        const data = await adoptionService.getAll();
        setAdoptions(data);
        setFilteredAdoptions(data);

        // 🟢 **Setze die Filter-Werte basierend auf den vorhandenen Adoptionen**
        setTypes([...new Set(data.map((a) => a.type || "Unknown"))]);
        setBreeds([...new Set(data.map((a) => a.breed || "Unknown"))]);
        setGenders([...new Set(data.map((a) => a.gender || "Unknown"))]);
        setColours([...new Set(data.map((a) => a.colour || "Unknown"))]);
        setAges([...new Set(data.map((a) => a.estimatedAge || "Unknown"))]);

      }
      catch (err)
      {
        setError(err.message);
      }
      finally
      {
        setLoading(false);
      }
    };
    fetchAdoptions();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="page-container">
      {!selectedAdoption ? (
        <>
          {/* Adoption Slider */}
          {console.log("Selected Adoption:", selectedAdoption || "Kein Eintrag ausgewählt")}
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
                <SwiperSlide key={adoption._id || adoption.id || Math.random()}>
                  <div className="page-slide" onClick={() => setSelectedAdoption(adoption)}>
                    <img
                      src={
                        adoption.imageUrls?.[0] ||
                        (adoption.imageUploads?.length > 0 ? `${API_BASE_URL}${adoption.imageUploads[0]}` : "/src/assets/img/default.png")
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
              <div key={adoption._id || adoption.id || Math.random()} className="page-card" onClick={() => setSelectedAdoption(adoption)} >
                <img
                  className="page-card-image"
                  src={
                    adoption.imageUrls?.[0] ||
                    (adoption.imageUploads?.length > 0 ? `${API_BASE_URL}${adoption.imageUploads[0]}` : "/src/assets/img/default.png")
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
            <IoArrowBack className="page-back-button" onClick={() =>
            {
              setSelectedAdoption(null);
              setThumbsSwiper(null);
            }} />
            <h2>Adoption Details</h2>
          </div>
          {/* Detail-Image Swiper */}

          <Swiper modules={[Navigation, Thumbs]} navigation thumbs={{ swiper: thumbsSwiper }} className="page-detail-swiper">
            {(selectedAdoption.imageUrls?.length > 0 ? selectedAdoption.imageUrls : selectedAdoption.imageUploads)?.map((image, index) => (
              <SwiperSlide key={`${selectedAdoption._id || selectedAdoption.id || Math.random()}-image-${index}`}>
                <img src={image.startsWith("http") ? image : `${API_BASE_URL}${image}`} alt={`Slide ${index}`} className="page-detail-image" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={3} freeMode watchSlidesProgress className="page-thumbnails">
            {(selectedAdoption.imageUrls?.length > 0 ? selectedAdoption.imageUrls : selectedAdoption.imageUploads)?.map((image, index) => (
              <SwiperSlide key={`${selectedAdoption._id || selectedAdoption.id || Math.random()}-thumb-${index}`}>
                <img src={image.startsWith("http") ? image : `${API_BASE_URL}${image}`} alt={`Thumbnail ${index}`} className="page-thumbnail" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="page-detail-content">
            <h3>{selectedAdoption.title}</h3>
            <p className="page-detail-date">Estimated Age: {selectedAdoption.estimatedAge} | Gender: {selectedAdoption.gender}</p>
            <p className="page-detail-description">{selectedAdoption.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adoption;