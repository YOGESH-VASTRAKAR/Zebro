import React from 'react';
import { Container } from 'react-bootstrap';
import './LatestOffers.css';

const LatestOffers = () => {
  return (
    <Container fluid className="latest-offers-latest-offers-section">
      <section className="latest-offers-offers-container">
        {/* First Offer Card */}
        <article className="latest-offers-offer-card" style={{ '--latest-offers-accent-color': 'rgb(60 138 197)' }}>
          <div className="latest-offers-card-content">
            <img 
              src="/latestadd1.jpg" 
              alt="Special Offer 1" 
              className="latest-offers-offer-image"
            />
          </div>
        </article>

        {/* Second Offer Card */}
        <article className="latest-offers-offer-card" style={{ '--latest-offers-accent-color': 'rgb(9 118 37)' }}>
          <div className="latest-offers-card-content">
            <img 
              src="/latestadd2.jpg" 
              alt="Special Offer 2" 
              className="latest-offers-offer-image"
            />
          </div>
        </article>
      </section>
    </Container>
  );
};

export default LatestOffers;