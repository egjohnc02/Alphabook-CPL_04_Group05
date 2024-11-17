
import { Link, useParams } from "react-router-dom";
import BookStore from "../../assets/home/bookstore_image.webp";
import Category from "./Category";
import Price from "./Price";
import SortOptions from "./Sort.tsx";
import Pagination from "./Pagination";
import "./style.css";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.tsx";

// Define types for the book data
interface Book {
  id: string;
  title: string;
  category: string;
  price: number;
  img: string;
  coupon: string;
}

function Book() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>('Mặc định'); // Add state for sorting

  const [book, setBook] = useState<Book[]>([]);

  const itemsPerPage = 9;



  useEffect(() => {
    const fetchBooks = async () => {
      const bookCollection = collection(db, "Books");
      const bookSnapshot = await getDocs(bookCollection);
      const bookList = bookSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBook(bookList);
    };
    fetchBooks();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceFilterChange = (range: string) => {
    setSelectedPriceRange(range);
  };

  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
  };

  // Hàm lọc sách theo price range
  const filterBooksByPriceRange = (books: Book[], selectedPriceRange: string) => {
    switch (selectedPriceRange) {
      case "(<100000)":
        return books.filter((book) => book.price < 100000);
      case "(>=100000 AND <=200000)":
        return books.filter((book) => book.price >= 100000 && book.price <= 200000);
      case "(>=200000 AND <=300000)":
        return books.filter((book) => book.price >= 200000 && book.price <= 300000);
      case "(>=300000 AND <=500000)":
        return books.filter((book) => book.price >= 300000 && book.price <= 500000);
      case "(>=500000 AND <=1000000)":
        return books.filter((book) => book.price >= 500000 && book.price <= 1000000);
      case "(>1000000)":
        return books.filter((book) => book.price > 1000000);
      default:
        return books;
    }
  };

  const sortedBooks = (books: Book[], sortOption: string) => {
    let sortedBooksArray = [...books];
    switch (sortOption) {
      case 'Tên A-Z':
        sortedBooksArray.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Tên Z-A':
        sortedBooksArray.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'Giá tăng dần':
        sortedBooksArray.sort((a, b) => a.price - b.price);
        break;
      case 'Giá giảm dần':
        sortedBooksArray.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sortedBooksArray;
  };
  const filterBooksByCategory = (books: Book[], selectedCategory: string | null) => {
    if (!selectedCategory) return books;
    return books.filter((book) => {
      if (Array.isArray(book.category)) {
        return book.category.some((cat) =>
          cat.toLowerCase().replace(/\s+/g, "-").includes(selectedCategory.toLowerCase().replace(/\s+/g, "-"))
        );
      }
      return book.category.toLowerCase().replace(/\s+/g, "-").includes(selectedCategory.toLowerCase().replace(/\s+/g, "-"));
    });
  };
  const filteredAndPagedBooks = (
    books: Book[],
    sortOption: string,
    selectedCategory: string | null,
    selectedPriceRange: string,
    currentPage: number,
    itemsPerPage: number 
  ) => {
    if (!Array.isArray(books) || books.length === 0) {
      return []; 
    }

   
    const sortedBooksArray = sortedBooks(books, sortOption);

   
    const categoryFilteredBooks = selectedCategory
      ? sortedBooksArray.filter((book) => {
        if (Array.isArray(book.category)) {
          return book.category.some((cat) =>
            cat
              .toLowerCase()
              .replace(/\s+/g, "-")
              .includes(selectedCategory.toLowerCase().replace(/\s+/g, "-"))
          );
        }
        return book.category
          .toLowerCase()
          .replace(/\s+/g, "-")
          .includes(selectedCategory.toLowerCase().replace(/\s+/g, "-"));
      })
      : sortedBooksArray;

   
    const filteredBooks = filterBooksByPriceRange(
      categoryFilteredBooks,
      selectedPriceRange
    );

  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return filteredBooks.slice(startIndex, endIndex);
  };


  const totalPages = Math.ceil(
    filterBooksByPriceRange(
      filterBooksByCategory(sortedBooks(book, sortOption), selectedCategory), 
      selectedPriceRange
    ).length / itemsPerPage
  );
  
  
  console.log("Total Pages:", totalPages); 
  const currentBooks = filteredAndPagedBooks(
    book, 
    sortOption, 
    selectedCategory, 
    selectedPriceRange,
    currentPage, 
    itemsPerPage 
  );

  return (
    <div>
      <div className="section warp_background">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <img
              src={BookStore}
              alt="BookStore"
              className="img-fluid"
              style={{ maxWidth: "60%", padding: "20px 0px 20px 0px" }}
            />
          </div>

          <div className="bg_collection section">
            <div className="row">
              <aside className="dqdt-sidebar sidebar left-content col-lg-3 col-md-4 col-sm-4">
                <Category onCategorySelect={handleCategorySelect} />
                <Price
                  selectedPriceRange={selectedPriceRange}
                  handlePriceFilterChange={handlePriceFilterChange}
                />
                <aside className="aside-item banner-sidebar">
                  <a href="">
                    <img
                      className="lazyload loaded"
                      src="//bizweb.dktcdn.net/100/197/269/themes/890698/assets/sidebar_image.jpg?1730705463447"
                      data-src="//bizweb.dktcdn.net/100/197/269/themes/890698/assets/sidebar_image.jpg?1730705463447"
                      alt="banner"
                      data-was-processed="true"
                    />
                  </a>
                </aside>
              </aside>

              <div className="main_container collection col-lg-9 col-md-12 col-sm-12">
                <div className="warp-srt-title">
                  <h1 className="title-module d-none">Tất cả sản phẩm</h1>
                  <SortOptions onSortOptionChange={handleSortOptionChange} />
                </div>
                <div className="category-products products">
                  <section className="products-view products-view-grid collection_reponsive">
                    <div className="row">
                      {currentBooks.map((item) => {
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
                                    <a href="" title={item.title}>
                                      {item.title}
                                    </a>
                                  </h3>
                                  <div className="price-box">
                                    <span className="price">
                                      {(
                                        item.coupon && typeof item.coupon === 'string' && item.coupon.includes('%')
                                          ? item.price - (item.price * parseInt(item.coupon) / 100)
                                          : item.price
                                      ).toLocaleString("vi-VN")}
                                      đ
                                    </span>

                                    <span className="compare-price">{item.price.toLocaleString("vi-VN")}đ</span>

                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Pagination
                      totalPages={totalPages}
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
