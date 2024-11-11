import { useState, useEffect } from 'react';
import BookStore from "../../assets/home/bookstore_image.webp";
import Category from "./Category";
import Price from "./Price";
import BookData from "./BookData";
import Pagination from "./Pagination";
import "./style.css";

// Define types for the book data
type Book = {
  id: number;
  title: string;
  category: string | string[];
  price: number;
  img: string;
};

function Book() {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Set the number of items per page to 6
  const itemsPerPage = 6;

  // Calculate the books to display on the current page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Use useEffect to log the selected category after it has been updated
  useEffect(() => {
    if (selectedCategory !== null) {
      console.log(selectedCategory);
    }
  }, [selectedCategory]);

  // Filter books based on selectedCategory
  const filteredBooks = selectedCategory
    ? BookData.filter((book) => {
        if (Array.isArray(book.category)) {
          return book.category.some((cat) =>
            cat.toLowerCase().replace(/\s+/g, '-').includes(selectedCategory.toLowerCase().replace(/\s+/g, '-'))
          );
        }
        return book.category.toLowerCase().replace(/\s+/g, '-').includes(selectedCategory.toLowerCase().replace(/\s+/g, '-'));
      })
    : BookData;

  // Use filteredBooks for pagination
  const currentFilteredBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="section warp_background">
        <div className="container">
          <img
            src={BookStore}
            alt="BookStore"
            className="img-fluid"
            style={{ maxWidth: "60%", padding: "20px 0px 20px 0px" }}
          />

          <div className="bg_collection section">
            <div className="row">
              <aside className="dqdt-sidebar sidebar left-content col-lg-3 col-md-4 col-sm-4">
                <Category onCategorySelect={handleCategorySelect} />
                <Price />
              </aside>
              <div className="main_container collection col-lg-9 col-md-12 col-sm-12">
                <div className="warp-srt-title">
                  <h1 className="title-module d-none">Tất cả sản phẩm</h1>
                  {/* <Filter /> */}
                </div>
                <div className="category-products products">
                  <section className="products-view products-view-grid collection_reponsive">
                    <div className="row">
                      {currentFilteredBooks.map((item) => {
                        return (
                          <div className="col-4 product-col" key={item.id}>
                            <div className="item_product_main">
                              <form action="">
                                <a href="" className="image_thumb">
                                  <img
                                    src={item.img}
                                    className="lazyload img-responsive center-block loaded"
                                    alt={item.title}
                                  />
                                </a>
                                <div className="info-product">
                                  <h3 className="product-name">
                                    <a href="" title={item.title}>{item.title}</a>
                                  </h3>
                                  <div className="price-box">
                                    {item.price.toLocaleString('vi-VN')}đ
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pagination is always shown, regardless of category */}
                    <Pagination
                      totalPages={Math.ceil(filteredBooks.length / itemsPerPage)}  // Update total pages based on filteredBooks
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
