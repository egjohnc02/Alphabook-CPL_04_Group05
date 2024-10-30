import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHeader from './components/NavbarHeader';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './page/Login/Login'
import Home from './page/home/Home';
import Register from './page/Login/Register'
import Introduce from './page/Introduce/Introduce';
import Header from './components/Header';
import BackToTop from './components/Backtop';
import ContactButton from './components/ContactButton';

function AppContent() {
  const location = useLocation();

  return (
    <>
      <NavbarHeader />
      {location.pathname !== '/home' && location.pathname !== '/' && <Header />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/introduce" element={<Introduce />} />
      </Routes>
      <Footer />
      <ContactButton />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
