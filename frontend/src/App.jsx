import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./AppRoutes"; // ✅ Import routes here

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
     
      <div className="content">
        <Header />
        <AppRoutes />
        <Footer />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
