import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import { useState, useEffect } from "react";
import PostListProvider from './store/post-list-store';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Wrapper to protect routes
const RequireAuth = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    toast.warn("Please login to create a post ✋");
    localStorage.setItem("redirectAfterLogin", "/createpost");
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // ✅ Debug localStorage on app start
  useEffect(() => {
    console.log("🔍 LocalStorage on App Start:");
    console.log("isLoggedIn:", localStorage.getItem("isLoggedIn"));
    console.log("user:", localStorage.getItem("user"));
  }, []);

  return (
    <BrowserRouter>
      <PostListProvider>
        <div className="app-container">
          <Sidebar />
          <div className="content">
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
                    <Login setIsLoggedIn={setIsLoggedIn} />
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

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
