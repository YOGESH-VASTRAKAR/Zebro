import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  CheckCircleIcon,
  ShoppingBagIcon,
  TagIcon,
  ArrowRightIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import './OrderSummary.css';

const OrderSummary = () => {
  const navigate = useNavigate();
  const orderNumber = '1234567890';
  
  // ✅ Handle View Order Details click
  const handleViewOrderDetails = () => {
    console.log('Navigating to My Account...');
    navigate('/my_account');
  };

  // ✅ Handle Continue Shopping click
  const handleContinueShopping = () => {
    console.log('Continuing shopping...');
    navigate('/');
  };

  return (
    <div className="order-summary-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10} sm={12}>
            {/* Order Confirmation Card - Reference Style */}
            <div className="order-summary-card">
              
              {/* Header with Icon and Title - Dashboard Style */}
              <div className="order-summary-header">
                <div className="order-summary-header-icon">
                  <CheckCircleIcon className="order-summary-success-icon" />
                </div>
                <div className="order-summary-header-content">
                  <h2 className="order-summary-title">
                    Confirmed.. We have captured your order!
                  </h2>
                  <p className="order-summary-subtitle">
                    Your order has been successfully processed and is being prepared for shipment.
                  </p>
                </div>
              </div>
              
              {/* Order Number - Enhanced Design */}
              <div className="order-summary-number-section">
                <div className="order-summary-number-wrapper">
                  <span className="order-summary-number-label">Order Number</span>
                  <h3 className="order-summary-number">{orderNumber}</h3>
                  <div className="order-summary-tracking">
                    <TagIcon className="order-summary-tracking-icon" />
                    <span className="order-summary-tracking-text">
                      Tracking ID: TRK{orderNumber}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Message - Dashboard Style */}
              <div className="order-summary-message">
                <div className="order-summary-message-icon">
                  <CheckCircleIcon className="order-summary-message-check" />
                </div>
                <div className="order-summary-message-content">
                  <h4 className="order-summary-message-title">Order Confirmation Sent</h4>
                  <p className="order-summary-text">
                    We have received your order and sent confirmation to your email and phone. 
                    If you haven't received the email within 15 minutes, please check your spam folder.
                  </p>
                </div>
              </div>
              
              {/* Quick Stats - Reference Style Grid */}
              <div className="order-summary-stats">
                <div className="order-summary-stat-item">
                  <div className="order-summary-stat-icon-wrapper" style={{ '--stat-color': '#0662aa' }}>
                    <ShoppingBagIcon className="order-summary-stat-icon" />
                  </div>
                  <div className="order-summary-stat-content">
                    <span className="order-summary-stat-count">Order Placed</span>
                    <span className="order-summary-stat-text">Successfully</span>
                  </div>
                </div>
                <div className="order-summary-stat-item">
                  <div className="order-summary-stat-icon-wrapper" style={{ '--stat-color': '#37aa50' }}>
                    <CheckCircleIcon className="order-summary-stat-icon" />
                  </div>
                  <div className="order-summary-stat-content">
                    <span className="order-summary-stat-count">Status</span>
                    <span className="order-summary-stat-text">Processing</span>
                  </div>
                </div>
                <div className="order-summary-stat-item">
                  <div className="order-summary-stat-icon-wrapper" style={{ '--stat-color': '#e65c52' }}>
                    <TagIcon className="order-summary-stat-icon" />
                  </div>
                  <div className="order-summary-stat-content">
                    <span className="order-summary-stat-count">Tracking</span>
                    <span className="order-summary-stat-text">Active</span>
                  </div>
                </div>
              </div>
              
              {/* Actions - Reference Style Buttons */}
              <div className="order-summary-actions">
                <button 
                  className="order-summary-btn order-summary-primary-btn"
                  onClick={handleViewOrderDetails} // ✅ Added onClick handler
                >
                  <span>View Order Details</span>
                  <ArrowRightIcon className="order-summary-btn-icon" />
                </button>
                <button 
                  className="order-summary-btn order-summary-secondary-btn"
                  onClick={handleContinueShopping} // ✅ Added onClick handler
                >
                  <ShoppingCartIcon className="order-summary-btn-icon" />
                  <span>Continue Shopping</span>
                </button>
              </div>
              
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderSummary;