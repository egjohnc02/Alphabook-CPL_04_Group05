import { Link } from "react-router-dom";
import BookData from "./BookData";
import "./style.css";

type CategoryProps = {
  onCategorySelect: (category: string) => void;
};

const Category: React.FC<CategoryProps> = ({ onCategorySelect }) => {
  const uniqueCategories = [
    ...new Set(BookData.flatMap((item) => item.category).filter(Boolean)),
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
