import { useNavigate } from "react-router-dom";
import logo from '../assets/tagline.png';

const Footer = () => {
  const navigate = useNavigate
  return (
    <footer className="py-3 my-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
    </ul> 
  <img src={logo} alt="SilentPost Logo" className="taglinelogo" />
  </footer>
  );
};
export default Footer;