import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
import BackToTop from './components/Backtop/Backtop';
import ContactButton from './components/ContactButton/ContactButton';
import Contact from './page/Contact/Contact';
import New from './page/News/New';
import Customer from './page/Account/Customer/Customer';
import Cart from './components/Cart/Cart';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import HTXB from './page/HTXB/HTXB';
import Book from './page/Book/Book';
import BookDetailPage from './page/Book/BookDetail';
import Event from './page/News/Event';
import EventDetail from './page/News/EventDetail';

import NewsDetail from './page/News/NewsDetail';

import EventLayout from './page/News/EventLayout';


function AppContent() {
  const location = useLocation();

  const headerExclusionPaths = ['/home', '/', '/htxb'];

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
        <Route path="/htxb" element={<HTXB />} />
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

        <Route path="/news/detail/:id" element={<NewsDetail />} />
        

        <Route path="/event" element={<EventLayout />}>
          <Route index element={<Event />} />
          <Route path=":id" element={<EventDetail />} />
        </Route>
        <Route path="/customer" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book" element={<Book />}/>
        <Route path="/book/:category" element={<Book />} />
        <Route path="/book/detail/:id" element={<BookDetailPage />} />
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