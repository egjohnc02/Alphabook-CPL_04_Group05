import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Đảm bảo bạn import đúng đường dẫn firebase của bạn
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./TopSelling.css"
interface Book {
    id: string;
    title: string;
    category: string;
    price: number;
    img: string;
    coupon: string;
}

const Home: React.FC = () => {
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

    // Chia sách thành các nhóm 5 phần tử
    const chunkArray = (array: Book[], chunkSize: number): Book[][] => {
        const result: Book[][] = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    const bookGroups = chunkArray(book, 5); // Chia book thành các nhóm có tối đa 5 sản phẩm

    const settings = {
        interval: 2000,  // Đặt thời gian chuyển slide
        controls: true,  // Hiển thị nút điều hướng trước và sau
        indicators: true, // Hiển thị dấu chấm chỉ dẫn
        slidesToShow: 1, // Hiển thị 1 sản phẩm mỗi lần
        slidesToScroll: 1, // Chỉ trượt 1 sản phẩm mỗi lần
    };

    return (
        <div className="text-center mt-4 bg-warning bg-opacity-10 p-5">
            <Link to="/" className="text-decoration-none text-dark hover-text-orange">
                <h3 className="fw-bold">Top Sản phẩm bán chạy</h3>
            </Link>
            <Carousel {...settings}>
                {bookGroups.map((group, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center" style={{ width: '100%', alignItems: 'center' }}>
                            {group.map((item) => (
                                <div key={item.id} className="flashsale__item" style={{ width: '15%', margin: '0 5px' }}>
                                    <div className="item_product_main">
                                        <form action="/cart/add" method="post" className="variants product-action wishItem" encType="multipart/form-data">
                                            <Link to={`/product/${item.id}`} className="image_thumb" title={item.title}>
                                                <img width="199" height="199" src={item.img} alt={item.title} className="lazyload img-responsive center-block loaded" />
                                            </Link>
                                            <div className="info-product">
                                                <h3 className="product-name">
                                                    <Link to={`/product/${item.id}`} title={item.title}>
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
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default Home;
