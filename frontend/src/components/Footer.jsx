import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/tagline.png";

const Footer = () => {
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <footer className="py-3 my-4">
      {/* Navigation links */}
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-body-secondary">Home</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-body-secondary">Features</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-body-secondary">About</a>
        </li>
      </ul>

      {/* Logo */}
      <div className="text-center">
        <img src={logo} alt="SilentPost Logo" className="taglinelogo" />
      </div>

      {/* Logged-in user info */}
      <div className="text-center mt-3">
        {user ? (
          <p className="text-muted">Logged in as: <strong>{user.name}</strong></p>
        ) : (
          <p className="text-muted">Not logged in</p>
        )}
      </div>

      {/* Go to Profile Button */}
      {user && (
        <div className="text-center mt-2">
          <button
            onClick={() => navigate("/profile")}
            className="btn btn-outline-secondary btn-sm"
          >
            Go to Profile
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
