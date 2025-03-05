import "../assets/css/components/Newsletter.css";
const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>Stay Updated!</h2>
      <p>Subscribe for the latest news and updates.</p>
      <div className="newsletter-input">
        <input type="email" placeholder="Enter your email" />
        <button className="btn">Subscribe</button>
      </div>
    </section>
  );
};
export default Newsletter;
