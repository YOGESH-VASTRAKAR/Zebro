import React from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/solid';
import './CategoriesPagination.css';

const CategoriesPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalProducts,
  productsPerPage 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div className="categories-pagination-container">
      {/* Products Count */}
      <div className="categories-pagination-info">
        Showing {startProduct}-{endProduct} of {totalProducts} products
      </div>

      {/* Pagination Controls */}
      <div className="categories-pagination-controls">
        {/* Previous Button */}
        <button
          className={`categories-pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="categories-pagination-icon" />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="categories-pagination-numbers">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`categories-pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          className={`categories-pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRightIcon className="categories-pagination-icon" />
        </button>
      </div>
    </div>
  );
};

export default CategoriesPagination;