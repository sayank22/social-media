import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("👋 Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="p-3 text-bg-dark header">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <h4 className="m-0">SilentPost</h4>
            </a>

            <ul className="nav ms-4">
              <li>
                <button className="nav-link btn btn-link text-white" onClick={() => navigate("/facts")}>
                  Features
                </button>
              </li>
              <li>
                <button className="nav-link btn btn-link text-white" onClick={() => navigate("/about")}>
                  About
                </button>
              </li>
            </ul>
          </div>

          <div className="text-end">
            {isLoggedIn ? (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline-light me-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => navigate("/signup")}
                >
                  Sign-up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
