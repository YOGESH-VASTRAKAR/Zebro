import { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { 
  Container, 
  Form, 
  Button, 
  Offcanvas,
  Row,
  Col
} from 'react-bootstrap';
import { 
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
  PuzzlePieceIcon,
  BookOpenIcon,
  XMarkIcon,
  StarIcon,
  TruckIcon,
  ChevronDownIcon,
  SparklesIcon,
  GiftIcon,
  AcademicCapIcon,
  PaintBrushIcon,
  CubeIcon,
  RocketLaunchIcon,
  ChevronRightIcon,
  MusicalNoteIcon,
  BuildingStorefrontIcon,
  TagIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
  Cog6ToothIcon,
  UserCircleIcon  
} from '@heroicons/react/24/solid';
import {Squares2X2Icon
} from '@heroicons/react/24/outline';
import './Header.css';

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [megaDropdownOpen, setMegaDropdownOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('popular');
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const userDropdownRef = useRef(null);

  // Mobile navigation state
  const [mobileNavStack, setMobileNavStack] = useState([]);
  const [currentMobileView, setCurrentMobileView] = useState('main');

  // Wishlist items count (static for demo)
  const wishlistItems = 3;

  // Function to convert category title to URL-friendly format
  const getCategorySlug = (categoryTitle) => {
    return categoryTitle.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  };

  // Function to handle category/subcategory click
  const handleCategoryClick = (categoryTitle) => {
    const categorySlug = getCategorySlug(categoryTitle);
    setMegaDropdownOpen(false);
    setShowOffcanvas(false);
    navigate(`/products?category=${categorySlug}`);
  };

  // Function to handle wishlist click - Direct navigation to My Account with wishlist tab
  const handleWishlistClick = () => {
    setMegaDropdownOpen(false);
    setShowOffcanvas(false);
    setShowUserDropdown(false);
    navigate('/my_account?tab=wishlist');
  };

  // Categories data with subcategories
  const categories = [
    {
      id: 1,
      icon: PuzzlePieceIcon,
      title: "Toys & Games",
      color: "#e65c52",
      subcategories: [
        "Action Figures",
        "Dolls & Accessories",
        "Board Games",
        "Card Games",
        "Puzzle Games",
        "Educational Toys",
        "Outdoor Toys",
        "Building Sets"
      ]
    },
    {
      id: 2,
      icon: GiftIcon,
      title: "Gifting",
      color: "#37aa50",
      subcategories: [
        "Birthday Gifts",
        "Festival Gifts",
        "Personalized Gifts",
        "Gift Hampers",
        "Themed Gifts",
        "Educational Gifts",
        "Premium Gifts",
        "Budget Gifts"
      ]
    },
    {
      id: 3,
      icon: AcademicCapIcon,
      title: "Stationery",
      color: "#0662aa",
      subcategories: [
        "Pens & Pencils",
        "Notebooks & Diaries",
        "Art Supplies",
        "School Sets",
        "Office Supplies",
        "Creative Stationery",
        "Erasers & Sharpeners",
        "Geometry Boxes"
      ]
    },
    {
      id: 4,
      icon: BookOpenIcon,
      title: "Books & Learning",
      color: "#f5c662",
      subcategories: [
        "Story Books",
        "Educational Books",
        "Activity Books",
        "Coloring Books",
        "Reference Books",
        "Board Books",
        "Comic Books",
        "Learning Kits"
      ]
    },
    {
      id: 5,
      icon: PaintBrushIcon,
      title: "Art & Craft",
      color: "#ae78cb",
      subcategories: [
        "Drawing Kits",
        "Painting Sets",
        "Craft Supplies",
        "Clay & Dough",
        "Beads & Jewelry",
        "Origami & Paper Craft",
        "DIY Kits",
        "Art Accessories"
      ]
    },
    {
      id: 6,
      icon: CubeIcon,
      title: "Building Blocks",
      color: "#e65c52",
      subcategories: [
        "LEGO Sets",
        "Magnetic Blocks",
        "Wooden Blocks",
        "Stacking Toys",
        "Construction Sets",
        "Architecture Kits",
        "STEM Building",
        "Creative Blocks"
      ]
    },
    {
      id: 7,
      icon: HeartIcon,
      title: "Soft Toys",
      color: "#37aa50",
      subcategories: [
        "Teddy Bears",
        "Animal Plush",
        "Character Toys",
        "Baby Soft Toys",
        "Jumbo Plush",
        "Interactive Toys",
        "Collectible Plush",
        "Custom Soft Toys"
      ]
    },
    {
      id: 8,
      icon: RocketLaunchIcon,
      title: "Science Kits",
      color: "#0662aa",
      subcategories: [
        "Chemistry Sets",
        "Physics Kits",
        "Biology Kits",
        "Robotics Kits",
        "Electronics Kits",
        "Space & Astronomy",
        "Microscope Sets",
        "Experiment Kits"
      ]
    }
  ];

  const featuredCategories = [
    {
      id: 9,
      icon: MusicalNoteIcon,
      title: "Musical Toys",
      color: "#f5c662",
      subcategories: [
        "Toy Pianos",
        "Drum Sets",
        "Guitars & Ukuleles",
        "Xylophones",
        "Musical Instruments",
        "Karaoke Machines",
        "Rhythm Toys",
        "Sound Toys"
      ]
    },
    {
      id: 10,
      icon: TruckIcon,
      title: "Remote Control",
      color: "#ae78cb",
      subcategories: [
        "RC Cars",
        "RC Drones",
        "RC Helicopters",
        "RC Boats",
        "RC Robots",
        "RC Animals",
        "RC Construction",
        "RC Racing"
      ]
    },
    {
      id: 11,
      icon: StarIcon,
      title: "Puzzle Games",
      color: "#e65c52",
      subcategories: [
        "3D Puzzles",
        "Jigsaw Puzzles",
        "Brain Teasers",
        "Logic Puzzles",
        "Mechanical Puzzles",
        "Wooden Puzzles",
        "Educational Puzzles",
        "Challenging Puzzles"
      ]
    },
    {
      id: 12,
      icon: BuildingStorefrontIcon,
      title: "Role Play",
      color: "#37aa50",
      subcategories: [
        "Kitchen Sets",
        "Doctor Kits",
        "Tool Sets",
        "Superhero Sets",
        "Career Role Play",
        "Fantasy Play",
        "Dress Up Sets",
        "Play Food"
      ]
    }
  ];

  // Sticky header effect aur screen size detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 100);
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      
      if (!mobile && showOffcanvas) {
        setShowOffcanvas(false);
      }
    };

    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [showOffcanvas]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Offcanvas close hone par mobile dropdowns reset karo
  useEffect(() => {
    if (!showOffcanvas) {
      setActiveSubCategory(null);
      setActiveCategoryTab('popular');
      setMobileNavStack([]);
      setCurrentMobileView('main');
      setShowUserDropdown(false);
    }
  }, [showOffcanvas]);

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
  };

  const handleOffcanvasShow = () => {
    setShowOffcanvas(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  // User Dropdown Handler
  const handleUserDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowUserDropdown(prev => !prev);
  };

  // Navigation Handler
  const handleNavigation = (path) => {
    setShowUserDropdown(false);
    setShowOffcanvas(false);
    navigate(path);
  };

  // Mobile Navigation Functions
  const navigateToCategories = () => {
    setMobileNavStack(['main']);
    setCurrentMobileView('categories-main');
  };

  const navigateToCategoryType = (type) => {
    setMobileNavStack(['main', 'categories-main']);
    setCurrentMobileView(`${type}-categories`);
    setActiveCategoryTab(type);
  };

  const navigateToSubcategories = (category) => {
    setMobileNavStack(['main', 'categories-main', `${activeCategoryTab}-categories`]);
    setCurrentMobileView('subcategories');
    setActiveSubCategory(category);
  };

  const navigateToUserMenu = () => {
    setMobileNavStack(['main']);
    setCurrentMobileView('user-menu');
  };

  const navigateBack = () => {
    if (mobileNavStack.length > 0) {
      const previousView = mobileNavStack[mobileNavStack.length - 1];
      setMobileNavStack(mobileNavStack.slice(0, -1));
      setCurrentMobileView(previousView);
    } else {
      setCurrentMobileView('main');
    }
  };

  // Function to check if a path is active
  const isActivePath = (path) => {
    const currentPath = location.pathname + location.search;
    
    if (path === '/') {
      return currentPath === '/';
    }
    
    // For query parameters
    if (path.includes('?')) {
      return currentPath === path;
    }
    
    // For regular paths
    return currentPath.startsWith(path);
  };

  // Function to check if categories is active
  const isCategoriesActive = () => {
    const currentPath = location.pathname + location.search;
    return currentPath.includes('/products');
  };

  // Render Mobile Navigation
  const renderMobileNavigation = () => {
    switch (currentMobileView) {
      case 'categories-main':
        return (
          <div className="mobile-nav-view">
            <div className="mobile-nav-header">
              <button className="mobile-nav-back-btn" onClick={navigateBack}>
                <ChevronLeftIcon />
                <span>Back</span>
              </button>
              <h6 className="mobile-nav-title">Categories</h6>
            </div>
            <div className="mobile-category-options">
              <div 
                className="mobile-category-option"
                onClick={() => navigateToCategoryType('popular')}
              >
                <div className="mobile-category-option-content">
                  <StarIcon className="mobile-category-option-icon" />
                  <div className="mobile-category-option-title">Popular Categories</div>
                </div>
                <ChevronRightIcon className="mobile-category-option-arrow" />
              </div>
              <div 
                className="mobile-category-option"
                onClick={() => navigateToCategoryType('featured')}
              >
                <div className="mobile-category-option-content">
                  <SparklesIcon className="mobile-category-option-icon" />
                  <div className="mobile-category-option-title">Featured Categories</div>
                </div>
                <ChevronRightIcon className="mobile-category-option-arrow" />
              </div>
            </div>
          </div>
        );

      case 'popular-categories':
        return (
          <div className="mobile-nav-view">
            <div className="mobile-nav-header">
              <button className="mobile-nav-back-btn" onClick={navigateBack}>
                <ChevronLeftIcon />
                <span>Back</span>
              </button>
              <h6 className="mobile-nav-title">Popular Categories</h6>
            </div>
            <div className="mobile-category-list">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="mobile-category-list-item"
                  style={{ '--accent-color': category.color }}
                  onClick={() => navigateToSubcategories(category)}
                >
                  <div className="mobile-category-list-icon">
                    <category.icon />
                  </div>
                  <div className="mobile-category-list-title">{category.title}</div>
                  <ChevronRightIcon className="mobile-category-list-arrow" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'featured-categories':
        return (
          <div className="mobile-nav-view">
            <div className="mobile-nav-header">
              <button className="mobile-nav-back-btn" onClick={navigateBack}>
                <ChevronLeftIcon />
                <span>Back</span>
              </button>
              <h6 className="mobile-nav-title">Featured Categories</h6>
            </div>
            <div className="mobile-category-list">
              {featuredCategories.map((category) => (
                <div
                  key={category.id}
                  className="mobile-category-list-item"
                  style={{ '--accent-color': category.color }}
                  onClick={() => navigateToSubcategories(category)}
                >
                  <div className="mobile-category-list-icon">
                    <category.icon />
                  </div>
                  <div className="mobile-category-list-title">{category.title}</div>
                  <ChevronRightIcon className="mobile-category-list-arrow" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'subcategories':
        return (
          <div className="mobile-nav-view">
            <div className="mobile-nav-header">
              <button className="mobile-nav-back-btn" onClick={navigateBack}>
                <ChevronLeftIcon />
                <span>Back</span>
              </button>
              <h6 className="mobile-nav-title">{activeSubCategory?.title}</h6>
            </div>
            <div className="mobile-subcategory-list">
              {/* Main Category pe click */}
              <div
                className="mobile-subcategory-item main-category"
                onClick={() => handleCategoryClick(activeSubCategory.title)}
              >
                <div className="mobile-subcategory-main">
                  <span>All {activeSubCategory.title}</span>
                  <ChevronRightIcon className="subcategory-arrow" />
                </div>
              </div>
              
              {/* Subcategories pe click */}
              {activeSubCategory?.subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  className="mobile-subcategory-item"
                  onClick={() => handleCategoryClick(subcategory)}
                >
                  {subcategory}
                  <ChevronRightIcon className="subcategory-arrow" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'user-menu':
        return (
          <div className="mobile-nav-view">
            <div className="mobile-nav-header">
              <button className="mobile-nav-back-btn" onClick={navigateBack}>
                <ChevronLeftIcon />
                <span>Back</span>
              </button>
              <h6 className="mobile-nav-title">My Account</h6>
            </div>
            <div className="mobile-user-menu">
              <div 
                className="mobile-user-menu-item"
                onClick={() => handleNavigation('/profile')}
                style={{ '--accent-color': '#0662aa' }}
              >
                <div className="mobile-user-menu-icon-wrapper">
                  <Cog6ToothIcon className="mobile-user-menu-icon" />
                </div>
                <div className="mobile-user-menu-content">
                  <div className="mobile-user-menu-title">Login</div>
                </div>
                <ChevronRightIcon className="mobile-user-menu-arrow" />
              </div>
              <div 
                className="mobile-user-menu-item"
                onClick={() => handleNavigation('/My_account')}
                style={{ '--accent-color': '#37aa50' }}
              >
                <div className="mobile-user-menu-icon-wrapper">
                  <UserCircleIcon className="mobile-user-menu-icon" />
                </div>
                <div className="mobile-user-menu-content">
                  <div className="mobile-user-menu-title">My Account</div>
                </div>
                <ChevronRightIcon className="mobile-user-menu-arrow" />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="mobile-nav-container">
            <div className="offcanvas-nav flex-column">
              {/* Home */}
              <NavLink 
                to="/" 
                className={({ isActive }) => `mobile-nav-link simple ${isActive ? 'active' : ''}`}
                onClick={handleOffcanvasClose}
              >
                <HomeIcon className="mobile-nav-icon home-icon" />
                <span>Home</span>
              </NavLink>

              {/* Categories */}
              <div className="mobile-nav-item">
                <div 
                  className={`mobile-nav-link ${isCategoriesActive() ? 'active' : ''}`}
                  onClick={navigateToCategories}
                >
                  <div className="mobile-nav-link-content">
                    <PuzzlePieceIcon className="mobile-nav-icon categories-icon" />
                    <span>Categories</span>
                  </div>
                  <ChevronRightIcon className="mobile-dropdown-toggle" />
                </div>
              </div>

              {/* Best Sellers */}
              <NavLink 
                to="/bestseller" 
                className={({ isActive }) => `mobile-nav-link simple ${isActive ? 'active' : ''}`}
                onClick={handleOffcanvasClose}
              >
                <StarIcon className="mobile-nav-icon bestsellers-icon" />
                <span>Best Sellers</span>
              </NavLink>

              {/* New Arrivals */}
              <NavLink 
                to="/newarrival" 
                className={({ isActive }) => `mobile-nav-link simple ${isActive ? 'active' : ''}`}
                onClick={handleOffcanvasClose}
              >
                <SparklesIcon className="mobile-nav-icon newarrivals-icon" />
                <span>New Arrivals</span>
              </NavLink>

              {/* Offers */}
              <NavLink 
                to="/alloffer" 
                className={({ isActive }) => `mobile-nav-link simple ${isActive ? 'active' : ''}`}
                onClick={handleOffcanvasClose}
              >
                <TagIcon className="mobile-nav-icon offers-icon" />
                <span>Offers</span>
              </NavLink>

              {/* User Account */}
              <div className="mobile-nav-item">
                <div 
                  className={`mobile-nav-link ${isActivePath('/my_account') || isActivePath('/profile') ? 'active' : ''}`}
                  onClick={navigateToUserMenu}
                >
                  <div className="mobile-nav-link-content">
                    <UserIcon className="mobile-nav-icon user-icon" />
                    <span>My Account</span>
                  </div>
                  <ChevronRightIcon className="mobile-dropdown-toggle" />
                </div>
              </div>

              {/* Help & Support */}
              <NavLink 
                to="/my_account?tab=support" 
                className={({ isActive }) => `mobile-nav-link simple ${isActive ? 'active' : ''}`}
                onClick={handleOffcanvasClose}
              >
                <QuestionMarkCircleIcon className="mobile-nav-icon help-icon" />
                <span>Help & Support</span>
              </NavLink>
            </div>
          </div>
        );
    }
  };

  // Floating Icons Component for Mobile
  const FloatingIcons = () => {
    if (!isMobile) return null;

    return (
      <div className="floating-icons-container">
        <div className="floating-icons">
          <button 
            className="floating-icon search-icon" 
            onClick={() => setShowSearch(true)}
          >
            <MagnifyingGlassIcon />
          </button>
          
          <button 
            className="floating-icon user-icon" 
            onClick={() => {
              setShowOffcanvas(true);
              setTimeout(() => navigateToUserMenu(), 100);
            }}
          >
            <UserIcon />
          </button>
          
          {/* Wishlist Icon - Direct navigation to My Account with wishlist tab */}
          <button 
            className="floating-icon wishlist-icon" 
            onClick={handleWishlistClick}
          >
            <HeartIcon />
            {wishlistItems > 0 && (
              <span className="floating-badge wishlist-badge">{wishlistItems}</span>
            )}
          </button>
          
          <button 
            className="floating-icon cart-icon" 
            onClick={toggleCart}
          >
            <ShoppingCartIcon />
            {totalItems > 0 && (
              <span className="floating-badge cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Main Header */}
      <div className={`top-header-area ${isSticky ? 'sticky' : ''}`} id="sticker">
        <Container fluid>
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="main-menu-wrap">
                {/* Logo */}
                <div className="site-logo">
                  <NavLink to="/">
                    <img 
                      src="./logo.png" 
                      alt="Zebro Kids" 
                      className="company-logo"
                    />
                  </NavLink>
                </div>

                {/* Main Menu - Desktop */}
                <nav className="main-menu desktop-menu">
                  <ul>
                    {/* Home */}
                    <li className={isActivePath('/') ? 'current-list-item' : ''}>
                      <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                      >
                        <HomeIcon className="nav-icon home-icon" />
                        <span>Home</span>
                      </NavLink>
                    </li>
                    
                    {/* Categories with Mega Dropdown */}
                    <li 
                      className={`mega-dropdown-parent ${isCategoriesActive() ? 'current-list-item' : ''}`}
                      onMouseEnter={() => setMegaDropdownOpen(true)}
                      onMouseLeave={() => setMegaDropdownOpen(false)}
                    >
                      <a 
                        href="#" 
                        className={`nav-link-with-dropdown ${isCategoriesActive() ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setMegaDropdownOpen(!megaDropdownOpen);
                        }}
                      >
                        <PuzzlePieceIcon className="nav-icon categories-icon" />
                        <span>Categories</span>
                        <ChevronDownIcon className="dropdown-arrow" />
                      </a>
                      
                      {/* Mega Dropdown */}
                      <div className={`mega-dropdown ${megaDropdownOpen ? 'active' : ''}`}>
                        <Container fluid>
                          <Row className="mega-dropdown-row">
                            <Col lg={3} className="mega-dropdown-tabs">
                              <div className="mega-dropdown-categories-list">
                                <div 
                                  className={`mega-dropdown-category-link ${activeCategoryTab === 'popular' ? 'active' : ''}`}
                                  onClick={() => {
                                    setActiveCategoryTab('popular');
                                    setActiveSubCategory(null);
                                  }}
                                >
                                  <StarIcon className="category-link-icon" />
                                  <div className="category-link-title">Popular Categories</div>
                                </div>
                                <div 
                                  className={`mega-dropdown-category-link ${activeCategoryTab === 'featured' ? 'active' : ''}`}
                                  onClick={() => {
                                    setActiveCategoryTab('featured');
                                    setActiveSubCategory(null);
                                  }}
                                >
                                  <SparklesIcon className="category-link-icon" />
                                  <div className="category-link-title">Featured Categories</div>
                                </div>
                              </div>
                            </Col>
                            
                            <Col lg={9} className="mega-dropdown-content-col">
                              <div className="mega-dropdown-content-section">
                                <div className="mega-dropdown-content-scroll">
                                  {activeSubCategory && (
                                    <div className="mega-dropdown-back">
                                      <button 
                                        className="back-button"
                                        onClick={() => setActiveSubCategory(null)}
                                      >
                                        <ChevronRightIcon className="back-icon" />
                                        Back to {activeCategoryTab === 'popular' ? 'Popular Categories' : 'Featured Categories'}
                                      </button>
                                    </div>
                                  )}

                                  <div className={`mega-dropdown-content ${activeCategoryTab === 'popular' && !activeSubCategory ? 'active' : ''}`}>
                                    <h5 className="mega-dropdown-section-title">Popular Categories</h5>
                                    <div className="mega-dropdown-grid">
                                      {categories.map((category) => {
                                        const IconComponent = category.icon;
                                        return (
                                          <div 
                                            key={category.id}
                                            className="mega-dropdown-category-item"
                                            style={{ '--accent-color': category.color }}
                                            onClick={() => setActiveSubCategory(category)}
                                          >
                                            <div className="mega-dropdown-icon">
                                              <IconComponent />
                                            </div>
                                            <div className="mega-dropdown-title">{category.title}</div>
                                            <ChevronRightIcon className="mega-dropdown-arrow" />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  
                                  <div className={`mega-dropdown-content ${activeCategoryTab === 'featured' && !activeSubCategory ? 'active' : ''}`}>
                                    <h5 className="mega-dropdown-section-title">Featured Categories</h5>
                                    <div className="mega-dropdown-grid">
                                      {featuredCategories.map((category) => {
                                        const IconComponent = category.icon;
                                        return (
                                          <div 
                                            key={category.id}
                                            className="mega-dropdown-category-item"
                                            style={{ '--accent-color': category.color }}
                                            onClick={() => setActiveSubCategory(category)}
                                          >
                                            <div className="mega-dropdown-icon">
                                              <IconComponent />
                                            </div>
                                            <div className="mega-dropdown-title">{category.title}</div>
                                            <ChevronRightIcon className="mega-dropdown-arrow" />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {activeSubCategory && (
                                    <div className="mega-dropdown-subcategories active">
                                      <h5 className="mega-dropdown-section-title">
                                        {activeSubCategory.title}
                                      </h5>
                                      
                                      {/* Main Category Option */}
                                      <div 
                                        className="mega-dropdown-main-category-option"
                                        onClick={() => handleCategoryClick(activeSubCategory.title)}
                                      >
                                        <div className="mega-dropdown-main-category-content">
                                          <div className="mega-dropdown-main-category-title">
                                            All {activeSubCategory.title}
                                          </div>
                                          <div className="mega-dropdown-main-category-desc">
                                            Browse all products in {activeSubCategory.title}
                                          </div>
                                        </div>
                                        <ChevronRightIcon className="mega-dropdown-arrow" />
                                      </div>

                                      <div className="mega-dropdown-subcategories-grid">
                                        {activeSubCategory.subcategories.map((subcategory, index) => (
                                          <div 
                                            key={index}
                                            className="mega-dropdown-subcategory-item"
                                            onClick={() => handleCategoryClick(subcategory)}
                                          >
                                            {subcategory}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </li>

                    {/* Best Sellers */}
                    <li className={isActivePath('/bestseller') ? 'current-list-item' : ''}>
                      <NavLink 
                        to="/bestseller" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                      >
                        <StarIcon className="nav-icon bestsellers-icon" />
                        <span>Best Sellers</span>
                      </NavLink>
                    </li>

                    {/* New Arrivals */}
                    <li className={isActivePath('/newarrival') ? 'current-list-item' : ''}>
                      <NavLink 
                        to="/newarrival" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                      >
                        <SparklesIcon className="nav-icon newarrivals-icon" />
                        <span>New Arrivals</span>
                      </NavLink>
                    </li>

                    {/* Offers */}
                    <li className={isActivePath('/alloffer') ? 'current-list-item' : ''}>
                      <NavLink 
                        to="/alloffer" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                      >
                        <TagIcon className="nav-icon offers-icon" />
                        <span>Offers</span>
                      </NavLink>
                    </li>

                    {/* Help & Support */}
                    <li className={isActivePath('/my_account?tab=support') ? 'current-list-item' : ''}>
                      <NavLink 
                        to="/my_account?tab=support" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                      >
                        <QuestionMarkCircleIcon className="nav-icon help-icon" />
                        <span>Help & Support</span>
                      </NavLink>
                    </li>

                    {/* Header Icons - Desktop Only */}
                    <li className="header-icons-li">
                      <div className="header-icons">
                        <button 
                          className="search-bar-icon desktop-search-icon" 
                          onClick={() => setShowSearch(true)}
                        >
                          <MagnifyingGlassIcon />
                        </button>
                        
                        <div className="user-dropdown-wrapper" ref={userDropdownRef}>
                          <button 
                            className="user-icon" 
                            onClick={handleUserDropdown}
                          >
                            <UserIcon />
                          </button>
                          
                          <div 
                            className={`user-dropdown-menu ${showUserDropdown ? 'active' : ''}`}
                          >
                            <div 
                              className="user-dropdown-item"
                              onClick={() => handleNavigation('/profile')}
                              style={{ '--accent-color': '#0662aa' }}
                            >
                              <div className="user-dropdown-icon-wrapper">
                                <Cog6ToothIcon className="user-dropdown-icon" />
                              </div>
                              <div className="user-dropdown-content">
                                <div className="user-dropdown-title">Login</div>
                              </div>
                            </div>
                            <div 
                              className="user-dropdown-item"
                              onClick={() => handleNavigation('/my_account')}
                              style={{ '--accent-color': '#37aa50' }}
                            >
                              <div className="user-dropdown-icon-wrapper">
                                <UserCircleIcon className="user-dropdown-icon" />
                              </div>
                              <div className="user-dropdown-content">
                                <div className="user-dropdown-title">My Account</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Wishlist Icon - Direct navigation to My Account with wishlist tab */}
                        <button 
                          className="wishlist-icon" 
                          onClick={handleWishlistClick}
                        >
                          <HeartIcon />
                          <span className="wishlist-count">{wishlistItems}</span>
                        </button>
                        
                        <button 
                          className="shopping-cart" 
                          onClick={toggleCart}
                        >
                          <ShoppingCartIcon />
                          {totalItems > 0 && (
                            <span className="cart-count">{totalItems}</span>
                          )}
                        </button>
                      </div>
                    </li>
                  </ul>
                </nav>

                {/* Modern Hamburger Menu Toggle - Icon Card Style */}
                <Button 
                  className="mobile-menu-toggle modern-hamburger"
                  onClick={handleOffcanvasShow}
                >
                  <div className="hamburger-icon-wrapper">
                    <Squares2X2Icon className="hamburger-icon" />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Search Area */}
      <div className={`search-area ${showSearch ? 'active' : ''}`}>
        <Container>
          <div className="row">
            <div className="col-lg-12">
              <span className="close-btn" onClick={() => {setShowSearch(false); setSearchQuery('');}}>
                <XMarkIcon />
              </span>
              <div className="search-bar">
                <div className="search-bar-tablecell">
                  <h3>Search For Kids Products:</h3>
                  <Form className="search-form" onSubmit={handleSearchSubmit}>
                    <div className="input-group">
                      <Form.Control
                        type="text"
                        placeholder="Search for toys, books, games and more..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <Button type="submit" className="search-submit-btn">
                        <span className="search-text">Search</span>
                        <MagnifyingGlassIcon />
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={handleOffcanvasClose}
        placement="end"
        className="modern-offcanvas"
      >
        <Offcanvas.Header className="offcanvas-header-custom">
          <div className="offcanvas-brand">
            <NavLink to="/" onClick={handleOffcanvasClose}>
              <img src="./logo.png" alt="Zebro Kids" className="offcanvas-logo" />
            </NavLink>
          </div>
          <Button 
            className="offcanvas-close-btn"
            onClick={handleOffcanvasClose}
          >
            <XMarkIcon />
          </Button>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="offcanvas-body-custom">
          {renderMobileNavigation()}

          {currentMobileView === 'main' && (
            <div className="offcanvas-contact">
              <h6>Need Help?</h6>
              <div className="contact-item">
                <PhoneIcon className="contact-icon" />
                <span>+91 9876543210</span>
              </div>
              <div className="contact-item">
                <EnvelopeIcon className="contact-icon" />
                <span>help@zebrokids.com</span>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Floating Icons for Mobile */}
      <FloatingIcons />
    </>
  );
};

export default Header;