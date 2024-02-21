import React from "react";

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  // Funkcja do generowania numerów stron
  const generatePageNumbers = () => {
    const visiblePages = 5; // Ilość stron widocznych na stronie

    // Rozpocznij od strony, którą wyświetlasz
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Jeśli jesteś na końcu, przesuń początek do tyłu
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // Utwórz listę numerów stron
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Funkcja do obsługi kliknięcia strony
  const handleClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Wygeneruj numery stron
  const pageNumbers = generatePageNumbers();

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        {/* Strzałka do poprzedniej strony */}
        <li>
          <a
            className="pagination-previous"
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Poprzednia
          </a>
        </li>

        {/* Numery stron */}
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

        {/* Strzałka do następnej strony */}
        <li>
          <a
            className="pagination-next"
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Następna
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
