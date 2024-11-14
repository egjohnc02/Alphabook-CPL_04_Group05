import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import BookStore from "../../assets/home/bookstore_image.webp";
import Category from "./Category";
import Price from "./Price";
import Filter from "./Filter";
import BookData from "./BookData";
import Pagination from "./Pagination";
import Start from "./Start";
import "./style.css";
import { db } from "../../firebase/firebase.tsx";

// Define types for the book data
type Book = {
  id: number;
  title: string;
  category: string;
  price: number;
  img: string;
  coupon: string;
}

function Book() {
  const books: Book[] = BookData;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("Mặc định");

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

  const itemsPerPage = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    console.log(selectedCategory);
  };

  const filteredAndPagedBooks = (
    books: Book[],
    sortOption: string,
    selectedCategory: string | null,
    selectedPriceRange: string,
    currentPage: number
  ) => {
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

  const filteredBooks = filterBooksByPriceRange(
    selectedCategory
      ? book.filter((b) => {
          if (Array.isArray(b.category)) {
            return b.category.some((cat) =>
              cat.toLowerCase().includes(selectedCategory.toLowerCase())
            );
          }

          return b.category
            .toLowerCase()
            .includes(selectedCategory.toLowerCase());
        })
      : book,
    selectedPriceRange
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const currentBooks = filteredAndPagedBooks(
    book,
    sortOption,
    selectedCategory,
    selectedPriceRange,
    currentPage
  );


  const currentFilteredBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
              </aside>
              <div className="main_container collection col-lg-9 col-md-12 col-sm-12">
                <div className="warp-srt-title">
                  <h1 className="title-module d-none">Tất cả sản phẩm</h1>
                  {/* <Filter /> */}
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
                                      {(item.coupon &&
                                      typeof item.coupon === "string" &&
                                      item.coupon.includes("%")
                                        ? item.price -
                                          (item.price * parseInt(item.coupon)) /
                                            100
                                        : item.price
                                      ).toLocaleString("vi-VN")}
                                      đ{" "}
                                    </span>

                                    <span className="compare-price">
                                      {item.price.toLocaleString("vi-VN")}đ
                                    </span>
                                  </div>
                                  {/* <Start /> */}
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
