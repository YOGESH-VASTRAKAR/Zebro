import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  HomeIcon,
  ChevronRightIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import './Order.css';
import OrderSummary from './OrderSummary';

const Order = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Order Banner Section */}
      <div className="order-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - Order Title */}
            <Col lg={6} md={12} className="order-title-col">
              <div className="order-title-content">
                <h1 className="order-main-title">
                  <span className="order-title-text">
                    <span className="order-title-word order-title-word-1">Order</span>
                    {' '}
                    <span className="order-title-word order-title-word-2">Status</span>
                  </span>
                </h1>
                <div className="order-breadcrumb">
                  <a href="/" className="order-breadcrumb-link">
                    <HomeIcon className="order-breadcrumb-icon" />
                    <span className="breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="order-breadcrumb-separator" />
                  <span className="order-breadcrumb-link">Orders</span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - Order Stats */}
            <Col lg={6} md={12} className="order-stats-col">
              <div className="order-stats-card">
                <div className="order-stats-icon">
                  <TagIcon className="order-stats-icon-svg" />
                </div>
                <div className="order-stats-info">
                  <h3 className="order-stats-count">
                    Track Your Orders
                  </h3>
                  <p className="order-stats-text">
                    View and manage all your orders
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* You can add Order Content component here later */}
      <OrderSummary /> 
    </>
  );
};

export default Order;