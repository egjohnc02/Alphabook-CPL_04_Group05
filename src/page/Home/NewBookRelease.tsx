import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Slider from 'react-slick'; // Import Slider từ react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewBookR.css"
interface Book {
    id: string;
    author: string;
    title: string;
    category: string;
    price: number;
    img: string;
    coupon: string;
}

interface BookDetail {
    id: string;
    coverType: string;
    dimensions: string;
    pageCount: string;
    publishDate: string;
    publisher: string;
}
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  // Bật chế độ tự động trượt
    autoplaySpeed: 12000,  // Thời gian trượt tự động (3000ms = 3 giây)
    prevArrow: <div className="swiper-button-prev">Previous</div>, // Cung cấp các nút tùy chỉnh
    nextArrow: <div className="swiper-button-next">Next</div>, // Cung cấp các nút tùy chỉnh
};
interface BookWithDetails extends Book, Partial<BookDetail> { } // Sửa lại kiểu dữ liệu, làm cho BookDetail trở thành tùy chọn

const NewBookRelease: React.FC = () => {
    const [booksWithDetails, setBooksWithDetails] = useState<BookWithDetails[]>([]);
    const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooksWithDetails = async () => {
            const booksRef = collection(db, 'Books');
            const booksQuery = query(booksRef, orderBy('id', 'desc'), limit(3));

            // Lấy sách mới nhất từ `Books`
            const booksSnapshot = await getDocs(booksQuery);
            const booksData = booksSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Book[];

            // Lấy chi tiết sách từ `BooksDetail` qua id
            const booksWithDetailsPromises = booksData.map(async (book) => {
                const bookDetailRef = collection(db, 'BooksDetail');
                const bookDetailQuery = query(bookDetailRef, where('id', '==', book.id)); // Liên kết qua id
                const bookDetailSnapshot = await getDocs(bookDetailQuery);  // Đảm bảo await

                if (!bookDetailSnapshot.empty) {
                    const bookDetailData = bookDetailSnapshot.docs[0].data() as BookDetail;
                    return { ...book, ...bookDetailData }; // Kết hợp thông tin từ Books và BooksDetail
                }

                // Trường hợp không có chi tiết sách
                return { ...book, coverType: '', dimensions: '', pageCount: '', publisher: '' };
            });

            // Khi tất cả các promises hoàn thành, cập nhật state
            const booksWithDetailsResult = await Promise.all(booksWithDetailsPromises);
            setBooksWithDetails(booksWithDetailsResult); // Cập nhật state với dữ liệu đầy đủ

            // Sau khi có sách mới nhất, lấy sách cùng thể loại
            if (booksData.length > 0) {
                const recentCategory = booksData[0].category;
                const relatedBooksQuery = query(booksRef, where('category', '==', recentCategory), limit(4));

                const relatedBooksSnapshot = await getDocs(relatedBooksQuery);
                const relatedBooksData = relatedBooksSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Book[];

                setRelatedBooks(relatedBooksData); // Cập nhật sách cùng thể loại
            }
        };

        fetchBooksWithDetails();
    }, []); // Chạy 1 lần khi component mount

    return (

        <div className="slide-new position-relative">
            <Slider {...settings}>
                {/* Hiển thị sách mới phát hành */}
                {booksWithDetails.map((book) => (
                    <div key={book.id} className="slider-item">
                        <div className="row">
                            {/* Cột sách mới phát hành */}
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-12 col-sm-5 left">
                                        <h3 className="product-name">
                                            <a href={`/book/detail/${book.id}`}>{book.title}</a>
                                        </h3>
                                        <p className="product-vendor">{book.author}</p>

                                        <div className="price-box">
                                            <span className="price">
                                                {(
                                                    book.coupon && typeof book.coupon === 'string' && book.coupon.includes('%')
                                                        ? book.price - (book.price * parseInt(book.coupon) / 100)
                                                        : book.price
                                                ).toLocaleString("vi-VN")}
                                                đ
                                            </span>

                                            <span className="compare-price">{book.price.toLocaleString("vi-VN")}đ</span>
                                        </div>
                                        <a href={`/book/detail/${book.id}`} className="book">Đặt sách</a>
                                    </div>
                                    <div className="col-12 col-sm-7">
                                        <div className="image_product">
                                            <a className="image_thumb" href={`/book/detail/${book.id}`} title={book.title}>
                                                <img src={book.img} alt={book.title} className="img-fluid center-block" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hiển thị sách cùng thể loại */}
                            <div className="col-lg-4">
                                <div className="row">
                                    {relatedBooks.map((relatedBook) => (
                                        <div className="col-6 mb-3" key={relatedBook.id}>
                                            <div className="item_product_main">
                                                <a className="image_thumb" href={`/book/detail/${relatedBook.id}`} title={relatedBook.title}>
                                                    <img src={relatedBook.img} alt={relatedBook.title} className="img-fluid center-block" />
                                                </a>
                                                <div className="info-product">
                                                    <h3 className="product-name">
                                                        <a href={`/book/detail/${relatedBook.id}`}>{relatedBook.title}</a>
                                                    </h3>
                                                    <div className="price-box">
                                                        <span className="price">
                                                            {(
                                                                book.coupon && typeof book.coupon === 'string' && book.coupon.includes('%')
                                                                    ? book.price - (book.price * parseInt(book.coupon) / 100)
                                                                    : book.price
                                                            ).toLocaleString("vi-VN")}
                                                            đ
                                                        </span>

                                                        <span className="compare-price">{book.price.toLocaleString("vi-VN")}đ</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};
export default NewBookRelease;
