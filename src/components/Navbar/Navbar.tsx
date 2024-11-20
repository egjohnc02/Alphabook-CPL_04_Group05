import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import './Navbar.css'
import React from 'react';
import { useEffect } from 'react';

const Navbar: React.FC = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole === "admin";

  useEffect(() => {
    const updatedUserRole = localStorage.getItem("userRole");
    if (updatedUserRole !== userRole) {
    }
  }, [userRole]);
  return (
    <div className="bg-white sticky-top border-bottom container-fluid">
      <div className='d-flex align-items-center justify-content-between py-3 bg-white container'>
        <Link to='/home'>
          <img src={logo} alt="logo" style={{ width: '270px' }} />
        </Link>

          <div className="d-flex gap-3">
            <Link to='/home' className='text-decoration-none text-dark fw-medium'>
              <nav className='hover-text-orange bg-white'>Trang chủ</nav>
            </Link>

            <Link to='/introduce' className='text-decoration-none text-dark fw-medium'>
              <nav className='hover-text-orange bg-white'>Về Alpha Books</nav>
            </Link>
            
            <div className='dropdown position-relative d-inline-block'>
              <Link to='/book' className='text-dark'>
                <button className="dropbtn border-0 bg-white fw-medium hover-text-orange bg-ligh">Tủ sách 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg>
                </button>
              </Link>
              <div className="dropdown-content position-absolute bg-white z-1 p-3">
                <Link to='/category/harvard-business-review' className='text-decoration-none text-dark d-block'>
                  <p className='hover-text-orange'>Harvard Business Review</p>
                </Link>
                <Link to='/category/alpha-lead' className='text-decoration-none text-dark d-block'>
                  <p className='hover-text-orange'>Alpha Lead</p>
                </Link>
                <Link to='/category/quan-tri-doanh-nghiep' className='text-decoration-none text-dark d-block'>
                  <p className='hover-text-orange'>Quản trị doanh nghiệp</p>
                </Link>
                <Link to='/category/tai-chinh' className='text-decoration-none text-dark d-block'>
                  <p className='hover-text-orange'>Tài chính - Đầu tư - Chứng khoán</p>
                </Link>
                <Link to='/category/cong-nghe-chuyen-doi-so' className='text-decoration-none text-dark d-block'>
                  <p className='hover-text-orange'>Công nghệ & Chuyển đổi số</p>
                </Link>
                <Link to='/category/marketing' className='text-decoration-none text-dark d-block'>
                  <p className='hover-text-orange'>Marketing & Bán hàng</p>
                </Link>
                <Link to='/category/ky-nang' className='text-decoration-none text-dark d-block'>
                  <p className='hover-text-orange'>Kỹ năng</p>
                </Link>
              </div>
            </div>

            <Link to='/htxb' className='text-decoration-none text-dark fw-medium'>
              <nav className='hover-text-orange bg-white'>Dịch vụ HTXB</nav>
            </Link>

            <div className='dropdown position-relative d-inline-block'>
              <Link to='/news' className='text-dark'>
                <button className="dropbtn border-0 bg-white fw-medium hover-text-orange">Tin tức - Sự kiện 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg>
                </button>
              </Link>
              <div className="dropdown-content position-absolute bg-white z-1 p-3">
                <Link to='/news' className='text-decoration-none text-dark d-block'>
                  <p className='hover-text-orange'>Tin tức</p>
                </Link>
                <Link to='/event' className='text-decoration-none text-dark d-block'>
                  <p className='hover-text-orange'>Sự kiện</p>
                </Link>
              </div>
            </div>
            
            <Link to='/contact' className='text-decoration-none text-dark fw-medium'>
              <nav className='hover-text-orange bg-white'>Liên hệ</nav>
            </Link>
          </div>
        <div className='d-flex'>
          <Link to='/search' className='text-decoration-none text-dark fw-medium'>
            <div className='border-end border-black border-1 pe-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </div>
          </Link>

          {isLoggedIn ? (
            <Link to={isAdmin ? '/admin' : '/customer'} className='text-decoration-none text-dark fw-medium'>
              <div className='border-end border-black border-1 px-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              </div>
            </Link>
          ) : (
            <Link to='/login' className='text-decoration-none text-dark fw-medium'>
              <div className='border-end border-black border-1 px-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              </div>
            </Link>
          )}

          <Link to={isLoggedIn ? '/cart': '/login'} className='text-decoration-none text-dark fw-medium'>
            <div className='ps-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;