import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHeader from './components/NavbarHeader';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Home from './page/Home'
import Register from './page/Register';
import Introduce from './page/Footer/gioi-thieu/gioithieu';
import Hethongnhasach from './page/Footer/he-thong-nha-sach/hethongnhasach';
import Hethongphathanh from './page/Footer/he-thong-phat-hanh/hethongphathanh';

export default function App() {
  return (
    <Router>
      <NavbarHeader />
      <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gioi-thieu" element={<Introduce />} />
        <Route path="/he-thong-nha-sach" element={<Hethongnhasach />} />
        <Route path="/he-thong-phat-hanh" element={<Hethongphathanh />} />
      </Routes>
      <Footer />
    </Router>
  );
}