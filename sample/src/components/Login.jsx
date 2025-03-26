import { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); // Change to boolean
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false); // Clear previous errors

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });

      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      onLogin(role); // Update role state in App.jsx
    } catch (err) {
      setError(true); // Set error state to true
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className={`container ${error ? "error-bg" : ""}`}>
      {" "}
      {/* Add error-bg class if error */}
      <div
        id="login-card"
        className="card shadow-lg rounded-4 text-center d-flex align-items-center"
      >
        <div style={{ margin: "auto" }}>
          <div id="login-text">
            <h1 style={{ fontWeight: "bold" }}>Quiz Master</h1>
            <h4 style={{ fontWeight: "bold" }}>Sign In</h4>
            {error && <p className="error">{errorMessage}</p>}
          </div>
          <form
            onSubmit={handleLogin}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control mb-3 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
            <button type="submit" className="mt-3 btn submit-btn">
              Login
            </button>
          </form>
          <div className="register-link">
            Don't have an account? <a href="/register">Register Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
