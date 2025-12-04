import React, { useState } from 'react';
import { 
  XMarkIcon,
  CubeIcon,
  UserGroupIcon,
  TagIcon,
  CurrencyRupeeIcon,
  GiftIcon,
  SparklesIcon,
  CheckIcon,
  FunnelIcon,
  PaintBrushIcon,
  UserIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { TagIcon as DiscountIcon } from '@heroicons/react/24/outline';
import './FilterAllProducts.css';

const FilterAllProducts = ({ show, onHide, onApplyFilters }) => {
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [additionalFilters, setAdditionalFilters] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [confirmChanges, setConfirmChanges] = useState(false);
  const [showSelectedFiltersMobile, setShowSelectedFiltersMobile] = useState(false);

  // Kids Products Categories
  const productCategories = [
    'Select All', 'Educational Toys', 'Building Blocks', 'Remote Control Toys', 
    'Art & Craft Kits', 'Puzzle Games', 'Musical Toys', 'Science Kits',
    'Dolls & Action Figures', 'Outdoor Play', 'Board Games', 'Soft Toys'
  ];

  // Age Groups
  const ageGroups = [
    'Select All', '0-1 Years', '1-3 Years', '3-5 Years', 
    '5-8 Years', '8-12 Years', '12+ Years'
  ];

  // Brands
  const brands = [
    'Lego', 'Barbie', 'Hot Wheels', 'Fisher-Price',
    'Nerf', 'Play-Doh', 'Marvel', 'Disney',
    'Crayola', 'Mattel', 'Hasbro', 'Melissa & Doug'
  ];

  // Price Ranges
  const priceRanges = [
    'Select All', 'Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000',
    '₹2000 - ₹5000', 'Above ₹5000'
  ];

  // Discount Ranges
  const discountRanges = [
    'Select All', '10% & Above', '20% & Above', '30% & Above',
    '40% & Above', '50% & Above', '60% & Above', 'Clearance (70%+)'
  ];

  // Colors
  const colors = [
    'Select All', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple',
    'Orange', 'White', 'Black', 'Multi-color', 'Rainbow'
  ];

  // Gender Options
  const genderOptions = ['Boys', 'Girls'];

  // Additional Filters
  const additionalFilterOptions = [
    'Educational Value', 'Creative Play', 'STEM Learning', 'Party Favorites'
  ];

  // Tabs Configuration
  const tabs = [
    { id: 'categories', label: 'Categories', icon: CubeIcon },
    { id: 'ageGroups', label: 'Age Group', icon: UserGroupIcon },
    { id: 'brands', label: 'Brands', icon: TagIcon },
    { id: 'price', label: 'Price', icon: CurrencyRupeeIcon },
    { id: 'discount', label: 'Discount', icon: DiscountIcon },
    { id: 'colors', label: 'Colors', icon: PaintBrushIcon },
    { id: 'gender', label: 'Gender', icon: UserIcon },
    { id: 'features', label: 'Features', icon: GiftIcon }
  ];

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (category === 'Select All') {
      setSelectedCategories(selectedCategories.length === productCategories.length - 1 ? [] : productCategories.filter(c => c !== 'Select All'));
    } else {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter(c => c !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  // Handle age group selection
  const handleAgeGroupSelect = (ageGroup) => {
    if (ageGroup === 'Select All') {
      setSelectedAgeGroups(selectedAgeGroups.length === ageGroups.length - 1 ? [] : ageGroups.filter(a => a !== 'Select All'));
    } else {
      if (selectedAgeGroups.includes(ageGroup)) {
        setSelectedAgeGroups(selectedAgeGroups.filter(a => a !== ageGroup));
      } else {
        setSelectedAgeGroups([...selectedAgeGroups, ageGroup]);
      }
    }
  };

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Handle price range selection
  const handlePriceRangeSelect = (priceRange) => {
    if (priceRange === 'Select All') {
      setSelectedPriceRange(selectedPriceRange.length === priceRanges.length - 1 ? [] : priceRanges.filter(p => p !== 'Select All'));
    } else {
      if (selectedPriceRange.includes(priceRange)) {
        setSelectedPriceRange(selectedPriceRange.filter(p => p !== priceRange));
      } else {
        setSelectedPriceRange([...selectedPriceRange, priceRange]);
      }
    }
  };

  // Handle discount selection
  const handleDiscountSelect = (discount) => {
    if (discount === 'Select All') {
      setSelectedDiscounts(selectedDiscounts.length === discountRanges.length - 1 ? [] : discountRanges.filter(d => d !== 'Select All'));
    } else {
      if (selectedDiscounts.includes(discount)) {
        setSelectedDiscounts(selectedDiscounts.filter(d => d !== discount));
      } else {
        setSelectedDiscounts([...selectedDiscounts, discount]);
      }
    }
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    if (color === 'Select All') {
      setSelectedColors(selectedColors.length === colors.length - 1 ? [] : colors.filter(c => c !== 'Select All'));
    } else {
      if (selectedColors.includes(color)) {
        setSelectedColors(selectedColors.filter(c => c !== color));
      } else {
        setSelectedColors([...selectedColors, color]);
      }
    }
  };

  // Handle gender selection
  const handleGenderSelect = (gender) => {
    if (selectedGender.includes(gender)) {
      setSelectedGender(selectedGender.filter(g => g !== gender));
    } else {
      setSelectedGender([...selectedGender, gender]);
    }
  };

  // Handle additional filter selection
  const handleAdditionalFilterSelect = (filter) => {
    if (additionalFilters.includes(filter)) {
      setAdditionalFilters(additionalFilters.filter(f => f !== filter));
    } else {
      setAdditionalFilters([...additionalFilters, filter]);
    }
  };

  // Handle custom price range change
  const handleCustomPriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value) || 0;
    setPriceRange(newRange);
  };

  // Remove selected filter
  const removeFilter = (type, value) => {
    switch (type) {
      case 'category':
        setSelectedCategories(selectedCategories.filter(c => c !== value));
        break;
      case 'ageGroup':
        setSelectedAgeGroups(selectedAgeGroups.filter(a => a !== value));
        break;
      case 'brand':
        setSelectedBrands(selectedBrands.filter(b => b !== value));
        break;
      case 'price':
        setSelectedPriceRange(selectedPriceRange.filter(p => p !== value));
        break;
      case 'discount':
        setSelectedDiscounts(selectedDiscounts.filter(d => d !== value));
        break;
      case 'color':
        setSelectedColors(selectedColors.filter(c => c !== value));
        break;
      case 'gender':
        setSelectedGender(selectedGender.filter(g => g !== value));
        break;
      case 'feature':
        setAdditionalFilters(additionalFilters.filter(f => f !== value));
        break;
      default:
        break;
    }
  };

  // Get all selected filters count
  const getTotalSelectedFilters = () => {
    return selectedCategories.length + selectedAgeGroups.length + selectedBrands.length +
           selectedPriceRange.length + selectedDiscounts.length + selectedColors.length +
           selectedGender.length + additionalFilters.length;
  };

  // Apply filters
  const handleApplyFilters = () => {
    if (confirmChanges) {
      const filters = {
        categories: selectedCategories,
        ageGroups: selectedAgeGroups,
        brands: selectedBrands,
        priceRanges: selectedPriceRange,
        customPriceRange: priceRange,
        discounts: selectedDiscounts,
        colors: selectedColors,
        gender: selectedGender,
        additionalFilters: additionalFilters
      };
      console.log('Applied Filters:', filters);
      onApplyFilters(filters);
      onHide();
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedAgeGroups([]);
    setSelectedBrands([]);
    setSelectedPriceRange([]);
    setSelectedDiscounts([]);
    setSelectedColors([]);
    setSelectedGender([]);
    setAdditionalFilters([]);
    setPriceRange([0, 5000]);
    setConfirmChanges(false);
    setShowSelectedFiltersMobile(false);
  };

  // Helper function to get color value
  const getColorValue = (color) => {
    const colorMap = {
      'Red': '#ff0000',
      'Blue': '#0066ff',
      'Green': '#00cc00',
      'Yellow': '#ffcc00',
      'Pink': '#ff66b2',
      'Purple': '#9933ff',
      'Orange': '#ff6600',
      'White': '#ffffff',
      'Black': '#000000',
      'Multi-color': 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
      'Rainbow': 'linear-gradient(45deg, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #9900ff)'
    };
    return colorMap[color] || '#cccccc';
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'categories':
        return (
          <div className="filter-all-products-tab-content">
            <div className="filter-all-products-options-grid">
              {productCategories.map((category, index) => (
                <button
                  key={index}
                  className={`filter-all-products-option-btn ${selectedCategories.includes(category) ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'ageGroups':
        return (
          <div className="filter-all-products-tab-content">
            <div className="filter-all-products-options-grid">
              {ageGroups.map((ageGroup, index) => (
                <button
                  key={index}
                  className={`filter-all-products-option-btn ${selectedAgeGroups.includes(ageGroup) ? 'selected' : ''}`}
                  onClick={() => handleAgeGroupSelect(ageGroup)}
                >
                  {ageGroup}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'brands':
        return (
          <div className="filter-all-products-tab-content">
            <div className="filter-all-products-options-grid">
              {brands.map((brand, index) => (
                <button
                  key={index}
                  className={`filter-all-products-option-btn ${selectedBrands.includes(brand) ? 'selected' : ''}`}
                  onClick={() => handleBrandSelect(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'price':
        return (
          <div className="filter-all-products-tab-content">
            <div className="filter-all-products-price-tab">
              <div className="filter-all-products-price-options">
                <h4 className="filter-all-products-subtitle">Price Ranges</h4>
                <div className="filter-all-products-options-grid">
                  {priceRanges.map((priceRangeOption, index) => (
                    <button
                      key={index}
                      className={`filter-all-products-option-btn ${selectedPriceRange.includes(priceRangeOption) ? 'selected' : ''}`}
                      onClick={() => handlePriceRangeSelect(priceRangeOption)}
                    >
                      {priceRangeOption}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter-all-products-custom-price">
                <h4 className="filter-all-products-subtitle">Custom Price Range</h4>
                <div className="filter-all-products-price-inputs">
                  <div className="filter-all-products-price-group">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => handleCustomPriceChange(0, e.target.value)}
                      className="filter-all-products-form-input"
                      placeholder="Min Price"
                      min="0"
                    />
                  </div>
                  <div className="filter-all-products-price-separator">to</div>
                  <div className="filter-all-products-price-group">
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => handleCustomPriceChange(1, e.target.value)}
                      className="filter-all-products-form-input"
                      placeholder="Max Price"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'discount':
        return (
          <div className="filter-all-products-tab-content">
            <div className="filter-all-products-options-grid">
              {discountRanges.map((discount, index) => (
                <button
                  key={index}
                  className={`filter-all-products-option-btn ${selectedDiscounts.includes(discount) ? 'selected' : ''}`}
                  onClick={() => handleDiscountSelect(discount)}
                >
                  {discount}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'colors':
        return (
          <div className="filter-all-products-tab-content">
            <div className="filter-all-products-color-grid">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`filter-all-products-color-btn ${selectedColors.includes(color) ? 'selected' : ''}`}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                >
                  {color === 'Select All' ? color : (
                    <>
                      <span className="filter-all-products-color-dot" style={{ 
                        background: getColorValue(color) 
                      }} />
                      <span className="filter-all-products-color-text">{color}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'gender':
        return (
          <div className="filter-all-products-tab-content">
            <div className="filter-all-products-gender-grid">
              {genderOptions.map((gender, index) => (
                <button
                  key={index}
                  className={`filter-all-products-gender-btn ${selectedGender.includes(gender) ? 'selected' : ''}`}
                  onClick={() => handleGenderSelect(gender)}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className="filter-all-products-tab-content">
            <div className="filter-all-products-options-grid">
              {additionalFilterOptions.map((filter, index) => (
                <button
                  key={index}
                  className={`filter-all-products-option-btn ${additionalFilters.includes(filter) ? 'selected' : ''}`}
                  onClick={() => handleAdditionalFilterSelect(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render selected filters for mobile
  const renderSelectedFiltersMobile = () => (
    <div className="filter-all-products-selected-filters-mobile">
      <div 
        className="filter-all-products-selected-filters-toggle"
        onClick={() => setShowSelectedFiltersMobile(!showSelectedFiltersMobile)}
      >
        <div className="filter-all-products-selected-filters-toggle-header">
          <h4 className="filter-all-products-selected-title-mobile">
            Selected Filters
            {getTotalSelectedFilters() > 0 && (
              <span className="filter-all-products-selected-count-badge-mobile">
                {getTotalSelectedFilters()} selected
              </span>
            )}
          </h4>
          {showSelectedFiltersMobile ? (
            <ChevronUpIcon className="filter-all-products-toggle-icon" />
          ) : (
            <ChevronDownIcon className="filter-all-products-toggle-icon" />
          )}
        </div>
      </div>
      
      {showSelectedFiltersMobile && (
        <div className="filter-all-products-selected-filters-content">
          {getTotalSelectedFilters() === 0 ? (
            <div className="filter-all-products-no-selections-mobile">
              <p className="filter-all-products-no-selections-text">
                No filters selected yet. Select filters from the tabs above.
              </p>
            </div>
          ) : (
            <div className="filter-all-products-selected-filters-list-mobile">
              {/* Selected Categories */}
              {selectedCategories.map((category, index) => (
                <div key={`cat-${index}`} className="filter-all-products-selected-item-mobile">
                  <span className="filter-all-products-selected-text">{category}</span>
                  <button 
                    className="filter-all-products-remove-btn"
                    onClick={() => removeFilter('category', category)}
                  >
                    <XCircleIcon className="filter-all-products-remove-icon" />
                  </button>
                </div>
              ))}
              
              {/* Selected Age Groups */}
              {selectedAgeGroups.map((ageGroup, index) => (
                <div key={`age-${index}`} className="filter-all-products-selected-item-mobile">
                  <span className="filter-all-products-selected-text">{ageGroup}</span>
                  <button 
                    className="filter-all-products-remove-btn"
                    onClick={() => removeFilter('ageGroup', ageGroup)}
                  >
                    <XCircleIcon className="filter-all-products-remove-icon" />
                  </button>
                </div>
              ))}
              
              {/* Selected Brands */}
              {selectedBrands.map((brand, index) => (
                <div key={`brand-${index}`} className="filter-all-products-selected-item-mobile">
                  <span className="filter-all-products-selected-text">{brand}</span>
                  <button 
                    className="filter-all-products-remove-btn"
                    onClick={() => removeFilter('brand', brand)}
                  >
                    <XCircleIcon className="filter-all-products-remove-icon" />
                  </button>
                </div>
              ))}
              
              {/* Selected Price Ranges */}
              {selectedPriceRange.map((priceRange, index) => (
                <div key={`price-${index}`} className="filter-all-products-selected-item-mobile">
                  <span className="filter-all-products-selected-text">{priceRange}</span>
                  <button 
                    className="filter-all-products-remove-btn"
                    onClick={() => removeFilter('price', priceRange)}
                  >
                    <XCircleIcon className="filter-all-products-remove-icon" />
                  </button>
                </div>
              ))}
              
              {/* Selected Discounts */}
              {selectedDiscounts.map((discount, index) => (
                <div key={`disc-${index}`} className="filter-all-products-selected-item-mobile">
                  <span className="filter-all-products-selected-text">{discount}</span>
                  <button 
                    className="filter-all-products-remove-btn"
                    onClick={() => removeFilter('discount', discount)}
                  >
                    <XCircleIcon className="filter-all-products-remove-icon" />
                  </button>
                </div>
              ))}
              
              {/* Selected Colors */}
              {selectedColors.map((color, index) => (
                <div key={`color-${index}`} className="filter-all-products-selected-item-mobile">
                  <div className="filter-all-products-color-selected">
                    <span className="filter-all-products-color-selected-dot" 
                      style={{ background: getColorValue(color) }} />
                    <span className="filter-all-products-selected-text">{color}</span>
                  </div>
                  <button 
                    className="filter-all-products-remove-btn"
                    onClick={() => removeFilter('color', color)}
                  >
                    <XCircleIcon className="filter-all-products-remove-icon" />
                  </button>
                </div>
              ))}
              
              {/* Selected Gender */}
              {selectedGender.map((gender, index) => (
                <div key={`gen-${index}`} className="filter-all-products-selected-item-mobile">
                  <span className="filter-all-products-selected-text">{gender}</span>
                  <button 
                    className="filter-all-products-remove-btn"
                    onClick={() => removeFilter('gender', gender)}
                  >
                    <XCircleIcon className="filter-all-products-remove-icon" />
                  </button>
                </div>
              ))}
              
              {/* Selected Additional Filters */}
              {additionalFilters.map((filter, index) => (
                <div key={`feat-${index}`} className="filter-all-products-selected-item-mobile">
                  <span className="filter-all-products-selected-text">{filter}</span>
                  <button 
                    className="filter-all-products-remove-btn"
                    onClick={() => removeFilter('feature', filter)}
                  >
                    <XCircleIcon className="filter-all-products-remove-icon" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (!show) return null;

  return (
    <div className="filter-all-products-modal-overlay">
      <div className="filter-all-products-modal-content filter-all-products-tab-layout">
        <div className="filter-all-products-modal-header">
          <div className="filter-all-products-modal-title-wrapper">
            <FunnelIcon className="filter-all-products-modal-title-icon" />
            <h3 className="filter-all-products-modal-title">Filter Products</h3>
            {getTotalSelectedFilters() > 0 && (
              <span className="filter-all-products-selected-count">
                ({getTotalSelectedFilters()} selected)
              </span>
            )}
          </div>
          <div className="filter-all-products-header-actions">
            <button 
              className="filter-all-products-clear-btn"
              onClick={handleClearFilters}
            >
              Clear All
            </button>
            <button 
              className="filter-all-products-close-btn"
              onClick={onHide}
            >
              <XMarkIcon className="filter-all-products-close-icon" />
            </button>
          </div>
        </div>
        
        <div className="filter-all-products-modal-body-tab">
          <div className="filter-all-products-tabs-container">
            {/* Left Side - Tabs */}
            <div className="filter-all-products-tabs-sidebar">
              <div className="filter-all-products-tabs-list">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  let count = 0;
                  
                  switch (tab.id) {
                    case 'categories': count = selectedCategories.length; break;
                    case 'ageGroups': count = selectedAgeGroups.length; break;
                    case 'brands': count = selectedBrands.length; break;
                    case 'price': count = selectedPriceRange.length; break;
                    case 'discount': count = selectedDiscounts.length; break;
                    case 'colors': count = selectedColors.length; break;
                    case 'gender': count = selectedGender.length; break;
                    case 'features': count = additionalFilters.length; break;
                    default: count = 0;
                  }
                  
                  return (
                    <button
                      key={tab.id}
                      className={`filter-all-products-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="filter-all-products-tab-icon" />
                      <span className="filter-all-products-tab-label">{tab.label}</span>
                      {count > 0 && (
                        <span className="filter-all-products-tab-badge">{count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Middle - Tab Content */}
            <div className="filter-all-products-tab-content-wrapper">
              <div className="filter-all-products-tab-header">
                <h4 className="filter-all-products-tab-title">
                  {tabs.find(t => t.id === activeTab)?.label || 'Select Filter'}
                </h4>
              </div>
              <div className="filter-all-products-tab-body">
                {renderTabContent()}
              </div>
            </div>
            
            {/* Right Side - Selected Filters (Desktop Only) */}
            <div className="filter-all-products-selected-filters-sidebar filter-all-products-desktop-only">
              <div className="filter-all-products-selected-filters-header">
                <h4 className="filter-all-products-selected-title">Selected Filters</h4>
                <span className="filter-all-products-selected-count-badge">
                  {getTotalSelectedFilters()} items
                </span>
              </div>
              
              <div className="filter-all-products-selected-filters-list">
                {/* Selected Categories */}
                {selectedCategories.map((category, index) => (
                  <div key={`cat-${index}`} className="filter-all-products-selected-item">
                    <span className="filter-all-products-selected-text">{category}</span>
                    <button 
                      className="filter-all-products-remove-btn"
                      onClick={() => removeFilter('category', category)}
                    >
                      <XCircleIcon className="filter-all-products-remove-icon" />
                    </button>
                  </div>
                ))}
                
                {/* Selected Age Groups */}
                {selectedAgeGroups.map((ageGroup, index) => (
                  <div key={`age-${index}`} className="filter-all-products-selected-item">
                    <span className="filter-all-products-selected-text">{ageGroup}</span>
                    <button 
                      className="filter-all-products-remove-btn"
                      onClick={() => removeFilter('ageGroup', ageGroup)}
                    >
                      <XCircleIcon className="filter-all-products-remove-icon" />
                    </button>
                  </div>
                ))}
                
                {/* Selected Brands */}
                {selectedBrands.map((brand, index) => (
                  <div key={`brand-${index}`} className="filter-all-products-selected-item">
                    <span className="filter-all-products-selected-text">{brand}</span>
                    <button 
                      className="filter-all-products-remove-btn"
                      onClick={() => removeFilter('brand', brand)}
                    >
                      <XCircleIcon className="filter-all-products-remove-icon" />
                    </button>
                  </div>
                ))}
                
                {/* Selected Price Ranges */}
                {selectedPriceRange.map((priceRange, index) => (
                  <div key={`price-${index}`} className="filter-all-products-selected-item">
                    <span className="filter-all-products-selected-text">{priceRange}</span>
                    <button 
                      className="filter-all-products-remove-btn"
                      onClick={() => removeFilter('price', priceRange)}
                    >
                      <XCircleIcon className="filter-all-products-remove-icon" />
                    </button>
                  </div>
                ))}
                
                {/* Selected Discounts */}
                {selectedDiscounts.map((discount, index) => (
                  <div key={`disc-${index}`} className="filter-all-products-selected-item">
                    <span className="filter-all-products-selected-text">{discount}</span>
                    <button 
                      className="filter-all-products-remove-btn"
                      onClick={() => removeFilter('discount', discount)}
                    >
                      <XCircleIcon className="filter-all-products-remove-icon" />
                    </button>
                  </div>
                ))}
                
                {/* Selected Colors */}
                {selectedColors.map((color, index) => (
                  <div key={`color-${index}`} className="filter-all-products-selected-item">
                    <div className="filter-all-products-color-selected">
                      <span className="filter-all-products-color-selected-dot" 
                        style={{ background: getColorValue(color) }} />
                      <span className="filter-all-products-selected-text">{color}</span>
                    </div>
                    <button 
                      className="filter-all-products-remove-btn"
                      onClick={() => removeFilter('color', color)}
                    >
                      <XCircleIcon className="filter-all-products-remove-icon" />
                    </button>
                  </div>
                ))}
                
                {/* Selected Gender */}
                {selectedGender.map((gender, index) => (
                  <div key={`gen-${index}`} className="filter-all-products-selected-item">
                    <span className="filter-all-products-selected-text">{gender}</span>
                    <button 
                      className="filter-all-products-remove-btn"
                      onClick={() => removeFilter('gender', gender)}
                    >
                      <XCircleIcon className="filter-all-products-remove-icon" />
                    </button>
                  </div>
                ))}
                
                {/* Selected Additional Filters */}
                {additionalFilters.map((filter, index) => (
                  <div key={`feat-${index}`} className="filter-all-products-selected-item">
                    <span className="filter-all-products-selected-text">{filter}</span>
                    <button 
                      className="filter-all-products-remove-btn"
                      onClick={() => removeFilter('feature', filter)}
                    >
                      <XCircleIcon className="filter-all-products-remove-icon" />
                    </button>
                  </div>
                ))}
                
                {getTotalSelectedFilters() === 0 && (
                  <div className="filter-all-products-no-selections">
                    <p className="filter-all-products-no-selections-text">
                      No filters selected yet. Select filters from the left tabs.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Selected Filters Accordion */}
        <div className="filter-all-products-mobile-selected-filters">
          {renderSelectedFiltersMobile()}
        </div>
        
        {/* Confirmation Checkbox and Footer */}
        <div className="filter-all-products-confirmation-section">
          <div className="filter-all-products-form-group-checkbox">
            <label className="filter-all-products-checkbox-label">
              <input
                type="checkbox"
                checked={confirmChanges}
                onChange={(e) => setConfirmChanges(e.target.checked)}
                className="filter-all-products-checkbox-input"
              />
              <span className="filter-all-products-checkbox-custom">
                <CheckIcon className="filter-all-products-checkbox-icon" />
              </span>
              I confirm, I want to apply these filters
            </label>
          </div>
          
          <div className="filter-all-products-modal-footer">
            <button 
              className="filter-all-products-cancel-btn"
              onClick={onHide}
            >
              <XMarkIcon className="filter-all-products-btn-icon" />
              CANCEL
            </button>
            <button 
              className="filter-all-products-apply-btn"
              onClick={handleApplyFilters}
              disabled={!confirmChanges}
            >
              <CheckIcon className="filter-all-products-btn-icon" />
              APPLY FILTERS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAllProducts;