import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  ChevronRightIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import ProductsNav from './ProductsNav';
import CategoriesProducts from './CategoriesProducts';
import './Products.css';

const Products = () => {
  const [gridView, setGridView] = useState('4x4');
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();

  // URL se category extract karo
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      // Convert URL slug back to readable format
      const formattedCategory = categoryParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/-/g, ' ')
        .replace(/And/g, '&');
      
      setSelectedCategory(formattedCategory);
    } else {
      setSelectedCategory('');
    }
  }, [location.search]);

  const handleGridViewChange = (view) => {
    setGridView(view);
  };

  return (
    <>
      {/* Products Banner Section */}
      <div className="products-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - Products Title */}
            <Col lg={6} md={12} className="products-title-col">
              <div className="products-title-content">
                <h1 className="products-main-title">
                  <span className="products-title-text">
                    <span className="products-title-word products-title-word-1">Our</span>
                    {' '}
                    <span className="products-title-word products-title-word-2">Products</span>
                  </span>
                </h1>
                <div className="products-breadcrumb">
                  <a href="/" className="products-breadcrumb-link">
                    <HomeIcon className="products-breadcrumb-icon" />
                    <span className="breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="products-breadcrumb-separator" />
                  <span className="products-breadcrumb-link">Products</span>
                  {selectedCategory && (
                    <>
                      <ChevronRightIcon className="products-breadcrumb-separator" />
                      <span className="products-breadcrumb-current">
                        {selectedCategory}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Col>
            
            {/* Right Side - Products Stats */}
            <Col lg={6} md={12} className="products-stats-col">
              <div className="products-stats-card">
                <div className="products-stats-icon">
                  <ShoppingBagIcon className="products-stats-icon-svg" />
                </div>
                <div className="products-stats-info">
                  <h3 className="products-stats-count">
                    {selectedCategory ? `${selectedCategory} Products` : '500+ Products'}
                  </h3>
                  <p className="products-stats-text">
                    {selectedCategory ? 'Category items' : 'Premium quality items'}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Products Navigation */}
      <ProductsNav 
        onGridViewChange={handleGridViewChange}
        currentGridView={gridView}
        selectedCategory={selectedCategory}
      />

      {/* Categories Products Grid */}
      <CategoriesProducts 
        gridView={gridView} 
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default Products;