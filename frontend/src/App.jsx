import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import { SidebarComponent } from './components/SidebarComponent';
import AppRoutes from './AppRoutes'; // ✅ Import routes here

function App() {
  return (
    <div className="app-container">
      <SidebarComponent>
        <AppRoutes />
      </SidebarComponent>

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
