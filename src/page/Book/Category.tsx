import { Link } from "react-router-dom";
import "./style.css";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase.tsx";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

type CategoryProps = {
  onCategorySelect: (category: string) => void;
};
interface Book {
  id: string;
  title: string;
  category: string;
  price: number;
  img: string;
}

const Category: React.FC<CategoryProps> = ({ onCategorySelect }) => {
  
  const [book, setBook] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const bookCollection = collection(db, "books");
      const bookSnapshot = await getDocs(bookCollection);
      const bookList = bookSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBook(bookList);
      console.log(bookList);
    };
    fetchBooks();
  }, []);

  const uniqueCategories = [
    ...new Set(book.flatMap((item) => item.category).filter(Boolean)),
  ];
  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    console.log(category);
  };

  const getCategorySlug = (category: string): string => {
    if (typeof category === "string") {
      return category.toLowerCase().replace(/\s+/g, "-");
    }
    return "";
  };

  return (
    <aside className="aside-item sidebar-category collection-category clear-fix">
      <h2 className="title-module">DANH MỤC SÁCH</h2>
      <div className="aside-content">
        <nav className="nav-category navbar-toggleable-md">
          <ul
            className="nav navbar-pills"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: "10px",
              listStyle: "none",
              padding: "0",
            }}
          >
            {uniqueCategories.map((category, index) => (
              <li key={index} className="nav-item">
                <Link
                  className="nav-link"
                  to={`/category/${getCategorySlug(category)}`}
                  style={{ padding: "10px 15px 10px 0px" }}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Category;
