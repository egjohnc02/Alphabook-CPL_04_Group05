import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import { db } from "../../../../firebase/firebase";


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
interface EditBookProps {
    bookId: string;
    onSave: (updatedBook: Book) => void;
    onClose: () => void;
}
const EditBook: React.FC<EditBookProps> = ({ bookId, onSave, onClose }) => {

    const [editBook, setEditBook] = useState<Book | null>(null); 
    const [editBookDetail, setEditBookDetail] = useState<BookDetail | null>(null); 
    const [isModalOpen] = useState(false); 
    const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false); 
    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState<string>("");

    useEffect(() => {
        const fetchBookData = async () => {
            const bookDocRef = doc(db, "Books", bookId);
            const bookDoc = await getDoc(bookDocRef);

            if (bookDoc.exists()) {
                const bookData = bookDoc.data();
                setEditBook({
                    id: bookDoc.id,
                    title: bookData.title || "",
                    author: bookData.author || "",
                    category: bookData.category || [],
                    price: bookData.price || 0,
                    img: bookData.img || "",
                    coupon: bookData.coupon || "",
                    quantity: bookData.quantity || 0,
                });

                const bookDetailDocRef = doc(db, "DetailBook", bookId);
                const bookDetailDoc = await getDoc(bookDetailDocRef);

                if (bookDetailDoc.exists()) {
                    const bookDetailData = bookDetailDoc.data();
                    setEditBookDetail({
                        id: bookDetailDoc.id,
                        coverType: bookDetailData.coverType || "",
                        dimensions: bookDetailData.dimensions || "",
                        pageCount: bookDetailData.pageCount || 0,
                        publishDate: bookDetailData.publishDate || "",
                        publisher: bookDetailData.publisher || "",
                    });
                }
            }
        };

        fetchBookData();
    }, [bookId]);

    useEffect(() => {
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
    const handleAddCategory = async () => {
        if (editBook && newCategory) {
            const currentCategories = editBook.category || [];
            if (!currentCategories.includes(newCategory)) {
                try {
                    // Cập nhật sách với category mới
                    await updateDoc(doc(db, "Books", bookId), {
                        category: [...currentCategories, newCategory],
                    });
                    setEditBook({ ...editBook, category: [...currentCategories, newCategory] });
                    alert("Danh mục mới đã được thêm!");
                } catch (error) {
                    console.error("Lỗi khi thêm danh mục:", error);
                    alert("Không thể thêm danh mục!");
                }
            } else {
                alert("Danh mục đã tồn tại!");
            }
        }
    };
    const handleSave = async () => {
        if (editBook && editBookDetail) {
            const bookDocRef = doc(db, "Books", bookId);
    
            try {
                // Cập nhật thông tin sách
                await updateDoc(bookDocRef, {
                    title: editBook.title,
                    author: editBook.author,
                    category: editBook.category,
                    price: editBook.price,
                    img: editBook.img, 
                    coupon: editBook.coupon,
                    quantity: editBook.quantity,
                });
    
                const bookDetailDocRef = doc(db, "DetailBook", bookId);
                await updateDoc(bookDetailDocRef, {
                    coverType: editBookDetail.coverType,
                    dimensions: editBookDetail.dimensions,
                    pageCount: editBookDetail.pageCount,
                    publishDate: editBookDetail.publishDate,
                    publisher: editBookDetail.publisher,
                });
    
                onSave(editBook); // Trả lại thông tin sách đã sửa
                onClose(); // Đóng modal sau khi lưu
            } catch (error) {
                console.error("Lỗi khi cập nhật sách:", error);
                alert("Không thể cập nhật sách!");
            }
        }
    };
    
    const handleCloseModal = () => {
        onClose();
    };

    const handleDeleteCategory = (categoryToDelete: string) => {
        if (editBook?.category) {
            const updatedCategories = editBook.category.filter(category => category !== categoryToDelete);
            setEditBook({ ...editBook, category: updatedCategories });
        }
    };

    
    return (
        <div>
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
                                        <label>Ảnh Sách:</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setEditBook({ ...editBook, img: e.target.value })}
                                            className="form-control"
                                        />
                                        { <img src={editBook.img} alt={editBook.img} style={{ width: '100px', marginTop: '10px' }} />}
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
                                        {editBook?.category.map((category, index) => (
                                            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="d-inline-block bg-white rounded px-1 py-1 mb-1 shadow-sm me-1">{category}</span> {/* Hiển thị danh mục */}
                                                <div>

                                                    <button
                                                        onClick={() => handleDeleteCategory(category)}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {!isAddingCategory && (
                                            <button
                                                onClick={() => setIsAddingCategory(true)}
                                                className="btn btn-secondary mt-2"
                                            >
                                                Thêm Category
                                            </button>
                                        )}
                                        {isAddingCategory && (
                                            <div className="mt-2">
                                                <select
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                    className="form-control mb-2"
                                                >
                                                    <option value="" disabled>
                                                        Chọn danh mục
                                                    </option>
                                                    {uniqueCategories.map((category, index) => (
                                                        <option key={index} value={category}>
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>

                                                <button
                                                    onClick={handleAddCategory}
                                                    className="btn btn-primary"
                                                >
                                                    Thêm Category
                                                </button>

                                                <button
                                                    onClick={() => setIsAddingCategory(false)}
                                                    className="btn btn-danger"
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        )}
                                    </div>


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
                                onClick={handleSave}
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBook;