import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../store/AuthContext";

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    toast.warn("Please login to create a post ✋");
    localStorage.setItem("redirectAfterLogin", "/createpost");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
