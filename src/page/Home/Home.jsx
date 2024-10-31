import AutoScrollToTop from "../../utils/AutoScrollToTop"
import slider2 from '../../assets/home/slider_2.webp';
import slider3 from '../../assets/home/slider_3.webp';
import slider4 from '../../assets/home/slider_4.webp';
import slider5 from '../../assets/home/slider_5.webp';
import aboutImg from '../../assets/home/about_image.webp';
import aboutTitle from '../../assets/home/about_title.webp';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";

export default function Home(){
    AutoScrollToTop()

    return (
        <div>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <Link to='/'>
                        <img src={slider2} className="w-100 object-fit-cover" style={{ height: '500px' }}/>
                    </Link>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img src={slider3} className="w-100 object-fit-cover" style={{ height: '500px' }}/>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <Link to='/service'>
                        <img src={slider4} className="w-100 object-fit-cover" style={{ height: '500px' }}/>
                    </Link>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img src={slider5} className="w-100 object-fit-cover" style={{ height: '500px' }}/>
                </Carousel.Item>
            </Carousel>

            <div className="d-flex justify-content-center align-items-center px-5 gap-5 mx-5">
                <Link to='/introduce'>
                    <img src={aboutImg} alt="about_image" />
                </Link>
                <div>
                    <img src={aboutTitle} alt="about_title" />
                    <h3 className="py-2 text-success">Công ty Cổ phần Sách Alpha (Alpha Books)</h3>
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

            <div className="text-center">
                <h3>Top 100 Sản phẩm bán chạy</h3>
            </div>
        </div>
    )
}