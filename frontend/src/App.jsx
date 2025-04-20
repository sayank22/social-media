import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorBoundary from "./ErrorBoundary";
import RequireAuth from "./components/RequireAuth";

// Store
import PostListProvider from "./store/post-list-store";
import AuthProvider from "./store/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostListProvider>
          <div className="app-container">
            <Sidebar />
            <div className="content">
              <Header />

              <Routes>
                <Route path="/" element={<PostList />} />

                <Route
                  path="/createpost"
                  element={
                    <RequireAuth>
                      <CreatePost />
                    </RequireAuth>
                  }
                />

                <Route
                  path="/login"
                  element={
                    <ErrorBoundary>
                      <Login />
                    </ErrorBoundary>
                  }
                />

                <Route
                  path="/signup"
                  element={
                    <ErrorBoundary>
                      <Signup />
                    </ErrorBoundary>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              <Footer />
            </div>
          </div>
        </PostListProvider>
      </AuthProvider>

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
