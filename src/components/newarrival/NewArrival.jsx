import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  HomeIcon,
  ChevronRightIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import './NewArrival.css';
import FilterSection from './FilterSection';
import ProductsNav from '../products/ProductsNav';
import CategoriesProducts from '../products/CategoriesProducts';
import TransparentPricing from '../TransparentPricing';

const NewArrival = () => {
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
      {/* New Arrival Banner Section */}
      <div className="newarrival-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - New Arrival Title */}
            <Col lg={6} md={12} className="newarrival-title-col">
              <div className="newarrival-title-content">
                <h1 className="newarrival-main-title">
                  <span className="newarrival-title-text">
                    <span className="newarrival-title-word newarrival-title-word-1">New</span>
                    {' '}
                    <span className="newarrival-title-word newarrival-title-word-2">Arrivals</span>
                  </span>
                </h1>
                <div className="newarrival-breadcrumb">
                  <a href="/" className="newarrival-breadcrumb-link">
                    <HomeIcon className="newarrival-breadcrumb-icon" />
                    <span className="newarrival-breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="newarrival-breadcrumb-separator" />
                  <span className="newarrival-breadcrumb-link">New Arrivals</span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - New Arrival Stats */}
            <Col lg={6} md={12} className="newarrival-stats-col">
              <div className="newarrival-stats-card">
                <div className="newarrival-stats-icon">
                  <FireIcon className="newarrival-stats-icon-svg" />
                </div>
                <div className="newarrival-stats-info">
                  <h3 className="newarrival-stats-count">
                    Hot & Fresh Items
                  </h3>
                  <p className="newarrival-stats-text">
                    Just arrived - Latest products in the market
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <TransparentPricing/>
      {/* Content Section */}
      <div className="newarrival-content">
        <Container>
          <div className="newarrival-products-section">
            {/* Filter Section */}
            <FilterSection/>
            
            {/* Products Navigation - Grid View Controls */}
            <ProductsNav 
              onGridViewChange={handleGridViewChange}
              currentGridView={gridView}
              selectedCategory="New Arrivals"  // Add category prop
              isMobile={isMobile}
            />
            
            {/* Categories Products Grid with Grid View */}
            <CategoriesProducts 
              gridView={gridView} 
              selectedCategory="New Arrivals"  // Add category prop
              isMobile={isMobile}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default NewArrival;