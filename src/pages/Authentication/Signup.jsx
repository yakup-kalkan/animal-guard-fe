import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToasterContext } from "../../context/ToasterContext";
import { Link } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const { toaster } = useContext(ToasterContext);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(formState);
      if (response?.success) {
        toaster.success(`Welcome, ${formState.firstName}!`);
      } else {
        toaster.error(response?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toaster.error("An unexpected error occurred.");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2>
          Sign Up for <span>Animal Guard</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button type="submit" className="btn-auth">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
