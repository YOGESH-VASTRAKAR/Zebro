import React, { useState } from 'react';
import { 
  Cog6ToothIcon,
  CheckCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';
import './OtherSettings.css';

const OtherSettings = () => {
  const [newsletterSubscription, setNewsletterSubscription] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Settings saved:', { newsletterSubscription });
      setIsSaving(false);
      // Show success message
    }, 1000);
  };

  return (
    <div className="other-settings-page">
      <div className="other-settings-content-section">
        <h3 className="other-settings-content-title">Other Settings</h3>
        <div className="other-settings-content-scrollable">
          <div className="other-settings-container">
            <div className="other-settings-header">
              <div className="other-settings-header-content">
                <Cog6ToothIcon className="other-settings-header-icon" />
                <span className="other-settings-title-text">Preferences</span>
              </div>
            </div>
            
            <div className="other-settings-content">
              <div className="other-settings-item">
                <div className="other-settings-info">
                  <h4 className="other-settings-label">Receive Newsletter Subscription</h4>
                  <p className="other-settings-description">
                    Get updates about new products, offers and educational content
                  </p>
                </div>
                
                <div className="other-settings-control">
                  <div className="other-settings-radio-options">
                    <label className="other-settings-radio-option">
                      <input
                        type="radio"
                        name="newsletter"
                        value="yes"
                        checked={newsletterSubscription === true}
                        onChange={() => setNewsletterSubscription(true)}
                        className="other-settings-radio-input"
                      />
                      <div className="other-settings-radio-custom">
                        <CheckCircleIcon className="other-settings-radio-icon" />
                      </div>
                      <span className="other-settings-radio-label">Yes</span>
                    </label>
                    
                    <label className="other-settings-radio-option">
                      <input
                        type="radio"
                        name="newsletter"
                        value="no"
                        checked={newsletterSubscription === false}
                        onChange={() => setNewsletterSubscription(false)}
                        className="other-settings-radio-input"
                      />
                      <div className="other-settings-radio-custom">
                        <XCircleIcon className="other-settings-radio-icon" />
                      </div>
                      <span className="other-settings-radio-label">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="other-settings-actions">
              <button 
                className={`other-settings-save-btn ${isSaving ? 'other-settings-saving' : ''}`}
                onClick={handleSaveSettings}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="other-settings-loading-spinner"></div>
                    SAVING...
                  </>
                ) : (
                  'SAVE SETTINGS'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherSettings;