import React, { useEffect, useRef, useState } from "react";
import './cart.css'

import { Col, Form, ListGroup, Row } from "react-bootstrap";
import thumbnailItemCart from '../../assets/thumnail_item_cart.webp'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.tsx";
interface CartItem {
    bookId: string;
    bookImg: string;
    bookPrice: string;
    bookTitle: string;
    quantity: string;
}

interface UserCart {
    listCart: CartItem[];
}
const Cart: React.FC = () => {
    const [viewportSize, setViewportSize] = useState('');
    const currentWidth = useRef(window.innerWidth);
    const [checkbox, setCheckBox] = useState(false)
    // Update cart
    const [listCart, setListCart] = useState<CartItem[]>([]);


    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth; // Lấy giá trị mới nhất của viewport
            currentWidth.current = newWidth; // Cập nhật giá trị trong useRef

            // Cập nhật state chỉ khi vượt qua các ngưỡng xác định
            if (newWidth < 992 && viewportSize !== 'md') {
                setViewportSize('md');
            } else if (newWidth >= 992 && viewportSize !== 'lg') {
                setViewportSize('lg');
            }
        };

        const fetchCartByUserId = async () => {
            const userId = localStorage.getItem("useId") as string;
            const cartDocRef = doc(db, "Cart", userId);
            const cartSnapshot = await getDoc(cartDocRef);

            if (cartSnapshot.exists()) {
                const cartData = cartSnapshot.data() as UserCart;
                console.log("Cart Data:", cartData.listCart);
                setListCart(cartData.listCart); // Cập nhật state listCart
            } else {
                console.log("No cart found for the given document ID");
                setListCart([]); // Nếu không tìm thấy, set mảng rỗng
            }
        };

        fetchCartByUserId();
        handleResize(); // Kiểm tra kích thước khi component mount

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [viewportSize]); // Thêm viewportSize vào dependency để cập nhật chính xác

    const handleCheckbox = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setCheckBox(e.target.checked)
    }

    //Xử lý logic cart
    // Hàm lấy trường "name" của một document từ collection "Books"
    const getBookTitleById = async (bookId: string): Promise<string | null> => {
        const bookDocRef = doc(db, "Books", bookId); // Truy cập document theo ID
        const bookDocSnapshot = await getDoc(bookDocRef); // Lấy dữ liệu document

        if (bookDocSnapshot.exists()) {
            const bookData = bookDocSnapshot.data(); // Lấy dữ liệu trong document
            return bookData.name || null; // Trả về trường "name" hoặc null nếu không có
        } else {
            console.log("No document found for the given ID");
            return null;
        }
    };
    // Xử lý total price
    const calculateTotalPrice = (cartItems: CartItem[]): number => {
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.bookPrice) || 0; // Chuyển giá thành số, mặc định là 0 nếu lỗi
            const itemQuantity = parseInt(item.quantity, 10) || 0; // Chuyển số lượng thành số nguyên, mặc định là 0 nếu lỗi
            return total + itemPrice * itemQuantity; // Cộng dồn giá trị của từng mục
        }, 0); // Giá trị khởi tạo của `total` là 0
    };
    // Xử lý button xóa
    const handleDelete = async (bookId: string) => {
        try {
            const userId = localStorage.getItem("useId");
            if (!userId) {
                console.log("No userId found in localStorage");
                return;
            }
            const cartDocRef = doc(db, "Cart", userId);
            const cartSnapshot = await getDoc(cartDocRef);

            if (cartSnapshot.exists()) {
                const cartData = cartSnapshot.data() as UserCart;
                // Lọc bỏ sản phẩm có bookId cần xóa
                const updatedListCart = cartData.listCart.filter((item) => item.bookId !== bookId);
                // Cập nhật Firestore với danh sách mới
                await setDoc(cartDocRef, { listCart: updatedListCart });
                // Cập nhật state listCart
                setListCart(updatedListCart);
                console.log("Product deleted successfully:", bookId);
            } else {
                console.log("No cart found for the given userId:", userId);
                setListCart([]); // Nếu không tìm thấy, set mảng rỗng
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    // Hàm bọc lại handleDelete
    const handleDeleteClick = (bookId: string) => {
    // Gọi handleDelete một cách bất đồng bộ
    handleDelete(bookId).catch((error) => console.error("Error deleting item:", error));
  };

    //Xử lý + - 
    // Hàm xử lý tăng số lượng
    const handleIncrease = async (bookId: string) => {
        try {
            const userId = localStorage.getItem("useId");
            if (!userId) return;
            const cartDocRef = doc(db, "Cart", userId);
            const cartSnapshot = await getDoc(cartDocRef);
            if (cartSnapshot.exists()) {
                const cartData = cartSnapshot.data() as UserCart;

                // Tìm sản phẩm cần thay đổi
                const updatedListCart = cartData.listCart.map((item) => {
                    if (item.bookId == bookId) {
                        let updatedQuantity = parseInt(item.quantity);
                        updatedQuantity += 1;
                        // Trả về sản phẩm đã thay đổi
                        return { ...item, quantity: updatedQuantity.toString() };
                    }
                    return item; // Không thay đổi sản phẩm khác
                });

                // Cập nhật Firestore với danh sách mới
                await setDoc(cartDocRef, { listCart: updatedListCart });
                // Cập nhật state listCart
                setListCart(updatedListCart);
                console.log("Quantity updated successfully for bookId:", bookId);
            }
        } catch (error) {
        }
    };
    const handleIncreaseClick =(bookId: string) =>{
        handleIncrease(bookId).catch((error) =>console.log("error", error))
    }
    // Hàm xử lý giảm số lượng
    const handleDecrease = async (bookId: string) => {
        try {
            const userId = localStorage.getItem("useId");
            if (!userId) return;
            const cartDocRef = doc(db, "Cart", userId);
            const cartSnapshot = await getDoc(cartDocRef);
            if (cartSnapshot.exists()) {
                const cartData = cartSnapshot.data() as UserCart;

                // Tìm sản phẩm cần thay đổi
                const updatedListCart = cartData.listCart.map((item) => {
                    if (item.bookId == bookId) {
                        let updatedQuantity = parseInt(item.quantity);
                        if(updatedQuantity === 1){
                            handleDelete(bookId)
                        }else{
                            updatedQuantity -= 1;
                        }
                        // Trả về sản phẩm đã thay đổi
                        return { ...item, quantity: updatedQuantity.toString() };
                    }
                    return item; // Không thay đổi sản phẩm khác
                });

                // Cập nhật Firestore với danh sách mới
                await setDoc(cartDocRef, { listCart: updatedListCart });
                // Cập nhật state listCart
                setListCart(updatedListCart);
                console.log("Quantity updated successfully for bookId:", bookId);
            }
        } catch (error) {
        }
    };
    const handleDecreaseClick =(bookId: string) =>{
        handleDecrease(bookId).catch((error) =>console.log("error", error))
    }


  
    return (
        <>
            <div className="container container-sm container-md container-lg d-flex flex-column">
                <Row>
                    <p className="header-cart h2 p-0 m-0 mt-3 ms-3 ">Giỏ hàng của bạn</p>
                    <Col lg={9} className="order-2 order-md-2 order-lg-1 shadow">
                        <ListGroup className="cart mt-3">
                            <ListGroup className="label disable fw-bold text-muted ps-2 pe-1 d-flex flex-row">
                                <p className="label-1">Thông tin sản phẩm</p>
                                <p className="label-2">Đơn giá</p>
                                <p className="label-2">Số lượng</p>
                                <p className="label-2">Thành tiền</p>
                            </ListGroup>
                            {viewportSize == 'lg' && (
                                <>
                                    <div className="overflow-auto">
                                        {listCart.map((item, index) => (
                                            <ListGroup.Item key={index}> {/* key ở đây là bắt buộc để tránh lỗi */}
                                                <div className="item-cart d-flex align-items-center ps-2 pb-3 border-2 border-bottom">
                                                    <div className="info-1 d-flex">
                                                        <img src={item.bookImg} alt="item-img-cart" className="me-2" height={'100px'} width={'80px'} />
                                                        <div className="ms-4 d-flex flex-column justify-content-center align-items-start">
                                                            <p className="title-info-1 text-muted p-0 m-0 text-nowrap overflow-hidden" style={{ width: '200px' }}>{item.bookTitle}</p>
                                                            <div className="btn p-0 m-0 bg-none border-0 text-danger"  onClick={() => handleDeleteClick(item.bookId)}>Xóa</div>
                                                        </div>
                                                    </div>
                                                    <p className="info-2-price text-danger fw-bolder ps-1 pt-3">{parseFloat(item.bookPrice).toLocaleString("vi-VN")}</p>
                                                    <div className="infor-3-count d-flex bg-prrimary align-items-center">
                                                        <button className="btn border p-0" onClick={() =>handleDecreaseClick(item.bookId)}><i className="fa-solid fa-minus p-1"></i></button>
                                                        <p className="m-0 px-2">{item.quantity}</p>
                                                        <button className="btn border p-0" onClick={() =>handleIncreaseClick(item.bookId)}><i className="fa-solid fa-plus p-1"></i></button>
                                                    </div>
                                                    <div className="info-4-total-price">
                                                        <p className="text-danger fw-bolder p-0 m-0">{(parseFloat(item.quantity) * parseFloat(item.bookPrice)).toLocaleString("vi-VN")}</p>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))}


                                    </div>
                                </>
                            )}
                            {viewportSize == 'md' && (
                                <>
                                    <div className="overflow-scroll ">
                                        {listCart.map((item, index) => (
                                            <ListGroup.Item key={index}> {/* key ở đây là bắt buộc để tránh lỗi */}
                                                <div className="item-cart d-flex align-items-center ps-2 pb-3 border-2 border-bottom">
                                                    <div className="info-1 d-flex">
                                                        <img src={item.bookImg} alt="item-img-cart" className="me-2" height={'100px'} width={'80px'} />
                                                        <div className="ms-4 d-flex flex-column justify-content-center align-items-start">
                                                            <p className="title-info-1 text-muted p-0 m-0 text-nowrap overflow-hidden" style={{ width: '200px' }}>{item.bookTitle}</p>
                                                            <div className="btn p-0 m-0 bg-none border-0 text-danger">Xóa</div>
                                                        </div>
                                                    </div>
                                                    <p className="info-2-price text-danger fw-bolder ps-1 pt-3">{parseFloat(item.bookPrice).toLocaleString("vi-VN")}</p>
                                                    <div className="infor-3-count d-flex bg-prrimary align-items-center">
                                                        <button className="btn border p-0"><i className="fa-solid fa-minus p-1"></i></button>
                                                        <p className="m-0 px-2">{item.quantity}</p>
                                                        <button className="btn border p-0"><i className="fa-solid fa-plus p-1"></i></button>
                                                    </div>
                                                    <div className="info-4-total-price">
                                                        <p className="text-danger fw-bolder p-0 m-0">{(parseFloat(item.quantity) * parseFloat(item.bookPrice)).toLocaleString("vi-VN")}</p>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </div>
                                </>
                            )}
                        </ListGroup>
                        <Row>
                            <Col lg={4} className="ms-auto">
                                <div className="total-cart mt-4">
                                    <div className="content-total-cart d-flex justify-content-between mb-4">
                                        <p className="text-muted">Tổng tiền:</p>
                                        <p className="final-price text-danger fw-bolder">{calculateTotalPrice(listCart).toLocaleString("vi-VN")}</p>
                                    </div>
                                    <div className="button-card text-white d-flex justify-content-center align-items-center bg-orange rounded-1 mb-3" style={{ height: '55px' }}>
                                        Thanh toán
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={3} className="order-1 order-md-1 order-lg-2">
                        <div className="cart-filter-content shadow bg-light  h-100">
                            <p className="disable fw-bold text-muted ps-1 pe-1  ms-1 "> Thời gian giao hàng</p>
                            <div className='form-filter d-flex gap-2 ps-1 ms-2 me-2'>
                                <Form.Group controlId="formDate">
                                    <Form.Control type="date" className="bg-transparent form-control-sm" />
                                </Form.Group>
                                <Form.Select aria-label="Default select example" className="text-muted form-select-sm">
                                    <option>Chọn thời gian</option>
                                    <option value="1">08h00 - 12h00</option>
                                    <option value="2">14h-00 - 18h00</option>
                                    <option value="3">19h00 - 21h00</option>
                                </Form.Select>
                            </div>
                            <Form.Check
                                type='checkbox'
                                label='Xuất hóa đơn công ty'
                                className="ms-3 mt-3 custom-checkbox"
                                checked={checkbox}
                                onChange={handleCheckbox}
                            />

                            {checkbox && (<Form className="ps-2 pe-2">
                                <Form.Group className="mb-2 mt-4">
                                    <Form.Label>Tên công ty</Form.Label>
                                    <Form.Control type="text" placeholder="Tên công ty" />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Mã số thuế</Form.Label>
                                    <Form.Control type="text" placeholder="Tên công ty" />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Địa chỉ công ty</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email nhận hóa đơn" />
                                </Form.Group>
                            </Form>)}
                        </div>
                    </Col>

                </Row>
            </div>
        </>
    );
};

export default Cart;
