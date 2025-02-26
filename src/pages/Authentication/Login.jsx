import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToasterContext } from "../../context/ToasterContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { toaster } = useContext(ToasterContext);
  const [formState, setFormState] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formState);
    if (success) {
      toaster.success("Login successful!");
    } else {
      toaster.error("Invalid email or password.");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2>
          Login to <span>ANImAl gUard</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
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
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
