import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="section pagenav" style={{textAlign: "center"}}>
      <nav className="clearfix relative nav_pagi w_100">
        <ul className="pagination clearfix">
          {/* Previous Page Button */}
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={handlePrevPage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path
                  d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                ></path>
              </svg>
            </a>
          </li>

          {/* Page Numbers */}
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${currentPage === pageNumber + 1 ? "active" : ""}`}
            >
              <a
                className="page-link"
                href="javascript:;"
                onClick={() => handlePageClick(pageNumber + 1)}
              >
                {pageNumber + 1}
              </a>
            </li>
          ))}

          {/* Next Page Button */}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={handleNextPage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path
                  d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
