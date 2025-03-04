import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useLanguage } from "../../context/LanguageContext";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Home.css";

const HeroSlider = () =>
{
  const { t } = useLanguage();

  const slides = [
    { image: "/src/assets/img/Home/A-playful-cat-and-dog-sitting-together-on-a-cozy-sofa-looking-at-the-camera.jpg", text: t("home", "hero_slide_1") },
    { image: "/src/assets/img/Home/Cat-and-dog-wallpaper-free.jpg", text: t("home", "hero_slide_2") },
    { image: "/src/assets/img/Home/Cute-cat-and-dog-hd-wallpaper-high-quality.jpg", text: t("home", "hero_slide_3") },
    { image: "/src/assets/img/Home/cute-cat-and-dog-sleep-wallpaper.jpg", text: t("home", "hero_slide_4") },
    { image: "/src/assets/img/Home/Cute-Dog-and-Cat-Wallpaper.jpg", text: t("home", "hero_slide_5") },
    { image: "/src/assets/img/Home/Wallpaper-cute-sweet-girl-cat-and-dog.jpg", text: t("home", "hero_slide_6") }
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="hero-slider"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="slide-item">
          <img src={slide.image} alt={slide.text} className="slide-image" />
          <div className="slide-text">{slide.text}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const ContentSection = () =>
{
  const { t } = useLanguage();

  return (
    <section className="content-section">
      <div className="content-container">
        <div className="text-section">
          <h2>{t("home", "why_pet_care_matters_title")}</h2>
          <p>{t("home", "why_pet_care_matters_text")}</p>
        </div>
        <div className="media-container">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="image-slider"
          >
            <SwiperSlide><img src="/src/assets/img/Home/Cat-and-dog-wallpaper-free.jpg" alt="Pet 1" className="slide-img" /></SwiperSlide>
            <SwiperSlide><img src="/src/assets/img/Home/Cute-cat-and-dog-hd-wallpaper-high-quality.jpg" alt="Pet 2" className="slide-img" /></SwiperSlide>
            <SwiperSlide><img src="/src/assets/img/Home/A-playful-cat-and-dog-sitting-together-on-a-cozy-sofa-looking-at-the-camera.jpg" alt="Pet 3" className="slide-img" /></SwiperSlide>
          </Swiper>
          <video controls autoPlay muted className="content-video">
            <source src="/src/assets/vid/14615296-uhd_3840_2160_50fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};


const Modal = ({ content, onClose }) =>
{
  if (!content) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img src={content.image} alt={content.title} className="modal-image" />
        <h2>{content.title}</h2>
        <p>{content.text}</p>
      </div>
    </div>
  );
};

const Tips = () =>
{
  const { t } = useLanguage();
  const [selectedTip, setSelectedTip] = useState(null);

  const tipsData = [
    {
      title: t("home", "tips_training_title"),
      image: "/src/assets/img/Home/training/male-dog-trainer-outdoors-with-dog-session.jpg",
      text: t("home", "tips_training_text")
    },
    {
      title: t("home", "tips_food_title"),
      image: "/src/assets/img/Home/food/healthy-fresh-pet-food-ingredients-dark-surface.jpg",
      text: t("home", "tips_food_text")
    },
    {
      title: t("home", "tips_adoption_title"),
      image: "/src/assets/img/Home/adoption-tips/smiley-woman-spending-time-with-cute-rescue-dogs-shelter.jpg",
      text: t("home", "tips_adoption_text")
    },
    {
      title: t("home", "tips_health_title"),
      image: "/src/assets/img/Home/health/Screenshot 2025-03-04 124036.png",
      text: t("home", "tips_health_text")
    }
  ];

  return (
    <section className="tips-section">
      <h2>{t("home", "tips_section_title")}</h2>
      <div className="tips-grid">
        {tipsData.map((tip, index) => (
          <div key={index} className="tip-card" onClick={() => setSelectedTip(tip)}>
            <img src={tip.image} alt={tip.title} className="tip-image" />
            <h3 className="tip-title">{tip.title}</h3>
          </div>
        ))}
      </div>
      <Modal content={selectedTip} onClose={() => setSelectedTip(null)} />
    </section>
  );
};

const Testimonials = () =>
{
  return (
    <section className="testimonials">
      <h2>
        See What Our Users Say About{" "}
        <span style={{ color: "#1693db" }}>Animal Guard</span>!
      </h2>
      <div className="testimonial-container">
        <div className="testimonial-card">
          <div className="testimonial-icon">
            <img src="/images/icon-star.png" alt="Rating" />
          </div>
          <img
            className="testimonial-img"
            src="/images/user1.jpg"
            alt="Carlos"
          />
          <h3 className="testimonial-name">Carlos Santana</h3>
          <p className="testimonial-role">Cat Owner</p>
          <p className="testimonial-text">
            The app simplified training and kept me updated about my pet’s
            health. I highly recommend it!
          </p>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-icon">
            <img src="/images/icon-star.png" alt="Rating" />
          </div>
          <img
            className="testimonial-img"
            src="/images/user2.jpg"
            alt="Giovanna"
          />
          <h3 className="testimonial-name">Giovanna Lima</h3>
          <p className="testimonial-role">Dog Owner</p>
          <p className="testimonial-text">
            Since using the app, I’ve noticed a positive change in my pet’s
            behavior. The training tips are valuable!
          </p>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-icon">
            <img src="/images/icon-star.png" alt="Rating" />
          </div>
          <img
            className="testimonial-img"
            src="/images/user3.jpg"
            alt="Regina"
          />
          <h3 className="testimonial-name">Regina Santos</h3>
          <p className="testimonial-role">Cat Owner</p>
          <p className="testimonial-text">
            The app not only reminds me of vaccinations but also introduced me
            to an amazing pet community.
          </p>
        </div>
      </div>
    </section>
  );
};

const Placeholder = ({ height = "10px" }) =>
{
  return (
    <section>
      <div style={{ height }}></div>
    </section>
  );
};

const Home = () =>
{
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="container">
      {/* Hero Section mit Swiper */}
      <HeroSlider />

      {/* Neuer Content-Bereich */}
      <ContentSection />

      {/* Tips */}
      <Tips />

      {/* Testimonials */}
      <Testimonials />

      {/* Placeholder */}
      <Placeholder height="100px" />
    </div>
  );
};

export default Home;