import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  HomeIcon,
  ChevronRightIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import OffersContent from './OffersContent';
import './AllOffers.css';

const AllOffers = () => {
  const navigate = useNavigate();

  const handleOfferClick = (category) => {
    const categorySlug = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    navigate(`/products?category=${categorySlug}`);
  };

  return (
    <>
      {/* Offers Banner Section */}
      <div className="offers-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - Offers Title */}
            <Col lg={6} md={12} className="offers-title-col">
              <div className="offers-title-content">
                <h1 className="offers-main-title">
                  <span className="offers-title-text">
                    <span className="offers-title-word offers-title-word-1">Special</span>
                    {' '}
                    <span className="offers-title-word offers-title-word-2">Offers</span>
                  </span>
                </h1>
                <div className="offers-breadcrumb">
                  <a href="/" className="offers-breadcrumb-link">
                    <HomeIcon className="offers-breadcrumb-icon" />
                    <span className="breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="offers-breadcrumb-separator" />
                  <span className="offers-breadcrumb-link">Offers</span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - Offers Stats */}
            <Col lg={6} md={12} className="offers-stats-col">
              <div className="offers-stats-card">
                <div className="offers-stats-icon">
                  <TagIcon className="offers-stats-icon-svg" />
                </div>
                <div className="offers-stats-info">
                  <h3 className="offers-stats-count">
                    Exclusive Deals
                  </h3>
                  <p className="offers-stats-text">
                    Limited time offers & discounts
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Offers Content */}
      <OffersContent />
    </>
  );
};

export default AllOffers;