
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, deleteDoc } from "firebase/firestore";

import { db } from "../../../firebase/firebase";
import { auto } from "@popperjs/core";
interface Book {
    id: string;
    author: string;
    title: string;
    category: string;
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
const BookManagement: React.FC = () => {

    const [book, setBook] = useState<Book[]>([]);
    const [editBook, setEditBook] = useState<Book | null>(null); // Thêm state cho book cần chỉnh sửa
    const [editBookDetail, setEditBookDetail] = useState<BookDetail | null>(null); // Thêm state cho BookDetail cần chỉnh sửa
    const [isModalOpen, setIsModalOpen] = useState(false); // Để mở/đóng modal chỉnh sửa
    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = collection(db, 'Books');
            const booksSnapshot = await getDocs(booksCollection);
            const booksList: Book[] = booksSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Book[];
            setBook(booksList);
        };

        fetchBooks();
    }, []);
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
    const handleEditClick = async (bookId: string) => {
        const bookDocRef = doc(db, "Books", bookId);
        const bookDoc = await getDoc(bookDocRef);
        if (bookDoc.exists()) {
            const bookData = bookDoc.data();
            setEditBook({
                id: bookDoc.id,
                title: bookData.title,
                author: bookData.author,
                category: bookData.category,
                price: bookData.price,
                img: bookData.img,
                coupon: bookData.coupon,
                quantity: bookData.quantity,
            });

            // Nếu BookDetail tồn tại, lấy dữ liệu
            const bookDetailDocRef = doc(db, "DetailBook", bookId);
            const bookDetailDoc = await getDoc(bookDetailDocRef);
            if (bookDetailDoc.exists()) {
                const bookDetailData = bookDetailDoc.data();
                setEditBookDetail({
                    id: bookDetailDoc.id,
                    coverType: bookDetailData.coverType,
                    dimensions: bookDetailData.dimensions,
                    pageCount: bookDetailData.pageCount,
                    publishDate: bookDetailData.publishDate,
                    publisher: bookDetailData.publisher,
                });
            }

            setIsModalOpen(true);
        }
    };
    const handleAddCategory = () => {
        
    };
    const handleSaveChanges = async () => {
        if (editBook && editBookDetail) {
            // Cập nhật Book
            const bookDocRef = doc(db, "Books", editBook.id);
            await updateDoc(bookDocRef, {
                title: editBook.title,
                author: editBook.author,
                category: editBook.category,
                price: editBook.price,
                img: editBook.img,
                coupon: editBook.coupon,
                quantity: editBook.quantity,
            });

            // Cập nhật BookDetail
            const bookDetailDocRef = doc(db, "DetailBook", editBookDetail.id);
            await updateDoc(bookDetailDocRef, {
                coverType: editBookDetail.coverType,
                dimensions: editBookDetail.dimensions,
                pageCount: editBookDetail.pageCount,
                publishDate: editBookDetail.publishDate,
                publisher: editBookDetail.publisher,
            });

            // Đóng modal và làm mới danh sách sách
            setIsModalOpen(false);
            const booksCollection = collection(db, 'Books');
            const booksSnapshot = await getDocs(booksCollection);
            const booksList: Book[] = booksSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Book[];
            setBook(booksList);
        }
    };

    // Hàm đóng modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleDeleteBook = async (bookId: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
            try {
                // Xóa sách từ Firestore
                const bookDocRef = doc(db, "Books", bookId);
                await deleteDoc(bookDocRef);

                // Xóa chi tiết sách từ Firestore nếu tồn tại
                const bookDetailDocRef = doc(db, "DetailBook", bookId);
                await deleteDoc(bookDetailDocRef);

                // Cập nhật lại danh sách sách trên giao diện
                setBook(book.filter((b) => b.id !== bookId));

                alert("Đã xóa sách thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa sách:", error);
                alert("Có lỗi xảy ra khi xóa sách.");
            }
        }
    };
    return (
        <div className="container my-4">
            <h2>Quản Lý Sach</h2>


            <div className="overflow-y-scroll" style={{ maxHeight: 500 }}>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="bg-orange text-white">#</th>
                            <th scope="col" className="bg-orange text-white">title</th>
                            <th scope="col" className="bg-orange text-white">img</th>
                            <th scope="col" className="bg-orange text-white">author</th>
                            <th scope="col" className="bg-orange text-white">price</th>
                            <th scope="col" className="bg-orange text-white">coupon</th>
                            <th scope="col" className="bg-orange text-white">quantity</th>
                            <th scope="col" className="bg-orange text-white"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {book.map((book, index) => (
                            <tr key={book.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {book.title}
                                </td>
                                <td className=" py-4 whitespace-nowrap ">
                                    <img src={book.img} alt="" style={{ width: "200px" }} />
                                </td>
                                <td className="px-2 py-4">
                                    {Array.isArray(book.category) && book.category.length > 1 ? (
                                        book.category.map((cat, idx) => (
                                            <div
                                                key={idx}
                                                className="d-inline-block bg-orange rounded px-3 py-2 mb-2 shadow-sm me-2"
                                            >
                                                {cat}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-orange rounded px-3 py-2 shadow-sm">
                                            {Array.isArray(book.category) ? book.category[0] : book.category}
                                        </div>
                                    )}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    {book.price.toLocaleString("vi-VN")}đ
                                </td>
                                <td className="px-6 py-4">{book.coupon}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {book.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-link p-1 m-1"
                                            type="button"
                                            id={`dropdownMenu-${book.id}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="fa-solid fa-circle-info"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${book.id}`}>

                                            <li>
                                                <button className="dropdown-item" onClick={() => handleEditClick(book.id)}>
                                                    Sửa
                                                </button>
                                            </li>

                                            <li>
                                                <button className="dropdown-item" onClick={() => handleDeleteBook(book.id)}>
                                                    Xóa
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} aria-hidden={!isModalOpen}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chỉnh sửa Sách</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                {editBook && editBookDetail && (
                                    <div>
                                        <div>
                                            <label>Title:</label>
                                            <input
                                                type="text"
                                                value={editBook.title}
                                                onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                                                className="form-control"
                                            />
                                        </div>
                                        <div>
                                            <label>Author:</label>
                                            <input
                                                type="text"
                                                value={editBook.author}
                                                onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                                                className="form-control"
                                            />
                                        </div>
                                        <div>
                                            <label>Category:</label>
                                            <select
                                                value={editBook?.category || ""}
                                                onChange={(e) => setEditBook({ ...editBook!, category: e.target.value })}
                                                className="form-control"
                                            >
                                                <option value="" disabled>Chọn danh mục</option>
                                                {uniqueCategories.map((category, index) => (
                                                    <option key={index} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button onClick={handleAddCategory} className="btn btn-primary mt-2">
                                            Thêm Category
                                        </button>
                                        <div>
                                            <label>Price:</label>
                                            <input
                                                type="number"
                                                value={editBook.price}
                                                onChange={(e) => setEditBook({ ...editBook, price: +e.target.value })}
                                                className="form-control"
                                            />
                                        </div>
                                        <div>
                                            <label>Quantity:</label>
                                            <input
                                                type="number"
                                                value={editBook.quantity}
                                                onChange={(e) => setEditBook({ ...editBook, quantity: +e.target.value })}
                                                className="form-control"
                                            />
                                        </div>
                                        {/* BookDetail fields */}
                                        <div>
                                            <label>Cover Type:</label>
                                            <input
                                                type="text"
                                                value={editBookDetail.coverType}
                                                onChange={(e) => setEditBookDetail({ ...editBookDetail, coverType: e.target.value })}
                                                className="form-control"
                                            />
                                        </div>
                                        <div>
                                            <label>Dimensions:</label>
                                            <input
                                                type="text"
                                                value={editBookDetail.dimensions}
                                                onChange={(e) => setEditBookDetail({ ...editBookDetail, dimensions: e.target.value })}
                                                className="form-control"
                                            />
                                        </div>
                                        <div>
                                            <label>Page Count:</label>
                                            <input
                                                type="text"
                                                value={editBookDetail.pageCount}
                                                onChange={(e) =>
                                                    setEditBookDetail({
                                                        ...editBookDetail,
                                                        pageCount: e.target.value,
                                                    })
                                                }
                                                className="form-control"
                                            />
                                        </div>
                                        <div>
                                            <label>Publish Date:</label>
                                            <input
                                                type="date"
                                                value={editBookDetail.publishDate}
                                                onChange={(e) =>
                                                    setEditBookDetail({
                                                        ...editBookDetail,
                                                        publishDate: e.target.value,
                                                    })
                                                }
                                                className="form-control"
                                            />
                                        </div>
                                        <div>
                                            <label>Publisher:</label>
                                            <input
                                                type="text"
                                                value={editBookDetail.publisher}
                                                onChange={(e) =>
                                                    setEditBookDetail({
                                                        ...editBookDetail,
                                                        publisher: e.target.value,
                                                    })
                                                }
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveChanges}
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookManagement;

