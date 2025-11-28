import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  ChevronRightIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/solid';
import './ProductDetails.css';
import ProductServices from './ProductServices';
import SimilarProducts from './SimilarProducts';
import ProductTabs from './ProductTabs';
import ProductGallery from './ProductGallery';

const ProductDetails = () => {
  const location = useLocation();
  const [product, setProduct] = useState({
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    brand: 'AudioPro'
  });

  // Products database
  const productsDatabase = {
    1: {
      id: 1,
      name: 'Educational Robot Toy',
      category: 'Toys',
      brand: 'TechKids'
    },
    2: {
      id: 2,
      name: 'Building Blocks Set',
      category: 'Toys',
      brand: 'BuildMaster'
    },
    3: {
      id: 3,
      name: 'Kids Story Books Pack',
      category: 'Books',
      brand: 'StoryTime'
    },
    4: {
      id: 4,
      name: 'Puzzle Game Collection',
      category: 'Games',
      brand: 'BrainyKids'
    },
    5: {
      id: 5,
      name: 'Remote Control Car',
      category: 'Toys',
      brand: 'SpeedRacer'
    },
    6: {
      id: 6,
      name: 'Art & Craft Kit',
      category: 'Arts',
      brand: 'CreativeKids'
    },
    7: {
      id: 7,
      name: 'Science Experiment Kit',
      category: 'Educational',
      brand: 'YoungScientist'
    },
    8: {
      id: 8,
      name: 'Musical Toys Set',
      category: 'Toys',
      brand: 'MelodyKids'
    }
  };

  // Extract product ID from URL and set product data
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('id');
    
    if (productId && productsDatabase[productId]) {
      setProduct(productsDatabase[productId]);
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
                    {product.brand}
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
      <ProductGallery />
      <ProductTabs />
     <SimilarProducts />
      <ProductServices />
    </>
  );
};

export default ProductDetails;