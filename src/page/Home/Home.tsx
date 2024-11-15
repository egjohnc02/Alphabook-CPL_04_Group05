import AutoScrollToTop from "../../utils/AutoScrollToTop"
import slider2 from '../../assets/home/slider_2.webp';
import slider3 from '../../assets/home/slider_3.webp';
import slider4 from '../../assets/home/slider_4.webp';
import slider5 from '../../assets/home/slider_5.webp';
import aboutImg from '../../assets/home/about_image.webp';
import aboutTitle from '../../assets/home/about_title.webp';
import banner1 from '../../assets/home/banner_1.webp';
import banner2 from '../../assets/home/banner_2.webp';
import serviceBg from '../../assets/home/service_bg.webp';
import icoSv1 from '../../assets/home/ico_sv1.webp';
import icoSv2 from '../../assets/home/ico_sv2.webp';
import icoSv3 from '../../assets/home/ico_sv3.webp';
import dot2 from '../../assets/home/dot_2.svg';
import customer1 from '../../assets/home/customer_1_ava.webp'
import customer2 from '../../assets/home/customer_2_ava.webp'
import customer3 from '../../assets/home/customer_3_ava.webp'
import customer4 from '../../assets/home/customer_4_ava.webp'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import './Home.css'

const Home: React.FC = () => {
    AutoScrollToTop();

    return (
        <div>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <Link to='/'>
                        <img src={slider2} className="w-100 object-fit-cover" style={{ height: '500px' }} alt="Slider 2" />
                    </Link>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img src={slider3} className="w-100 object-fit-cover" style={{ height: '500px' }} alt="Slider 3" />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <Link to='/htxb'>
                        <img src={slider4} className="w-100 object-fit-cover" style={{ height: '500px' }} alt="Slider 4" />
                    </Link>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img src={slider5} className="w-100 object-fit-cover" style={{ height: '500px' }} alt="Slider 5" />
                </Carousel.Item>
            </Carousel>


            <div className="d-flex justify-content-center align-items-center px-5 gap-5 mx-5 container">
                <Link to='/introduce'>
                    <img src={aboutImg} alt="About" />
                </Link>
                <div>
                    <img src={aboutTitle} alt="About Title" />
                    <h3 className="py-2 text-success fw-bold">Công ty Cổ phần Sách Alpha (Alpha Books)</h3>
                    <p>Alpha Books được biết đến là một trong những thương hiệu hàng đầu về dòng sách quản trị kinh doanh,
                        phát triển kỹ năng, tài chính, đầu tư… với các cuốn sách hướng dẫn khởi nghiệp, các bài học,
                        phương pháp và kinh nghiệm quản trị của các chuyên gia, và các tập đoàn nổi tiếng trên thế giới.
                        Sau 18 năm hình thành và phát triển, Alpha Books đã từng bước khẳng định tên tuổi của mình,
                        đặc biệt đối với các thế hệ doanh nhân, nhà quản lý và những người trẻ luôn khát khao xây dựng sự nghiệp thành công.</p>
                    <Link to='/introduce'>
                        <button className="bg-orange text-white p-3 px-5 my-3 border-0 rounded-5">XEM THÊM --{">"}</button>
                    </Link>
                </div>
            </div>

            <div className="text-center mt-4 bg-warning bg-opacity-10 p-5">
                <Link to='/' className="text-decoration-none text-dark hover-text-orange">
                    <h3 className="fw-bold">Top Sản phẩm bán chạy</h3>
                </Link>
                <q className="text-danger">No data</q>
            </div>

            <div className="d-flex justify-content-center align-items-center my-5 gap-4">
                <Link to="/">
                    <img src={banner1} alt="Banner 1" />
                </Link>
                <a href="#sachMoiPhatHanh">
                    <img src={banner2} alt="Banner 2" />
                </a>
            </div>

            <div className="my-5 text-center" id="sachMoiPhatHanh">
                <Link to='/' className="text-decoration-none text-dark hover-text-orange">
                    <h3 className="bg-title fw-bold">Sách mới phát hành</h3>
                </Link>
                <q className="text-danger">No data</q>
            </div>

            <div className="my-5 text-center bg-warning bg-opacity-10 py-5">
                <Link to='/' className="text-decoration-none text-dark hover-text-orange">
                    <h3 className="bg-title fw-bold">Sách dành cho bạn</h3>
                </Link>
                <q className="text-danger">No data</q>
            </div>
            <div className="my-5 text-center">
                <h3 className="bg-title fw-bold">TỦ SÁCH</h3>
                <div className="col">
                    <div className="d-flex justify-content-center gap-2">
                        <button className="text-opacity-10 fw-semibold hover-text-orange hover-border-orange p-2 rounded-pill border-0">Harvard Business Review</button>
                        <button className="text-opacity-10 fw-semibold hover-text-orange hover-border-orange p-2 rounded-pill border-0">Quản trị doanh nghiệp</button>
                        <button className="text-opacity-10 fw-semibold hover-text-orange hover-border-orange p-2 rounded-pill border-0">Alpha Lead</button>
                        <button className="text-opacity-10 fw-semibold hover-text-orange hover-border-orange p-2 rounded-pill border-0">Tài chính - Đầu tư - Chứng khoán</button>
                        <button className="text-opacity-10 fw-semibold hover-text-orange hover-border-orange p-2 rounded-pill border-0">Công nghệ & Chuyển đổi số</button>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                        <button className="text-opacity-10 fw-semibold hover-text-orange hover-border-orange p-2 rounded-pill border-0">Marketing & Bán hàng</button>
                        <button className="text-opacity-10 fw-semibold hover-text-orange hover-border-orange p-2 rounded-pill border-0">Kỹ năng</button>
                    </div>
                </div>
                <div className="my-3">
                    <q className="text-danger">No data</q>
                </div>
                <Link to='/category/harvard-business-review'>
                    <button className="bg-orange text-light p-3 px-4 border-0 rounded-pill">Xem tất cả</button>
                </Link>
            </div>
            <div className="text-light my-5 p-5" style={{ background: `URL(${serviceBg})` }}>
                <div className="d-flex gap-3">
                    <div className="w-25">
                        <h3 className="fw-bold fs-2 text-uppercase">dịch vụ</h3>
                        <h3 className="fw-bold fs-2 text-uppercase">tại alpha books</h3>
                        <br />
                        <p>Trong hành trình 18 năm đồng hành với cộng đồng, chúng tôi thấy nhu cầu ngày càng tăng của doanh nghiệp,
                            các nhà quản lý muốn tiếp cận nhanh hơn đến tri thức quản trị cũng
                            như mong muốn phát triển doanh nghiệp của mình thành một tổ chức học tập.
                            Vì thế, Alpha Books ra mắt một trung tâm mới: <span className="fw-semibold">Trung tâm Tư vấn & Hợp tác xuất bản (BIZONE)</span> gồm 3 dịch vụ chính</p>
                        <Link to='/dichvu'>
                            <button className="bg-orange text-light p-3 px-4 border-0 rounded-pill">Xem Thêm</button>
                        </Link>
                    </div>
                    <div className="w-75" style={{ background: `url(${dot2}) no-repeat 90% 90%` }}>
                        <div className="d-flex">
                            <div className="image-container mx-3 w-25">
                                <img src={icoSv1} alt="Service 1" className="rounded-4 w-100 zoom-effect" />
                            </div>
                            <div className="image-container mx-3 w-25">
                                <img src={icoSv2} alt="Service 2" className="rounded-4 w-100 zoom-effect" />
                            </div>
                            <div className="image-container mx-3 w-25">
                                <img src={icoSv3} alt="Service 3" className="rounded-4 w-100 zoom-effect" />
                            </div>
                        </div>
                        <div className="border-bottom border-2 border-light mt-5"></div>
                    </div>
                </div>
            </div>
            <div className="my-5 container">
                <h3 className="fw-bold text-center bg-title">Chuyên gia đánh giá về Alpha Books</h3>
                <div className="container">
                    <Carousel interval={3000} className="testimonial-carousel mx-5 py-5 overflow-hidden" style={{ height: '380px' }}>
                        <Carousel.Item>
                            <div className="d-flex justify-content-center gap-5">
                                <div className="d-flex gap-3 justify-content-center w-50">
                                    <img src={customer1} alt="Customer 1" className="rounded-circle border-5 border-orange align-self-start object-fit-cover" style={{ width: '150px', height: '150px' }} />
                                    <div className="w-100">
                                        <div className="content rounded-4 p-3 mb-3">
                                            <q>Alpha Books là một trong những nhà tiên phong phá vỡ sự bế tắc và nhàm chán trong ngành xuất bản.
                                                Làn gió mới của công nghệ mua bán bản quyền tác phẩm in đã thổi tới Việt Nam và mở ra cơ hội lớn cho các tác giả
                                                cũng như ngành xuất bản và văn hoá đọc nói chung.</q>
                                        </div>
                                        <p><strong className="text-orange">Ông Lê Quốc Vinh,</strong> Chủ tịch HĐQT kiêm TGĐ Le Invest (Holdings) Corporation</p>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 justify-content-center w-50">
                                    <img src={customer2} alt="Customer 2" className="rounded-circle border-5 border-orange align-self-start object-fit-cover" style={{ width: '150px', height: '150px' }} />
                                    <div className="w-100">
                                        <div className="content rounded-4 p-3 mb-3">
                                            <q>Đường dài mới biết ngựa hay. Thành Roma không chỉ được xây trong một ngày.
                                                Tôi nghĩ đến những câu này khi đánh giá về những nỗ lực của Alpha Books trên con đường quảng bá
                                                sách kinh doanh nói riêng và sự tăng tiến về mặt tri thức cho độc giả Việt Nam trên nhiều lĩnh vực nói chung.
                                                Cập nhật, tiên phong, đáng tin cậy, thiết thực và đẹp là những từ ngắn gọn nói về sách của Alpha Books.</q>
                                        </div>
                                        <p><strong className="text-orange">Ông Lê Quốc Vinh,</strong> Chủ tịch HĐQT kiêm TGĐ Le Invest (Holdings) Corporation</p>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className="d-flex justify-content-center gap-5">
                                <div className="d-flex gap-3 justify-content-center w-50">
                                    <img src={customer3} alt="Customer 3" className="rounded-circle border-5 border-orange align-self-start object-fit-cover" style={{ width: '150px', height: '150px' }} />
                                    <div className="w-100">
                                        <div className="content rounded-4 p-3 mb-3">
                                            <q>Tôi đã gắn bó với Alpha Books hơn 15 năm, từ những ngày đầu tiên.
                                                Đối với tôi, Alpha Books không chỉ là một thương hiệu trong ngành xuất bản sách,
                                                mà là một người bạn đồng hành đầy trí tuệ, thân thiết và sẻ chia.
                                                Alpha Books trong tôi là người bạn soi đường về TRI THỨC KINH DOANH,
                                                là cầu nối truyền tải những tri thức quản trị tinh hoa và cập nhật nhất của thế giới,
                                                góp phần nâng cao doanh trí Việt.</q>
                                        </div>
                                        <p><strong className="text-orange">Ông Lê Quốc Vinh,</strong> Chủ tịch HĐQT kiêm TGĐ Le Invest (Holdings) Corporation</p>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 justify-content-center w-50">
                                    <img src={customer4} alt="Customer 4" className="rounded-circle border-5 border-orange align-self-start object-fit-cover" style={{ width: '150px', height: '150px' }} />
                                    <div className="w-100">
                                        <div className="content rounded-4 p-3 mb-3">
                                            <q>Alpha là sự hội tụ của:
                                                <ol>
                                                    <li>Active: luôn tích cực và không ngừng vận động.</li>
                                                    <li>Learn to grow: học hỏi để phát triển mỗi ngày.</li>
                                                    <li>Professional: Chuyên nghiệp trong công việc.</li>
                                                    <li>Hard work: chăm chỉ và kiên nhẫn.</li>
                                                    <li>Amazing mission: sứ mệnh tuyệt vời.</li>
                                                </ol>
                                            </q>
                                        </div>
                                        <p><strong className="text-orange">Ông Lê Quốc Vinh,</strong> Chủ tịch HĐQT kiêm TGĐ Le Invest (Holdings) Corporation</p>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
            <div className="container d-flex justify-content-center mb-5 gap-5">
                <div className="w-50 container">
                    <Link to='/news' className="text-decoration-none">
                        <h3 className="fw-bold text-center bg-title hover-text-orange text-dark">TIN TỨC</h3>
                    </Link>
                    <Carousel interval={3000} className="testimonial-carousel py-3"></Carousel>
                </div>

                <div className="w-50 container">
                    <Link to='/news' className="text-decoration-none">
                        <h3 className="fw-bold text-center bg-title hover-text-orange text-dark">SỰ KIỆN</h3>
                    </Link>
                    <Carousel interval={3000} className="testimonial-carousel py-3"></Carousel>
                </div>
            </div>
        </div>
    )
}

export default Home;