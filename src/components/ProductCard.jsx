import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import './ProductCard.css';

const ProductCard = () => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (value) => {
    if (value >= 0 && value <= 1000) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 1000) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-card-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="product-card">
              <Row className="align-items-center">
                {/* Product Image Section */}
                <Col lg={6} md={6} className="product-image-col">
                  <div className="product-image-wrapper">
                    <img 
                      src="/api/placeholder/500/500" 
                      alt="Almas Attar" 
                      className="product-main-image"
                    />
                    <Badge bg="success" className="product-badge">
                      BEST SELLER
                    </Badge>
                  </div>
                </Col>

                {/* Product Details Section */}
                <Col lg={6} md={6} className="product-details-col">
                  <div className="product-details-content">
                    {/* Product Header */}
                    <div className="product-header">
                      <h1 className="product-name">Product Name</h1>
                      <div className="product-meta">
                        <span className="product-brand">BRAND: ALMAS</span>
                        <span className="product-category">CATEGORY: ATTAR</span>
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="stock-status">
                      <div className="stock-indicator in-stock">
                        <CheckIcon className="stock-icon" />
                        <span>In Stock</span>
                      </div>
                      <div className="stock-indicator out-of-stock">
                        <XMarkIcon className="stock-icon" />
                        <span>Out Of Stock</span>
                      </div>
                    </div>

                    <div className="divider"></div>

                    {/* Pricing */}
                    <div className="pricing-section">
                      <div className="original-price">¥ 245,250.00</div>
                      <div className="discounted-price">¥ 187,650.00</div>
                    </div>

                    {/* Product Description */}
                    <div className="product-description">
                      <p>
                        Almas Perfume has redefined Indian fragrance industry with its specialised 
                        rare range of products and offerings. Housed at Mumbai, India, we are not 
                        just a perfumery group but a family of craftsmen formulating fragrances 
                        from the best ingredients from around the world.
                      </p>
                    </div>

                    {/* Product Specifications */}
                    <div className="product-specs">
                      <div className="spec-item">
                        <span className="spec-label">Barcode No.:</span>
                        <span className="spec-value">12253463424</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Product Weight:</span>
                        <span className="spec-value">250g</span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="quantity-section">
                      <label className="quantity-label">Desired Quantity</label>
                      <div className="quantity-selector">
                        <button 
                          className="quantity-btn" 
                          onClick={decrementQuantity}
                          disabled={quantity === 0}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          className="quantity-input" 
                          value={quantity}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
                          min="0"
                          max="1000"
                        />
                        <button 
                          className="quantity-btn" 
                          onClick={incrementQuantity}
                          disabled={quantity === 1000}
                        >
                          +
                        </button>
                      </div>
                      <div className="quantity-limit">
                        Max Allowed : 1000
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="action-section">
                      <Button 
                        className="add-to-cart-btn"
                        disabled={quantity === 0}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductCard;