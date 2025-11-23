import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { 
  StarIcon,
  GiftIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import './Offers.css';
import Testimonial from './Testimonial';

const Offers = () => {
  return (
    <div className="offers-zebro-offers-section">
      {/* Main Offer Banner */}
      <section className="offers-zebro-offer-banner">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12} className="offers-offer-content order-2 order-lg-1">
              <div className="offers-offer-badge">
                <StarIcon className="offers-badge-icon" />
                <span>LIMITED TIME OFFER</span>
              </div>
              
              <h1 className="offers-offer-title">
                WINTER <strong>FUN SALE</strong>
              </h1>
              
              <p className="offers-offer-subtitle">
                Up to 60% OFF on Educational Toys & Games
              </p>
              
              <div className="offers-offer-highlights">
                <div className="offers-highlight-item">
                  <GiftIcon className="offers-highlight-icon" />
                  <span>Free Gift on Orders Above ₹1999</span>
                </div>
                <div className="offers-highlight-item">
                  <TruckIcon className="offers-highlight-icon" />
                  <span>Free Shipping Across India</span>
                </div>
                <div className="offers-highlight-item">
                  <ShieldCheckIcon className="offers-highlight-icon" />
                  <span>100% Safe & Certified Products</span>
                </div>
              </div>
              
              <div className="offers-offer-timer">
                <ClockIcon className="offers-timer-icon" />
                <span className="offers-timer-text">Offer ends in: 02:15:36</span>
              </div>
              
              <div className="offers-offer-actions">
                <Button className="offers-shop-now-btn">
                  <ShoppingBagIcon className="offers-btn-icon" />
                  SHOP NOW
                </Button>
                <Button className="offers-explore-btn">
                  EXPLORE DEALS
                </Button>
              </div>
            </Col>
            
            <Col lg={6} md={12} className="offers-offer-visual order-1 order-lg-2">
              <div className="offers-shape-blob-image"></div>
              <div className="offers-floating-product offers-product-1">
                <div className="offers-product-badge">-40%</div>
              </div>
              <div className="offers-floating-product offers-product-2">
                <div className="offers-product-badge">-60%</div>
              </div>
              <div className="offers-floating-product offers-product-3">
                <div className="offers-product-badge">-35%</div>
              </div>
            </Col>
          </Row>
        </Container>
        
        {/* Decorative Shapes */}
        <div className="offers-shape-circle-top-left"></div>
        <div className="offers-shape-blob-top-right"></div>
        <div className="offers-shape-circle-top-right"></div>
        <div className="offers-shape-blob-bottom-left"></div>
      </section>

      <Testimonial/>

      {/* Additional Promo Banner */}
      <section className="offers-zebro-promo-banner">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12} className="offers-promo-visual order-1 order-lg-1">
              <div className="offers-shape-promo-blob-image"></div>
              <div className="offers-promo-tag">BEST SELLER</div>
            </Col>
            
            <Col lg={6} md={12} className="offers-promo-content order-2 order-lg-2">
              <div className="offers-promo-badge">
                <StarIcon className="offers-promo-badge-icon" />
                <span>NEW ARRIVALS</span>
              </div>
              
              <h2 className="offers-promo-title">
                SMART <strong>LEARNING</strong>
              </h2>
              
              <p className="offers-promo-subtitle">
                Interactive Educational Kits & STEM Toys
              </p>
              
              <div className="offers-promo-features">
                <div className="offers-feature-item">
                  <div className="offers-feature-icon">🧠</div>
                  <div className="offers-feature-text">
                    <div className="offers-feature-title">Brain Development</div>
                    <div className="offers-feature-desc">Enhance cognitive skills</div>
                  </div>
                </div>
                
                <div className="offers-feature-item">
                  <div className="offers-feature-icon">🎯</div>
                  <div className="offers-feature-text">
                    <div className="offers-feature-title">Age Appropriate</div>
                    <div className="offers-feature-desc">2-12 years range</div>
                  </div>
                </div>
                
                <div className="offers-feature-item">
                  <div className="offers-feature-icon">⭐</div>
                  <div className="offers-feature-text">
                    <div className="offers-feature-title">Premium Quality</div>
                    <div className="offers-feature-desc">Child-safe materials</div>
                  </div>
                </div>
              </div>
              
              <div className="offers-promo-offer">
                <span className="offers-original-price">₹2999</span>
                <span className="offers-discounted-price">₹1999</span>
                <span className="offers-discount-percent">Save 33%</span>
              </div>
              
              <Button className="offers-promo-btn">
                <GiftIcon className="offers-promo-btn-icon" />
                GET THIS DEAL
              </Button>
            </Col>
          </Row>
        </Container>
        
        {/* Promo Decorative Shapes */}
        <div className="offers-shape-promo-blob-tl"></div>
        <div className="offers-shape-promo-circle1"></div>
        <div className="offers-shape-promo-circle2"></div>
        <div className="offers-shape-promo-circle3"></div>
        <div className="offers-shape-promo-blob-bl"></div>
      </section>
    </div>
  );
};

export default Offers;