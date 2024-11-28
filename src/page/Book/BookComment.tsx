import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.tsx";
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

const CommentSection: React.FC<{ bookId: string }> = ({ bookId }) => {
  const [formData, setFormData] = useState<Omit<Comment, "id" | "bookId">>({
    name: "",
    email: "",
    title: "",
    comment: "",
    date: "",
  });
  const [comments, setComments] = useState<Comment[]>([]);

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
      const newComment: Comment = {
        id: `Comment-${bookId}-${Math.floor(Math.random() * 1000000)}`,
        bookId,
        ...formData,
        date: formData.date || new Date().toISOString(),
      };

      await addDoc(collection(db, "CommentBook"), newComment);

      setComments((prevComments) => [...prevComments, newComment]);

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
        const q = query(collection(db, "CommentBook"), where("bookId", "==", bookId));
        const querySnapshot = await getDocs(q);
        const commentsData: Comment[] = [];
        querySnapshot.forEach((doc) => {
          commentsData.push({ ...doc.data(), id: doc.id } as Comment);
        });
        setComments(commentsData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bình luận: ", error);
      }
    };

    fetchComments();
  }, [bookId]);

  return (
    <div>
      <div id="bizweb-product-reviews" className="bizweb-product-reviews">
        <div className="title-bl">
          <h4>Đánh giá sản phẩm</h4>
        </div>

        <div className="bizweb-product-reviews-form" id="bpr-form_29419395">
          <form
            method="post"
            action=""
            id="bizweb-product-reviews-frm"
            name="bizweb-product-reviews-frm"
            onSubmit={handleSubmit}
          >
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
              </div>
            </fieldset>
            <fieldset className="bpr-form-actions">
              <input type="submit" value="Gửi" className="bpr-button-submit" />
            </fieldset>
          </form>
        </div>

        <div id="bizweb-product-reviews-sub">
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
                    <div className="bizweb-review-header-img">
                      <img
                        src="https://productreviews.sapoapps.vn//assets/images/user.png"
                        alt="User"
                        className="avatar-img"
                      />
                    </div>
                    <p className="bizweb-review-header-title">{comment.name || "Anonymous"}</p>
                  </div>
                  <div className="bizweb-review-content">
                    <p className="bizweb-review-content-body" itemProp="description">
                      {comment.comment}
                    </p>
                  </div>
                  <div className="bizweb-review-footer">
                    <span className="review-date">
                      {new Date(comment.date || "").toLocaleDateString("vi-VN")}
                    </span>
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
  );
};

export default CommentSection;