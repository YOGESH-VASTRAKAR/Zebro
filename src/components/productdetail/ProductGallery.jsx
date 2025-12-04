import React, { useState } from 'react';
import { Row, Col, Container, Badge } from 'react-bootstrap';
import { 
  HeartIcon, 
  ShareIcon, 
  CheckBadgeIcon,
  StarIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/solid';
import './ProductGallery.css';

const ProductGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productData = product || {
    name: "Educational Programming Robot",
    price: "₹799",
    originalPrice: "₹1,599",
    discount: "28% OFF",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isNew: true,
    isFeatured: true,
    features: [
      "Educational Programming Modes",
      "Voice Interaction", 
      "LED Light Effects",
      "Mobile App Control",
      "Child-Safe Materials",
      "Rechargeable Battery"
    ],
    images: [
      "RC Car.jpg",
      "Building Blocks.jpg",
      "bg.jpg",
    ],
    specifications: [
      { label: 'Brand', value: 'TechKids' },
      { label: 'Material', value: 'High-Quality Plastic' },
      { label: 'Age Range', value: '3-8 Years' },
      { label: 'Battery Life', value: '4-6 Hours' }
    ]
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productData.name,
        text: 'Check out this amazing educational robot!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // alert('Product link copied to clipboard!');
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', { product: productData.name, quantity });
    // alert(`${quantity} ${productData.name} added to cart!`);
  };

  const handleBuyNow = () => {
    console.log('Buy now:', { product: productData.name, quantity });
    // alert(`Proceeding to checkout with ${quantity} ${productData.name}`);
  };

  return (
    <div className="product-gallery-section">
      <Container>
        <Row className="product-gallery-row">
          {/* Left Side - Images & Actions */}
          <Col lg={6} md={12} className="product-gallery-col">
            <div className="product-gallery-images-container">
              {/* Badges */}
              <div className="product-gallery-image-badges">
                {productData.isNew && (
                  <Badge className="product-gallery-badge-new">NEW</Badge>
                )}
                {productData.discount && (
                  <Badge className="product-gallery-badge-discount">{productData.discount}</Badge>
                )}
                {productData.isFeatured && (
                  <Badge className="product-gallery-badge-featured">FEATURED</Badge>
                )}
              </div>

              <div className="product-gallery-main-image-container">
                <img 
                  src={productData.images[selectedImage]} 
                  alt={productData.name}
                  className="product-gallery-main-image"
                />
                
                {/* Enhanced Action Icons - Matching ProductTabs Style */}
                <div className="product-gallery-actions">
                  <button 
                    className={`product-gallery-action-btn product-gallery-wishlist-btn ${isWishlisted ? 'product-gallery-active' : ''}`}
                    onClick={handleWishlistToggle}
                  >
                    <div className="product-gallery-action-btn-icon">
                      <HeartIcon className="product-gallery-action-btn-icon-svg" />
                    </div>
                  </button>
                  
                  <button 
                    className="product-gallery-action-btn product-gallery-share-btn"
                    onClick={handleShare}
                  >
                    <div className="product-gallery-action-btn-icon">
                      <ShareIcon className="product-gallery-action-btn-icon-svg" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Enhanced Thumbnail Images */}
              <div className="product-gallery-thumbnail-container">
                {productData.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`product-gallery-thumbnail-item ${selectedImage === index ? 'product-gallery-active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${productData.name} view ${index + 1}`}
                      className="product-gallery-thumbnail-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Right Side - Enhanced Product Details */}
          <Col lg={6} md={12} className="product-gallery-details-col">
            <div className="product-gallery-details-container">
              {/* Product Title with Badge */}
              <div className="product-gallery-title-section">
                <h1 className="product-gallery-main-title">{productData.name}</h1>
                {productData.isFeatured && (
                  <Badge className="product-gallery-title-badge">BESTSELLER</Badge>
                )}
              </div>
              
              {/* Enhanced Price Section */}
              <div className="product-gallery-price-section">
                <div className="product-gallery-price-main">
                  <span className="product-gallery-current-price">{productData.price}</span>
                  {productData.originalPrice && (
                    <span className="product-gallery-original-price">{productData.originalPrice}</span>
                  )}
                </div>
                {productData.discount && (
                  <span className="product-gallery-discount-badge">{productData.discount}</span>
                )}
              </div>

              {/* Enhanced Rating Section */}
              <div className="product-gallery-rating-section">
                <div className="product-gallery-rating-display">
                  <div className="product-gallery-stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i}
                        className={`product-gallery-star ${i < Math.floor(productData.rating) ? 'product-gallery-filled' : ''} ${
                          i < productData.rating && i >= Math.floor(productData.rating) ? 'product-gallery-half-filled' : ''
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="product-gallery-rating-value">{productData.rating}</span>
                </div>
                <span className="product-gallery-rating-text">
                  ({productData.reviews} reviews)
                </span>
              </div>

              {/* Key Features - Enhanced Grid Layout */}
              <div className="product-gallery-features-section">
                <h3 className="product-gallery-section-title">
                  <CheckBadgeIcon className="product-gallery-section-title-icon" />
                  Key Features
                </h3>
                <div className="product-gallery-features-grid">
                  {productData.features.map((feature, index) => (
                    <div key={index} className="product-gallery-feature-item">
                      <div className="product-gallery-feature-icon-wrapper">
                        <CheckBadgeIcon className="product-gallery-feature-icon" />
                      </div>
                      <span className="product-gallery-feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock and Quantity Section - Below Key Features */}
              <div className="product-gallery-stock-quantity-container">
                {/* Stock Status with Icon */}
                <div className="product-gallery-stock-section">
                  <div className={`product-gallery-stock-status ${productData.inStock ? 'product-gallery-in-stock' : 'product-gallery-out-of-stock'}`}>
                    <div className="product-gallery-status-indicator"></div>
                    <span className="product-gallery-status-text">
                      {productData.inStock ? 'In Stock - Ready to Ship' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Enhanced Quantity Selector */}
                <div className="product-gallery-quantity-section">
                  <label className="product-gallery-quantity-label">Quantity:</label>
                  <div className="product-gallery-quantity-selector">
                    <button 
                      className="product-gallery-quantity-btn"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="product-gallery-quantity-value">{quantity}</span>
                    <button 
                      className="product-gallery-quantity-btn"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="product-gallery-action-buttons">
                <button 
                  className="product-gallery-btn-primary"
                  onClick={handleAddToCart}
                >
                  <ShoppingCartIcon className="product-gallery-btn-icon" />
                  Add to Cart
                </button>
                <button 
                  className="product-gallery-btn-secondary"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductGallery;