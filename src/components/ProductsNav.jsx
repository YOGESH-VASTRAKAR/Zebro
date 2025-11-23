import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FunnelIcon,
  ChevronDownIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import FilterAllProducts from './FilterAllProducts';
import './ProductsNav.css';

// Custom Grid Icons
const Grid4x4Icon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="3" height="3" rx="0.5"/>
    <rect x="5" y="1" width="3" height="3" rx="0.5"/>
    <rect x="9" y="1" width="3" height="3" rx="0.5"/>
    <rect x="13" y="1" width="3" height="3" rx="0.5"/>
    
    <rect x="1" y="5" width="3" height="3" rx="0.5"/>
    <rect x="5" y="5" width="3" height="3" rx="0.5"/>
    <rect x="9" y="5" width="3" height="3" rx="0.5"/>
    <rect x="13" y="5" width="3" height="3" rx="0.5"/>
    
    <rect x="1" y="9" width="3" height="3" rx="0.5"/>
    <rect x="5" y="9" width="3" height="3" rx="0.5"/>
    <rect x="9" y="9" width="3" height="3" rx="0.5"/>
    <rect x="13" y="9" width="3" height="3" rx="0.5"/>
    
    <rect x="1" y="13" width="3" height="3" rx="0.5"/>
    <rect x="5" y="13" width="3" height="3" rx="0.5"/>
    <rect x="9" y="13" width="3" height="3" rx="0.5"/>
    <rect x="13" y="13" width="3" height="3" rx="0.5"/>
  </svg>
);

const Grid3x3Icon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="4" height="4" rx="0.5"/>
    <rect x="6" y="1" width="4" height="4" rx="0.5"/>
    <rect x="11" y="1" width="4" height="4" rx="0.5"/>
    
    <rect x="1" y="6" width="4" height="4" rx="0.5"/>
    <rect x="6" y="6" width="4" height="4" rx="0.5"/>
    <rect x="11" y="6" width="4" height="4" rx="0.5"/>
    
    <rect x="1" y="11" width="4" height="4" rx="0.5"/>
    <rect x="6" y="11" width="4" height="4" rx="0.5"/>
    <rect x="11" y="11" width="4" height="4" rx="0.5"/>
  </svg>
);

const ProductsNav = ({ onGridViewChange, currentGridView }) => {
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handleSortChange = (value) => {
    setSortBy(value);
    setShowSortDropdown(false);
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Default';
  };

  const handleFilterClick = () => {
    setShowFilterModal(true);
    setShowFilters(false);
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <div className="products-nav-section">
        <Container>
          {/* Desktop Layout */}
          <Row className="align-items-center products-nav-desktop">
            {/* Left Side - Grid View Options */}
            <Col md={6} className="products-nav-left-col">
              <div className="products-grid-options">
                <span className="products-grid-label">View:</span>
                <div className="products-grid-buttons">
                  <button 
                    className={`products-grid-btn ${currentGridView === '4x4' ? 'active' : ''}`}
                    onClick={() => onGridViewChange('4x4')}
                    title="4x4 Grid View"
                  >
                    <Grid4x4Icon />
                    <span className="btn-text">4×4 Grid</span>
                  </button>
                  <button 
                    className={`products-grid-btn ${currentGridView === '3x3' ? 'active' : ''}`}
                    onClick={() => onGridViewChange('3x3')}
                    title="3x3 Grid View"
                  >
                    <Grid3x3Icon />
                    <span className="btn-text">3×3 Grid</span>
                  </button>
                </div>
              </div>
            </Col>

            {/* Right Side - Sort and Filter Options */}
            <Col md={6} className="products-nav-right-col">
              <div className="products-sort-filter-options">
                {/* Custom Sort Dropdown */}
                <div className="products-sort-container">
                  <label className="products-sort-label">Sort by:</label>
                  <div className="products-custom-dropdown">
                    <button 
                      className="products-custom-dropdown-toggle"
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                    >
                      <span className="products-custom-dropdown-selected">
                        {getCurrentSortLabel()}
                      </span>
                      <ChevronDownIcon className={`products-custom-dropdown-arrow ${showSortDropdown ? 'rotated' : ''}`} />
                    </button>
                    
                    {showSortDropdown && (
                      <div className="products-custom-dropdown-menu">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            className={`products-custom-dropdown-item ${sortBy === option.value ? 'active' : ''}`}
                            onClick={() => handleSortChange(option.value)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Filter Button */}
                <button 
                  className={`products-filter-btn ${showFilters ? 'active' : ''}`}
                  onClick={handleFilterClick}
                >
                  <FunnelIcon className="products-filter-icon" />
                  <span className="btn-text">Filter</span>
                </button>
              </div>
            </Col>
          </Row>

          {/* Mobile Layout */}
          <div className="products-nav-mobile">
            <div className="products-mobile-header">
              <button 
                className="products-mobile-menu-btn"
                onClick={toggleMobileMenu}
              >
                <Bars3Icon className="mobile-menu-icon" />
                <span>Options</span>
              </button>
              
              <button 
                className="products-mobile-filter-btn"
                onClick={handleFilterClick}
              >
                <FunnelIcon className="mobile-filter-icon" />
                <span>Filter</span>
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {showMobileMenu && (
              <div className="products-mobile-menu">
                {/* Grid View Options */}
                <div className="products-mobile-section">
                  <label className="products-mobile-label">Grid View:</label>
                  <div className="products-mobile-grid-buttons">
                    <button 
                      className={`products-mobile-grid-btn ${currentGridView === '4x4' ? 'active' : ''}`}
                      onClick={() => {
                        onGridViewChange('4x4');
                        setShowMobileMenu(false);
                      }}
                    >
                      <Grid4x4Icon />
                      <span>4×4 Grid</span>
                    </button>
                    <button 
                      className={`products-mobile-grid-btn ${currentGridView === '3x3' ? 'active' : ''}`}
                      onClick={() => {
                        onGridViewChange('3x3');
                        setShowMobileMenu(false);
                      }}
                    >
                      <Grid3x3Icon />
                      <span>3×3 Grid</span>
                    </button>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="products-mobile-section">
                  <label className="products-mobile-label">Sort By:</label>
                  <div className="products-mobile-sort-options">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`products-mobile-sort-btn ${sortBy === option.value ? 'active' : ''}`}
                        onClick={() => {
                          handleSortChange(option.value);
                          setShowMobileMenu(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>

        {/* Filter Panel */}
        {showFilters && (
          <div className="products-filter-panel">
            <Container>
              <div className="products-filter-content">
                <h4>Filter Products</h4>
                <p>Filter options will appear here...</p>
              </div>
            </Container>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterAllProducts 
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
      />

      {/* Overlay for dropdowns */}
      {(showSortDropdown || showMobileMenu) && (
        <div 
          className="products-nav-overlay"
          onClick={() => {
            setShowSortDropdown(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </>
  );
};

export default ProductsNav;