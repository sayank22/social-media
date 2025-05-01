import RedirectWithState from "./RedirectWithState";
import { useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return (
      <RedirectWithState
        to="/login"
        state={{ from: location.pathname, showLoginMessage: true }}
      />
    );
  }

  return children;
}

export default RequireAuth;
