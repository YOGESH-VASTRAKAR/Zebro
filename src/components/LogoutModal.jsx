import React from 'react';
import { 
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import './LogoutModal.css';

const LogoutModal = ({ show, onHide, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal-content logout-wider-modal">
        <div className="logout-modal-header">
          <div className="logout-modal-title-wrapper">
            <ExclamationTriangleIcon className="logout-modal-title-icon" />
            <h3 className="logout-modal-title">Confirm Logout</h3>
          </div>
          <button 
            className="logout-close-btn"
            onClick={onHide}
          >
            <XMarkIcon className="logout-close-icon" />
          </button>
        </div>
        
        <div className="logout-modal-body">
          {/* Warning Message */}
          <div className="logout-warning-section">
            <div className="logout-warning-icon">
              <ExclamationTriangleIcon className="logout-warning-icon-svg" />
            </div>
            <div className="logout-warning-content">
              <h4 className="logout-warning-title">Are you sure you want to logout?</h4>
              <p className="logout-warning-text">
                You will be signed out of your account. Any unsaved changes will be lost.
              </p>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="logout-confirm-section">
            <div className="logout-confirm-checkbox">
              <label className="logout-checkbox-label">
                <input
                  type="checkbox"
                  className="logout-checkbox-input"
                  id="logoutConfirm"
                />
                <span className="logout-checkbox-custom">
                  <svg className="logout-checkbox-icon" viewBox="0 0 12 12">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
                <span className="logout-checkbox-text">
                  I understand and want to proceed with logout
                </span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="logout-modal-footer">
          <button 
            className="logout-cancel-btn"
            onClick={onHide}
          >
            <XMarkIcon className="logout-btn-icon" />
            CANCEL
          </button>
          <button 
            className="logout-confirm-btn"
            onClick={() => {
              const checkbox = document.getElementById('logoutConfirm');
              if (checkbox.checked) {
                onConfirm();
                onHide();
              } else {
                alert('Please confirm that you understand before logging out.');
              }
            }}
          >
            <ArrowRightOnRectangleIcon className="logout-btn-icon" />
            YES, LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;