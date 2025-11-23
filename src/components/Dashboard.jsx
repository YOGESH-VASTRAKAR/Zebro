import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { 
  HomeIcon,
  ChevronRightIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  ChevronRightIcon as ChevronRight,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { 
  UserIcon as UserIconSolid,
  HomeIcon as HomeIconSolid,
  ClockIcon as ClockIconSolid,
  HeartIcon as HeartIconSolid,
  MapPinIcon as MapPinIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  LifebuoyIcon as LifebuoyIconSolid
} from '@heroicons/react/24/solid';
import DashboardDetails from './DashboardDetails';
import './Dashboard.css';
import OrderHistory from './OrderHistory';
import Wishlist from './Wishlist';
import MyAddresses from './MyAddresses';
import OtherSettings from './OtherSettings';
import Support from './Support';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';
import LogoutModal from './LogoutModal';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [navHeight, setNavHeight] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navRef = useRef(null);
  const contentRef = useRef(null);
  const dropdownRef = useRef(null);

  // URL se tab parameter read karein
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && ['dashboard', 'history', 'wishlist', 'address', 'settings', 'support'].includes(tabFromUrl)) {
      setActiveMenu(tabFromUrl);
    }
  }, [searchParams]);

  // Active menu change hone par URL update karein
  useEffect(() => {
    if (activeMenu !== 'dashboard') {
      setSearchParams({ tab: activeMenu });
    } else {
      setSearchParams({});
    }
  }, [activeMenu, setSearchParams]);

  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+919876543210',
    dateOfBirth: ''
  };

  const menuItems = [
    {
      id: 'dashboard',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
      title: 'Dashboard',
      color: '#0662aa'
    },
    {
      id: 'history',
      icon: ClockIcon,
      activeIcon: ClockIconSolid,
      title: 'Order History',
      color: '#37aa50'
    },
    {
      id: 'wishlist',
      icon: HeartIcon,
      activeIcon: HeartIconSolid,
      title: 'Wishlist',
      color: '#e65c52'
    },
    {
      id: 'address',
      icon: MapPinIcon,
      activeIcon: MapPinIconSolid,
      title: 'My Address',
      color: '#f5c662'
    },
    {
      id: 'settings',
      icon: Cog6ToothIcon,
      activeIcon: Cog6ToothIconSolid,
      title: 'Settings',
      color: '#ae78cb'
    },
    {
      id: 'support',
      icon: LifebuoyIcon,
      activeIcon: LifebuoyIconSolid,
      title: 'Support',
      color: '#ff7e5f'
    }
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  // Dropdown close करने के लिए
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dropdown toggle function
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Dropdown options handle करने के लिए
  const handleDropdownOption = (option) => {
    setShowDropdown(false);
    switch(option) {
      case 'edit-profile':
        setShowEditProfileModal(true);
        break;
      case 'change-password':
        setShowChangePasswordModal(true);
        break;
      case 'logout':
        setShowLogoutModal(true);
        break;
      default:
        break;
    }
  };

  // Edit Profile save करने के लिए function
  const handleSaveProfile = (updatedData) => {
    console.log('Profile updated:', updatedData);
    // यहाँ API call या state update कर सकते हैं
    // Example: update user data in state or context
  };

  // Change Password instructions send करने के लिए function
  const handleSendPasswordInstructions = (email) => {
    console.log('Sending password reset instructions to:', email);
    // यहाँ API call कर सकते हैं password reset email send करने के लिए
    alert(`Password reset instructions sent to ${email}`);
  };

  // Logout function
  const handleLogout = () => {
    console.log('Logging out...');
    // यहाँ actual logout logic add करें
    // Example: clear localStorage, redirect to login, etc.
    // localStorage.removeItem('token');
    // window.location.href = '/login';
    alert('You have been logged out successfully!');
  };

  // Set content height based on navigation height with proper resize handling
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        setNavHeight(height);
        
        // Immediately update content container height
        if (contentRef.current) {
          contentRef.current.style.height = `${height}px`;
        }
      }
    };

    // Initial height calculation
    updateNavHeight();

    // Add resize observer for better performance
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        updateNavHeight();
      }
    });

    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    // Fallback for older browsers
    const handleResize = () => {
      setTimeout(updateNavHeight, 100); // Small delay to ensure DOM is updated
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update content height when navHeight changes
  useEffect(() => {
    if (contentRef.current && navHeight > 0) {
      contentRef.current.style.height = `${navHeight}px`;
    }
  }, [navHeight]);

  // Recalculate height when menu changes (for content changes)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        setNavHeight(height);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [activeMenu]);

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardDetails />;
      case 'history':
        return <OrderHistory />;
      case 'wishlist':
        return <Wishlist />;
      case 'address':
        return <MyAddresses />;
      case 'settings':
        return <OtherSettings />;
      case 'support':
       return <Support />;
      default:
        return <DashboardDetails />;
    }
  };

  return (
    <>
      {/* Account Banner Section */}
      <div className="dashboard-account-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - My Account Title */}
            <Col md={6} className="dashboard-account-title-col">
              <div className="dashboard-account-title-content">
                <h1 className="dashboard-account-main-title">
                  <span className="dashboard-title-word dashboard-title-word-1">My</span>
                  <span className="dashboard-title-word dashboard-title-word-2">Account</span>
                </h1>
                <div className="dashboard-account-breadcrumb">
                  <a href="/" className="dashboard-breadcrumb-link">
                    <HomeIcon className="dashboard-breadcrumb-icon" />
                    <span>Home</span>
                  </a>
                  <ChevronRightIcon className="dashboard-breadcrumb-separator" />
                  <span className="dashboard-breadcrumb-current">
                    {menuItems.find(item => item.id === activeMenu)?.title || 'Dashboard'}
                  </span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - Profile Details with Three Dots */}
            <Col md={6} className="dashboard-profile-details-col">
              <div className="dashboard-profile-details-card">
                <div className="dashboard-profile-avatar">
                  <UserIconSolid className="dashboard-avatar-icon" />
                </div>
                <div className="dashboard-profile-info">
                  <h3 className="dashboard-profile-name">{userData.firstName} {userData.lastName}</h3>
                  <p className="dashboard-profile-email">{userData.email}</p>
                </div>
                
                {/* Three Dots Dropdown */}
                <div className="dashboard-profile-dropdown" ref={dropdownRef}>
                  <button 
                    className="dashboard-profile-dropdown-toggle"
                    onClick={toggleDropdown}
                  >
                    <EllipsisVerticalIcon className="dashboard-dropdown-icon" />
                  </button>
                  
                  {showDropdown && (
                    <div className="dashboard-profile-dropdown-menu">
                      <button 
                        className="dashboard-dropdown-item"
                        onClick={() => handleDropdownOption('edit-profile')}
                      >
                        Edit Profile
                      </button>
                      <button 
                        className="dashboard-dropdown-item"
                        onClick={() => handleDropdownOption('change-password')}
                      >
                        Change Password
                      </button>
                      <button 
                        className="dashboard-dropdown-item dashboard-dropdown-item-logout"
                        onClick={() => handleDropdownOption('logout')}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content Section */}
      <section className="dashboard-main-section">
        <Container>
          <Row className="dashboard-main-row">
            {/* Navigation Menu Column */}
            <Col lg={3} className="dashboard-nav-col">
              <div 
                ref={navRef}
                className="dashboard-nav-container"
              >
                <div className="dashboard-nav-list">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const ActiveIconComponent = item.activeIcon;
                    const isActive = activeMenu === item.id;
                    
                    return (
                      <div 
                        key={item.id}
                        className={`dashboard-nav-item ${isActive ? 'active' : ''}`}
                        style={{ '--accent-color': item.color }}
                        onClick={() => handleMenuClick(item.id)}
                      >
                        <div className="dashboard-nav-icon">
                          <IconComponent className="dashboard-nav-icon-default" />
                          <ActiveIconComponent className="dashboard-nav-icon-active" />
                        </div>
                        <div className="dashboard-nav-content">
                          <h4 className="dashboard-nav-title">{item.title}</h4>
                        </div>
                        <ChevronRight className="dashboard-nav-arrow" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            
            {/* Content Column - Dynamic Height */}
            <Col lg={9} className="dashboard-content-col">
              <div 
                ref={contentRef}
                className="dashboard-content-container"
                style={{ minHeight: `${navHeight}px` }}
              >
                {renderContent()}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Edit Profile Modal */}
      <EditProfileModal
        show={showEditProfileModal}
        onHide={() => setShowEditProfileModal(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(false)}
        userData={userData}
        onSendInstructions={handleSendPasswordInstructions}
      />

      {/* Logout Modal */}
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Dashboard;