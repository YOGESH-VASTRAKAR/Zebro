import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  HomeIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid';

// Import social icons
import { 
  FcGoogle 
} from 'react-icons/fc';
import { 
  FaFacebook 
} from 'react-icons/fa';

import './LoginRegistration.css';

const LoginRegistration = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === 'login') {
      setLoginData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setRegisterData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register data:', registerData);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Add your social login logic here
  };

  return (
    <>
      {/* Account Banner Section */}
      <div className="login-account-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - Account Title */}
            <Col lg={6} md={12} className="login-account-title-col">
              <div className="login-account-title-content">
                <h1 className="login-account-main-title">
                  <span className="login-title-text">
                    <span className="login-title-word login-title-word-1">Account</span>
                    {' '}
                    <span className="login-title-word login-title-word-2">Setup</span>
                  </span>
                </h1>
                <div className="login-account-breadcrumb">
                  <a href="/" className="login-breadcrumb-link">
                    <HomeIcon className="login-breadcrumb-icon" />
                    <span className="breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="login-breadcrumb-separator" />
                  <span className="login-breadcrumb-current">Account Setup</span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - Navigation */}
            <Col lg={6} md={12} className="login-account-nav-col">
              <div className="login-account-navigation">
                <div className="login-account-nav-tabs">
                  <button 
                    className={`login-account-nav-btn ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => setActiveTab('login')}
                  >
                    <span className="login-nav-text">Login</span>
                  </button>
                  <button 
                    className={`login-account-nav-btn ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => setActiveTab('register')}
                  >
                    <span className="login-nav-text">Register</span>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Login/Registration Form Section */}
      <section className="login-auth-form-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} xl={6}>
              
              {/* Login Form with External Social Section */}
              {activeTab === 'login' && (
                <div className="login-auth-external-container">
                  <div className="login-auth-form-container">
                    <div className="login-auth-form login-login-form">
                      <div className="login-form-header">
                        <h2 className="login-form-title">
                          <span className="login-form-title-text">
                            <span className="login-title-word login-title-word-1">Welcome</span>
                            {' '}
                            <span className="login-title-word login-title-word-2">Back!</span>
                          </span>
                        </h2>
                        <p className="login-form-subtitle">Sign in to your account to continue</p>
                      </div>
                      
                      <form onSubmit={handleLogin}>
                        <div className="login-form-row">
                          <div className="login-form-group">
                            <label htmlFor="email" className="login-form-label">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="login-form-input"
                              placeholder="Enter your email address"
                              value={loginData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="login-form-group">
                            <label htmlFor="password" className="login-form-label">
                              Password *
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="login-form-input"
                              placeholder="Enter your password"
                              value={loginData.password}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="login-form-options">
                          <div className="login-remember-me">
                            <input
                              type="checkbox"
                              id="remember-me"
                              className="login-remember-checkbox"
                            />
                            <label htmlFor="remember-me" className="login-remember-label">
                              Remember me
                            </label>
                          </div>
                          <a href="/forgot-password" className="login-forgot-password">
                            Forgot password?
                          </a>
                        </div>

                        <button 
                          type="submit" 
                          className="login-submit-btn"
                        >
                          <span className="login-btn-text">Sign In</span>
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Social Login Section - Outside Card */}
                  <div className="login-external-social-section">
                    <div className="login-social-divider">
                      <span className="login-divider-text">Or continue with</span>
                    </div>
                    <div className="login-social-buttons">
                      <button 
                        type="button" 
                        className="login-social-btn login-google-btn"
                        onClick={() => handleSocialLogin('google')}
                      >
                        <FcGoogle className="login-social-icon login-google-icon" />
                        <span className="login-social-text">Google</span>
                      </button>
                      <button 
                        type="button" 
                        className="login-social-btn login-facebook-btn"
                        onClick={() => handleSocialLogin('facebook')}
                      >
                        <FaFacebook className="login-social-icon login-facebook-icon" />
                        <span className="login-social-text">Facebook</span>
                      </button>
                    </div>
                  </div>

                  <div className="login-auth-switch-external">
                    <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }} className="login-switch-link">Sign up here</a></p>
                  </div>
                </div>
              )}

              {/* Registration Form with External Social Section */}
              {activeTab === 'register' && (
                <div className="login-auth-external-container">
                  <div className="login-auth-form-container">
                    <div className="login-auth-form login-register-form">
                      <div className="login-form-header">
                        <h2 className="login-form-title">
                          <span className="login-form-title-text">
                            <span className="login-title-word login-title-word-1">Create</span>
                            {' '}
                            <span className="login-title-word login-title-word-2">Account</span>
                          </span>
                        </h2>
                        <p className="login-form-subtitle">Sign up to get started with your account</p>
                      </div>
                      
                      <form onSubmit={handleRegister}>
                        <div className="login-form-row">
                          <div className="login-form-group">
                            <label htmlFor="firstName" className="login-form-label">
                              First Name *
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              className="login-form-input"
                              placeholder="Enter your first name"
                              value={registerData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="login-form-group">
                            <label htmlFor="lastName" className="login-form-label">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              className="login-form-input"
                              placeholder="Enter your last name"
                              value={registerData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="login-form-group">
                          <label htmlFor="registerEmail" className="login-form-label">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="registerEmail"
                            name="email"
                            className="login-form-input"
                            placeholder="Enter your email address"
                            value={registerData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="login-form-row">
                          <div className="login-form-group">
                            <label htmlFor="registerPassword" className="login-form-label">
                              Password *
                            </label>
                            <input
                              type="password"
                              id="registerPassword"
                              name="password"
                              className="login-form-input"
                              placeholder="Create a password"
                              value={registerData.password}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="login-form-group">
                            <label htmlFor="confirmPassword" className="login-form-label">
                              Confirm Password *
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              className="login-form-input"
                              placeholder="Confirm your password"
                              value={registerData.confirmPassword}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          className="login-submit-btn"
                        >
                          <span className="login-btn-text">Sign Up</span>
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Social Signup Section - Outside Card */}
                  <div className="login-external-social-section">
                    <div className="login-social-divider">
                      <span className="login-divider-text">Or sign up with</span>
                    </div>
                    <div className="login-social-buttons">
                      <button 
                        type="button" 
                        className="login-social-btn login-google-btn"
                        onClick={() => handleSocialLogin('google')}
                      >
                        <FcGoogle className="login-social-icon login-google-icon" />
                        <span className="login-social-text">Google</span>
                      </button>
                      <button 
                        type="button" 
                        className="login-social-btn login-facebook-btn"
                        onClick={() => handleSocialLogin('facebook')}
                      >
                        <FaFacebook className="login-social-icon login-facebook-icon" />
                        <span className="login-social-text">Facebook</span>
                      </button>
                    </div>
                  </div>

                  <div className="login-auth-switch-external">
                    <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('login'); }} className="login-switch-link">Sign in here</a></p>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LoginRegistration;