import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';

const Sidebar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreatePostClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/createpost");
    }
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar" style={{ width: "220px" }}>
      <header>
      <img src={logo} alt="SilentPost Logo" className="logo" />
    </header>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item" onClick={() => navigate("/home")}>
          <span
            role="button"
            className={`nav-link text-white ${location.pathname === "/home" ? "active" : ""}`}
          >
            <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlinkHref="#home"></use></svg>
            Home
          </span>
        </li>
        <li onClick={() => navigate("/createpost")}>
          <span
            role="button"
            className={`nav-link text-white ${location.pathname === "/createpost" ? "active" : ""}`}
          >
            <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlinkHref="#speedometer2"></use></svg>
            Create Post
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
