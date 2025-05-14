// Sidebar.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import logo from '../assets/logo.png';

const Sidebar = ({ isOpen, toggleSidebar, onFeaturesClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  const handleCreatePostClick = () => {
    if (!isLoggedIn) {
      navigate('/login', {
        state: { from: '/createpost', showLoginMessage: true },
      });
    } else {
      navigate('/createpost');
    }
    toggleSidebar?.();
  };

  const isActive = (path) => location.pathname === path;

  return <div></div>;
};

export default Sidebar;
