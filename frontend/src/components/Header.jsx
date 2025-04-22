import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import Modal from "react-modal";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    logout();
    toast.success("👋 Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="p-3 header">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row flex-wrap align-items-center justify-content-between">
          {/* Logo and Navigation */}
          <div className="d-flex flex-column flex-sm-row align-items-center">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-sm-0 text-white text-decoration-none"
            >
              <h4 className="m-0">SilentPost</h4>
            </a>

            <ul className="nav ms-sm-4 mb-2 mb-sm-0">
              <li>
                <button className="nav-link btn btn-link text-white" onClick={openModal}>
                  Features
                </button>
              </li>
              <li>
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={() => navigate("/about")}
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="text-end mt-2 mt-sm-0">
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Features Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>✨ Features of Our Social Media - SilentPost🤐🤫</h2>
        <ul>
          <li>💬 See Anonymous Posts</li>
          <li>🔓🔑 No login required to view posts</li>
          <li>📜 Create Posts With or Without Photo</li>
          <li>❤️ React to Posts</li>
          <li>📤 SignUp & Login to Create and React</li>
          <li>👤 View Profile</li>
          <li>🔒 Secure Login and Authentication</li>
        </ul>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </header>
  );
};

export default Header;
