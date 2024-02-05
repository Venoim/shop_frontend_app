import React from "react";

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              className={`pagination-link ${
                number === currentPage ? "is-current" : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
