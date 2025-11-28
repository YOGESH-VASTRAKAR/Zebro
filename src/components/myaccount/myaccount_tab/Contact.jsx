import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { FaWhatsapp, FaPhone, FaEnvelope, FaPhoneAlt, FaEnvelopeOpen } from 'react-icons/fa';
import './Contact.css';

const Contact = ({ onBack }) => {
  return (
    <div className="contact-page">
      <div className="contact-content-section">
        <div className="contact-header">
          <h1 className="contact-heading">Contact</h1>
          <button className="contact-back-button" onClick={onBack}>
            <ChevronLeftIcon className="contact-back-icon" />
            Back
          </button>
        </div>
        <div className="contact-content-scrollable">
          <div className="contact-container">
            <div className="contact-content">
              {/* Contact Options - Side by Side */}
              <div className="contact-options-horizontal">
                {/* Phone Option */}
                <div className="contact-option-item">
                  <div className="contact-item-left">
                    <div className="contact-icon-container">
                      <FaPhoneAlt className="contact-icon" />
                    </div>
                  </div>
                  <div className="contact-item-right">
                    <h4 className="contact-option-title">Connect on WhatsApp or Call</h4>
                    <div className="contact-details">
                      <a href="tel:+919820946145" className="contact-link">+919820946145</a>
                      <a href="tel:+919820646145" className="contact-link">+919820646145</a>
                      <p className="contact-note">(10am to 6pm - Monday to Saturday)</p>
                    </div>
                  </div>
                </div>

                {/* Email Option */}
                <div className="contact-option-item">
                  <div className="contact-item-left">
                    <div className="contact-icon-container">
                      <FaEnvelopeOpen className="contact-icon" />
                    </div>
                  </div>
                  <div className="contact-item-right">
                    <h4 className="contact-option-title">Email your Query</h4>
                    <div className="contact-details">
                      <a href="mailto:info@almasperfume.com" className="contact-link contact-email-link">
                        info@almasperfume.com
                      </a>
                      <p className="contact-note contact-important-note">
                        Please mention your Order No. or "PG Name" Transaction No. along with screenshot
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="contact-quick-actions">
                <button 
                  className="contact-action-btn contact-whatsapp-btn"
                  onClick={() => window.open('https://wa.me/919820946145', '_blank')}
                >
                  <FaWhatsapp className="contact-action-icon" />
                  WhatsApp
                </button>
                <button 
                  className="contact-action-btn contact-call-btn"
                  onClick={() => window.open('tel:+919820946145', '_blank')}
                >
                  <FaPhoneAlt className="contact-action-icon" />
                  Call
                </button>
                <button 
                  className="contact-action-btn contact-email-btn"
                  onClick={() => window.open('mailto:info@almasperfume.com', '_blank')}
                >
                  <FaEnvelope className="contact-action-icon" />
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;