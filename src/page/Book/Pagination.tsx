import React from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const getVisiblePages = (totalPages: number, currentPage: number): (number | string)[] => {
  const visiblePages: (number | string)[] = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    // Hiển thị toàn bộ các trang nếu số trang <= 5
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    // Trang đầu
    visiblePages.push(1);

    if (currentPage > 3) {
      visiblePages.push("...");
    }

    // Các trang xung quanh trang hiện tại
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (currentPage < totalPages - 2) {
      visiblePages.push("...");
    }

    // Trang cuối
    visiblePages.push(totalPages);
  }

  return visiblePages;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const visiblePages = getVisiblePages(totalPages, currentPage);

  return (
    <div className="section pagenav" style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
      <nav className="clearfix relative nav_pagi w_100">
        <ul className="pagination clearfix" style={{ listStyleType: "none", padding: 0 }}>
          {/* Previous Page Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ border: "none", background: "#f47920" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" width="10">
                <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"></path>
              </svg>
            </button>
          </li>

          {/* Page Numbers */}
          {visiblePages.map((page, index) => (
            <li key={index} className={`page-item ${currentPage === page ? "active" : ""}`}>
              {typeof page === "number" ? (
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                  style={{
                    margin: "0 5px",
                    fontWeight: currentPage === page ? "bold" : "normal",
                    border: currentPage === page ? "1px solid #000" : "1px solid #ccc",
                    backgroundColor: currentPage === page ? "#f0f0f0" : "none",
                    color: "#f47920",
                  }}
                >
                  {page}
                </button>
              ) : (
                <span
                  key={index}
                  className="page-link disabled"
                  style={{
                    margin: "0 5px",
                    color: "#f47920",
                    cursor: "default",
                  }}
                >
                  {page}
                </span>
              )}
            </li>
          ))}

          {/* Next Page Button */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ border: "none", background: "#f47920" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" width="10">
                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
