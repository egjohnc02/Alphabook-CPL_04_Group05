import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

import { db } from '../../firebase/firebase.tsx';
import "./styleBookDetail.css";


interface Comment {
    id: string;
    bookId: string;
    name: string;
    email: string;
    title: string;
    comment: string;
    date?: string;
}


const Comment: React.FC<Comment> = ({ bookId }) => {
    const [formData, setFormData] = useState<Omit<Comment, "id" | "bookId">>({
        name: "",
        email: "",
        title: "",
        comment: "",
        date: "",
    });
    const [comments, setComments] = useState<Comment[]>([]);

    const [isOpen, setIsOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const handleOpen = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Tính toán vị trí popup giữa màn hình
        setPopupPosition({
            top: scrollTop + window.innerHeight / 2 - 200,
            left: scrollLeft + window.innerWidth / 2 - 165,
        });

        setIsOpen(true);
    };

    const handleClose = () => setIsOpen(false);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.comment) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        try {
            // Tạo comment mới với id tự động và bookId từ props
            const newComment: Comment = {
                id: `Comment-${bookId}-${Math.floor(Math.random() * 1000000)}`,
                bookId,
                ...formData,
                date: formData.date || new Date().toISOString(),
            };

            await addDoc(collection(db, "CommentBook"), newComment);

            alert("Đánh giá của bạn đã được gửi!");
            setFormData({
                name: "",
                email: "",
                title: "",
                comment: "",
                date: "",
            });
        } catch (error) {
            console.error("Lỗi khi thêm đánh giá: ", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const q = query(collection(db, 'CommentBook'), where('bookId', '==', bookId));
                const querySnapshot = await getDocs(q);
                const commentsData: Comment[] = [];
                querySnapshot.forEach((doc) => {
                    commentsData.push({ ...doc.data(), id: doc.id } as Comment);
                });
                setComments(commentsData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu bình luận: ', error);
            }
        };

        fetchComments();
    }, [bookId]);
    return (
        <div>
            <div id="bizweb-product-reviews" className="bizweb-product-reviews" data-id="29419395">
                <div>
                    <div className="title-bl">
                        <h4>Đánh giá sản phẩm</h4>
                    </div>
                    <div id="bizweb-product-reviews-sub">
                        <span className="product-reviews-summary-actions">
                            <input
                                type="button"
                                id="btnnewreview"
                                value="Viết đánh giá"
                                onClick={handleOpen}
                            />
                        </span>



                        <div id="bpr-list" className="bizweb-product-reviews-list">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        id={`bizweb-review-${comment.id}`}
                                        className="bizweb-review"
                                        itemScope
                                        itemType="http://schema.org/Review"
                                        itemProp="review"
                                    >
                                        <div className="bizweb-review-header">
                                            <div>
                                                <div className="bizweb-review-header-img">
                                                    <img
                                                        src="https://productreviews.sapoapps.vn//assets/images/user.png"
                                                        width="16"
                                                        height="15"
                                                        alt="User"
                                                    />
                                                </div>
                                            </div>

                                            <p className="bizweb-review-header-title">{comment.name || 'Anonymous'}</p>
                                        </div>
                                        <div className="bizweb-review-content">
                                            <p className="bizweb-review-content-body" itemProp="description">
                                                {comment.comment}
                                            </p>
                                        </div>
                                        <div className="bizweb-review-footer">
                                            <span className="review-date">{new Date(comment.date || '').toLocaleDateString('vi-VN')}</span>
                                        </div>
                                        <div
                                            style={{ display: 'none' }}
                                            itemType="http://schema.org/Rating"
                                            itemScope
                                            itemProp="reviewRating"
                                        >
                                            <span itemProp="ratingValue">5</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Chưa có bình luận nào.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fancybox-wrap"
                    style={{
                        width: "330px",
                        position: "absolute",
                        top: `${popupPosition.top}px`,
                        left: `${popupPosition.left}px`,
                        zIndex: 1000,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        padding: "15px",
                        borderRadius: "8px",
                    }}
                >
                    <div className="fancybox-inner" style={{ width: "300px" }}>
                        <div className="bizweb-product-reviews-form" id="bpr-form_29419395">
                            <form
                                method="post"
                                action=""
                                id="bizweb-product-reviews-frm"
                                name="bizweb-product-reviews-frm"
                                onSubmit={handleSubmit}
                            >

                                <h4>Đánh giá sản phẩm</h4>
                                <fieldset className="bpr-form-contact">
                                    <div className="bpr-form-contact-name require">
                                        <input
                                            type="text"
                                            maxLength={128}
                                            id="review_author"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Nhập tên của bạn"
                                        />
                                        <span className="bpr-form-message-error"></span>
                                    </div>
                                    <div className="bpr-form-contact-email require">
                                        <input
                                            type="email"
                                            maxLength={128}
                                            id="review_email"
                                            name="email"
                                            placeholder="nguyenvan@gmail.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <span className="bpr-form-message-error"></span>
                                    </div>
                                </fieldset>
                                <fieldset className="bpr-form-review">
                                    <div className="bpr-form-review-title">
                                        <input
                                            type="text"
                                            maxLength={512}
                                            id="review_title"
                                            name="title"
                                            placeholder="Tiêu đề"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                        <span className="bpr-form-message-error"></span>
                                    </div>
                                    <div className="bpr-form-review-body">
                                        <textarea
                                            maxLength={1500}
                                            id="review_body"
                                            name="comment"
                                            rows={5}
                                            placeholder="Nội dung"
                                            value={formData.comment}
                                            onChange={handleChange}
                                        />
                                        <span className="bpr-form-message-error"></span>
                                    </div>
                                </fieldset>
                                <fieldset className="bpr-form-actions">
                                    <input
                                        type="submit"
                                        value="Gửi"
                                        className="bpr-button-submit"

                                    />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    {/* Nút đóng popup */}
                    <a
                        title="Close"
                        className="fancybox-item fancybox-close"
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            cursor: "pointer",
                            color: "red",
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </a>
                </div>
            )}

            {/* Overlay */}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 999,
                    }}
                    onClick={handleClose}
                ></div>
            )}
        </div>
    );
};

export default Comment;
