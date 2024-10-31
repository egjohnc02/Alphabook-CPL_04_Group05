import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHeader from './components/NavbarHeader';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './page/Login';
import Home from './page/Home'
import Register from './page/Register';
import Introduce from './page/Introduce';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import HeThongNhaSach from './page/Footer/he-thong-nha-sach/hethongnhasach'
import HeThongPhatHanh from './page/Footer/he-thong-phat-hanh/hethongphathanh'
import DichVu from './page/Footer/dich-vu/dichvu'
import HopTacKinhDoanh from './page/Footer/hop-tac-kinh-doanh/hoptackinhdoanh'
import ChinhSachThanhToan from './page/Footer/chinh-sach-thanh-toan/chinhsachthanhtoan'
import ChinhSachVanChuyen from './page/Footer/chinh-sach-van-chuyen/chinhsachvanchuyen'
import ChinhSachBaoMat from './page/Footer/chinh-sach-bao-mat/chinhsachbaomat'
import ChinhSachDoiTraHoanTien from './page/Footer/chinh-sach-doi-tra-hoan-tien/chinhsachhoantratien'


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
        <Route path="/hethongnhasach" element={<HeThongNhaSach />} />
        <Route path="/hethongphathanh" element={<HeThongPhatHanh />} />
        <Route path="/dichvu" element={<DichVu />} />
        <Route path="/hoptackinhdoanh" element={<HopTacKinhDoanh />} />
        <Route path="/chinhsachthanhtoan" element={<ChinhSachThanhToan />} />
        <Route path="/chinhsachvanchuyen" element={<ChinhSachVanChuyen />} />
        <Route path="/chinhsachbaomat" element={<ChinhSachBaoMat />} />
        <Route path="/chinhsachdoitrahoantien" element={<ChinhSachDoiTraHoanTien />} />
      </Routes>
      <Footer />
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