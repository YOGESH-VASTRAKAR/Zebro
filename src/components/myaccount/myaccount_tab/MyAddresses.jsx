import React, { useState } from 'react';
import { 
  PlusIcon,
  XMarkIcon,
  HomeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  TrashIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  MapPinIcon as MapPinIconSolid
} from '@heroicons/react/24/solid';
import './MyAddresses.css';

const MyAddresses = () => {
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

  const handleDelete = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.addressLine1 && newAddress.pincode && newAddress.mobile) {
      // If new address is set as default, remove default from others
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
        return <HomeIconSolid className="my-addresses-address-type-icon" />;
      case 'work':
        return <BuildingOfficeIconSolid className="my-addresses-address-type-icon" />;
      default:
        return <MapPinIconSolid className="my-addresses-address-type-icon" />;
    }
  };

  return (
    <div className="my-addresses-page">
      <div className="my-addresses-content-section">
        <h3 className="my-addresses-content-title">My Addresses</h3>
        <div className="my-addresses-content-scrollable">
          <div className="my-addresses-container">
            {/* Updated Header with Icon */}
            <div className="my-addresses-header">
              <div className="my-addresses-header-content">
                <div className="my-addresses-header-text">
                  <div className="my-addresses-header-title-wrapper">
                    <MapPinIcon className="my-addresses-header-icon" />
                    <p className="my-addresses-subtitle">
                      Manage your delivery addresses
                    </p>
                  </div>
                </div>
                <div className="my-addresses-header-actions">
                  <button 
                    className="my-addresses-new-address-btn"
                    onClick={() => setShowModal(true)}
                  >
                    <PlusIcon className="my-addresses-btn-icon" />
                    NEW ADDRESS
                  </button>
                </div>
              </div>
            </div>
            
            <div className="my-addresses-list">
              {addresses.map((address) => (
                <div key={address.id} className="my-addresses-card">
                  <div className="my-addresses-card-header">
                    <div className="my-addresses-type-wrapper">
                      {getAddressIcon(address.type)}
                      <span className="my-addresses-type-badge">
                        {address.type.toUpperCase()} ADDRESS
                      </span>
                    </div>
                    {address.isDefault && (
                      <div className="my-addresses-default-badge">
                        <CheckIcon className="my-addresses-default-icon" />
                        DEFAULT
                      </div>
                    )}
                  </div>
                  
                  <div className="my-addresses-card-content">
                    {/* Left Column - Name and Address */}
                    <div className="my-addresses-left-column">
                      <div className="my-addresses-name-section">
                        <UserIcon className="my-addresses-detail-icon" />
                        <h4 className="my-addresses-name">{address.name}</h4>
                      </div>
                      
                      <div className="my-addresses-line-section">
                        <MapPinIcon className="my-addresses-detail-icon" />
                        <div>
                          <p className="my-addresses-line">{address.addressLine1}</p>
                          <p className="my-addresses-line">{address.addressLine2}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column - Pincode and Mobile */}
                    <div className="my-addresses-right-column">
                      {/* Pincode: Label and Value Side by Side */}
                      <div className="my-addresses-pincode-section">
                        <span className="my-addresses-pincode-label">Pincode:</span>
                        <span className="my-addresses-pincode-value">{address.pincode}</span>
                      </div>
                      
                      {/* Mobile: Icon and Value Side by Side, Vertically Centered */}
                      <div className="my-addresses-mobile-section">
                        <div className="my-addresses-mobile-icon-wrapper">
                          <DevicePhoneMobileIcon className="my-addresses-detail-icon my-addresses-detail-icon-small" />
                        </div>
                        <span className="my-addresses-mobile-value">{address.mobile}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="my-addresses-card-actions">
                    <div className="my-addresses-action-buttons">
                      {!address.isDefault && (
                        <button 
                          className="my-addresses-set-default-btn"
                          onClick={() => setAsDefault(address.id)}
                        >
                          <CheckIcon className="my-addresses-action-icon" />
                          SET DEFAULT
                        </button>
                      )}
                      <button 
                        className="my-addresses-delete-btn"
                        onClick={() => handleDelete(address.id)}
                      >
                        <TrashIcon className="my-addresses-action-icon" />
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {addresses.length === 0 && (
              <div className="my-addresses-empty">
                <MapPinIcon className="my-addresses-empty-icon" />
                <h3 className="my-addresses-empty-title">No Addresses Added</h3>
                <p className="my-addresses-empty-text">
                  You haven't added any addresses yet. Add your first address to get started.
                </p>
                <button 
                  className="my-addresses-new-address-btn my-addresses-empty-btn"
                  onClick={() => setShowModal(true)}
                >
                  <PlusIcon className="my-addresses-btn-icon" />
                  ADD YOUR FIRST ADDRESS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Address Modal */}
      {showModal && (
        <div className="my-addresses-modal-overlay">
          <div className="my-addresses-modal-content my-addresses-wider-modal">
            <div className="my-addresses-modal-header">
              <div className="my-addresses-modal-title-wrapper">
                <PlusIcon className="my-addresses-modal-title-icon" />
                <h3 className="my-addresses-modal-title">Add New Address</h3>
              </div>
              <button 
                className="my-addresses-close-btn"
                onClick={resetForm}
              >
                <XMarkIcon className="my-addresses-close-icon" />
              </button>
            </div>
            
            <div className="my-addresses-modal-body">
              <div className="my-addresses-form my-addresses-wider-form">
                <div className="my-addresses-form-row-wide">
                  <div className="my-addresses-form-group">
                    <label className="my-addresses-form-label">
                      <MapPinIcon className="my-addresses-form-label-icon" />
                      Address Type *
                    </label>
                    <div className="my-addresses-select-wrapper">
                      <select 
                        name="type" 
                        value={newAddress.type}
                        onChange={handleInputChange}
                        className="my-addresses-form-select"
                      >
                        <option value="home">Home Address</option>
                        <option value="work">Work Address</option>
                        <option value="other">Other Address</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="my-addresses-form-group">
                    <label className="my-addresses-form-label">
                      <UserIcon className="my-addresses-form-label-icon" />
                      Full Name *
                    </label>
                    <div className="my-addresses-input-wrapper">
                      <input
                        type="text"
                        name="name"
                        value={newAddress.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        className="my-addresses-form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="my-addresses-form-row-wide">
                  <div className="my-addresses-form-group">
                    <label className="my-addresses-form-label">
                      <MapPinIcon className="my-addresses-form-label-icon" />
                      Address Line 1 *
                    </label>
                    <div className="my-addresses-input-wrapper">
                      <input
                        type="text"
                        name="addressLine1"
                        value={newAddress.addressLine1}
                        onChange={handleInputChange}
                        placeholder="Enter address line 1"
                        className="my-addresses-form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="my-addresses-form-group">
                    <label className="my-addresses-form-label">
                      <MapPinIcon className="my-addresses-form-label-icon" />
                      Address Line 2
                    </label>
                    <div className="my-addresses-input-wrapper">
                      <input
                        type="text"
                        name="addressLine2"
                        value={newAddress.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Enter address line 2 (optional)"
                        className="my-addresses-form-input"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="my-addresses-form-row-wide">
                  <div className="my-addresses-form-group">
                    <label className="my-addresses-form-label">
                      <MapPinIcon className="my-addresses-form-label-icon" />
                      Pincode *
                    </label>
                    <div className="my-addresses-input-wrapper">
                      <input
                        type="text"
                        name="pincode"
                        value={newAddress.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter 6-digit pincode"
                        maxLength="6"
                        className="my-addresses-form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="my-addresses-form-group">
                    <label className="my-addresses-form-label">
                      <DevicePhoneMobileIcon className="my-addresses-form-label-icon" />
                      Mobile Number *
                    </label>
                    <div className="my-addresses-input-wrapper">
                      <input
                        type="tel"
                        name="mobile"
                        value={newAddress.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter 10-digit mobile number"
                        className="my-addresses-form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="my-addresses-form-group-checkbox">
                  <label className="my-addresses-checkbox-label">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={newAddress.isDefault}
                      onChange={handleInputChange}
                      className="my-addresses-checkbox-input"
                    />
                    <span className="my-addresses-checkbox-custom">
                      <CheckIcon className="my-addresses-checkbox-icon" />
                    </span>
                    Set as default address
                  </label>
                </div>
              </div>
            </div>
            
            <div className="my-addresses-modal-footer">
              <button 
                className="my-addresses-cancel-btn"
                onClick={resetForm}
              >
                <XMarkIcon className="my-addresses-btn-icon" />
                CANCEL
              </button>
              <button 
                className="my-addresses-save-btn"
                onClick={handleAddAddress}
                disabled={!newAddress.name || !newAddress.addressLine1 || !newAddress.pincode || !newAddress.mobile}
              >
                <CheckIcon className="my-addresses-btn-icon" />
                SAVE ADDRESS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddresses;