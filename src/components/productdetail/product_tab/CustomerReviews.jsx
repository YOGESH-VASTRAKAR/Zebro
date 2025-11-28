import React from 'react';
import { CheckBadgeIcon, StarIcon } from '@heroicons/react/24/solid';
import './CustomerReviews.css';

const CustomerReviews = ({ customerReviews }) => {
  return (
    <div className="customer-reviews-section">
      <div className="customer-reviews-container">
        <div className="customer-reviews-grid">
          {customerReviews.map((review) => (
            <div key={review.id} className="customer-reviews-quote">
              <div className="customer-reviews-content">
                <h3 className="customer-reviews-text">
                  "{review.comment}"
                </h3>
                
                <div className="customer-reviews-rating">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i}
                      className={`customer-reviews-star ${i < review.rating ? 'customer-reviews-filled' : ''}`}
                    />
                  ))}
                </div>
                
                <h4 className="customer-reviews-person">
                  <span className="customer-reviews-name">
                    {review.verified && <CheckBadgeIcon className="customer-reviews-verified-badge" />}
                    {review.user}
                  </span>
                  <br />
                  <span className="customer-reviews-date">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;