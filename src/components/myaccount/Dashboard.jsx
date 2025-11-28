import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  HomeIcon as HomeIconSolid,
  ChevronRightIcon,
  ClockIcon as ClockIconSolid,
  HeartIcon as HeartIconSolid,
  MapPinIcon as MapPinIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  LifebuoyIcon as LifebuoyIconSolid,
  UserIcon as UserIconSolid,
  ChevronRightIcon as ChevronRight,
  EllipsisVerticalIcon
} from '@heroicons/react/24/solid';
import DashboardDetails from './myaccount_tab/DashboardDetails';
import './Dashboard.css';
import OrderHistory from './myaccount_tab/OrderHistory';
import Wishlist from './myaccount_tab/Wishlist';
import MyAddresses from './myaccount_tab/MyAddresses';
import OtherSettings from './myaccount_tab/OtherSettings';
import Support from './myaccount_tab/Support';
import EditProfileModal from './myaccount_tab/EditProfileModal';
import ChangePasswordModal from './myaccount_tab/ChangePasswordModal';
import LogoutModal from './myaccount_tab/LogoutModal';

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
  const navigate = useNavigate();

  // URL se tab parameter read karein - IMPROVED
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    console.log('Current URL tab:', tabFromUrl); // Debugging
    
    if (tabFromUrl && ['dashboard', 'history', 'wishlist', 'address', 'settings', 'support'].includes(tabFromUrl)) {
      setActiveMenu(tabFromUrl);
    } else {
      // Agar koi valid tab nahi hai ya dashboard hai
      setActiveMenu('dashboard');
    }
  }, [searchParams]);

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
      icon: HomeIconSolid,
      title: 'Dashboard',
      color: '#0662aa'
    },
    {
      id: 'history',
      icon: ClockIconSolid,
      title: 'Order History',
      color: '#37aa50'
    },
    {
      id: 'wishlist',
      icon: HeartIconSolid,
      title: 'Wishlist',
      color: '#e65c52'
    },
    {
      id: 'address',
      icon: MapPinIconSolid,
      title: 'My Address',
      color: '#f5c662'
    },
    {
      id: 'settings',
      icon: Cog6ToothIconSolid,
      title: 'Settings',
      color: '#ae78cb'
    },
    {
      id: 'support',
      icon: LifebuoyIconSolid,
      title: 'Support',
      color: '#ff7e5f'
    }
  ];

  // FIXED: Navigation function
  const handleMenuClick = (menuId) => {
    console.log('Navigating to:', menuId); // Debugging
    setActiveMenu(menuId);
    
    // URL update karein bina page reload ke
    if (menuId === 'dashboard') {
      // Dashboard par URL clean karein
      navigate('/my_account');
      setSearchParams({});
    } else {
      // Other tabs par URL update karein
      navigate(`/my_account?tab=${menuId}`);
      setSearchParams({ tab: menuId });
    }
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
  };

  // Change Password instructions send करने के लिए function
  const handleSendPasswordInstructions = (email) => {
    console.log('Sending password reset instructions to:', email);
    alert(`Password reset instructions sent to ${email}`);
  };

  // Logout function
  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
    alert('You have been logged out successfully!');
  };

  // Set content height based on navigation height
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        setNavHeight(height);
        
        if (contentRef.current) {
          contentRef.current.style.height = `${height}px`;
        }
      }
    };

    updateNavHeight();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        updateNavHeight();
      }
    });

    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    const handleResize = () => {
      setTimeout(updateNavHeight, 100);
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

  // Recalculate height when menu changes
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
            <Col lg={6} md={12} className="dashboard-account-title-col">
              <div className="dashboard-account-title-content">
                <h1 className="dashboard-account-main-title">
                  <span className="dashboard-title-text">
                    <span className="dashboard-title-word dashboard-title-word-1">My</span>
                    {' '}
                    <span className="dashboard-title-word dashboard-title-word-2">Account</span>
                  </span>
                </h1>
                <div className="dashboard-account-breadcrumb">
                  <a 
                    href="/" 
                    className="dashboard-breadcrumb-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                    }}
                  >
                    <HomeIconSolid className="dashboard-breadcrumb-icon" />
                    <span className="breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="dashboard-breadcrumb-separator" />
                  <span className="dashboard-breadcrumb-current">
                    {menuItems.find(item => item.id === activeMenu)?.title || 'Dashboard'}
                  </span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - Profile Details with Three Dots */}
            <Col lg={6} md={12} className="dashboard-profile-details-col">
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
            <Col lg={3} md={12} className="dashboard-nav-col">
              <div 
                ref={navRef}
                className="dashboard-nav-container"
              >
                <div className="dashboard-nav-list">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeMenu === item.id;
                    
                    return (
                      <div 
                        key={item.id}
                        className={`dashboard-nav-item ${isActive ? 'active' : ''}`}
                        style={{ '--accent-color': item.color }}
                        onClick={() => handleMenuClick(item.id)}
                      >
                        <div className="dashboard-nav-icon">
                          <IconComponent className="dashboard-nav-icon-solid" />
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
            <Col lg={9} md={12} className="dashboard-content-col">
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