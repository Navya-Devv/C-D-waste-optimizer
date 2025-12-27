import React from "react";

export default function Signup() {
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
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "10px",
            background: "linear-gradient(135deg, #1abc9c, #3498db)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Create Account
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "24px",
          }}
        >
          Join EcoBuild and start building sustainably
        </p>

        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email Address"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
        />

        <button
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            background: "linear-gradient(135deg, #1abc9c, #3498db)",
            boxShadow: "0 6px 20px rgba(26, 188, 156, 0.4)",
          }}
        >
          Create Account
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          Already have an account?{" "}
          <span style={{ color: "#1abc9c", cursor: "pointer" }}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "14px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  fontSize: "15px",
  outline: "none",
};
