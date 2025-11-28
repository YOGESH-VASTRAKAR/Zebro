import React, { useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import './BusinessInquiries.css';

const BusinessInquiries = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    message: '',
    confirm: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="business-page">
      <div className="business-content-section">
        <div className="business-header">
          <h1 className="business-heading">Business Inquiries</h1>
          <button className="business-back-button" onClick={onBack}>
            <ChevronLeftIcon className="business-back-icon" />
            Back
          </button>
        </div>
        <div className="business-content-scrollable">
          <div className="business-container">
            <div className="business-content">
              {/* Business Form */}
              <div className="business-form-container">
                <div className="business-form-intro">
                  <p className="business-intro-text">
                    Please note for Business Inquiries write to us using this form.
                  </p>
                </div>

                <form className="business-form" onSubmit={handleSubmit}>
                  {/* Full Name, Email, Mobile - Side by Side */}
                  <div className="business-form-row">
                    <div className="business-form-group">
                      <label htmlFor="fullName" className="business-form-label">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="business-form-input"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="business-form-group">
                      <label htmlFor="email" className="business-form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="business-form-input"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="business-form-group">
                      <label htmlFor="mobile" className="business-form-label">Mobile Number</label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="business-form-input"
                        placeholder="Enter your mobile"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="business-form-group">
                    <label htmlFor="message" className="business-form-label">How can we help you?</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="business-form-textarea"
                      placeholder="Describe your business inquiry..."
                      rows="3"
                      required
                    />
                  </div>

                  {/* Confirmation Checkbox */}
                  <div className="business-form-group business-checkbox-group">
                    <label className="business-checkbox-label">
                      <input
                        type="checkbox"
                        name="confirm"
                        checked={formData.confirm}
                        onChange={handleChange}
                        className="business-checkbox-input"
                        required
                      />
                      <span className="business-checkmark"></span>
                      I confirm, The above details are accurate and have no issues to be contacted for business purposes.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="business-submit-button">
                    SEND INQUIRY
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInquiries;