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
  FunnelIcon
} from '@heroicons/react/24/outline';
import './FilterAllProducts.css';

const FilterAllProducts = ({ show, onHide, onApplyFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [additionalFilters, setAdditionalFilters] = useState([]);
  const [confirmChanges, setConfirmChanges] = useState(false);

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

  // Additional Filters
  const additionalFilterOptions = [
    'Educational Value', 'Creative Play', 'STEM Learning', 'Party Favorites'
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

  // Apply filters
  const handleApplyFilters = () => {
    if (confirmChanges) {
      const filters = {
        categories: selectedCategories,
        ageGroups: selectedAgeGroups,
        brands: selectedBrands,
        priceRanges: selectedPriceRange,
        customPriceRange: priceRange,
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
    setAdditionalFilters([]);
    setPriceRange([0, 5000]);
    setConfirmChanges(false);
  };

  if (!show) return null;

  return (
    <div className="filter-all-products-modal-overlay">
      <div className="filter-all-products-modal-content filter-all-products-wider-modal">
        <div className="filter-all-products-modal-header">
          <div className="filter-all-products-modal-title-wrapper">
            <FunnelIcon className="filter-all-products-modal-title-icon" />
            <h3 className="filter-all-products-modal-title">Filter Products</h3>
          </div>
          <button 
            className="filter-all-products-close-btn"
            onClick={onHide}
          >
            <XMarkIcon className="filter-all-products-close-icon" />
          </button>
        </div>
        
        <div className="filter-all-products-modal-body">
          {/* Information Note */}
          <div className="filter-all-products-note">
            <p className="filter-all-products-note-text">
              Apply filters to find the perfect kids products. You can filter by category, age group, brand, and price range.
            </p>
          </div>

          <div className="filter-all-products-form filter-all-products-wider-form">
            {/* Product Categories */}
            <div className="filter-all-products-form-row-wide">
              <div className="filter-all-products-form-group">
                <label className="filter-all-products-form-label">
                  <CubeIcon className="filter-all-products-form-label-icon" />
                  Product Categories
                </label>
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
              
              <div className="filter-all-products-form-group">
                <label className="filter-all-products-form-label">
                  <UserGroupIcon className="filter-all-products-form-label-icon" />
                  Age Group
                </label>
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
            </div>

            {/* Brands and Price Ranges */}
            <div className="filter-all-products-form-row-wide">
              <div className="filter-all-products-form-group">
                <label className="filter-all-products-form-label">
                  <TagIcon className="filter-all-products-form-label-icon" />
                  Popular Brands
                </label>
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
              
              <div className="filter-all-products-form-group">
                <label className="filter-all-products-form-label">
                  <CurrencyRupeeIcon className="filter-all-products-form-label-icon" />
                  Price Range
                </label>
                <div className="filter-all-products-options-grid">
                  {priceRanges.map((priceRange, index) => (
                    <button
                      key={index}
                      className={`filter-all-products-option-btn ${selectedPriceRange.includes(priceRange) ? 'selected' : ''}`}
                      onClick={() => handlePriceRangeSelect(priceRange)}
                    >
                      {priceRange}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Price Range and Additional Filters */}
            <div className="filter-all-products-form-row-wide">
              <div className="filter-all-products-form-group">
                <label className="filter-all-products-form-label">
                  <CurrencyRupeeIcon className="filter-all-products-form-label-icon" />
                  Custom Price Range
                </label>
                <div className="filter-all-products-price-inputs">
                  <div className="filter-all-products-price-group">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => handleCustomPriceChange(0, e.target.value)}
                      className="filter-all-products-form-input"
                      placeholder="Min Price"
                    />
                  </div>
                  <div className="filter-all-products-price-group">
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => handleCustomPriceChange(1, e.target.value)}
                      className="filter-all-products-form-input"
                      placeholder="Max Price"
                    />
                  </div>
                </div>
              </div>
              
              <div className="filter-all-products-form-group">
                <label className="filter-all-products-form-label">
                  <GiftIcon className="filter-all-products-form-label-icon" />
                  Additional Features
                </label>
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
            </div>

            {/* Confirmation Checkbox */}
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
          </div>
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
  );
};

export default FilterAllProducts;