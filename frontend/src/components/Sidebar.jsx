import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import logo from "../assets/logo.png";

const Sidebar = () => {
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
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar"
      style={{ width: "220px" }}
    >
      <header>
        <img src={logo} alt="SilentPost Logo" className="logo" />
      </header>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item" onClick={() => navigate("/home")}>
          <span
            role="button"
            className={`nav-link text-white ${
              location.pathname === "/home" ? "active" : ""
            }`}
          >
            Home
          </span>
        </li>
        <li onClick={handleCreatePostClick}>
          <span
            role="button"
            className={`nav-link text-white ${
              location.pathname === "/createpost" ? "active" : ""
            }`}
          >
            Create Post
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
