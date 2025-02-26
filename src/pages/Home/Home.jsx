import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Hero = ({ isAuthenticated }) => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h2>
          The best support for your <span>best friend</span>
        </h2>
        <p>Find answers for all your pet’s needs and access expert advice.</p>
        {!isAuthenticated && (
          <Link to="/login" className="btn btn-full">
            Login
          </Link>
        )}
      </div>
      <div className="hero-image">
        <img src="src\assets\img\3725065.jpg" alt="Dog and Cat" />
      </div>
    </section>
  );
};

const Tips = () => {
  return (
    <section className="tips">
      <h2>Essential Tips for Your Pet's Comfort</h2>
      <div className="tips-container">
        <div className="tip-card">
          <div className="tip-icon">
            <img src="/images/icon-training.png" alt="Training" />
          </div>
          <h3 className="tip-title">Training</h3>
          <p>
            Correct behaviors, educate, have fun, and strengthen your bond with
            your pet.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-icon">
            <img src="/images/icon-food.png" alt="Food" />
          </div>
          <h3 className="tip-title">Nutrition</h3>
          <p>Learn how to choose the best foods for your pet's health.</p>
        </div>

        <div className="tip-card">
          <div className="tip-icon">
            <img src="/images/icon-adoption.png" alt="Adoption" />
          </div>
          <h3 className="tip-title">Adoption</h3>
          <p>Find out how to adopt and take good care of your new friend.</p>
        </div>

        <div className="tip-card">
          <div className="tip-icon">
            <img src="/images/icon-health.png" alt="Health" />
          </div>
          <h3 className="tip-title">Health</h3>
          <p>Monitor your pet's health and prevent diseases.</p>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
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

const Placeholder = ({ height = "10px" }) => {
  return (
    <section>
      <div style={{ height }}></div>
    </section>
  );
};

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext); // Import from Auth Context
  return (
    <div className="container">
      {/* Hero Section */}
      <Hero isAuthenticated={isAuthenticated} />

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
