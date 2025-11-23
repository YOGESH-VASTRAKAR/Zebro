import React from 'react';
import { 
  ChevronDoubleLeftIcon,
  ChevronLeftIcon, 
  ChevronRightIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';
import './CategoriesPagination.css';

const CategoriesPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalProducts,
  productsPerPage 
}) => {
  const startIndex = (currentPage - 1) * productsPerPage;
  const startProduct = startIndex + 1;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

  const renderPageNumbers = () => {
    return Array.from(
      { length: Math.min(5, totalPages) },
      (_, i) => {
        let pageNum;
        if (totalPages <= 5) pageNum = i + 1;
        else if (currentPage <= 3) pageNum = i + 1;
        else if (currentPage >= totalPages - 2)
          pageNum = totalPages - 4 + i;
        else pageNum = currentPage - 2 + i;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`categories-pagination-number ${
              currentPage === pageNum
                ? "active"
                : ""
            }`}
          >
            {pageNum}
          </button>
        );
      }
    );
  };

  return (
    <div className="categories-pagination-container">
      {/* Showing entries info - Left side */}
      <div className="categories-pagination-info">
        Showing {startProduct} to {endProduct} of {totalProducts} products
      </div>

      {/* Pagination buttons - Right side */}
      <div className="categories-pagination-controls">
        {/* Pagination buttons */}
        <div className="categories-pagination-buttons">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`pagination-nav-btn ${
              currentPage === 1
                ? "disabled"
                : ""
            }`}
          >
            <ChevronDoubleLeftIcon className="nav-icon" />
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination-nav-btn ${
              currentPage === 1
                ? "disabled"
                : ""
            }`}
          >
            <ChevronLeftIcon className="nav-icon" />
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`pagination-nav-btn ${
              currentPage === totalPages
                ? "disabled"
                : ""
            }`}
          >
            <ChevronRightIcon className="nav-icon" />
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`pagination-nav-btn ${
              currentPage === totalPages
                ? "disabled"
                : ""
            }`}
          >
            <ChevronDoubleRightIcon className="nav-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPagination;