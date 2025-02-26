import React from "react";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>Stay Updated!</h2>
      <p>Subscribe for the latest pet tips and updates.</p>
      <input type="email" placeholder="Enter your email" />
      <button className="btn">Subscribe</button>
    </section>
  );
};

const News = () => {
  return (
    <div>
      <Newsletter />
    </div>
  );
};

export default News;
