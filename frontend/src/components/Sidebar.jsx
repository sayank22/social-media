// Sidebar.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen, toggleSidebar, onFeaturesClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  const handleCreatePostClick = () => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: "/createpost", showLoginMessage: true }
      });
    } else {
      navigate("/createpost");
    }
    toggleSidebar?.();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn d-md-none" onClick={toggleSidebar}>✕</button>
      <img src={logo} alt="SilentPost Logo" className="logo" />
      <hr />
      <ul className="nav nav-pills flex-column mb-auto text-white space-y-4 mt-4 px-4">
        <li onClick={() => { navigate("/"); toggleSidebar?.(); }}>
          <span className={`nav-link ${isActive("/") ? "active" : ""}`}>🏠 Home</span>
        </li>

        <li onClick={handleCreatePostClick}>
          <span className={`nav-link ${isActive("/createpost") ? "active" : ""}`}>✍️ Create Post</span>
        </li>

        <li onClick={() => { onFeaturesClick(); toggleSidebar?.(); }}>
          <span className="nav-link">✨ Features</span>
        </li>

        <li onClick={() => { navigate("/about"); toggleSidebar?.(); }}>
          <span className={`nav-link ${isActive("/about") ? "active" : ""}`}>ℹ️ About</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
