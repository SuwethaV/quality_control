import React, { useState } from "react";
import axios from "axios"; // Import axios

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password validation
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Toggle between login and registration forms
  const handleToggle = () => {
    setIsRegistering(!isRegistering);
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success messages
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate all fields
    if (!email || !password || !role) {
      setError("All fields are required.");
      return;
    }

    // Validate password during registration
    if (isRegistering && !validatePassword(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    // API endpoint
    const endpoint = isRegistering ? "http://localhost:5000/register" : "http://localhost:5000/login";
    const payload = { email, password, role };

    try {
      // Send API request using axios
      const response = await axios.post(endpoint, payload);

      if (response.status === 201 || response.status === 200) {
        if (isRegistering) {
          setSuccess("Registration successful! Redirecting to login...");
          setIsRegistering(false); // Switch to login page
        } else {
          setSuccess("Login successful!");
        }
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        setError(err.response.data.message || "An error occurred.");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff3e0",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#ff9800" }}>
          {isRegistering ? "Register" : "Login"}
        </h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", textAlign: "center" }}>{success}</p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Role Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            >
              <option value="Student">Student</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Problem Solving Team">Problem Solving Team</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#ff9800",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          {isRegistering ? "Already have an account? " : "New user? "}
          <span
            onClick={handleToggle}
            style={{ color: "#ff9800", cursor: "pointer", fontWeight: "bold" }}
          >
            {isRegistering ? "Login here" : "Register here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;