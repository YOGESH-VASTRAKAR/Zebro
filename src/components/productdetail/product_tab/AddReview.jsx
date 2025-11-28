import React, { useState } from 'react';
import { StarIcon, UserCircleIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import './AddReview.css';

const AddReview = ({ isLoggedIn, setIsLoggedIn, onReviewSubmit }) => {
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    onReviewSubmit(reviewForm);
    
    // Reset form
    setReviewForm({
      rating: 5,
      comment: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setReviewForm(prev => ({
      ...prev,
      rating
    }));
  };

  // Login handler
  const handleLogin = () => {
    // Your actual login logic here
    setIsLoggedIn(true);
    alert('Login successful! You can now submit your review.');
  };

  return (
    <div className="add-review-section">
      <div className="add-review-container">
        <div className="add-review-header">
          <h3 className="add-review-main-title">Share Your Experience</h3>
          <p className="add-review-subtitle">Your review helps other customers make better decisions</p>
        </div>
        
        {/* Check if user is logged in */}
        {!isLoggedIn ? (
          <div className="add-review-login-card">
            <div className="add-review-login-content">
              <div className="add-review-login-icon-wrapper">
                <UserCircleIcon className="add-review-login-icon" />
              </div>
              <h4 className="add-review-login-title">Join Our Community</h4>
              <p className="add-review-login-message">
                Share your thoughts and help fellow shoppers. Login to contribute your valuable review.
              </p>
              <div className="add-review-login-actions">
                <button className="add-review-login-btn-primary" onClick={handleLogin}>
                  Sign In to Review
                </button>
                <button className="add-review-login-btn-secondary" onClick={() => window.location.href = '#reviews'}>
                  Browse Reviews
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="add-review-form-card">
            <form onSubmit={handleReviewSubmit} className="add-review-form">
              {/* Rating Section */}
              <div className="add-review-form-section">
                <label className="add-review-section-label">
                  <StarIcon className="add-review-label-icon" />
                  Rate Your Experience
                </label>
                <div className="add-review-rating-section">
                  <div className="add-review-rating-stars">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className={`add-review-star-btn ${reviewForm.rating >= rating ? 'add-review-active' : ''}`}
                        onClick={() => handleRatingChange(rating)}
                      >
                        <StarIcon className="add-review-star-icon" />
                      </button>
                    ))}
                  </div>
                  <div className="add-review-rating-display">
                    <span className="add-review-rating-value">{reviewForm.rating}</span>
                    <span className="add-review-rating-text">/ 5 Stars</span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="add-review-form-section">
                <label className="add-review-section-label">
                  <CheckBadgeIcon className="add-review-label-icon" />
                  Your Detailed Review
                </label>
                <div className="add-review-textarea-group">
                  <textarea
                    name="comment"
                    value={reviewForm.comment}
                    onChange={handleInputChange}
                    className="add-review-textarea"
                    placeholder="Share your honest thoughts about this product. What did you like or dislike? How was your experience?"
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="add-review-submit-section">
                <button type="submit" className="add-review-submit-btn">
                  <CheckBadgeIcon className="add-review-submit-icon" />
                  Publish Your Review
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddReview;