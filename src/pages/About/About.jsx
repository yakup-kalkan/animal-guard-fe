import "./About.css";

const About = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            About Animal <span>Guard</span>
          </h1>
          <p>
            Animal Guard is a non-profit organization dedicated to rescuing,
            caring for, and finding loving homes for animals in need. Our
            mission is to provide shelter, medical care, and a second chance for
            abandoned and mistreated animals.
          </p>
          <button className="hero-button">Learn More</button>
        </div>
        <div className="hero-image">
          <img src="src\assets\img\Logo.png" alt="Animals in Care" />
        </div>
      </section>

      {/* Our Mission */}
      <section className="features">
        <h2>Our Mission</h2>
        <div className="feature-container">
          <div className="feature-box">
            <h3>Rescue & Shelter</h3>
            <p>Providing safe shelters for abandoned animals.</p>
          </div>
          <div className="feature-box">
            <h3>Adoption Services</h3>
            <p>Finding loving homes for rescued animals.</p>
          </div>
          <div className="feature-box">
            <h3>Medical Care</h3>
            <p>Ensuring every animal gets the medical attention they need.</p>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="help-section">
        <h2>How You Can Help</h2>
        <p>
          Join us in making a difference! You can support us by adopting,
          fostering, donating, or volunteering at Animal Guard. Every
          contribution helps save lives.
        </p>
        <button className="help-button">Get Involved</button>
      </section>

      {/* Contact Information */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <p>
            Email: <span>info@animal-guard.org</span>
          </p>
          <p>
            Phone: <span>+49 123 456 789</span>
          </p>
          <p>
            Location: <span>Düsseldorf, Germany</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
