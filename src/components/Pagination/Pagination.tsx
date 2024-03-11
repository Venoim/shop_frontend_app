import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const generatePageNumbers = () => {
    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    const pageNumbers: Array<number> = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        <li>
          <a
            className="pagination-previous"
            onClick={() => handleClick(currentPage - 1)}
            // disabled={currentPage === 1}
          >
            Previous
          </a>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              className={`pagination-link ${
                number === currentPage ? "is-current" : ""
              }`}
              onClick={() => handleClick(number)}
            >
              {number}
            </a>
          </li>
        ))}

        <li>
          <a
            className="pagination-next"
            onClick={() => handleClick(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
