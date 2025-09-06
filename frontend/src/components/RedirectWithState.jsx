import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RedirectWithState({ to, state }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(to, { state });
  }, [navigate, to, state]);

  return null;
}

export default RedirectWithState;
