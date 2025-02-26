import "./About.css";
const About = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            About Animal <span> Guard</span>
          </h1>
          <p>
            Animal Guard is a non-profit organization dedicated to rescuing,
            caring for, and finding loving homes for animals in need. Our
            mission is to provide shelter, medical care, and a second chance for
            abandoned and mistreated animals.
          </p>
        </div>
        <img src="/about-us.png" alt="Animals in Care" width="300" />
      </section>

      {/* Our Mission */}
      <section className="features">
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
      </section>

      {/* How You Can Help */}
      <section className="app-section">
        <h2>How You Can Help</h2>
        <p>
          Join us in making a difference! You can support us by adopting,
          fostering, donating, or volunteering at Animal Guard. Every
          contribution helps save lives.
        </p>
        <button className="hero-button">Get Involved</button>
      </section>

      {/* Contact Information */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: info@animal-guard.org</p>
        <p>Phone: +49 123 456 789</p>
        <p>Location: Düsseldorf, Germany</p>
      </section>
    </div>
  );
};

export default About;
