import React, { useState } from 'react';
import { 
  XMarkIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  CheckIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import './EditProfileModal.css';

const EditProfileModal = ({ show, onHide, userData, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phone: userData?.phone || '+919876543210',
    email: userData?.email || '',
    dateOfBirth: userData?.dateOfBirth || '',
    confirmChanges: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.confirmChanges) {
      onSave(formData);
      onHide();
    }
  };

  if (!show) return null;

  return (
    <div className="edit-profile-modal-overlay">
      <div className="edit-profile-modal-content edit-profile-wider-modal">
        <div className="edit-profile-modal-header">
          <div className="edit-profile-modal-title-wrapper">
            <UserIcon className="edit-profile-modal-title-icon" />
            <h3 className="edit-profile-modal-title">Edit Profile</h3>
          </div>
          <button 
            className="edit-profile-close-btn"
            onClick={onHide}
          >
            <XMarkIcon className="edit-profile-close-icon" />
          </button>
        </div>
        
        <div className="edit-profile-modal-body">
          {/* Information Note */}
          <div className="edit-profile-note">
            <p className="edit-profile-note-text">
              Please note, you will not be able to change your email address which was used for registration. 
              In case you need help, please contact us.
            </p>
          </div>

          <form className="edit-profile-form edit-profile-wider-form" onSubmit={handleSubmit}>
            <div className="edit-profile-form-row-wide">
              <div className="edit-profile-form-group">
                <label className="edit-profile-form-label">
                  <UserIcon className="edit-profile-form-label-icon" />
                  First Name *
                </label>
                <div className="edit-profile-input-wrapper">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="edit-profile-form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="edit-profile-form-group">
                <label className="edit-profile-form-label">
                  <UserIcon className="edit-profile-form-label-icon" />
                  Last Name *
                </label>
                <div className="edit-profile-input-wrapper">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="edit-profile-form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="edit-profile-form-row-wide">
              <div className="edit-profile-form-group">
                <label className="edit-profile-form-label">
                  <DevicePhoneMobileIcon className="edit-profile-form-label-icon" />
                  Phone Number *
                </label>
                <div className="edit-profile-input-wrapper">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="edit-profile-form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="edit-profile-form-group">
                <label className="edit-profile-form-label">
                  <MapPinIcon className="edit-profile-form-label-icon" />
                  Email Address
                </label>
                <div className="edit-profile-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="edit-profile-form-input edit-profile-form-input-disabled"
                    disabled
                    readOnly
                  />
                </div>
                <div className="edit-profile-email-note">
                  Email cannot be changed
                </div>
              </div>
            </div>
            
            <div className="edit-profile-form-row-wide">
              <div className="edit-profile-form-group">
                <label className="edit-profile-form-label">
                  <CalendarDaysIcon className="edit-profile-form-label-icon" />
                  Date of Birth
                </label>
                <div className="edit-profile-input-wrapper">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="edit-profile-form-input"
                  />
                </div>
              </div>
              
              <div className="edit-profile-form-group">
                {/* Empty column for alignment */}
              </div>
            </div>

            <div className="edit-profile-form-group-checkbox">
              <label className="edit-profile-checkbox-label">
                <input
                  type="checkbox"
                  name="confirmChanges"
                  checked={formData.confirmChanges}
                  onChange={handleInputChange}
                  className="edit-profile-checkbox-input"
                  required
                />
                <span className="edit-profile-checkbox-custom">
                  <CheckIcon className="edit-profile-checkbox-icon" />
                </span>
                I confirm, I want to make these changes
              </label>
            </div>
          </form>
        </div>
        
        <div className="edit-profile-modal-footer">
          <button 
            className="edit-profile-cancel-btn"
            onClick={onHide}
          >
            <XMarkIcon className="edit-profile-btn-icon" />
            CANCEL
          </button>
          <button 
            className="edit-profile-save-btn"
            onClick={handleSubmit}
            disabled={!formData.confirmChanges}
          >
            <CheckIcon className="edit-profile-btn-icon" />
            SAVE SETTINGS
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;