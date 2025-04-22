import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import logo from "../assets/tagline.png";

const Footer = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext); // ✅ get from context

  return (
    <footer className="py-3 my-4">
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

      <div className="text-center">
        <img src={logo} alt="SilentPost Logo" className="taglinelogo" />
      </div>

      <div className="text-center mt-3">
        {isLoggedIn ? (
          <p className="text-muted">Logged in as: <strong>{user?.name}</strong></p>
        ) : (
          <p className="text-muted">Not logged in</p>
        )}
      </div>

      {isLoggedIn && (
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
