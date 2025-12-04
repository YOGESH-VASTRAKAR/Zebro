import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { 
  MinusIcon,
  PlusIcon,
  TrashIcon,
  ShoppingCartIcon,
  TagIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import './CartDetails.css';

const CartDetails = () => {
  const navigate = useNavigate();

  const cartItems = [
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

  // Calculate cart summary
  const calculateCartSummary = () => {
    const subTotal = cartItems.reduce((total, item) => 
      total + (item.discountedPrice * item.quantity), 0
    );
    
    const totalDiscount = cartItems.reduce((total, item) => 
      total + ((item.originalPrice - item.discountedPrice) * item.quantity), 0
    );
    
    const total = subTotal;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const avgPricePerItem = totalItems > 0 ? subTotal / totalItems : 0;

    return {
      subTotal: `₹ ${subTotal.toLocaleString('en-IN')}`,
      discount: `₹ ${totalDiscount.toLocaleString('en-IN')}`,
      total: `₹ ${total.toLocaleString('en-IN')}`,
      totalItems,
      avgPricePerItem: `₹ ${avgPricePerItem.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
      couponCode: "KIDS20"
    };
  };

  const cartSummary = calculateCartSummary();

  const handleIncrease = (itemId) => {
    console.log(`Increase quantity for item ${itemId}`);
  };

  const handleDecrease = (itemId) => {
    console.log(`Decrease quantity for item ${itemId}`);
  };

  const handleRemove = (itemId) => {
    console.log(`Remove item ${itemId}`);
  };

  const handleApplyCoupon = () => {
    console.log('Apply coupon');
  };

  const handleClearCart = () => {
    console.log('Clear cart');
  };

  // ✅ Checkout handler function
  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    navigate('/checkout');
  };

  return (
    <div className="cart-details-section">
      <Container>
        {/* Verification Banner */}
        <div className="cart-details-verification-banner">
          <h2 className="cart-details-verification-title">
            Please Verify Your Purchase Before Continuing On.
          </h2>
        </div>

        <Row>
          {/* Left Column - Cart Items and Coupon */}
          <Col lg={8} md={7}>
            <div className="cart-details-items-container">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-details-item-parent">
                  <div className="cart-details-item-main-content">
                    <div className="cart-details-item-image-section">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="cart-details-item-image"
                      />
                    </div>

                    <div className="cart-details-item-details-section">
                      <h3 className="cart-details-item-title">
                        {item.name}
                      </h3>

                      <div className="cart-details-price-discount-container">
                        <div className="cart-details-price-section">
                          <span className="cart-details-discounted-price">
                            ₹ {item.discountedPrice}
                          </span>
                          <span className="cart-details-original-price">
                            ₹{item.originalPrice}
                          </span>
                          <Badge className="cart-details-discount-badge">
                            {Math.round(((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100)}% OFF
                          </Badge>
                        </div>
                        
                        <div className="cart-details-max-allowed-text">
                          Max Allowed: {item.maxAllowed}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cart-details-item-controls-section">
                    <div className="cart-details-control-counter">
                      <div className="cart-details-quantity-controls">
                        <button 
                          className="cart-details-quantity-btn cart-details-decrease-btn"
                          onClick={() => handleDecrease(item.id)}
                        >
                          <MinusIcon className="cart-details-quantity-icon" />
                        </button>
                        
                        <span className="cart-details-quantity-display">
                          {item.quantity}
                        </span>
                        
                        <button 
                          className="cart-details-quantity-btn cart-details-increase-btn"
                          onClick={() => handleIncrease(item.id)}
                        >
                          <PlusIcon className="cart-details-quantity-icon" />
                        </button>
                      </div>
                    </div>

                    <div className="cart-details-control-total">
                      <div className="cart-details-item-total-section">
                        <span className="cart-details-total-label">Total: </span>
                        <span className="cart-details-total-amount">
                         ₹ {(item.discountedPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="cart-details-control-delete">
                      <button 
                        className="cart-details-remove-btn"
                        onClick={() => handleRemove(item.id)}
                      >
                        <TrashIcon className="cart-details-remove-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="cart-details-coupon-section">
              <div className="cart-details-coupon-card">
                <div className="cart-details-coupon-header">
                  <h4 className="cart-details-coupon-title">
                    <TagIcon className="cart-details-coupon-title-icon" />
                    Coupon Code
                  </h4>
                </div>
                <div className="cart-details-coupon-content">
                  <input 
                    type="text" 
                    className="cart-details-coupon-input"
                    placeholder="Enter coupon code"
                  />
                  <div className="cart-details-coupon-buttons-grid">
                    <button className="cart-details-coupon-btn cart-details-coupon-apply" onClick={handleApplyCoupon}>
                      <CheckBadgeIcon className="cart-details-coupon-btn-icon" />
                      APPLY
                    </button>
                    <button className="cart-details-coupon-btn cart-details-coupon-clear" onClick={handleClearCart}>
                      <TrashIcon className="cart-details-coupon-btn-icon" />
                      CLEAR CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Column - Cart Summary */}
          <Col lg={4} md={5}>
            <div className="cart-details-summary-card">
              <h3 className="cart-details-summary-title">
                <ShoppingCartIcon className="cart-details-summary-title-icon" />
                Cart Summary
              </h3>
              
              {/* Product Total */}
              <div className="cart-details-summary-section">
                <h4 className="cart-details-summary-section-title">Product Total</h4>
                <div className="cart-details-product-total">
                  <div className="cart-details-product-total-item">
                    <span className="cart-details-product-total-label">Items</span>
                    <span className="cart-details-product-total-value">
                      {cartSummary.totalItems}
                    </span>
                  </div>
                  <div className="cart-details-product-total-item">
                    <span className="cart-details-product-total-label">Per Item Avg</span>
                    <span className="cart-details-product-total-value">{cartSummary.avgPricePerItem}</span>
                  </div>
                  <div className="cart-details-product-total-item cart-details-product-total-main">
                    <span className="cart-details-product-total-label">Total</span>
                    <span className="cart-details-product-total-value">{cartSummary.subTotal}</span>
                  </div>
                </div>
              </div>

              {/* Cart Total */}
              <div className="cart-details-summary-section">
                <h4 className="cart-details-summary-section-title">Cart Total</h4>
                <div className="cart-details-total-breakdown">
                  <div className="cart-details-total-item">
                    <span className="cart-details-total-label">Sub Total</span>
                    <span className="cart-details-total-value">{cartSummary.subTotal}</span>
                  </div>
                  <div className="cart-details-total-item cart-details-total-discount">
                    <span className="cart-details-total-label">Discount</span>
                    <span className="cart-details-total-value">-{cartSummary.discount}</span>
                  </div>
                  <div className="cart-details-total-item cart-details-total-final">
                    <span className="cart-details-total-label">Total Amount</span>
                    <span className="cart-details-total-value">{cartSummary.total}</span>
                  </div>
                  <div className="cart-details-coupon-applied">
                    <Badge className="cart-details-coupon-badge">
                      <CheckBadgeIcon className="cart-details-coupon-badge-icon" />
                      {cartSummary.couponCode} Applied
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                className="cart-details-checkout-btn"
                onClick={handleCheckout}
              >
                <ShoppingCartIcon className="cart-details-checkout-btn-icon" />
                PROCEED TO CHECKOUT
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartDetails;