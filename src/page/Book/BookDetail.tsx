import './styleBookDetail.css'
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.tsx";
interface Book {
    id: string;
    title: string;
    category: string;
    price: number;
    img: string;
    coupon: string;
  }
function BookDetail() {
    const [book, setBook] = useState<Book[]>([]);
    useEffect(() => {
        const fetchBooks = async () => {
          const bookCollection = collection(db, "Books");
          const bookSnapshot = await getDocs(bookCollection);
          const bookList = bookSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Book[];
          setBook(bookList);
        };
        fetchBooks();
      }, []);
    return (
        <div className="container">
            <div className="row">
                <div className="product-detail-left product-images col-12 col-md-12 col-lg-6">
                    <div className="product-image-detail">
                        <div className="swiper-container gallery-top margin-bottom-10 swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
                            <div className="swiper-wrapper" id="lightgallery" aria-live="polite">

                                <a
                                    className="swiper-slide swiper-slide-active"
                                    data-hash="0"
                                    href="//bizweb.dktcdn.net/thumb/1024x1024/100/197/269/products/chien-luoc-dau-tu-bat-dong-san.jpg?v=1528354291673"
                                    title="Bấm vào để xem thư viện ảnh Donald Trump - Chiến Lược Đầu Tư Bất Động Sản"
                                    style={{ width: '564px', marginRight: '10px' }}
                                    role="group"
                                    aria-label="1 / 2"
                                >
                                    <img
                                        src="//bizweb.dktcdn.net/thumb/large/100/197/269/products/chien-luoc-dau-tu-bat-dong-san.jpg?v=1528354291673"
                                        alt="Donald Trump - Chiến Lược Đầu Tư Bất Động Sản"
                                        data-image="//bizweb.dktcdn.net/thumb/medium/100/197/269/products/chien-luoc-dau-tu-bat-dong-san.jpg?v=1528354291673"
                                        className="img-responsive mx-auto d-block swiper-lazy swiper-lazy-loaded"
                                    />
                                </a>


                            </div>
                        </div>
                        <div className="gallery-thumbs">
                            <div className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode swiper-container-thumbs">
                                <div className="swiper-wrapper" id="swiper-wrapper-a9427834a24c4e9a" aria-live="polite">

                                    <div
                                        className="swiper-slide swiper-slide-visible swiper-slide-active swiper-slide-thumb-active"
                                        data-hash="0"
                                        style={{ width: '106px', marginRight: '10px' }}
                                        role="group"
                                        aria-label="1 / 2"
                                    >
                                        <div className="image">
                                            <img
                                                src="//bizweb.dktcdn.net/thumb/medium/100/197/269/products/chien-luoc-dau-tu-bat-dong-san.jpg?v=1528354291673"
                                                alt="Donald Trump - Chiến Lược Đầu Tư Bất Động Sản"
                                                data-image="//bizweb.dktcdn.net/100/197/269/products/chien-luoc-dau-tu-bat-dong-san.jpg?v=1528354291673"
                                                className="swiper-lazy swiper-lazy-loaded"
                                            />
                                        </div>
                                    </div>


                                </div>
                                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-12 col-lg-6 details-pro">
                    <h1 className="title-head">Donald Trump - Chiến Lược Đầu Tư Bất Động Sản</h1>
                    <div className="flex-vd">
                        <div className="vendor">
                            <span>Tác giả:</span> George H.Ross
                        </div>
                        <div className="skuuu sku-product d-none">
                            <span className="variant-sku" itemProp="sku" content="8935251418439">
                                Mã sản phẩm: <strong>8935251418439</strong>
                            </span>
                        </div>
                    </div>



                    <div className="group-action-button">
                        <div className="group-power">
                            <div className="price-box clearfix">
                                <span className="special-price">
                                    <span className="price product-price">135.200₫</span>
                                </span>
                                <span className="old-price">
                                    Giá cũ:
                                    <del className="price product-price-old">169.000₫</del>
                                </span>
                                <span className="save-price d-none">
                                    Rẻ hơn <span className="price product-price-save">33.800₫</span> so với thị trường
                                </span>
                            </div>
                        </div>
                        <div className="pro-summary">
                            <table className="tab-2">
                                <tbody>
                                    <tr>
                                        <td>Loại sách:</td>
                                        <td>Đang cập nhật</td>
                                    </tr>
                                    <tr>
                                        <td>Số lượng còn lại:</td>
                                        <td>
                                            <div className="inventory_quantity">
                                                <span className="a-stock a2">
                                                    <link itemProp="availability" href="http://schema.org/InStock" />
                                                    Còn hàng
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <form encType="multipart/form-data" id="add-to-cart-form" data-cart-form="" action="/cart/add" method="post" className="wishItem">
                            <div className="form-product">
                                <div className="box-variant clearfix d-none">
                                    <input type="hidden" id="one_variant" name="variantId" value="11254249" />
                                </div>
                                <div className="clearfix from-action-addcart">
                                    <div className="qty-ant clearfix custom-btn-number">
                                        <label>Số lượng:</label>
                                        <div className="custom custom-btn-numbers clearfix input_number_product">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const result = document.getElementById('qty') as HTMLInputElement;
                                                    const qty = parseInt(result.value, 10);
                                                    if (!isNaN(qty) && qty > 1) result.value = (qty - 1).toString();
                                                }}
                                                className="btn-minus btn-cts"
                                                type="button"
                                            >
                                                –
                                            </button>
                                            <input
                                                aria-label="Số lượng"
                                                type="text"
                                                className="qty input-text"
                                                id="qty"
                                                name="quantity"
                                                size={4}
                                                value="1"
                                                maxLength={3}
                                                onChange={(e) => {
                                                    if (parseInt(e.target.value, 10) === 0) e.target.value = '1';
                                                }}
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const result = document.getElementById('qty') as HTMLInputElement;
                                                    const qty = parseInt(result.value, 10);
                                                    if (!isNaN(qty)) result.value = (qty + 1).toString();
                                                }}
                                                className="btn-plus btn-cts"
                                                type="button"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="btn-mua">
                                        <button type="submit" data-role="addtocart" className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart">
                                            <i className="fa-solid fa-cart-shopping" style={{ paddingRight: '20px' }}></i>
                                            MUA NGAY
                                        </button>
                                        <a href="tel:0932329959" className="call-pro"> <i className="fa-solid fa-phone" style={{ paddingRight: '20px' }}></i>Gọi ngay đặt hàng</a>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <ul className="social-media__item-list list--unstyled" role="list">
                            <li>Chia sẻ ngay: </li>
                            <li className="social-media__item social-media__item--facebook">
                                <a
                                    title="Chia sẻ lên Facebook"
                                    href="https://www.facebook.com/sharer.php?u=https://www.alphabooks.vn/donald-trump-chien-luoc-dau-tu-bat-dong-san-tai-ban"
                                    target="_blank"
                                    rel="noopener"
                                    aria-label="Chia sẻ lên Facebook"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                                    </svg>
                                    Chia sẻ
                                </a>
                            </li>
                            <li className="social-media__item social-media__item--pinterest">
                                <a
                                    title="Chia sẻ lên Pinterest"
                                    href="https://pinterest.com/pin/create/button/?url=https://www.alphabooks.vn/donald-trump-chien-luoc-dau-tu-bat-dong-san-tai-ban"
                                    target="_blank"
                                    rel="noopener"
                                    aria-label="Pinterest"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"></path>
                                    </svg>
                                    Chia sẻ
                                </a>
                            </li>
                            <li className="social-media__item social-media__item--twitter">
                                <a
                                    title="Chia sẻ lên Twitter"
                                    href="https://twitter.com/share?url=https://www.alphabooks.vn/donald-trump-chien-luoc-dau-tu-bat-dong-san-tai-ban"
                                    target="_blank"
                                    rel="noopener"
                                    aria-label="Tweet on Twitter"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                    </svg>
                                    Chia sẻ
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 product-content">
                    <div className="row">
                        <div className="col-lg-12 col-12">
                            <div className="product-tab e-tabs not-dqtab">
                                <ul className="tabs tabs-title clearfix">
                                    <li className="tab-link current" data-tab="tab-1">Chi tiết</li>
                                    <li className="tab-link" data-tab="tab-2">REVIEW ĐỘC GIẢ</li>
                                    <li className="tab-link" data-tab="tab-3">ĐÁNH GIÁ TỪ CHUYÊN GIA</li>
                                    <li className="tab-link" data-tab="tab-4">BÁO CHÍ NÓI GÌ VỀ CUỐN SÁCH</li>
                                </ul>
                            </div>

                            <div id="tab-1" className="tab-content content_extab current">
                                <div className="rte product_getcontent">
                                    <div className="ba-text-fpt has-height">
                                        <table className="table table-bordered table-detail table-striped" id="chi-tiet">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span>Công ty phát hành</span>
                                                    </td>
                                                    <td className="last">
                                                        <span>Alpha Books</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span>Ngày xuất bản</span>
                                                    </td>
                                                    <td className="last">
                                                        <span>2022-05-01</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span>Kích thước</span>
                                                    </td>
                                                    <td className="last">
                                                        <span>13x20.5 cm</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span>Loại bìa</span>
                                                    </td>
                                                    <td className="last">
                                                        <span>Bìa mềm, tay gấp</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span>Số trang</span>
                                                    </td>
                                                    <td className="last">
                                                        <span>340</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span>Tác giả</span>
                                                    </td>
                                                    <td className="last">
                                                        George H.Ross
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="section-related-product e-tabs">
                                <div className="section_prd_feature">
                                    <div className="title_module section tabs-title">
                                        <h2 className="title-module tab-link current" data-tab="tab-4">
                                            Sản phẩm liên quan
                                        </h2>
                                    </div>
                                    <div id="tab-4" className="tab-content current">
                                        <div className="sliderelated">
                                            <div className="swiper-container swiper_related swiper-container-initialized swiper-container-horizontal">
                                                <div
                                                    className="swiper-wrapper"
                                                    id="swiper-wrapper-b5f886eb10ba41018d"
                                                    aria-live="polite"
                                                    style={{ transform: 'translate3d(0px, 0px, 0px)' }}
                                                >
                                                    <div
                                                        className="item swiper-slide"
                                                        style={{ width: '218.8px', marginRight: '20px' }}
                                                        role="group"
                                                        aria-label="5 / 5"
                                                    >
                                                        <div className="item_product_main">
                                                            <form
                                                                action="/cart/add"
                                                                method="post"
                                                                className="variants product-action wishItem"
                                                                data-cart-form=""
                                                                data-id="product-actions-6577396"
                                                                encType="multipart/form-data"
                                                            >
                                                                <a
                                                                    className="image_thumb"
                                                                    href="/dau-tu-bat-dong-san-cach-thuc-khoi-nghiep-va-thu-loi-nhuan-lon"
                                                                    title="Đầu Tư Bất Động Sản - Cách Thức Khởi Nghiệp Và Thu Lợi Nhuận Lớn"
                                                                >
                                                                    <img
                                                                        width="199"
                                                                        height="199"
                                                                        src="https://bizweb.dktcdn.net/100/197/269/products/dau-tu-bat-dong-san-outline-1-6-21-01.jpg?v=1676195799617"
                                                                        alt="Đầu Tư Bất Động Sản - Cách Thức Khởi Nghiệp Và Thu Lợi Nhuận Lớn"
                                                                        className="lazyload img-responsive center-block loaded"
                                                                    />
                                                                </a>
                                                                <div className="info-product">
                                                                    <h3 className="product-name">
                                                                        <a
                                                                            href="/dau-tu-bat-dong-san-cach-thuc-khoi-nghiep-va-thu-loi-nhuan-lon"
                                                                            title="Đầu Tư Bất Động Sản - Cách Thức Khởi Nghiệp Và Thu Lợi Nhuận Lớn"
                                                                        >
                                                                            Đầu Tư Bất Động Sản - Cách Thức Khởi Nghiệp Và Thu Lợi Nhuận Lớn
                                                                        </a>
                                                                    </h3>
                                                                    <div className="price-box">
                                                                        <span className="price">135.200₫</span>
                                                                        <span className="compare-price">169.000₫</span>
                                                                    </div>
                                                                  
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookDetail;