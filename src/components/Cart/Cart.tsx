import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './cart.css'
import { Col, ListGroup, Row } from "react-bootstrap";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase.tsx";
interface CartItem {
    bookId: string;
    bookImg: string;
    bookPrice: string;
    bookTitle: string;
    quantity: string;
}

type Address = {
    phone?: string;
    address?: string;
    email?: string;
    province?: string;
    district?: string;
    ward?: string;
    isDefault: boolean;
};

interface UserCart {
    listCart: CartItem[];
}
const Cart: React.FC = () => {
    const [viewportSize, setViewportSize] = useState('');
    const currentWidth = useRef(window.innerWidth);
    const [listCart, setListCart] = useState<CartItem[]>([]);
    const [userName, setUserName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [userNote, setUserNote] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
          const user = auth.currentUser;
    
          if (user) {
    
            try {
              const userRef = doc(db, "Users", user.uid);
              const userDoc = await getDoc(userRef);
    
              if (userDoc.exists()) {
                const data = userDoc.data();
                setUserName(`${data.FirstName || ""} ${data.LastName || ""}`.trim());
    
                const defaultAddress = (data.addresses as Address[] || []).find((addr) => addr.isDefault);
    
                if (defaultAddress) {
                  setPhoneNumber(defaultAddress.phone || null);
    
                  const fullAddress = [
                    defaultAddress.address,
                    defaultAddress.ward,
                    defaultAddress.district,
                    defaultAddress.province,
                  ]
                    .filter((part) => part)
                    .join(", ");
                  setAddress(fullAddress || null);
                }
              } else {
                console.warn("Tài liệu người dùng không tồn tại.");
              }
            } catch (error) {
              console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
          }
        };
    
        fetchUserData();
      }, []);

      const handlePayment = async () => {
        const user = auth.currentUser;
    
        if (!user) {
            console.error("User not logged in");
            return;
        }
    
        if (!user.emailVerified) {
            alert("Vui lòng xác minh email trước khi đặt hàng.");
            navigate("/customer");
            return;
        }
    
        try {
            const userId = user.uid;
            const orderData = {
                userId: userId,
                userName: userName,
                phoneNumber: phoneNumber || "",
                address: address || "",
                email: user.email || "",
                items: listCart,
                totalPrice: calculateTotalPrice(listCart),
                orderDate: new Date().toISOString(),
                status: "Đang xử lý",
                note: userNote,
            };
    
            const orderId = `order_${new Date().getTime()}`;
            const orderDocRef = doc(db, "DonHang", orderId);
            await setDoc(orderDocRef, orderData);
    
            console.log("Đặt hàng thành công!");
            alert("Đặt hàng thành công!");
    
            const cartDocRef = doc(db, "Cart", userId);
            await setDoc(cartDocRef, { listCart: [] });
            setListCart([]);
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
        }
    };
    
    

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            currentWidth.current = newWidth;

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
                setListCart(cartData.listCart);
            } else {
                console.log("No cart found for the given document ID");
                setListCart([]);
            }
        };

        fetchCartByUserId();
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [viewportSize]);


    const calculateTotalPrice = (cartItems: CartItem[]): number => {
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.bookPrice) || 0; // Chuyển giá thành số, mặc định là 0 nếu lỗi
            const itemQuantity = parseInt(item.quantity, 10) || 0; // Chuyển số lượng thành số nguyên, mặc định là 0 nếu lỗi
            return total + itemPrice * itemQuantity; // Cộng dồn giá trị của từng mục
        }, 0); // Giá trị khởi tạo của `total` là 0
    };
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
                const updatedListCart = cartData.listCart.filter((item) => item.bookId !== bookId);
                await setDoc(cartDocRef, { listCart: updatedListCart });
                setListCart(updatedListCart);
                console.log("Product deleted successfully:", bookId);
            } else {
                console.log("No cart found for the given userId:", userId);
                setListCart([]); 
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    const handleDeleteClick = (bookId: string) => {
    handleDelete(bookId).catch((error) => console.error("Error deleting item:", error));
  };

    const handleIncrease = async (bookId: string) => {
        try {
            const userId = localStorage.getItem("useId");
            if (!userId) return;
            const cartDocRef = doc(db, "Cart", userId);
            const cartSnapshot = await getDoc(cartDocRef);
            if (cartSnapshot.exists()) {
                const cartData = cartSnapshot.data() as UserCart;

                const updatedListCart = cartData.listCart.map((item) => {
                    if (item.bookId == bookId) {
                        let updatedQuantity = parseInt(item.quantity);
                        updatedQuantity += 1;
                        return { ...item, quantity: updatedQuantity.toString() };
                    }
                    return item;
                });

                await setDoc(cartDocRef, { listCart: updatedListCart });
                setListCart(updatedListCart);
                console.log("Quantity updated successfully for bookId:", bookId);
            }
        } catch (error) {
            console.log(error)
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
                        return { ...item, quantity: updatedQuantity.toString() };
                    }
                    return item; // Không thay đổi sản phẩm khác
                });

                await setDoc(cartDocRef, { listCart: updatedListCart });
                setListCart(updatedListCart);
                console.log("Quantity updated successfully for bookId:", bookId);
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleDecreaseClick =(bookId: string) =>{
        handleDecrease(bookId).catch((error) =>console.log("error", error))
    }
  
    return (
        <>
            <div className="container container-sm container-md container-lg d-flex flex-column">
                <Row>
                    <p className="header-cart h2 p-0 m-0 m-3 ms-3">Giỏ hàng của bạn</p>
                    {listCart.length === 0 ? (
                        <Col lg={12} className="text-center py-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-cart-x my-3" viewBox="0 0 16 16">
                                <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>
                            <p className="h4 text-muted">Không có sản phẩm nào trong giỏ hàng của bạn</p>
                        </Col>
                    ) : (
                        <>
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
                                                    <ListGroup.Item key={index}>
                                                        <div className="item-cart d-flex align-items-center ps-2 pb-3 border-2 border-bottom">
                                                            <div className="info-1 d-flex">
                                                                <img src={item.bookImg} alt="item-img-cart" className="me-2" height={'100px'} width={'80px'} />
                                                                <div className="ms-4 d-flex flex-column justify-content-center align-items-start">
                                                                    <p className="title-info-1 text-muted p-0 m-0 text-nowrap overflow-hidden" style={{ width: '200px' }}>{item.bookTitle}</p>
                                                                    <div className="btn p-0 m-0 bg-none border-0 text-danger" onClick={() => handleDeleteClick(item.bookId)}>Xóa</div>
                                                                </div>
                                                            </div>
                                                            <p className="info-2-price text-danger fw-bolder ps-1 pt-3">{parseFloat(item.bookPrice).toLocaleString("vi-VN")}</p>
                                                            <div className="infor-3-count d-flex bg-prrimary align-items-center">
                                                                <button className="btn border p-0" onClick={() => handleDecreaseClick(item.bookId)}><i className="fa-solid fa-minus p-1"></i></button>
                                                                <p className="m-0 px-2">{item.quantity}</p>
                                                                <button className="btn border p-0" onClick={() => handleIncreaseClick(item.bookId)}><i className="fa-solid fa-plus p-1"></i></button>
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
                                            <div className="overflow-scroll">
                                                {listCart.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <div className="item-cart d-flex align-items-center ps-2 pb-3 border-2 border-bottom">
                                                            <div className="info-1 d-flex">
                                                                <img src={item.bookImg} alt="item-img-cart" className="me-2" height={'100px'} width={'80px'} />
                                                                <div className="ms-4 d-flex flex-column justify-content-center align-items-start">
                                                                    <p className="title-info-1 text-muted p-0 m-0 text-nowrap overflow-hidden" style={{ width: '200px' }}>{item.bookTitle}</p>
                                                                    <div className="btn p-0 m-0 bg-none border-0 text-danger">Xóa</div>
                                                                </div>
                                                            </div>
                                                            <p className="info-2-price text-danger fw-bolder ps-1 pt-3">{item.bookPrice}</p>
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
                                            <button className="btn w-100 text-white bg-orange rounded-1 mb-3 p-3" onClick={handlePayment}>
                                                Đặt sách
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={3} className="order-1 order-md-1 order-lg-2">
                                <div className="cart-filter-content shadow bg-light h-100 container">
                                    <p className="disable fw-bold text-muted ps-1 pe-1 ms-1">Thông tin đơn hàng</p>
                                    <p>
                                        <span className="fw-bolder">Họ tên:</span> {userName || "Chưa cập nhật"}
                                    </p>
                                    {phoneNumber && (
                                        <p>
                                            <span className="fw-bolder">Số điện thoại:</span> {phoneNumber}
                                        </p>
                                    )}
                                    {address && (
                                        <p>
                                            <span className="fw-bolder">Địa chỉ:</span> {address}
                                        </p>
                                    )}
                                    <div className="mb-3">
                                        <label htmlFor="note" className="form-label">Ghi chú giao hàng</label>
                                        <textarea
                                            className="form-control" 
                                            id="note" 
                                            rows={3} 
                                            value={userNote}
                                            onChange={(e) => setUserNote(e.target.value)}>
                                        </textarea>
                                    </div>
                                    <p className="text-danger small fst-italic">* Nếu muốn thay đổi thông tin vui lòng truy cập Sổ địa chỉ của bạn để mặc định</p>
                                </div>
                            </Col>
                        </>
                    )}
                </Row>
            </div>
        </>
    );
};

export default Cart;
