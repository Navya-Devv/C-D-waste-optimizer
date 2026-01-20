import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(15, 32, 39, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(26, 188, 156, 0.2);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #1abc9c, #3498db);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          font-size: 22px;
        }

        .logo-text {
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #1abc9c, #3498db);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links {
          display: flex;
          gap: 14px;
        }

        .nav-link {
  padding: 10px 18px;
  border-radius: 10px;
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent;
}

        .nav-link:hover {
  color: #ffffff;
  background: rgba(26, 188, 156, 0.18);
  box-shadow: 0 0 15px rgba(26, 188, 156, 0.45);
  transform: translateY(-2px);
}

        .nav-link.active {
          background: rgba(26, 188, 156, 0.25);
          color: #1abc9c;
          font-weight: 600;
        }

        .auth-buttons {
          display: flex;
          gap: 10px;
        }

        .btn-login,
        .btn-signup {
          padding: 10px 18px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
        }

        .btn-login {
          color: #e5e7eb;
        }

        .btn-signup {
          background: linear-gradient(135deg, #1abc9c, #3498db);
          color: white;
        }

        .btn-signup:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-container">

          {/* Logo */}
          <NavLink to="/" className="logo">
            <div className="logo-icon">♻️</div>
            <span className="logo-text">EcoBuild</span>
          </NavLink>

          {/* Navigation */}
          <div className="nav-links">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/" className="nav-link">
              Materials
            </NavLink>
            <NavLink to="/dataset" className="nav-link">
              Dataset
            </NavLink>
          </div>

          {/* Auth */}
          <div className="auth-buttons">
            <NavLink to="/Login" className="btn-login">
              Login
            </NavLink>
            <NavLink to="/Signup" className="btn-signup">
              Sign Up
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
