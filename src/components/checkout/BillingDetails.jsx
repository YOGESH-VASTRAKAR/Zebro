import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  XMarkIcon,
  MapPinIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon
} from '@heroicons/react/24/solid';
import { 
  HomeIcon as HomeIconSolid,
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  MapPinIcon as MapPinIconSolid
} from '@heroicons/react/24/solid';
import './BillingDetails.css';

const BillingDetails = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'John Doe Smith',
      addressLine1: 'P.O. Box 1234, Chesterfield',
      addressLine2: 'Maharashtra, Mumbai',
      pincode: '400001',
      mobile: '+91 - 9876543210',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'John Doe Smith',
      addressLine1: 'Tech Park, Sector 62',
      addressLine2: 'Noida, Uttar Pradesh',
      pincode: '201309',
      mobile: '+91 - 9876543211',
      isDefault: false
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    name: '',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    mobile: '',
    isDefault: false
  });
  const [expandedCard, setExpandedCard] = useState(null);

  const handleDelete = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.addressLine1 && newAddress.pincode && newAddress.mobile) {
      const updatedAddresses = newAddress.isDefault 
        ? addresses.map(addr => ({ ...addr, isDefault: false }))
        : [...addresses];
      
      setAddresses([...updatedAddresses, { ...newAddress, id: Date.now() }]);
      resetForm();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const setAsDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const resetForm = () => {
    setNewAddress({
      type: 'home',
      name: '',
      addressLine1: '',
      addressLine2: '',
      pincode: '',
      mobile: '',
      isDefault: false
    });
    setShowModal(false);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return <HomeIconSolid className="billing-address-type-icon" />;
      case 'work':
        return <BuildingOfficeIconSolid className="billing-address-type-icon" />;
      default:
        return <MapPinIconSolid className="billing-address-type-icon" />;
    }
  };

  const toggleCard = (id) => {
    setExpandedCard(prev => prev === id ? null : id);
  };

  const isCardExpanded = (id) => {
    return expandedCard === id;
  };

  return (
    <div className="billing-details-section">
      <div className="billing-details-container">
        {/* Main Heading */}
        <h1 className="billing-details-main-title">
          Billing Details
        </h1>

        <div className="billing-content-container">
          {/* Header with Icon */}
          <div className="billing-addresses-header">
            <div className="billing-addresses-header-content">
              <div className="billing-addresses-header-text">
                <div className="billing-addresses-header-title-wrapper">
                  <MapPinIcon className="billing-addresses-header-icon" />
                  <p className="billing-addresses-subtitle">
                    Select your billing address
                  </p>
                </div>
              </div>
              <div className="billing-addresses-header-actions">
                <button 
                  className="billing-new-address-btn"
                  onClick={() => setShowModal(true)}
                >
                  <PlusIcon className="billing-btn-icon" />
                  NEW ADDRESS
                </button>
              </div>
            </div>
          </div>
          
          {/* Address Cards - One below another */}
          <div className="billing-addresses-list">
            {addresses.map((address) => (
              <Card key={address.id} className="billing-address-accordion-card">
                <Card.Header 
                  className="billing-address-accordion-header"
                  onClick={() => toggleCard(address.id)}
                >
                  <div className="billing-accordion-header-content">
                    <div className="billing-accordion-left">
                      <div className="billing-address-type-wrapper">
                        {getAddressIcon(address.type)}
                        <span className="billing-address-type-badge">
                          {address.type.toUpperCase()} ADDRESS
                        </span>
                      </div>
                      {address.isDefault && (
                        <div className="billing-address-default-badge">
                          <CheckIcon className="billing-address-default-icon" />
                          DEFAULT
                        </div>
                      )}
                    </div>
                    <div className="billing-accordion-right">
                      {isCardExpanded(address.id) ? (
                        <ChevronUpIcon className="billing-accordion-chevron" />
                      ) : (
                        <ChevronDownIcon className="billing-accordion-chevron" />
                      )}
                    </div>
                  </div>
                </Card.Header>
                
                {isCardExpanded(address.id) && (
                  <Card.Body className="billing-address-accordion-body">
                    <div className="billing-address-card-content">
                      {/* Left side: Name and Address */}
                      <div className="billing-address-left-section">
                        <div className="billing-address-name-section">
                          <UserIcon className="billing-address-detail-icon" />
                          <h4 className="billing-address-name">{address.name}</h4>
                        </div>
                        
                        <div className="billing-address-line-section">
                          <MapPinIcon className="billing-address-detail-icon" />
                          <div>
                            <p className="billing-address-line">{address.addressLine1}</p>
                            <p className="billing-address-line">{address.addressLine2}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right side: Pincode and Mobile */}
                      <div className="billing-address-right-section">
                        <div className="billing-address-detail-item-right">
                          <span className="billing-address-detail-label-right">Pincode:</span>
                          <span className="billing-address-detail-value-right">{address.pincode}</span>
                        </div>
                        <div className="billing-address-mobile-item">
                          <DevicePhoneMobileIcon className="billing-address-mobile-icon" />
                          <span className="billing-address-mobile-text">{address.mobile}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="billing-address-card-actions">
                      <div className="billing-address-action-buttons">
                        {!address.isDefault && (
                          <button 
                            className="billing-address-set-default-btn"
                            onClick={() => setAsDefault(address.id)}
                          >
                            <CheckIcon className="billing-address-action-icon" />
                            SET DEFAULT
                          </button>
                        )}
                        <button 
                          className="billing-address-delete-btn"
                          onClick={() => handleDelete(address.id)}
                        >
                          <XMarkIcon className="billing-address-action-icon" />
                          DELETE
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                )}
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {addresses.length === 0 && (
            <div className="billing-addresses-empty">
              <MapPinIcon className="billing-addresses-empty-icon" />
              <h3 className="billing-addresses-empty-title">No Addresses Added</h3>
              <p className="billing-addresses-empty-text">
                You haven't added any addresses yet. Add your first address to get started.
              </p>
              <button 
                className="billing-new-address-btn billing-addresses-empty-btn"
                onClick={() => setShowModal(true)}
              >
                ADD YOUR FIRST ADDRESS
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Address Modal */}
      {showModal && (
        <div className="billing-modal-overlay">
          <div className="billing-modal-content">
            <div className="billing-modal-header">
              <div className="billing-modal-title-wrapper">
                <MapPinIcon className="billing-modal-title-icon" />
                <h3 className="billing-modal-title">Add New Address</h3>
              </div>
              <button 
                className="billing-close-btn"
                onClick={resetForm}
              >
                <XMarkIcon className="billing-close-icon" />
              </button>
            </div>
            
            <div className="billing-modal-body">
              <div className="billing-form">
                <div className="billing-form-row-wide">
                  <div className="billing-form-group">
                    <label className="billing-form-label">
                      <MapPinIcon className="billing-form-label-icon" />
                      Address Type *
                    </label>
                    <div className="billing-select-wrapper">
                      <select 
                        name="type" 
                        value={newAddress.type}
                        onChange={handleInputChange}
                        className="billing-form-select"
                      >
                        <option value="home">Home Address</option>
                        <option value="work">Work Address</option>
                        <option value="other">Other Address</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="billing-form-group">
                    <label className="billing-form-label">
                      <UserIcon className="billing-form-label-icon" />
                      Full Name *
                    </label>
                    <div className="billing-input-wrapper">
                      <input
                        type="text"
                        name="name"
                        value={newAddress.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        className="billing-form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="billing-form-row-wide">
                  <div className="billing-form-group">
                    <label className="billing-form-label">
                      <MapPinIcon className="billing-form-label-icon" />
                      Address Line 1 *
                    </label>
                    <div className="billing-input-wrapper">
                      <input
                        type="text"
                        name="addressLine1"
                        value={newAddress.addressLine1}
                        onChange={handleInputChange}
                        placeholder="Enter address line 1"
                        className="billing-form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="billing-form-group">
                    <label className="billing-form-label">
                      <MapPinIcon className="billing-form-label-icon" />
                      Address Line 2
                    </label>
                    <div className="billing-input-wrapper">
                      <input
                        type="text"
                        name="addressLine2"
                        value={newAddress.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Enter address line 2 (optional)"
                        className="billing-form-input"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="billing-form-row-wide">
                  <div className="billing-form-group">
                    <label className="billing-form-label">
                      <MapPinIcon className="billing-form-label-icon" />
                      Pincode *
                    </label>
                    <div className="billing-input-wrapper">
                      <input
                        type="text"
                        name="pincode"
                        value={newAddress.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter 6-digit pincode"
                        maxLength="6"
                        className="billing-form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="billing-form-group">
                    <label className="billing-form-label">
                      <DevicePhoneMobileIcon className="billing-form-label-icon" />
                      Mobile Number *
                    </label>
                    <div className="billing-input-wrapper">
                      <input
                        type="tel"
                        name="mobile"
                        value={newAddress.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter 10-digit mobile number"
                        className="billing-form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="billing-form-group-checkbox">
                  <label className="billing-checkbox-label">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={newAddress.isDefault}
                      onChange={handleInputChange}
                      className="billing-checkbox-input"
                    />
                    <span className="billing-checkbox-custom">
                      <CheckIcon className="billing-checkbox-icon" />
                    </span>
                    Set as default address
                  </label>
                </div>
              </div>
            </div>
            
            <div className="billing-modal-footer">
              <button 
                className="billing-cancel-btn"
                onClick={resetForm}
              >
                <XMarkIcon className="billing-btn-icon" />
                CANCEL
              </button>
              <button 
                className="billing-save-btn"
                onClick={handleAddAddress}
                disabled={!newAddress.name || !newAddress.addressLine1 || !newAddress.pincode || !newAddress.mobile}
              >
                <CheckIcon className="billing-btn-icon" />
                SAVE ADDRESS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingDetails;