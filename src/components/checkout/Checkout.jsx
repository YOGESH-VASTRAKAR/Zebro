import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  HomeIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import BillingDetails from './BillingDetails';
import QuoteTaxCode from './QuoteTaxCode';
import BillSummary from './BillSummary';
import './Checkout.css';

const Checkout = () => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState({
    code: 'KIDS200',
    discount: 200.00
  });
  const [showCouponInput, setShowCouponInput] = useState(false);

  // Calculate checkout stats
  const calculateCheckoutStats = () => {
    const checkoutItems = [
      {
        id: 1,
        name: "Educational Programming Robot",
        category: "STEM Toy",
        originalPrice: 1599.00,
        discountedPrice: 799.00,
        quantity: 2,
        maxAllowed: 5,
        image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300"
      },
      {
        id: 2,
        name: "Building Blocks Creative Set",
        category: "Construction Toy",
        originalPrice: 2499.00,
        discountedPrice: 1899.00,
        quantity: 1,
        maxAllowed: 3,
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300"
      }
    ];

    const totalQuantity = checkoutItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = checkoutItems.reduce((total, item) => 
      total + (item.discountedPrice * item.quantity), 0
    );

    return {
      itemCount: checkoutItems.length,
      totalQuantity: totalQuantity,
      totalAmount: `₹ ${totalAmount.toLocaleString('en-IN')}`
    };
  };

  const checkoutStats = calculateCheckoutStats();

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (couponCode.trim() === '') return;
    
    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'KIDS20') {
      setAppliedCoupon({
        code: 'KIDS20',
        discount: 200.00
      });
      setCouponCode('');
      setShowCouponInput(false);
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <div className="checkout-section">
      {/* Checkout Banner Section */}
      <div className="checkout-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - Checkout Title */}
            <Col lg={6} md={12} className="checkout-title-col">
              <div className="checkout-title-content">
                <h1 className="checkout-main-title">
                  <span className="checkout-title-text">
                    <span className="checkout-title-word checkout-title-word-1">Checkout</span>
                  </span>
                </h1>
                <div className="checkout-breadcrumb">
                  <a href="/" className="checkout-breadcrumb-link">
                    <HomeIcon className="checkout-breadcrumb-icon" />
                    <span className="breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="checkout-breadcrumb-separator" />
                  <a href="/products" className="checkout-breadcrumb-link">
                    Products
                  </a>
                  <ChevronRightIcon className="checkout-breadcrumb-separator" />
                  <a href="/cart" className="checkout-breadcrumb-link">
                    Shopping Cart
                  </a>
                  <ChevronRightIcon className="checkout-breadcrumb-separator" />
                  <span className="checkout-breadcrumb-current">
                    Checkout
                  </span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - Checkout Stats */}
            <Col lg={6} md={12} className="checkout-stats-col">
              <div className="checkout-stats-card">
                <div className="checkout-stats-icon">
                  <ShoppingBagIcon className="checkout-stats-icon-svg" />
                </div>
                <div className="checkout-stats-info">
                  <h3 className="checkout-stats-count">
                    {checkoutStats.itemCount} {checkoutStats.itemCount === 1 ? 'Item' : 'Items'}
                  </h3>
                  <p className="checkout-stats-text">
                    {checkoutStats.totalQuantity} {checkoutStats.totalQuantity === 1 ? 'Product' : 'Products'} • {checkoutStats.totalAmount}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Coupon Code Section */}
      <div className="checkout-coupon-section">
        <Container>
          <Row>
            <Col lg={8} md={10} className="mx-auto">
              <div className="checkout-coupon-cards-container">
                {/* Applied Coupon Card */}
                {appliedCoupon && (
                  <div className="checkout-coupon-card checkout-applied-coupon-card">
                    <div className="checkout-coupon-card-content">
                      <div className="checkout-coupon-success-icon">
                        <div className="checkout-coupon-icon-container">
                          <span className="checkout-coupon-icon-text">✓</span>
                        </div>
                      </div>
                      <div className="checkout-coupon-text-content">
                        <div className="checkout-coupon-main-text">
                          Coupon Code <strong>{appliedCoupon.code}</strong> Applied!
                        </div>
                        <div className="checkout-coupon-discount-text">
                          You got a <strong>₹ {appliedCoupon.discount.toLocaleString('en-IN')}.00</strong> discount on order.
                        </div>
                      </div>
                    </div>
                    <button 
                      className="checkout-remove-coupon-btn"
                      onClick={handleRemoveCoupon}
                    >
                      <XMarkIcon className="checkout-remove-coupon-icon" />
                      <span>Click Here To Remove It</span>
                    </button>
                  </div>
                )}

                {/* Have Coupon? Card */}
                {!appliedCoupon && (
                  <div className="checkout-coupon-card checkout-have-coupon-card">
                    {showCouponInput ? (
                      <div className="checkout-coupon-input-container">
                        <div className="checkout-coupon-input-group">
                          <input
                            type="text"
                            className="checkout-coupon-input"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          />
                          <button 
                            className="checkout-apply-coupon-btn"
                            onClick={handleApplyCoupon}
                            disabled={!couponCode.trim()}
                          >
                            Apply
                          </button>
                          <button 
                            className="checkout-cancel-coupon-btn"
                            onClick={() => setShowCouponInput(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="checkout-have-coupon-content">
                        <span className="checkout-have-coupon-text">Have A Coupon?</span>
                        <button 
                          className="checkout-enter-coupon-btn"
                          onClick={() => setShowCouponInput(true)}
                        >
                          Click Here To Enter Your Code
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content - Left & Right Layout */}
      <div className="checkout-content-section">
        <Container>
          <Row>
            {/* Left Column - Billing Details & Tax Code */}
            <Col lg={8} className="checkout-left-column">
              <BillingDetails />
              <QuoteTaxCode />
            </Col>

            {/* Right Column - Bill Summary */}
            <Col lg={4} className="checkout-right-column">
              <BillSummary />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Checkout;