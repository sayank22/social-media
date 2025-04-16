import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar" style={{ width: "220px" }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi pe-none me-2" width="25" height="25" aria-hidden="true"><use xlinkHref="#bootstrap"></use></svg>
        <span className="fs-4">Sidebar</span>
      </a>
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
