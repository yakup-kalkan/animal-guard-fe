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
    title: "",
    salutation: "Herr", // Default to "Herr"
    birthPlace: "",
    birthDate: "",
    address: {
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
    },
    email: "",
    phone: "",
    password: "",
    role: "user", // Default role set to 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      // Handle nested address fields
      const addressField = name.split(".")[1];
      setFormState((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(formState);
      if (response?.success) {
        toaster.success(
          `Welcome, ${formState.firstName}! Your role is ${formState.role}.`
        );
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
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          <select name="salutation" required onChange={handleChange}>
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
          </select>
          <input
            type="text"
            name="birthPlace"
            placeholder="Birth Place"
            onChange={handleChange}
          />
          <input type="date" name="birthDate" onChange={handleChange} />

          <h3>Address</h3>
          <input
            type="text"
            name="address.street"
            placeholder="Street"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address.houseNumber"
            placeholder="House Number"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address.postalCode"
            placeholder="Postal Code"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address.city"
            placeholder="City"
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
