import React, { useState } from "react";
import { Link } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  fontSize: "15px",
  outline: "none",
  marginTop: "6px",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "18px",
          padding: "40px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 16px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #1abc9c, #3498db)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              color: "#fff",
            }}
          >
            ♻️
          </div>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #1abc9c, #3498db)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back
          </h2>
          <p style={{ color: "#64748b" }}>Sign in to continue</p>
        </div>

        <form>
          <label style={{ fontWeight: "600", color: "#64748b" }}>
            Email
          </label>
          <input
            type="email"
            style={inputStyle}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={{ fontWeight: "600", color: "#64748b", marginTop: "16px", display: "block" }}>
            Password
          </label>
          <input
            type="password"
            style={inputStyle}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "14px",
              background: "linear-gradient(135deg, #1abc9c, #3498db)",
              border: "none",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#64748b",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#1abc9c",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
