// Header.jsx
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import Sidebar from "./Sidebar";
import Modal from "react-modal";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    toast.success("👋 Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="bg-[rgba(34,34,34,0.85)] text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button className="text-2xl" onClick={toggleSidebar}>
            ☰
          </button>
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            SilentPost
          </h1>
        </div>

        {/* Right: Auth */}
        <div className="flex gap-3 items-center">
          {isLoggedIn ? (
            <button
              className="border border-white px-4 py-1 rounded hover:bg-white hover:text-gray-900 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="border border-white px-4 py-1 rounded hover:bg-white hover:text-gray-900 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300 transition"
                onClick={() => navigate("/signup")}
              >
                Sign-up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sidebar now handles About & Features */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onFeaturesClick={openModal}
      />

      {/* Features Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Features Modal"
        className="bg-white p-6 rounded-lg w-[90%] max-w-md mx-auto mt-20 text-gray-800"
        overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">✨ Features of SilentPost 🤐🤫</h2>
        <ul className="list-disc pl-5 space-y-2 text-left">
          <li>💬 See Anonymous Posts</li>
          <li>🔓 No login required to view posts</li>
          <li>📜 Create Posts With or Without Photo</li>
          <li>❤️ React to Posts</li>
          <li>📤 SignUp & Login to Create and React</li>
          <li>👤 View Profile</li>
          <li>🔒 Secure Authentication</li>
        </ul>
        <button
          onClick={closeModal}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Close
        </button>
      </Modal>
    </header>
  );
};

export default Header;
