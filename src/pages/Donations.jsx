import React from "react";
import "../assets/css/pages/Donations.css";

const Donations = () => {
  return (
    <section className="donation-container">
      <h1>Support Our Mission</h1>
      <p>
        Your generous donation helps us rescue and care for animals in need.
      </p>

      <div className="donation-box">
        <h2>Bank Transfer Details</h2>
        <p>
          <strong>Bank Name:</strong> Animal Welfare Bank
        </p>
        <p>
          <strong>IBAN:</strong> DE12 3456 7890 1234 5678 90
        </p>
        <p>
          <strong>BIC:</strong> ANIMBICXXX
        </p>
        <p>
          <strong>Account Holder:</strong> Animal Rescue Organization
        </p>
        <p>Every contribution makes a difference!</p>
      </div>

      <button className="btn-donate">Donate Now</button>
    </section>
  );
};

export default Donations;
