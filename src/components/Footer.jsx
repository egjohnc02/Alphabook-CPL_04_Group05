import logo from '../assets/footer/logo_footer.webp'
import logoBct from '../assets/footer/logo_bct.webp'
import { Link } from 'react-router-dom';


export default function Footer(){
    return (
        <div className='bg-orange text-light mt-5 footer'>
            <div className='container d-flex py-3 gap-3 justify-content-between'>
                <div className='w-25'>
                    <Link to={"/home"}>
                        <img src={logo} alt="logo" style={{width:'250px'}}/>
                    </Link>
                    <div className='mt-3'>
                        <q className='fst-italic'>Chúng tôi không bán sách, chúng tôi bán kiến thức quản trị vượt trội của các tập đoàn hàng đầu.</q>
                        <p className='fst-italic'>Công ty Cổ phần Sách Alpha</p>
                        <p className='fst-italic'>MST: 0101602138</p>
                        <p className='fst-italic'>Ngày cấp: 27/01/2005</p>
                        <p className='fst-italic'>Nơi cấp: Phòng ĐKKD - Sở Kế Hoạch & Đầu Tư Thành Phố Hà Nội</p>
                        <form action="" className='pt-2'>
                            <p className='fw-bold'>Đăng ký nhận khuyến mãi</p>
                            <input type="email" name="" id="" className='border rounded-2 p-2' placeholder='Địa chỉ email'/>
                            <button className='text-light bg-black btn p-2'>Gửi</button>
                        </form>
                    </div>
                </div>

                <div className='w-25 pt-3 d-flex flex-column gap-3'>
                    <p className='fw-bold fs-5'>THÔNG TIN</p>

                    <Link to="introduce" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Giới thiệu</span></nav>
                    </Link>
                    <Link to="/hethongnhasach" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Hệ thống nhà sách</span></nav>
                    </Link>
                    <Link to="/hethongphathanh" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Hệ thống phát hành</span></nav>
                    </Link>
                    <Link to="/a" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Tuyển dụng</span></nav>
                    </Link>
                    <Link to="/dichvu" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Hợp tác xuất bản</span></nav>
                    </Link>
                    <Link to="/hoptackinhdoanh" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Hợp tác kinh doanh</span></nav>
                    </Link>
                    <Link to="/a" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Tích điểm đổi quà</span></nav>
                    </Link>
                </div>
                
                <div className='w-25 pt-3 d-flex flex-column gap-3'>
                    <p className='fw-bold  fs-5'>CHÍNH SÁCH</p>

                    <Link to="/chinhsachthanhtoan" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Chính sách thanh toán</span></nav>
                    </Link>
                    <Link to="/chinhsachvanchuyen" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Chính sách vận chuyển</span></nav>
                    </Link>
                    <Link to="/chinhsachbaomat" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Chính sách bảo mật</span></nav>
                    </Link>
                    <Link to="/chinhsachdoitrahoantien" className='text-decoration-none text-light'>
                        <nav>&gt; <span>Chính sách đổi trả hoàn tiền</span></nav>
                    </Link>
                </div>

                <div className='w-25 py-3'>
                    <p className='fw-bold fs-5'>LIÊN HỆ</p>
                    <div className='d-flex gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" className="bi bi-geo-alt-fill border border-light p-1 rounded-circle border-2 p-1" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                        </svg>
                        <p><span>Tầng 3, Dream Home Center, 11a ngõ 282 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội</span></p>
                    </div>

                    <div className='d-flex gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-telephone-fill border border-light p-1 rounded-circle border-2 p-1" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                        </svg>
                        <p><a href='tel:0932 329 959' className='text-light link-underline link-underline-opacity-0 fs-3 fw-bold'><span>0932 329 959</span></a></p>
                    </div>

                    <div className='d-flex gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-envelope-fill border border-light p-1 rounded-circle border-2 p-1" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                        </svg>
                        <p><a href="mailto:mkt.alphabooks@gmail.com" className='text-light link-underline link-underline-opacity-0'><span>mkt.alphabooks@gmail.com</span></a></p>
                    </div>

                </div>
            </div>

            <div className="text-center bg-dark text-light py-3">
                <p>© Bản quyền thuộc về Alpha Books | Cung cấp bởi Sapo</p>
                <a href="http://online.gov.vn/Home/WebDetails/45929" target='_blank'>
                    <img src={logoBct} alt="logo" style={{width:'160px'}}/>
                </a>
            </div>
        </div>
    )
}