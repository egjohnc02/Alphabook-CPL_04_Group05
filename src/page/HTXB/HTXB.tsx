import React, { useState } from "react";
import bgHeader from '../../assets/HTXB/trung-tam-tu-van-hop-tac-xuat-ban-03-1-2-20221013014017-o03o7.jpg'
import ifUR1 from "../../assets/HTXB/neu-ban-la-1.gif";
import ifUR2 from "../../assets/HTXB/neu-ban-la-2.gif";
import ifUR3 from "../../assets/HTXB/neu-ban-la-3.gif";
import logo from "../../assets/footer/logo_footer.webp"
import reasonByBook from "../../assets/HTXB/reason-buy-book.jpg"
import tuVan2 from "../../assets/HTXB/tu-van-2.png"
import book1 from "../../assets/HTXB/Books/book1.jpg"
import book2 from "../../assets/HTXB/Books/book2.jpg"
import book3 from "../../assets/HTXB/Books/book3.jpg"
import nxbtg1 from "../../assets/HTXB/NXB the gioi/pic1.jpg"
import nxbtg2 from "../../assets/HTXB/NXB the gioi/pic2.jpg"
import nxbtg3 from "../../assets/HTXB/NXB the gioi/pic3.jpg"
import nxbct1 from "../../assets/HTXB/NXB Cong Thuong/nxbct1.png"
import nxbct2 from "../../assets/HTXB/NXB Cong Thuong/nxbct2.png"
import nxbct3 from "../../assets/HTXB/NXB Cong Thuong/nxbct3.jpg"
import tll from '../../assets/HTXB/doi tac/logo-thang-long.png';
import vpl from '../../assets/HTXB/doi tac/logo-vpbak.png';
import tnl from '../../assets/HTXB/doi tac/tnl.png';
import vl from '../../assets/HTXB/doi tac/logo-vincom.png';
import camSach from '../../assets/HTXB/cam-sach.png'
import './HTXB.css'
import AutoScrollToTop from "../../utils/AutoScrollToTop";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const HTXB = ()=> {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
      });
      const [error, setError] = useState("");
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, phone, service } = formData;
        if (!name || !email || !phone || !service) {
          setError("Vui lòng điền đầy đủ thông tin!");
          return;
        }
    
        try {
          const htxbRef = collection(db, "htxb");
          await addDoc(htxbRef, {
            name,
            email,
            phone,
            service,
            timestamp: new Date(),
          });
          setError("");
          alert("Thông tin của bạn đã được gửi thành công!");
          setFormData({ name: "", email: "", phone: "", service: "" });
        } catch (err) {
          console.error("Error saving registration:", err);
          setError("Đã xảy ra lỗi, vui lòng thử lại.");
        }
    }
        
    return(
        <>
            <AutoScrollToTop />
            <header>
                <div className="position-relative">
                    <img src={bgHeader} alt="trung-tam-tu-van-hop-tac-xuat-ban" className="w-100 h-auto"/>
                    <nav className="d-flex gap-3 position-absolute" style={{top:'40px', right:'70px'}}>
                        <a href="#content1" className="fw-bolder bg-white text-orange nav-link bg-orange rounded-pill px-4 py-2">Giới thiệu</a>
                        <a href="#content2" className="fw-bolder bg-white text-orange nav-link bg-orange rounded-pill px-4 py-2">Tư vấn sách</a>
                        <a href="#content3" className="fw-bolder bg-white text-orange nav-link bg-orange rounded-pill px-4 py-2">Phát triển tủ sách</a>
                        <a href="#content4" className="fw-bolder bg-white text-orange nav-link bg-orange rounded-pill px-4 py-2">Giải pháp xuất bản</a>
                    </nav>
                    <a href="#dangKy" className="position-absolute rounded-4 px-4 py-2 fw-bolder nav-link text-white bg-primary fs-3 Regular shadow animation-x" style={{bottom:'40px', right:'100px'}}>Đăng ký ngay</a>
                </div>
            </header>

            <div className="container my-3 py-3">
                <h2 className="fw-bold text-center">NẾU BẠN LÀ ...</h2>
                <div className="d-flex gap-5 justify-content-center align-items-center container mt-3">
                    <div className="w-25 d-flex flex-column justify-content-center gap-3">
                        <img src={ifUR1} alt="neu-ban-la-1" className="Regular shadow rounded-circle"/>
                        <p>Cá nhân, doanh nghiệp <strong className="text-orange">tìm kiếm cuốn sách cần thiết</strong> 
                            cho nhân sự và doanh nghiệp
                        </p>
                    </div>

                    <div className="w-25 d-flex flex-column justify-content-center gap-3">
                        <img src={ifUR2} alt="neu-ban-la-2" className="Regular shadow rounded-circle"/>
                        <p>Doanh nghiệp cần tư vấn <strong className="text-orange">triển khai thư viện doanh nghiệp</strong>, 
                            không gian học tập, phát triển tổ chức học tập
                        </p>
                    </div>

                    <div className="w-25 d-flex flex-column justify-content-center gap-3">
                        <img src={ifUR3} alt="neu-ban-la-3" className="Regular shadow rounded-circle"/>
                        <p>Cá nhân, doanh nghiệp muốn <strong className="text-orange">hợp tác xuất bản</strong> 
                            ấn phẩm cho bản thân và doanh nghiệp, sổ tay kinh nghiệm, kiến thức, cẩm nang và các tài liệu đào tạo nội bộ
                        </p>
                    </div>
                </div>

                <h2 className="fw-bold text-center">... THÌ ĐÂY CHÍNH LÀ 
                    <br />
                    GIẢI PHÁP <span className="bg-orange">TƯ VẤN & XUẤT BẢN TOÀN DIỆN</span>
                    <br />
                    DÀNH CHO MỌI CÁ NHÂN, TỔ CHỨC, DOANH NGHIỆP, HIỆP HỘI
                </h2>
            </div>

            <div className="py-3" id="content4"></div>
            <div className="container my-3" >
                <h2 className="fw-bold text-center pt-5">TRIỂN KHAI DỊCH VỤ HỢP TÁC XUẤT BẢN</h2>
                <div className="border-bottom border-danger pt-1 border-2 w-25 mx-auto"></div>
            
                <div className="d-flex py-3 justify-content-center gap-1 position-relative">
                    <div className="">
                        <h1 className="fw-bold text-orange fs-1 position-absolute" style={{left:430, top:5}}>18</h1>
                        <nav className="fw-bold position-absolute" style={{left:440, bottom:30}}>năm</nav>
                    </div>
                    
                    <p className="w-25 fw-bolder">UY TÍN, CHUYÊN NGHIỆP, MINH BẠCH VÀ GIÀU KINH NGHIỆM</p>
                </div>

                <div className="d-flex gap-5 justify-content-center container mx-5 px-5">
                    <div className="d-flex flex-column gap-3 w-50">
                        <div className="shadow p-2">
                            <p className="fs-4 fw-bold text-orange text-uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-circle mx-2 text-primary" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                </svg>
                                dịch vụ sản xuất đa dạng
                            </p>
                            <ul className='list-style-down'>
                                <li className="aa">Mua bản quyền (đối với sách nước ngoài)</li>
                                <li>Chấp bút (hồi ký, tự truyện, sổ tay doanh nghiệp,...)</li>
                                <li>Biên tập, biên dịch bản thảo.</li>
                                <li>Dàn trang, thiết kế bìa, vẽ minh họa.</li>
                            </ul>
                        </div>
                        
                        <div className="shadow p-2">
                            <p className="fs-4 fw-bold text-orange text-uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-circle mx-2 text-primary" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                </svg>
                                sản xuất các ấn phẩm số
                            </p>
                            <ul className='list-style-down'>
                                <li>Ebook: Sản phẩm sách thời đại mới, có thể truy cập và đọc trực tiếp trên các thiết bị thông minh với nhiều định dạng theo nhu cầu</li>
                                <li>Audio book: Cuốn sách của bạn được chuyển sang định dạng âm thanh, thông qua giọng người đọc hoặc công nghệ trí tuệ nhân tạo AI, có thể tiếp cận rộng rãi trên đa phương tiện.</li>
                                <li>Media service: Sản xuất highlight video, TVC quảng cáo, các khóa học trực tuyến (E-learning).</li>
                            </ul>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-3 w-50">
                        <div className="shadow p-2">
                            <p className="fs-4 fw-bold text-orange text-uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-circle mx-2 text-primary" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                </svg>
                                Đăng ký giấy phép xuất bản
                            </p>
                            <ul className='list-style-down'>
                                <li>Đàm phán bản quyền sách in, quyền sử dụng một số phần trong sách (sách dịch).</li>
                                <li>Kí kết hợp đồng bản quyền.</li>
                            </ul>
                        </div>
                        
                        <div className="shadow p-2">
                            <p className="fs-4 fw-bold text-orange text-uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-circle mx-2 text-primary" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                </svg>
                                Marketing, Truyền thông
                            </p>
                            <ul className='list-style-down'>
                                <li>Cung cấp các gói quảng cáo, ra mắt sách theo nhu cầu.</li>
                                <li>Tổ chức sự kiện ra mắt sách.</li>
                                <li>Xây dựng các gói quà tặng kèm.</li>
                            </ul>
                        </div>

                        <div className="shadow p-2">
                            <p className="fs-4 fw-bold text-orange text-uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-circle mx-2 text-primary" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                </svg>
                                phân phối, bán hàng
                            </p>
                            <ul className='list-style-down'>
                                <li>Tư vấn, xây dựng gói bán hàng phù hợp.</li>
                                <li>Đem đến giải pháp phân phối đa dạng trên các kênh online, offline.</li>
                                <li>Hỗ trợ lưu kho, giảm thiểu chi phí.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="m-3 p-4" id="content1"></div>
            <div className="bg-orange text-white mt-3 p-5">
                <div className="d-flex align-items-center justify-content-center container">
                    <div className="d-flex flex-column align-items-center container gap-4 w-50">
                        <img src={logo} alt="logo" className="w-50"/>
                        <div className="d-flex">
                            <div className="d-flex flex-column align-items-center fw-bolder text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                                <nav className="fs-2">311</nav>
                                <nav>Đối tác cá nhân</nav>
                            </div>
                            
                            <div className="d-flex flex-column align-items-center fw-bolder text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-buildings-fill" viewBox="0 0 16 16">
                                    <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z"/>
                                </svg>
                                <nav className="fs-2">924</nav>
                                <nav className="w-75">Đối tác doanh nghiệp, tổ chức</nav>
                            </div>

                            <div className="d-flex flex-column align-items-center fw-bolder text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                                </svg>
                                <nav className="fs-2">300+</nav>
                                <nav className="w-75">Đầu sách đa dạng lĩnh vực</nav>
                            </div>
                        </div>
                    </div>
                    <p className="container border-white p-2 mb-2 border-opacity-50 border border-top-0 border-end-0 fs-5">
                        <strong>Trung tâm Tư vấn & Hợp tác xuất bản Alpha Books</strong> là một đơn vị cung cấp tất cả dịch vụ tư vấn 
                        & xuất bản chuyên nghiệp cho các cá nhân & doanh nghiệp. Trải qua 18 năm kinh nghiệm trong ngành xuất bản, 
                        chúng tôi nắm trong tay những hiểu biết toàn diện, kinh nghiệm sâu rộng, 
                        dịch vụ chuyên nghiệp và tinh gọn để đáp ứng nhu cầu tư vấn lựa chọn sách và xuất bản trọn gói, 
                        hay thậm chí là tùy chọn từng khâu, dựa trên nhu cầu cụ thể của khách hàng.
                    </p>
                </div>
            </div>

            <div className="bg-orange pt-5" id="content2">
                <div className="bg-light w-50">
                    <div className="container p-5 w-75 position-relative">
                        <h2 className="fw-bold">TƯ VẤN, CUNG CẤP SÁCH VÀ TÀI LIỆU ĐÀO TẠO</h2>
                        <p>Alpha Books tư vấn những cuốn sách phù hợp với nhu cầu & chuyên môn của nhân 
                            sự để bổ sung thêm kiến thức và giải đáp cho những vấn đề trong công việc kinh doanh.
                        </p>
                        <h4 className="fw-bolder">Lý do bạn không nên bỏ qua dịch vụ này</h4>
                            <p className="list-group-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-journals mx-2" viewBox="0 0 16 16">
                                    <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/>
                                    <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/>
                                </svg>
                                Đa dạng lựa chọn với các cuốn sách chất lượng
                            </p>

                            <p className="list-group-item fs-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-c-circle mx-2" viewBox="0 0 16 16">
                                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512"/>
                                </svg>
                                Cam kết không sách giả, sách lậu
                            </p>

                            <p className="list-group-item fs-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-check-fill mx-2" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                                Đội ngũ chuyên gia cố vấn nhiều kinh nghiệm
                            </p>


                            <p className="list-group-item fs-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-stopwatch mx-2" viewBox="0 0 16 16">
                                    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z"/>
                                    <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"/>
                                </svg>
                                Tiết kiệm thời gian tìm kiếm
                            </p>

                            <p className="list-group-item fs-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart-fill mx-2" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg>
                                Chính sách ưu đãi đặc biệt
                            </p>

                            <p className="list-group-item fs-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-receipt mx-2" viewBox="0 0 16 16">
                                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z"/>
                                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/>
                                </svg>
                                Hỗ trợ xuất hoá đơn khi mua hàng
                            </p>
                        <img 
                            src={reasonByBook} 
                            alt="reasonByBook" 
                            className="position-absolute"
                            style={{
                                top:50,
                                height:450,
                                left:600,
                            }}    
                        />
                    </div>
                </div>
            </div>

            <div className="container p-5 m-5" id="content3">
                <div className="container d-flex gap-3 p-5">
                    <img src={tuVan2} alt="tu van" className="w-50 h-50"/>
                    <div className="text-end container me-5 pe-5">
                        <h2 className="fw-bold text-orange">TƯ VẤN PHÁT TRIỂN, VẬN HÀNH MÔ HÌNH TỔ CHỨC HỌC TẬP</h2>
                        <p className="fs-5 fw-light">Kiến tạo không gian văn hóa đọc & xây dựng thói quen đọc sách tại tổ chức góp phần xây dựng 
                            văn hóa học tập trong bối cảnh thế giới đa phương tiện.
                        </p>

                        <div className="d-flex gap-4 text-center">
                            <div className="d-flex flex-column w-50 justify-content-center align-items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-journals mx-2" viewBox="0 0 16 16">
                                    <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/>
                                    <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/>
                                </svg>
                                <p className="fw-bold">Lựa chọn các đầu sách phù hợp với nhu cầu</p>
                            </div>

                            <div className="d-flex flex-column w-50 justify-content-center align-items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                                    <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                                </svg>
                                <p className="fw-bold">Thiết kế không gian đọc sách với tiêu chí Sáng tạo & Thuận tiện</p>
                            </div>

                            <div className="d-flex flex-column w-50 justify-content-center align-items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-building-fill-gear" viewBox="0 0 16 16">
                                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-3.59 1.787A.5.5 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.5 4.5 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                    <path d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                </svg>
                                <p className="fw-bold">Triển khai phương pháp xây dựng văn hoá đọc trong DN</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container d-flex gap-2 p-5 flex-row-reverse">
                    <div id="carouselExample" className="carousel slide w-50">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={book1} className="d-block w-100" alt="book 1"/>
                            </div>
                            <div className="carousel-item">
                                <img src={book2} className="d-block w-100" alt="book 2"/>
                            </div>
                            <div className="carousel-item">
                                <img src={book3} className="d-block w-100" alt="book 3"/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    
                    <div className="container ms-5 pe-5 w-75">
                        <h2 className="fw-bold text-orange pb-4">DỰ ÁN NỔI BẬT</h2>
                        <p className="fs-5 fw-light">Với hàng trăm dự án <strong className="fw-bold">chuyên nghiệp, đa dạng </strong> 
                            nội dung cho các cá nhân, tổ chức, doanh nghiệp... Hợp tác xuất bản Alpha Books tự tin mang đến 
                            <strong className="fw-bold"> dịch vụ toàn diện nhất</strong> cho cuốn sách của bạn!
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <h2 className="fw-bold text-center">ĐỐI TÁC XUẤT BẢN TIÊU BIỂU</h2>
                <div className="d-flex gap-2 container justify-content-center">
                    <div className="d-flex flex-column justify-content-center align-items-center w-50 gap-4">
                        <h4 className="fw-bold text-orange">NXB Thế Giới</h4>
                        <div id="nxbtg" className="carousel slide w-50">
                            <div className="carousel-inner" style={{height: '500px'}}>
                                <div className="carousel-item active">
                                <img src={nxbtg1} className="d-block w-100 pb-2" alt="..." />
                                <p style={{ overflowY: "auto", maxHeight: "calc(100% - 200px)" }}>
                                    <strong className="text-primary">Nhà xuất bản Thế Giới </strong> 
                                    là đơn vị xuất bản trực thuộc Bộ Văn hóa, Thể thao và Du lịch, 
                                    chịu trách nhiệm xuất bản, in ấn và phát hành các ấn phẩm 
                                    bằng tiếng nước ngoài, song ngữ hoặc tiếng Việt để phục vụ công tác thông tin đối 
                                    ngoại của Việt Nam; giao lưu, hợp tác giữa Việt Nam với các nước trên thế giới.
                                </p>
                                </div>
                                <div className="carousel-item">
                                    <img src={nxbtg2} className="d-block w-100 pb-2" alt="..." />
                                    <ul style={{ overflowY: "auto", maxHeight: "calc(100% - 200px)" }}>
                                        <li>Huân chương <strong className="text-primary">Lao động hạng Nhất</strong> năm 1982</li>
                                        <li>Huân chương <strong className="text-primary">Độc lập hạng Ba</strong> năm 1997</li>
                                        <li>Huân chương <strong className="text-primary">Độc lập hạng Nhì</strong> năm 2002</li>
                                    </ul>
                                </div>
                                <div className="carousel-item">
                                    <img src={nxbtg3} className="d-block w-100 pb-2" alt="..." />
                                    <ul style={{ overflowY: "auto", maxHeight: "calc(100% - 200px)" }}>
                                        <li><strong className="text-primary">Giải A sách hay</strong> nhiều năm liên tiếp của giải thưởng Sách Quốc gia</li>
                                        <li><strong className="text-primary">Giải Ba</strong> Giải thưởng toàn quốc về thông tin đối ngoại</li>
                                        <li><strong className="text-primary">Giải Bạc sách đẹp</strong> nhiều năm liên tiếp của Giải thưởng Sách Quốc gia</li>
                                    </ul>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#nxbtg" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#nxbtg" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center w-50 gap-4">
                        <h4 className="fw-bold text-orange">NXB Công Thương</h4>
                        <div id="nxbct" className="carousel slide w-50">
                            <div className="carousel-inner" style={{height: '500px'}}>
                                <div className="carousel-item active">
                                <img src={nxbct1} className="d-block w-100 pb-2" alt="..." />
                                <p style={{ overflowY: "auto", maxHeight: "calc(100% - 200px)" }}>
                                    <strong className="text-primary">Nhà xuất bản Công Thương</strong> trực thuộc Bộ Công Thương, 
                                    có chức năng xuất bản các ấn phẩm tuyên truyền, phổ biến pháp luật về lĩnh vực 
                                    <strong className="text-primary"> công nghiệp và thương mại; kinh tế, hội nhập kinh tế quốc tế...</strong>
                                    <br />
                                    mục tiêu trở thành một trong những nhà xuất bản hàng đầu trong lĩnh vực kinh tế, 
                                    thương mại và là đối tác chiến lược của các đơn vị xuất bản.
                                </p>
                                </div>
                                <div className="carousel-item">
                                    <img src={nxbct2} className="d-block w-100 pb-2" alt="..." />
                                    <p style={{ overflowY: "auto", maxHeight: "calc(100% - 200px)" }}>
                                        <strong className="text-primary">Dòng sách thế mạnh của NXB Công Thương</strong>
                                        <br />
                                        Sách Hội nhập kinh tế quốc tế.
                                        <br />
                                        Sách giới thiệu tiềm năng kinh tế của các địa phương trong nước và nước ngoài.
                                        <br />
                                        Sách nghiên cứu tìm hiểu pháp luật; tuyên truyền giới thiệu về các tổ chức, hiệp ước kinh tế, thương mại...
                                    </p>
                                </div>
                                <div className="carousel-item">
                                    <img src={nxbct3} className="d-block w-100 pb-2" alt="..." />
                                    <p style={{ overflowY: "auto", maxHeight: "calc(100% - 200px)" }}>
                                        Nhà xuất bản Công Thương và Công ty Cổ phần sách Alpha đã ký kết hợp tác ra mắt
                                        <q><strong className="text-primary">Tủ sách hội nhập kinh tế quốc tế</strong></q> 
                                        với hơn 100 xuất bản phẩm. 
                                        Tủ sách cung cấp các kiến thức đa dạng trong các lĩnh vực với các nhóm chủ đề như: 
                                        <strong className="text-primary">chính sách pháp luật, lãnh đạo và quản lý, marketing và bán hàng, 
                                        khởi nghiệp, nền kinh tế 4.0…</strong>
                                    </p>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#nxbct" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#nxbct" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center doi-tac position-relative text-white">
                <div className="py-5 doi-tac-child">
                    <h2 className="fw-bold">CÙNG NHIỀU ĐỐI TÁC CHIẾN LƯỢC KHÁC</h2>
                    <p className="fs-5">
                        Chúng tôi là đối tác tin cậy của nhiều Doanh nghiệp/Tổ chức uy tín như Mobifone, Samsung, VP Bank, 
                        Trung Nguyên Legend, Hoàng Thành Thăng Long, Japan Foudation...
                    </p>
                    <div className="d-flex gap-5 w-50 justify-content-center mx-auto">
                        <img src={tll} alt="" className="bg-white rounded-circle w-25 p-3"/>
                        <img src={vpl} alt="" className="bg-white rounded-circle w-25 p-3"/>
                        <img src={tnl} alt="" className="bg-white rounded-circle w-25 align-self-center py-5"/>
                        <img src={vl} alt="" className="bg-white rounded-circle w-25 p-3"/>
                    </div>
                </div>
            </div>
            
            <div className="bg-orange d-flex align-items-center justify-content-center pt-5" id="dangKy">
                <img src={camSach} alt="..."/>
                <div className="rounded bg-white p-2 w-50">
                    <h2 className="text-orange text-center">ĐĂNG KÍ NGAY HÔM NAY
                    <br />ĐỂ NHẬN ĐƯỢC GÓI ƯU ĐÃI!</h2>
                    <form onSubmit={handleSubmit} className="container m-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Họ và tên"
                            className="border-orange w-100 rounded-4 my-2 p-1"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="border-orange rounded-4 mb-2 p-1 w-50"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="phone"
                            placeholder="Số điện thoại"
                            className="border-orange w-50 rounded-4 mb-2 p-1"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="service"
                            placeholder="Bạn muốn tư vấn dịch vụ nào của chúng tôi?"
                            className="border-orange w-100 rounded-4 mb-2 p-1"
                            style={{ height: 100 }}
                            value={formData.service}
                            onChange={handleInputChange}
                        />
                        {error && <p className="text-danger">{error}</p>}
                        <button type="submit" className="w-100 bg-orange text-white border-0 rounded-4 p-2">
                            GỬI THÔNG TIN
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default HTXB