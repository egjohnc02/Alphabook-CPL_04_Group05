import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Đảm bảo bạn import đúng đường dẫn firebase của bạn
import Slider from 'react-slick'; // Import Slider từ react-slick
import { Link } from 'react-router-dom';
import "./TopSelling.css";

interface Book {
    id: string;
    title: string;
    category: string;
    price: number;
    img: string;
    coupon: string;
}

const TopSelling: React.FC = () => {
    const [book, setBook] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const bookCollection = collection(db, "Books");
            const bookQuery = query(bookCollection, where("quantity", "<=", 10));
            const bookSnapshot = await getDocs(bookQuery);
            const bookList = bookSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Book[];
            setBook(bookList);
        };
        fetchBooks();
    }, []);

    const sliderSettings = {
        centerMode: true,          // Cho phép chế độ center để sản phẩm ở giữa nổi bật
        dots: true,                // Hiển thị dấu chấm chỉ dẫn
        infinite: true,            // Cho phép trượt vô hạn
        speed: 500,                // Tốc độ trượt
        slidesToShow: 5,           // Hiển thị 5 sản phẩm mỗi lần
        slidesToScroll: 1,         // Chỉ trượt 1 sản phẩm mỗi lần
        autoplay: true,            // Tự động trượt
        autoplaySpeed: 2000,       // Tốc độ tự động trượt (2 giây)
        centerPadding: "0",        // Không có padding bên ngoài phần tử ở giữa
        focusOnSelect: true,       // Cho phép chọn sản phẩm khi nhấn vào
        responsive: [
            {
                breakpoint: 1024, // Độ rộng màn hình tối thiểu là 1024px
                settings: {
                    slidesToShow: 3,  // Hiển thị 3 sản phẩm trên màn hình rộng
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768, // Độ rộng màn hình tối thiểu là 768px
                settings: {
                    slidesToShow: 1,  // Hiển thị 1 sản phẩm trên màn hình nhỏ
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className="text-center mt-4 bg-warning bg-opacity-10 p-5" >
            <Link to="/" className="text-decoration-none text-dark hover-text-orange">
                <h3 className="fw-bold" style={{paddingBottom:'40px'}}>Top Sản phẩm bán chạy</h3>
            </Link>
            <Slider {...sliderSettings}>
                {book.map((item) => (
                    <div key={item.id} className="d-flex justify-content-center">
                        <div className="flashsale__item" style={{ width: '60%', margin: '0 5px' }}>
                            <div className="item_product_main">
                                <form action="/cart/add" method="post" className="variants product-action wishItem" encType="multipart/form-data">
                                    <Link to={`/book/detail/${item.id}`} className="image_thumb" title={item.title}>
                                        <img width="199" height="199" src={item.img} alt={item.title} className="lazyload img-responsive center-block loaded" />
                                    </Link>
                                    <div className="info-product">
                                        <h3 className="product-name">
                                            <Link to={`/book/detail/${item.id}`} title={item.title}>
                                                {item.title}
                                            </Link>
                                        </h3>
                                        <div className="price-box">
                                            <span className="price">
                                                {(
                                                    item.coupon && typeof item.coupon === 'string' && item.coupon.includes('%')
                                                        ? item.price - (item.price * parseInt(item.coupon) / 100)
                                                        : item.price
                                                ).toLocaleString("vi-VN")}
                                                đ
                                            </span>

                                            <span className="compare-price">{item.price.toLocaleString("vi-VN")}đ</span>
                                        </div>
                                        <div className="flashsale__bottom">
                                            <div className="flashsale__label">⚡ Sắp hết hàng</div>
                                            <div className="flashsale___percent" style={{ width: '98%' }}></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TopSelling;
