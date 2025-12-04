import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  HomeIcon,
  ChevronRightIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import './AllBestSeller.css';
import FilterSection from '../newarrival/FilterSection';
import ProductsNav from '../products/ProductsNav';
import CategoriesProducts from '../products/CategoriesProducts';
import TransparentPricing from '../TransparentPricing';

const AllBestSeller = () => {
  const [gridView, setGridView] = useState('4x4');
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-set grid view based on screen size
      if (mobile && (gridView === '4x4' || gridView === '3x3')) {
        setGridView('2x2'); // Default to 2x2 on mobile
      } else if (!mobile && (gridView === '2x2' || gridView === '1x1')) {
        setGridView('4x4'); // Default to 4x4 on desktop
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [gridView]);

  const handleGridViewChange = (view) => {
    console.log('Changing grid view to:', view);
    setGridView(view);
  };

  return (
    <>
      {/* Best Seller Banner Section */}
      <div className="allbestseller-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - Best Seller Title */}
            <Col lg={6} md={12} className="allbestseller-title-col">
              <div className="allbestseller-title-content">
                <h1 className="allbestseller-main-title">
                  <span className="allbestseller-title-text">
                    <span className="allbestseller-title-word allbestseller-title-word-1">Best</span>
                    {' '}
                    <span className="allbestseller-title-word allbestseller-title-word-2">Sellers</span>
                  </span>
                </h1>
                <div className="allbestseller-breadcrumb">
                  <a href="/" className="allbestseller-breadcrumb-link">
                    <HomeIcon className="allbestseller-breadcrumb-icon" />
                    <span className="allbestseller-breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="allbestseller-breadcrumb-separator" />
                  <span className="allbestseller-breadcrumb-link">Best Sellers</span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - Best Seller Stats */}
            <Col lg={6} md={12} className="allbestseller-stats-col">
              <div className="allbestseller-stats-card">
                <div className="allbestseller-stats-icon">
                  <TagIcon className="allbestseller-stats-icon-svg" />
                </div>
                <div className="allbestseller-stats-info">
                  <h3 className="allbestseller-stats-count">
                    Top Rated Products
                  </h3>
                  <p className="allbestseller-stats-text">
                    Customer favorite products with highest ratings
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
 <TransparentPricing/>
      {/* Content Section */}
      <div className="allbestseller-content">
        <Container>
          <div className="allbestseller-products-section">
            {/* Filter Section */}
            <FilterSection/>
            
            {/* Products Navigation - Grid View Controls */}
            <ProductsNav 
              onGridViewChange={handleGridViewChange}
              currentGridView={gridView}
              selectedCategory="Best Sellers"  // Add category prop
              isMobile={isMobile}
            />
            
            {/* Categories Products Grid with Grid View */}
            <CategoriesProducts 
              gridView={gridView} 
              selectedCategory="Best Sellers"  // Add category prop
              isMobile={isMobile}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default AllBestSeller;