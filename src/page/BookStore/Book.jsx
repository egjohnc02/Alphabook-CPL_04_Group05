import BookStore from "../../assets/home/bookstore_image.webp";
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Category from "./Category";
import Price from "./Price";
import Filter from "./Filter";
import BookData from "./BookData";
import Pagination from "./Pagination";
import "./style.css";
function Book() {
  const books = BookData;


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const currentBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
);
const handlePageChange = (page) => {
  setCurrentPage(page);
};
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log(selectedCategory)
  };

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
  // const [selectedPriceRanges, setSelectedPriceRanges] = useState([]); // State for selected price ranges

  // const handlePriceFilterChange = (value) => {
  //   setSelectedPriceRanges((prev) => {
  //     if (prev.includes(value)) {
  //       return prev.filter((item) => item !== value); // Remove the price range if already selected
  //     }
  //     return [...prev, value]; // Add the price range if not selected
  //   });
  // };
  

  // const filteredBooks = BookData.filter((book) => {
  //   let isCategoryMatched = true;

  //   // Filter by selected category
  //   if (selectedCategory) {
  //     isCategoryMatched = book.category
  //       .toLowerCase()
  //       .includes(selectedCategory.toLowerCase());
  //   }

  //   // Filter by selected price range
  //   const isPriceMatched = selectedPriceRanges.every((range) => {
  //     if (range === "(<100000)") return book.price < 100000;
  //     if (range === "(>=100000 AND <=200000)") return book.price >= 100000 && book.price <= 200000;
  //     if (range === "(>=200000 AND <=300000)") return book.price >= 200000 && book.price <= 300000;
  //     if (range === "(>=300000 AND <=500000)") return book.price >= 300000 && book.price <= 500000;
  //     if (range === "(>=500000 AND <=1000000)") return book.price >= 500000 && book.price <= 1000000;
  //     if (range === "(>1000000)") return book.price > 1000000;
  //     return true;
  //   });

  //   return isCategoryMatched && isPriceMatched;
  // });
  return (
    <div>
      <div className="section warp_background">
        <div className="container">
          <img
            src={BookStore}
            alt="BookStore"
            className="img-fluid"
            style={{ maxwidth: "60%", padding: " 20px 0px 20px 0px" }}
          />

          <div className="bg_collection section">
            <div className="row">
              <aside class="dqdt-sidebar sidebar left-content col-lg-3 col-md-4 col-sm-4">
                <Category onCategorySelect={handleCategorySelect} / >
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
                      {currentBooks.map((item, index) => {
                        return (
                          <div
                            className="col-4 product-col"
                            key={index}
                          >
                            <div className="item_product_main">                   
                              <form action="">
                                <a href="" className="image_thumb">
                                  <img src={item.img} className="lazyload img-responsive center-block loaded" alt="" />
                                </a>
                                <div className="info-product">
                                 
                                  <h3 className="product-name">
                                    <a href="" title="">{item.title}</a>
                                  </h3>
                                  <div className="price-box">{item.price.toLocaleString('vi-VN')}đ</div>
                                </div>
                              </form>
                            </div>
                          </div>
                        );
                      })}
                    
                    </div>
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
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
