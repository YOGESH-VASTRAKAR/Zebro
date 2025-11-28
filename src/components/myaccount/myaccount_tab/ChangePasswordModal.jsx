import React, { useState } from 'react';
import { 
  XMarkIcon,
  KeyIcon,
  EnvelopeIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import './ChangePasswordModal.css';

const ChangePasswordModal = ({ show, onHide, userData, onSendInstructions }) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const handleCheckboxChange = (e) => {
    setConfirmReset(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmReset) {
      onSendInstructions(userData.email);
      onHide();
    }
  };

  if (!show) return null;

  return (
    <div className="change-password-modal-overlay">
      <div className="change-password-modal-content change-password-wider-modal">
        <div className="change-password-modal-header">
          <div className="change-password-modal-title-wrapper">
            <KeyIcon className="change-password-modal-title-icon" />
            <h3 className="change-password-modal-title">Change Password</h3>
          </div>
          <button 
            className="change-password-close-btn"
            onClick={onHide}
          >
            <XMarkIcon className="change-password-close-icon" />
          </button>
        </div>
        
        <div className="change-password-modal-body">
          {/* Information Note */}
          <div className="change-password-note">
            <p className="change-password-note-text">
              Please note, password instructions will be sent on the registered email. 
              Please only toggle the button below if you wish to reset the password now.
            </p>
          </div>

          <form className="change-password-form" onSubmit={handleSubmit}>
            {/* Email Display */}
            <div className="change-password-email-section">
              <div className="change-password-email-label">
                <EnvelopeIcon className="change-password-email-icon" />
                Instructions will be sent to:
              </div>
              <div className="change-password-email-value">
                {userData.email}
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="change-password-form-group-checkbox">
              <label className="change-password-checkbox-label">
                <input
                  type="checkbox"
                  checked={confirmReset}
                  onChange={handleCheckboxChange}
                  className="change-password-checkbox-input"
                  required
                />
                <span className="change-password-checkbox-custom">
                  <CheckIcon className="change-password-checkbox-icon" />
                </span>
                I confirm, I want to reset my password.
              </label>
            </div>
          </form>
        </div>
        
        <div className="change-password-modal-footer">
          <button 
            className="change-password-cancel-btn"
            onClick={onHide}
          >
            <XMarkIcon className="change-password-btn-icon" />
            CANCEL
          </button>
          <button 
            className="change-password-send-btn"
            onClick={handleSubmit}
            disabled={!confirmReset}
          >
            <CheckIcon className="change-password-btn-icon" />
            SEND INSTRUCTIONS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;