import { Link, useLocation } from 'react-router-dom';
import bgLogin from '../assets/header/bg_header.webp';

export default function Header(){
    const location = useLocation();
    let pageName = '';
    switch (location.pathname) {
        case '/home':
            pageName = 'Trang chủ';
            break;
        case '/introduce':
            pageName = 'Giới thiệu';
            break;
        case '/login':
            pageName = 'Đăng nhập tài khoản';
            break;
        case '/register':
            pageName = 'Đăng ký tài khoản';
            break;
        case '/hethongnhasach':
            pageName = 'Hệ thống nhà sách';
            break;

        case '/hethongphathanh':
            pageName = 'Hệ Thống Phát Hành Miền Bắc';
            break;

        case '/dichvu':
            pageName = 'Dịch vụ';
            break;

        case '/hoptackinhdoanh':
            pageName = 'Hợp tác kinh doanh - Alpha Books';
            break;

        case '/chinhsachthanhtoan':
            pageName = 'Chính sách thanh toán';
            break;

        case '/ChinhSachVanChuyen':
            pageName = 'Chính sách vận chuyển';
            break;

        case '/chinhsachbaomat':
            pageName = 'Chính sách bảo mật';
            break;

        case '/chinhsachdoitrahoantien':
            pageName = 'CHÍNH SÁCH ĐỔI / TRẢ / HOÀN TIỀN';
            break;
            case '/contact':
                pageName = 'Liên hệ';
                break;

        default:
            pageName = 'Trang không tồn tại';
    }

    return (
        <div>
            <div className="position-relative text-center">
            <img
                src={bgLogin}
                alt="Example"
                className="img-fluid"
                style={{ maxwidth: '100%' }}
            />
            <div className="position-absolute top-50 start-50 translate-middle">
            <nav>
                <Link to="/home" className='text-decoration-none '>
                    <span>Trang chủ</span>
                </Link>
            </nav>
            <h1 className='text-orange'>{pageName}</h1>
        </div>
      </div>
    </div>
    )
}