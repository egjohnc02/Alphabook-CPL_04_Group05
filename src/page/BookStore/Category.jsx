import { Link } from "react-router-dom";
import BookData from "./BookData";
import "./style.css";
function Category( onCategorySelect ) {
  const uniqueCategories = [
    ...new Set(BookData.map((item) => item.category).flat()),
  ];
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <aside className="aside-item sidebar-category collection-category clear-fix">
      <h2 className="title-module">DANH MỤC SÁCH</h2>
      <div className="aside-content">
        <nav className="nav-category navbar-toggleable-md">
          <ul className="nav navbar-pills" style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: "10px",
              listStyle: "none",
              padding: "0",
            }} >
            {uniqueCategories.map((category, index) => (
              <li key={index} className="nav-item" >
                <Link
                  className="nav-link"
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
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
}
export default Category;