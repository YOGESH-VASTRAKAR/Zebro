import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import './AdditionalDetails.css';

const AdditionalDetails = ({ productDetails }) => {
  return (
    <div className="additional-details-section">
      <div className="additional-details-container">
        <h3 className="additional-details-main-title">Product Specifications & Details</h3>
        
        <Row className="additional-details-row">
          {/* Specifications */}
          <Col lg={6} className="additional-details-col">
            <div className="additional-details-card">
              <h4 className="additional-details-card-title">
                <CheckBadgeIcon className="additional-details-card-icon" />
                Specifications
              </h4>
              <div className="additional-details-specifications-list">
                {productDetails.specifications.map((spec, index) => (
                  <div key={index} className="additional-details-spec-item">
                    <div className="additional-details-spec-content">
                      <span className="additional-details-spec-label">{spec.label}</span>
                      <span className="additional-details-spec-value">{spec.value}</span>
                    </div>
                    <div className="additional-details-spec-divider"></div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Features */}
          <Col lg={6} className="additional-details-col">
            <div className="additional-details-card">
              <h4 className="additional-details-card-title">
                <CheckBadgeIcon className="additional-details-card-icon" />
                Key Features
              </h4>
              <div className="additional-details-features-grid">
                {productDetails.features.map((feature, index) => (
                  <div key={index} className="additional-details-feature-item">
                    <div className="additional-details-feature-icon-wrapper">
                      <CheckBadgeIcon className="additional-details-feature-icon" />
                    </div>
                    <span className="additional-details-feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* What's Included */}
          <Col lg={12} className="additional-details-col">
            <div className="additional-details-card">
              <h4 className="additional-details-card-title">
                <CheckBadgeIcon className="additional-details-card-icon" />
                What's Included
              </h4>
              <div className="additional-details-included-grid">
                {productDetails.included.map((item, index) => (
                  <div key={index} className="additional-details-included-item">
                    <div className="additional-details-included-icon-wrapper">
                      <div className="additional-details-included-bullet"></div>
                    </div>
                    <span className="additional-details-included-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdditionalDetails;