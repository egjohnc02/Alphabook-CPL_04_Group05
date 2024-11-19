import { Link, useLocation, useParams } from 'react-router-dom';
import bgLogin from '../../assets/header/bg_header.webp';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.tsx'; // Đảm bảo rằng firebaseConfig đã được cấu hình đúng
import { doc, getDoc } from 'firebase/firestore';


const Header: React.FC = () => {
    const location = useLocation();
    const { id } = useParams(); // Lấy id sách từ URL (nếu có)
    const [bookTitle, setBookTitle] = useState<string>('');

    useEffect(() => {
        // Chỉ truy vấn sách khi có id
        if (id) {
            const fetchBookName = async () => {
                const bookRef = doc(db, 'Books', id);
                const bookDoc = await getDoc(bookRef);

                if (bookDoc.exists()) {
                    setBookTitle(bookDoc.data()?.title || 'Tên sách không có');
                } else {
                    setBookTitle('Sách không tìm thấy');
                }
            };

            fetchBookName();
        }
    }, [id]);

    let pageName = '';
    if (location.pathname.includes('/event/')) {
        pageName = 'Sự kiện';
    }
    else
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
        case '/news':
            pageName = 'Tin tức';
            break;
        // case `${location.pathname}`:
        //         pageName = 'Content News';
        //             break;
        case '/event':
            pageName = 'Sự Kiện';
            break;
          
        case '/customer':
            pageName = 'Trang khách hàng';
            break;

        case '/cart':
            pageName = 'Giỏ hàng';
            break;

        case '/book':
            pageName = 'Tất cả sản phẩm';
            break;
        case '/book/detail':
            pageName = 'Chi tiết sách';
            break;

        default:
            pageName = 'Trang không tồn tại';
    }

    return (
        <div style={{ paddingBottom: '50px' }}>
            <div className="position-relative text-center">
                <img
                    src={bgLogin}
                    alt="Example"
                    className="img-fluid"
                    style={{ maxWidth: '100%' }}
                />
                <div className="position-absolute top-50 start-50  translate-middle">
                    <nav>
                        <Link to="/home" className='text-decoration-none '>
                            <span>Trang chủ</span>
                        </Link>
                            {/* Nếu đang ở sự kiện, thêm liên kết Sự kiện */}
                    {location.pathname.includes('/event/') && (
                        <Link to="/event" className="text-decoration-none ms-3">
                            <span>Sự kiện</span>
                        </Link>
                    )}
                    </nav>
                    <h1 className="text-orange">
                        {pageName}
                        {/* Nếu đang ở trang chi tiết sách, hiển thị tên sách */}
                        {location.pathname.includes('/book/detail') && bookTitle && (
                            <span>: {bookTitle}</span>
                        )}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Header