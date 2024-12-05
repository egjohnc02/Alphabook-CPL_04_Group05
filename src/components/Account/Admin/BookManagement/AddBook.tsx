import { collection, doc, getDoc, getDocs, updateDoc, addDoc, setDoc, deleteDoc } from "firebase/firestore";

import { db } from "../../../../firebase/firebase";
import React, { useState, useEffect } from "react";

interface Book {
    id: string;
    author: string;
    title: string;
    category: string[];
    price: number;
    img: string;
    coupon: string;
    quantity: number;
}
interface BookDetail {
    id: string;
    coverType: string;
    dimensions: string;
    pageCount: string;
    publishDate: string;
    publisher: string;
}
const AddBook = () => {
    const [showForm, setShowForm] = useState(false);
    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

    const [newBook, setNewBook] = useState<Book>({
        id: "",
        title: "",
        author: "",
        category: [],
        price: 0,
        img: "",
        coupon: "",
        quantity: 0,
    });
    useEffect(() => {
        // Hàm để lấy danh sách các danh mục từ Firebase
        const fetchCategories = async () => {
            try {
                const bookCollection = collection(db, "Books");
                const snapshot = await getDocs(bookCollection);
                const categories = snapshot.docs
                    .flatMap((doc) => doc.data().category) // Trích xuất mảng category từ mỗi document
                    .filter(Boolean); // Loại bỏ các giá trị null hoặc undefined
                const uniqueCategories = Array.from(new Set(categories)); // Lấy các danh mục duy nhất
                setUniqueCategories(uniqueCategories);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu danh mục từ Firebase:", error);
            }
        };

        fetchCategories();
    }, []);
    const handleCreate = async () => {
        try {
            const cleanedPrice = parseFloat(newBook.price.toString().replace(/^0+/, ""));
            const cleanedQuantity = parseInt(newBook.quantity.toString().replace(/^0+/, ""), 10);
            const couponValue = parseFloat(newBook.coupon.replace(/^0+/, ""));
            if (isNaN(couponValue) || couponValue >= 100) {
                alert("Mã giảm giá phải là số nhỏ hơn 100!");
                return;
            }
            const couponWithPercent = newBook.coupon.endsWith('%')
                ? newBook.coupon
                : `${newBook.coupon}%`;
            const bookDocRef = doc(collection(db, "Books"));
            const bookId = bookDocRef.id; // Lấy ID tự động


            const bookToSave = {
                id: bookId,
                title: newBook.title,
                img: newBook.img,
                author: newBook.author,
                price: cleanedPrice,
                coupon: couponWithPercent,
                quantity: cleanedQuantity,
                category: newBook.category,
            };
            const bookDetailToSave: BookDetail = {
                id: bookId, // Sử dụng ID của sách làm ID cho chi tiết
                coverType: "",
                dimensions: "",
                pageCount: "",
                publishDate: "",
                publisher: "",
            };

            // Lưu sách vào Firestore
            await setDoc(bookDocRef, bookToSave);
            await setDoc(doc(db, "DetailBook", bookId), bookDetailToSave);

            alert(`Sách đã được tạo với ID: ${bookId}`);
            setNewBook({
                id: "",
                title: "",
                img: "",
                author: "",
                price: 0,
                coupon: "",
                quantity: 0,
                category: [],
            });
            setShowForm(false);
        } catch (error) {
            console.error("Lỗi khi tạo sách: ", error);
            alert("Không thể tạo sách. Vui lòng thử lại!");
        }
    };
    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setNewBook((prevState) => {
            // Sử dụng toán tử spread để sao chép mảng category cũ
            const updatedCategories = checked
                ? [...prevState.category, value]
                : prevState.category.filter(category => category !== value);

            // Trả về trạng thái mới
            return { ...prevState, category: updatedCategories };
        });
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="m-0">Quản Lý Sách</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Đóng Form" : "Tạo Sách"}
                </button>

            </div>
            {showForm && (
                <div className="card p-3">

                    <div className="mb-3">
                        <label className="form-label">Tiêu Đề</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={newBook.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hình Ảnh (URL)</label>
                        <input
                            type="text"
                            className="form-control"
                            name="img"
                            value={newBook.img}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tác Giả</label>
                        <input
                            type="text"
                            className="form-control"
                            name="author"
                            value={newBook.author}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giá (VNĐ)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={newBook.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mã Giảm Giá</label>
                        <input
                            type="text"
                            className="form-control"
                            name="coupon"
                            value={newBook.coupon}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số Lượng</label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            value={newBook.quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Danh Mục</label>
                        <div>
                            {uniqueCategories.map(category => (
                                <div key={category} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={category}
                                        checked={newBook.category.includes(category)}
                                        onChange={handleCategoryChange}
                                        id={`category-${category}`}
                                    />
                                    <label className="form-check-label" htmlFor={`category-${category}`}>
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={handleCreate}>
                        Lưu Sách
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddBook;

