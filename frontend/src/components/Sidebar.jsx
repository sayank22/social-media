import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  const handleCreatePostClick = () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "/createpost");
      navigate("/login");
    } else {
      navigate("/createpost");
    }
    if (toggleSidebar) toggleSidebar(); // close after click on small screen
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>✕</button>
      <img src={logo} alt="SilentPost Logo" className="logo" />
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item" onClick={() => { navigate("/"); toggleSidebar(); }}>
          <span
            role="button"
            className={`nav-link text-white ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </span>
        </li>
        <li onClick={handleCreatePostClick}>
          <span
            role="button"
            className={`nav-link text-white ${location.pathname === "/createpost" ? "active" : ""}`}
          >
            Create Post
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
