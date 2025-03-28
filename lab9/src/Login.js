import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/validate_login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log(response.status);
      if (response.status === 200) {
        navigate("/predict");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          maxWidth: "400px",
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "1rem",
            fontSize: "1.25rem",
            fontWeight: "600",
          }}
        >
          <b>Login</b>
        </h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            />
          </label>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#007BFF",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              marginTop: "0.5rem",
              fontWeight: "600",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Login
          </button>
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.5rem",
              }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
