import React from 'react';
import { Container } from 'react-bootstrap';
import './TransparentPricing.css';

const TransparentPricing = () => {
  return (
    <div className="transparent-pricing-section">
      <Container>
        <div className="transparent-pricing-content single-line">
          <span className="transparent-pricing-badge">
            SIMPLE TRANSPARENT PRICING
          </span>
          <span className="transparent-pricing-text">
            All discounted prices on Zebro Kids are Inclusive of GST
          </span>
        </div>
      </Container>
    </div>
  );
};

export default TransparentPricing;