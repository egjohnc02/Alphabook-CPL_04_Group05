import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs, updateDoc, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import Pagination from "../../../../page/Book/Pagination";
import EditBook from "./EditBook";

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

const BookList = () => {
    const [book, setBook] = useState<Book[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null); // State lưu id của sách được chọn để chỉnh sửa
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 2;
    const totalPages = Math.ceil(book.length / 2); // Làm tròn lên số nguyên gần nhất
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
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
    const handleEdit = (bookId: string) => {
        setSelectedBookId(bookId);
        setIsModalOpen(true); // Mở Modal chỉnh sửa
        
    };

    const handleSave = (updatedBook: Book) => {
        // Cập nhật lại danh sách sách sau khi sửa xong
        const updatedBooks = book.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
        );
        setBook(updatedBooks);
        setIsModalOpen(false); // Đóng Modal sau khi lưu
        setSelectedBookId(null); // Xóa ID đã chọn sau khi lưu

    };
    const handleCloseModal = () => {
        setIsModalOpen(false); // Đóng modal mà không lưu
        setSelectedBookId(null); // Xóa ID đã chọn khi đóng modal
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
        <div>
            <div className="" style={{ height: "auto" }}>
                <table className="table table-striped border">
                    <thead className="thead-dark border">
                        <tr>
                            <th scope="col" className="bg-white text-black text-nowrap">#</th>
                            <th scope="col" className="bg-white text-black text-nowrap">Tiêu Đề</th>
                            <th scope="col" className="bg-white text-black text-nowrap">Hình Ảnh</th>
                            <th scope="col" className="bg-white text-black text-nowrap">Tác Giả</th>
                            <th scope="col" className="bg-white text-black text-nowrap">Giá</th>
                            <th scope="col" className="bg-white text-black text-nowrap">Mã Giảm Gía</th>
                            <th scope="col" className="bg-white text-black text-nowrap">Số Lượng</th>
                            <th scope="col" className="bg-white text-black text-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {book.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((book, index) => (
                            <tr key={book.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
                                                className="d-inline-block bg-whitespace rounded px-3 py-2 mb-2 shadow-sm me-2"
                                            >
                                                {cat}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-whitespace rounded px-3 py-2 shadow-sm">
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
                                            <i className="fa-solid fa-bars"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${book.id}`}>
                                            {/* <li>
                                                <button className="dropdown-item" onClick={handleViewClick}>
                                                    Xem
                                                </button>
                                            </li> */}
                                            <li>
                                                <button className="dropdown-item" onClick={() => handleEdit(book.id)}>
                                                    Sửa
                                                </button>
                                            </li>

                                            <li>
                                                <button className="dropdown-item" onClick={() => handleDeleteBook(book.id)}>
                                                    Xóa
                                                </button>
                                            </li>
                                        </ul>
                                        {isModalOpen && selectedBookId && (
                                            <EditBook
                                                bookId={selectedBookId}
                                                onSave={handleSave}
                                                onClose={handleCloseModal}
                                            />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default BookList;
