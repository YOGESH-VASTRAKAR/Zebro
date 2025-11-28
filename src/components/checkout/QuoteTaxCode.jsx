import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './QuoteTaxCode.css';

const QuoteTaxCode = () => {
  const [tinNumber, setTinNumber] = useState('');
  const [vrnNumber, setVrnNumber] = useState('');
  const [isTinApplied, setIsTinApplied] = useState(false);
  const [isVrnApplied, setIsVrnApplied] = useState(false);

  const handleApplyTin = () => {
    if (tinNumber.trim() !== '') {
      setIsTinApplied(true);
    }
  };

  const handleApplyVrn = () => {
    if (vrnNumber.trim() !== '') {
      setIsVrnApplied(true);
    }
  };

  const handleRemoveTin = () => {
    setTinNumber('');
    setIsTinApplied(false);
  };

  const handleRemoveVrn = () => {
    setVrnNumber('');
    setIsVrnApplied(false);
  };

  return (
    <div className="quote-tax-code-section">
      <div className="quote-tax-code-container">
        {/* TIN Section */}
        <div className="tax-code-section">
          <div className="tax-code-header">
            <h3 className="tax-code-title">
              Quote your TIN. <span className="tax-code-optional">(This is optional)</span>
            </h3>
          </div>
          
          <div className="tax-code-input-card">
            {!isTinApplied ? (
              <div className="tax-code-input-group">
                <div className="tax-code-input-wrapper">
                  <input
                    type="text"
                    className="tax-code-input"
                    placeholder="TIN NUMBER"
                    value={tinNumber}
                    onChange={(e) => setTinNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyTin()}
                  />
                </div>
                <button 
                  className="tax-code-apply-btn"
                  onClick={handleApplyTin}
                  disabled={!tinNumber.trim()}
                >
                  APPLY
                </button>
              </div>
            ) : (
              <div className="tax-code-applied-card">
                <div className="tax-code-applied-content">
                  <div className="tax-code-success-icon">
                    <div className="tax-code-icon-container">
                      <span className="tax-code-icon-text">✓</span>
                    </div>
                  </div>
                  <div className="tax-code-applied-text">
                    <div className="tax-code-main-text">
                      TIN Number <strong>{tinNumber}</strong> Applied!
                    </div>
                    <div className="tax-code-sub-text">
                      Your Tax Identification Number has been successfully added.
                    </div>
                  </div>
                </div>
                <button 
                  className="tax-code-remove-btn"
                  onClick={handleRemoveTin}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* VRN Section */}
        <div className="tax-code-section">
          <div className="tax-code-header">
            <h3 className="tax-code-title">
              Quote your VRN. <span className="tax-code-optional">(This is optional)</span>
            </h3>
          </div>
          
          <div className="tax-code-input-card">
            {!isVrnApplied ? (
              <div className="tax-code-input-group">
                <div className="tax-code-input-wrapper">
                  <input
                    type="text"
                    className="tax-code-input"
                    placeholder="VRN NUMBER"
                    value={vrnNumber}
                    onChange={(e) => setVrnNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyVrn()}
                  />
                </div>
                <button 
                  className="tax-code-apply-btn"
                  onClick={handleApplyVrn}
                  disabled={!vrnNumber.trim()}
                >
                  APPLY
                </button>
              </div>
            ) : (
              <div className="tax-code-applied-card">
                <div className="tax-code-applied-content">
                  <div className="tax-code-success-icon">
                    <div className="tax-code-icon-container">
                      <span className="tax-code-icon-text">✓</span>
                    </div>
                  </div>
                  <div className="tax-code-applied-text">
                    <div className="tax-code-main-text">
                      VRN Number <strong>{vrnNumber}</strong> Applied!
                    </div>
                    <div className="tax-code-sub-text">
                      Your VAT Registration Number has been successfully added.
                    </div>
                  </div>
                </div>
                <button 
                  className="tax-code-remove-btn"
                  onClick={handleRemoveVrn}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteTaxCode;