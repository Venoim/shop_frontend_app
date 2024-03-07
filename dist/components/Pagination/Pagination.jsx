"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Pagination = function (_a) {
    var currentPage = _a.currentPage, onPageChange = _a.onPageChange, totalPages = _a.totalPages;
    var generatePageNumbers = function () {
        var visiblePages = 5;
        var startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        var endPage = Math.min(totalPages, startPage + visiblePages - 1);
        if (endPage === totalPages) {
            startPage = Math.max(1, endPage - visiblePages + 1);
        }
        var pageNumbers = [];
        for (var i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    var handleClick = function (page) {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };
    var pageNumbers = generatePageNumbers();
    return (<nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <ul className="pagination-list">
        <li>
          <a className="pagination-previous" onClick={function () { return handleClick(currentPage - 1); }}>
            Poprzednia
          </a>
        </li>

        {pageNumbers.map(function (number) { return (<li key={number}>
            <a className={"pagination-link ".concat(number === currentPage ? "is-current" : "")} onClick={function () { return handleClick(number); }}>
              {number}
            </a>
          </li>); })}

        <li>
          <a className="pagination-next" onClick={function () { return handleClick(currentPage + 1); }}>
            Następna
          </a>
        </li>
      </ul>
    </nav>);
};
exports.default = Pagination;
