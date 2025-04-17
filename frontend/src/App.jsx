import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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

// Store
import PostListProvider from "./store/post-list-store";

// Protected Route
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
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("user");
    return storedLoginStatus === "true" && storedUser ? true : false;
  });

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    console.log("🔍 LocalStorage on App Start:");
    console.log("isLoggedIn:", localStorage.getItem("isLoggedIn"));
    console.log("user:", localStorage.getItem("user"));

    // If inconsistency detected, reset login state
    if (localStorage.getItem("isLoggedIn") === "true" && !localStorage.getItem("user")) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <PostListProvider>
        <div className="app-container">
          <Sidebar isLoggedIn={isLoggedIn} />
          <div className="content">
            <Header
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
            />

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
                    <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
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
