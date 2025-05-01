import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import ErrorBoundary from "./ErrorBoundary";

// Pages
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";

function AppRoutes() {
  return (
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

      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
