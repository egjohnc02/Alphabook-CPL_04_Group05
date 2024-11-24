import { useState, useEffect } from "react";
import AutoScrollToTop from "../../utils/AutoScrollToTop";
import './Subscribe.css'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Subscribe = () => {

    interface CartItem {
        bookId: string;
        bookImg: string;
        bookPrice: string;
        bookTitle: string;
        quantity: number;
    }

    const [timeLeft, setTimeLeft] = useState(12345);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserId(user.uid);
            } else {
                setIsLoggedIn(false);
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleSubscribe = async () => {
        if (!isLoggedIn || !userId) {
            alert("Vui lòng đăng nhập để đăng ký gói cao cấp!");
            navigate("/login");
            return;
        }

        try {
            const cartDocRef = doc(db, "Cart", userId);
            const cartDoc = await getDoc(cartDocRef);
            
            if (cartDoc.exists()) {
                const cartData = cartDoc.data();
                const existingItems = cartData.listCart || [];
                
                if (existingItems.some((item: CartItem) => item.bookId === "premium-subscription")) {
                    alert("Gói này đã có trong giỏ hàng của bạn!");
                    return;
                }

                const subscriptionRef = doc(db, "Subscriptions", "premium");
                const subscriptionDoc = await getDoc(subscriptionRef);
                
                if (subscriptionDoc.exists()) {
                    await setDoc(cartDocRef, {
                        listCart: [...existingItems, subscriptionDoc.data()]
                    });
                    
                    alert("Đã thêm gói cao cấp vào giỏ hàng!");
                    navigate('/cart');
                } else {
                    throw new Error("Không tìm thấy thông tin gói cao cấp");
                }
            } else {
                const subscriptionRef = doc(db, "Subscriptions", "premium");
                const subscriptionDoc = await getDoc(subscriptionRef);
                
                if (subscriptionDoc.exists()) {
                    await setDoc(cartDocRef, {
                        listCart: [subscriptionDoc.data()]
                    });
                    
                    alert("Đã thêm gói cao cấp vào giỏ hàng!");
                    navigate('/cart');
                }
            }
        } catch (error) {
            console.error("Lỗi khi thêm gói vào giỏ hàng:", error);
            alert("Không thể thêm gói vào giỏ hàng. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="container">
            <AutoScrollToTop />
            <div className="text-center my-4">
                <h2 className="bg-danger text-white py-3 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-lightning-charge-fill text-warning" viewBox="0 0 16 16">
                        <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                    </svg>
                    Flash Sale - Đăng Ký Gói Cao Cấp Hôm Nay!
                </h2>
                <p className="text-secondary">
                    Chỉ còn <span className="text-danger fs-4">{formatTime(timeLeft)}</span> để nhận ưu đãi!
                </p>
            </div>

            <div className="d-flex container justify-content-center gap-5 h-25">
                <div className="card border-orange w-50">
                    <div className="card-body">
                        <h5 className="card-title bg-secondary p-3 rounded text-white">Gói cơ bản</h5>
                        <div>
                            <span className="card-text text-secondary">Giá hàng tháng</span>
                            <span>Miễn phí</span>
                        </div>
                        <hr />
                        <div>
                            <span className="card-text text-secondary">Nhận thông báo khuyến mãi</span>
                            <span>Bạn sẽ nhận được thông báo khi có sách giảm giá hoặc chương trình khuyến mãi qua email.</span>
                        </div>
                        <hr />
                        <div>
                            <span className="card-text text-secondary">Review sách</span>
                            <span>Cho phép bạn truy cập nội dung đánh giá sách từ các chuyên gia cũng như đọc giả.</span>
                        </div>
                        <hr />
                        <div>
                            <span className="card-text text-secondary">Tư vấn và liên hệ</span>
                            <span>Chúng tôi rất sẵn lòng tư vấn và giúp đỡ bạn vào các ngày trong tuần từ 6:00 - 18:00.</span>
                        </div>
                    </div>
                </div>

                <div className="card border-orange w-50">
                    <div className="card-body">
                        <h5 className="card-title bg-gradient bg-danger p-3 rounded text-white">
                            Gói cao cấp
                        </h5>
                        <div>
                            <span className="card-text text-secondary">Giá hàng tháng</span>
                            <span>
                                <s className="text-secondary">70.000 ₫</s>{" "}
                                <span className="text-danger fs-5">50.000 ₫</span>
                            </span>
                            <hr />
                        </div>

                        <div>
                            <span className="card-text text-secondary">Nhận thông báo khuyến mãi</span>
                            <span>Bạn sẽ nhận được thông báo khi có sách giảm giá hoặc chương trình khuyến mãi qua email.</span>
                            <hr />
                        </div>

                        <div>
                            <span className="card-text text-secondary">Review sách</span>
                            <span>Cho phép bạn truy cập nội dung đánh giá sách từ các chuyên gia cũng như đọc giả.</span>
                            <hr />
                        </div>

                        <div>
                            <span className="card-text text-secondary">Tư vấn và liên hệ</span>
                            <span>Chúng tôi rất sẵn lòng tư vấn và giúp đỡ bạn 24/7.</span>
                            <hr />
                        </div>

                        <div>
                            <span className="card-text text-secondary">Miễn phí vận chuyển</span>
                            <span>Bạn nhận được đặc quyền miễn phí vận chuyển toàn quốc.</span>
                            <hr />
                        </div>

                        <div>
                            <span className="card-text text-secondary">Truy cập ebook</span>
                            <span>Bạn có thể truy cập và đọc sách online hoặc có thể tải về bản pdf.</span>
                        </div>
                        <button className="btn my-2 update-btn" onClick={handleSubscribe}>
                            Đăng ký ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;