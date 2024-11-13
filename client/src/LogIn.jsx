import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./api/auth";

const LogIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      if (response.success) {
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        alert(response.message || "Invalid credentials");
      }
    } catch (error) {
      alert("Login failed", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form
        onSubmit={handleLogin}
        className="mx-auto"
        style={{ maxWidth: "400px" }}
      >
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <p className="text-center mt-3">
        Don’t have an account? <Link to="/register">Create new account</Link>
      </p>
    </div>
  );
};

export default LogIn;
