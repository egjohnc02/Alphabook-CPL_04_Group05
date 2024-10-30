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
import Dichvu from './page/Footer/dich-vu/dichvu';
import Hoptackinhdoanh from './page/Footer/hop-tac-kinh-doanh/hoptackinhdoanh';
import ChinhSachThanhToan from './page/Footer/chinh-sach-thanh-toan/chinhsachthanhtoan';
import ChinhSachVanChuyen from './page/Footer/chinh-sach-van-chuyen/chinhsachvanchuyen';
import Chinhsachbaomat from './page/Footer/chinh-sach-bao-mat/chinhsachbaomat';
import ChinhSachHoanTraTien from './page/Footer/chinh-sach-doi-tra-hoan-tien/chinhsachhoantratien';
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
        <Route path="/dich-vu" element={<Dichvu />} />
        <Route path="/hop-tac-kinh-doanh" element={<Hoptackinhdoanh />} />
        <Route path="/chinh-sach-thanh-toan" element={<ChinhSachThanhToan />} />
        <Route path="/chinh-sach-van-chuyen" element={<ChinhSachVanChuyen />} />
        <Route path="/chinh-sach-bao-mat" element={<Chinhsachbaomat />} />
        <Route path="/chinh-sach-doi-tra-hoan-tien" element={<ChinhSachHoanTraTien />} />
      </Routes>
      <Footer />
    </Router>
  );
}