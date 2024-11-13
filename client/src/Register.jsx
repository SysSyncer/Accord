import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./api/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ username, email, password });

      if (response.success) {
        alert("Registration successful! You can now log in.");
        navigate("/login");
      } else {
        alert(response.message || "Registration failed");
      }
    } catch (error) {
      alert("Registration failed", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleRegister} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;