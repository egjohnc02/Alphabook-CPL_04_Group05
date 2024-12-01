import AddBook from "./AddBook.tsx";
import BookList from "./BookList";

const BookManagement: React.FC = () => {
    return (
        <div className="container my-4">
            
            <AddBook />
            <BookList/>
            

            
        </div>
    );
};

export default BookManagement;
