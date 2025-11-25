import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  ChevronRightIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/solid';
import './ProductDetails.css';

const ProductDetails = () => {
  const location = useLocation();

  // Mock product data
  const product = {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    brand: 'AudioPro'
  };

  // Extract category from URL or use default
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      // You can set the category based on URL parameter
      console.log('Category from URL:', categoryParam);
    }
  }, [location.search]);

  return (
    <>
      {/* Product Banner Section */}
      <div className="product-details-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - Product Title */}
            <Col lg={6} md={12} className="product-details-title-col">
              <div className="product-details-title-content">
                <h1 className="product-details-main-title">
                  <span className="product-details-title-text">
                    <span className="product-details-title-word product-details-title-word-1">Product</span>
                    {' '}
                    <span className="product-details-title-word product-details-title-word-2">Details</span>
                  </span>
                </h1>
                <div className="product-details-breadcrumb">
                  <a href="/" className="product-details-breadcrumb-link">
                    <HomeIcon className="product-details-breadcrumb-icon" />
                    <span className="breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="product-details-breadcrumb-separator" />
                  <a href="/products" className="product-details-breadcrumb-link">
                    Products
                  </a>
                  <ChevronRightIcon className="product-details-breadcrumb-separator" />
                  <a href={`/products?category=${product.category.toLowerCase()}`} className="product-details-breadcrumb-link">
                    {product.category}
                  </a>
                  <ChevronRightIcon className="product-details-breadcrumb-separator" />
                  <span className="product-details-breadcrumb-current">
                    {product.name}
                  </span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - Product Stats */}
            <Col lg={6} md={12} className="product-details-stats-col">
              <div className="product-details-stats-card">
                <div className="product-details-stats-icon">
                  <ShoppingBagIcon className="product-details-stats-icon-svg" />
                </div>
                <div className="product-details-stats-info">
                  <h3 className="product-details-stats-count">
                    Premium Quality
                  </h3>
                  <p className="product-details-stats-text">
                    {product.brand} • {product.category}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
     
    </>
  );
};

export default ProductDetails;