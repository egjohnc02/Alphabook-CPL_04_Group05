import { Link } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.tsx";

type CategoryProps = {
  onCategorySelect: (category: string) => void;
};

const Category: React.FC<CategoryProps> = ({ onCategorySelect }) => {
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

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

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    console.log(category);
  };

  const getCategorySlug = (category: string): string => {
    return category.toLowerCase().replace(/\s+/g, "-");
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
                  to={`/book/${getCategorySlug(category)}`}
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