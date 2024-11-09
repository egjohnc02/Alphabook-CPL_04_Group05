import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './page/Account/Login/Login';
import Home from './page/Home/Home';
import Register from './page/Account/Login/Register';
import Introduce from './page/Introduce';
import Header from './components/Header/Header';
import HeThongNhaSach from './page/Footer/he-thong-nha-sach/hethongnhasach';
import HeThongPhatHanh from './page/Footer/he-thong-phat-hanh/hethongphathanh';
import DichVu from './page/Footer/dich-vu/dichvu';
import HopTacKinhDoanh from './page/Footer/hop-tac-kinh-doanh/hoptackinhdoanh';
import ChinhSachThanhToan from './page/Footer/chinh-sach-thanh-toan/chinhsachthanhtoan';
import ChinhSachVanChuyen from './page/Footer/chinh-sach-van-chuyen/chinhsachvanchuyen';
import ChinhSachBaoMat from './page/Footer/chinh-sach-bao-mat/chinhsachbaomat';
import ChinhSachDoiTraHoanTien from './page/Footer/chinh-sach-doi-tra-hoan-tien/chinhsachhoantratien';
import Service from './page/HTXB/Service';
import BackToTop from './components/Backtop/Backtop';
import ContactButton from './components/ContactButton/ContactButton';
import Contact from './page/Contact/Contact';
import New from './page/News/New';
import Customer from './page/Account/Customer/Customer';
import Cart from './components/Cart/Cart';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function AppContent() {
  const location = useLocation();

  // Define routes where the Header should not be displayed
  const headerExclusionPaths = ['/home', '/', '/service'];

  return (
    <>
      <Navbar />
      {!headerExclusionPaths.includes(location.pathname) && <Header />}

      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/service" element={<Service />} />
        <Route path="/hethongnhasach" element={<HeThongNhaSach />} />
        <Route path="/hethongphathanh" element={<HeThongPhatHanh />} />
        <Route path="/dichvu" element={<DichVu />} />
        <Route path="/hoptackinhdoanh" element={<HopTacKinhDoanh />} />
        <Route path="/chinhsachthanhtoan" element={<ChinhSachThanhToan />} />
        <Route path="/chinhsachvanchuyen" element={<ChinhSachVanChuyen />} />
        <Route path="/chinhsachbaomat" element={<ChinhSachBaoMat />} />
        <Route path="/chinhsachdoitrahoantien" element={<ChinhSachDoiTraHoanTien />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<New />} />
        <Route path="/customer" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <BackToTop />
      <ContactButton />
      <Footer />
    </>
  );
}

export default function App(): JSX.Element {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}