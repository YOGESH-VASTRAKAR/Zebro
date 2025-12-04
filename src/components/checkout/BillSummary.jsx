import React from 'react';
import { 
  ShoppingBagIcon,
  TruckIcon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import './BillSummary.css';

const BillSummary = () => {
  const navigate = useNavigate(); // ✅ Add navigate hook

  // Using your original data structure
  const orderSummary = {
    items: [
      {
        id: 1,
        name: "Educational Programming Robot",
        price: 799.00,
        quantity: 2,
        total: 1598.00
      },
      {
        id: 2,
        name: "Building Blocks Creative Set",
        price: 1899.00,
        quantity: 1,
        total: 1899.00
      }
    ],
    subtotal: 3497.00,
    shipping: 0.00,
    tax: 349.70,
    discount: 200.00,
    total: 3646.70
  };

  // ✅ Handle confirm order button click
  const handleConfirmOrder = () => {
    console.log('Confirming order...');
    navigate('/order'); // ✅ Redirect to order page
  };

  return (
    <div className="bill-summary-section">
      <div className="bill-summary-container">
        {/* Main Heading */}
        <h1 className="bill-summary-main-title">
          Bill Summary
        </h1>

        <div className="bill-content-container">
          {/* Header with Icon */}
          <div className="bill-summary-header">
            <div className="bill-summary-header-content">
              <div className="bill-summary-header-text">
                <div className="bill-summary-header-title-wrapper">
                  <ShoppingBagIcon className="bill-summary-header-icon" />
                  <p className="bill-summary-subtitle">
                    Review your order details
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="bill-summary-items">
            {orderSummary.items.map((item) => (
              <div key={item.id} className="bill-summary-item">
                <div className="bill-item-details">
                  <div className="bill-item-name">{item.name} x {item.quantity}</div>
                </div>
                <div className="bill-item-total">
                  ₹ {item.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="bill-summary-breakdown">
            <div className="bill-breakdown-row">
              <span className="bill-breakdown-label">Subtotal</span>
              <span className="bill-breakdown-value">
                ₹ {orderSummary.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="bill-breakdown-row bill-discount-row">
              <span className="bill-breakdown-label">Applied Coupon : KIDS200</span>
              <span className="bill-breakdown-value bill-discount-value">
                (-) ₹ {orderSummary.discount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="bill-breakdown-row">
              <span className="bill-breakdown-label">Shipping</span>
              <span className="bill-breakdown-value bill-shipping-free">
                <TruckIcon className="bill-shipping-icon" />
                Free Shipping!
              </span>
            </div>

            <div className="bill-breakdown-row">
              <span className="bill-breakdown-label">Tax</span>
              <span className="bill-breakdown-value">
                ₹ {orderSummary.tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="bill-summary-total">
            <div className="bill-total-row">
              <span className="bill-total-label">Order Total</span>
              <span className="bill-total-amount">
                ₹ {orderSummary.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bill-payment-options">
            <div className="bill-payment-option">
              <input 
                type="radio" 
                id="payment-gateway" 
                name="payment-method" 
                className="bill-payment-radio"
                defaultChecked
              />
              <label htmlFor="payment-gateway" className="bill-payment-label">
                Pay via Payment Gateway
              </label>
            </div>
            <div className="bill-payment-option">
              <input 
                type="radio" 
                id="cod" 
                name="payment-method" 
                className="bill-payment-radio"
              />
              <label htmlFor="cod" className="bill-payment-label">
                Cash on Delivery
              </label>
            </div>
          </div>

          {/* VAT Info */}
          <div className="bill-vat-info">
            The above bill is inclusive of VAT.
          </div>

          <div className="bill-divider"></div>

          {/* Confirm Order Button */}
          <button 
            className="bill-confirm-btn"
            onClick={handleConfirmOrder} // ✅ Add onClick handler
          >
            CONFIRM ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;