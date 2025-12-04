import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  XMarkIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import './FilterSection.css';

const FilterSection = () => {
  const filters = [
    {
      title: "Search by Genre",
      items: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"]
    },
    {
      title: "Search by Age group",
      items: ["0-3 Years", "3-6 Years", "6-9 Years", "9-12 Years", "12-15 Years", "15-18 Years", "18+ Years"]
    },
    {
      title: "Search by What you like",
      items: ["Popular", "New Releases", "Bestsellers", "Award Winners", "Educational", "Entertainment", "Classics"]
    }
  ];

  const [activeFilter, setActiveFilter] = React.useState(null);
  const [selectedItems, setSelectedItems] = React.useState({});
  const [searchValues, setSearchValues] = React.useState({});
  const [filteredItems, setFilteredItems] = React.useState({});
  const [dropdownRefs, setDropdownRefs] = React.useState({});

  React.useEffect(() => {
    // Initialize filtered items
    const initialFiltered = {};
    filters.forEach((filter, index) => {
      initialFiltered[index] = filter.items;
    });
    setFilteredItems(initialFiltered);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeFilter !== null) {
        const filterCard = document.querySelector(`.filtersection-card-${activeFilter}`);
        const dropdownContent = document.querySelector(`.filtersection-dropdown-${activeFilter}`);
        
        if (filterCard && dropdownContent) {
          if (!filterCard.contains(event.target) && !dropdownContent.contains(event.target)) {
            setActiveFilter(null);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeFilter]);

  const handleFilterClick = (index) => {
    setActiveFilter(activeFilter === index ? null : index);
  };

  const handleItemSelect = (filterIndex, item) => {
    setSelectedItems(prev => ({
      ...prev,
      [filterIndex]: prev[filterIndex] === item ? null : item
    }));
  };

  const handleSearchChange = (filterIndex, value) => {
    setSearchValues(prev => ({
      ...prev,
      [filterIndex]: value
    }));

    // Filter items based on search
    if (value.trim() === '') {
      setFilteredItems(prev => ({
        ...prev,
        [filterIndex]: filters[filterIndex].items
      }));
    } else {
      const filtered = filters[filterIndex].items.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(prev => ({
        ...prev,
        [filterIndex]: filtered
      }));
    }
  };

  const clearAllFilters = () => {
    setSelectedItems({});
    setSearchValues({});
    setActiveFilter(null);
    
    // Reset filtered items to original
    const resetFiltered = {};
    filters.forEach((filter, index) => {
      resetFiltered[index] = filter.items;
    });
    setFilteredItems(resetFiltered);
  };

  const clearSearch = (filterIndex, e) => {
    if (e) e.stopPropagation();
    setSearchValues(prev => ({
      ...prev,
      [filterIndex]: ''
    }));
    setFilteredItems(prev => ({
      ...prev,
      [filterIndex]: filters[filterIndex].items
    }));
  };

  return (
    <>
      {/* Filter Section */}
      <div className="filtersection-section">
        <Container>
          {/* Filter Cards Grid - Only 3 filters */}
          <div className="filtersection-cards-grid">
            <Row className="justify-content-center">
              {filters.map((filter, index) => (
                <Col lg={4} md={6} key={index}>
                  <div className="filtersection-card-wrapper">
                    <div 
                      className={`filtersection-card filtersection-card-${index} ${activeFilter === index ? 'active' : ''}`}
                      onClick={() => handleFilterClick(index)}
                    >
                      <div className="filtersection-card-header">
                        <div className="filtersection-card-header-left">
                          <FunnelIcon className="filtersection-card-icon-svg" />
                          <h3 className="filtersection-card-title">
                            {filter.title}
                          </h3>
                        </div>
                        <div className="filtersection-card-header-right">
                          {selectedItems[index] && (
                            <span className="filtersection-selected-badge">
                              {selectedItems[index]}
                            </span>
                          )}
                          <ChevronDownIcon className={`filtersection-chevron ${activeFilter === index ? 'rotated' : ''}`} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Absolute Position Dropdown */}
                    {activeFilter === index && (
                      <div className={`filtersection-dropdown filtersection-dropdown-${index}`}>
                        <div className="filtersection-dropdown-content">
                          {/* Search Input */}
                          <div className="filtersection-search-wrapper">
                            <div className="filtersection-search-box">
                              <MagnifyingGlassIcon className="filtersection-search-icon" />
                              <input
                                type="text"
                                className="filtersection-search-input"
                                placeholder={`Search ${filter.title.toLowerCase()}...`}
                                value={searchValues[index] || ''}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleSearchChange(index, e.target.value)}
                                autoFocus
                              />
                              {(searchValues[index] && searchValues[index].length > 0) && (
                                <button 
                                  className="filtersection-search-clear"
                                  onClick={(e) => clearSearch(index, e)}
                                >
                                  <XMarkIcon className="filtersection-search-clear-icon" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Filtered Items */}
                          <div className="filtersection-items-container">
                            {filteredItems[index] && filteredItems[index].length > 0 ? (
                              <div className="filtersection-items-grid">
                                {filteredItems[index].map((item, itemIndex) => (
                                  <button
                                    key={itemIndex}
                                    className={`filtersection-item-btn ${selectedItems[index] === item ? 'selected' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleItemSelect(index, item);
                                    }}
                                  >
                                    {item}
                                    {selectedItems[index] === item && (
                                      <span className="filtersection-item-check">
                                        ✓
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="filtersection-no-results">
                                No results found for "{searchValues[index] || ''}"
                              </div>
                            )}
                          </div>

                          {/* Items Count */}
                          <div className="filtersection-items-count">
                            Showing {filteredItems[index]?.length || 0} of {filter.items.length} items
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Clear All Button - Center mein */}
          <div className="filtersection-clear-container">
            <button 
              className="filtersection-clear-btn"
              onClick={clearAllFilters}
            >
              <XMarkIcon className="filtersection-clear-icon" />
              Clear All
            </button>
          </div>

          {/* Active Filters Display (only if any selected) */}
          {Object.keys(selectedItems).length > 0 && (
            <div className="filtersection-active-filters">
              <div className="filtersection-active-items">
                {Object.entries(selectedItems).map(([filterIndex, item]) => (
                  item && (
                    <span key={`active-${filterIndex}`} className="filtersection-active-item">
                      {filters[filterIndex].title}: {item}
                      <button 
                        className="filtersection-remove-item"
                        onClick={() => handleItemSelect(filterIndex, item)}
                      >
                        <XMarkIcon className="filtersection-remove-icon" />
                      </button>
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default FilterSection;