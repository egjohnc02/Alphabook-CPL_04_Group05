import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHeader from './components/NavbarHeader';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Home from './page/Home'
import Register from './page/Register';
import Introduce from './page/Introduce';
import Header from './components/Header';
import BackToTop from './components/Backtop';
import ContactButton from './components/ContactButton';

export default function App() {
  return (
    <Router>
      <NavbarHeader />
      <Header />
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
    </Router>
  );
}