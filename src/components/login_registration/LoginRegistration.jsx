import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { 
  HomeIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon
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
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginData, setLoginData] = useState({
    mobile: '',
    email: '',
    otp: ''
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    otp: ''
  });

  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    setError('');
    setSuccess('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateMobile = (mobile) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(mobile);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email and mobile
    const email = activeTab === 'login' ? loginData.email : registerData.email;
    const mobile = activeTab === 'login' ? loginData.mobile : registerData.mobile;

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setTimer(120); // 2 minutes timer
      setSuccess('OTP has been sent to your mobile number and email');
      
      // Auto-fill OTP for demo (remove in production)
      if (activeTab === 'login') {
        setLoginData(prev => ({ ...prev, otp: '123456' }));
      } else {
        setRegisterData(prev => ({ ...prev, otp: '123456' }));
      }
    }, 1500);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otp = activeTab === 'login' ? loginData.otp : registerData.otp;

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      if (otp === '123456') { // Demo OTP
        setOtpVerified(true);
        setSuccess('OTP verified successfully!');
        
        // If registration, show success message
        if (activeTab === 'register') {
          setTimeout(() => {
            setSuccess('Account created successfully! Redirecting to dashboard...');
            // Here you would redirect to dashboard
          }, 1000);
        } else {
          // For login, show success and redirect
          setTimeout(() => {
            setSuccess('Login successful! Redirecting to dashboard...');
          }, 1000);
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    }, 1500);
  };

  const handleResendOtp = () => {
    if (timer > 0) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate resend OTP
    setTimeout(() => {
      setLoading(false);
      setTimer(120);
      setSuccess('New OTP has been sent to your mobile number and email');
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Add your social login logic here
  };

  const resetForm = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setTimer(0);
    setError('');
    setSuccess('');
    setLoginData({ mobile: '', email: '', otp: '' });
    setRegisterData({ firstName: '', lastName: '', mobile: '', email: '', otp: '' });
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
                    onClick={() => {
                      setActiveTab('login');
                      resetForm();
                    }}
                  >
                    <span className="login-nav-text">Login</span>
                  </button>
                  <button 
                    className={`login-account-nav-btn ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('register');
                      resetForm();
                    }}
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
              {/* Error/Success Messages */}
              {error && (
                <Alert variant="danger" className="login-alert-message">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" className="login-alert-message">
                  {success}
                </Alert>
              )}
              
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
                        <p className="login-form-subtitle">Sign in to your account with OTP</p>
                      </div>
                      
                      {!otpSent ? (
                        <form onSubmit={handleSendOtp}>
                          <div className="login-form-row">
                            <div className="login-form-group">
                              <label htmlFor="mobile" className="login-form-label">
                                <PhoneIcon className="login-form-icon" /> Mobile Number *
                              </label>
                              <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                className="login-form-input"
                                placeholder="Enter 10-digit mobile number"
                                value={loginData.mobile}
                                onChange={handleInputChange}
                                required
                                maxLength="10"
                              />
                              <small className="login-form-help">
                                Must be a valid Indian mobile number
                              </small>
                            </div>

                            <div className="login-form-group">
                              <label htmlFor="email" className="login-form-label">
                                <EnvelopeIcon className="login-form-icon" /> Email Address *
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
                          </div>

                          <button 
                            type="submit" 
                            className="login-submit-btn"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                <span className="login-btn-text">Sending OTP...</span>
                              </>
                            ) : (
                              <span className="login-btn-text">Send OTP</span>
                            )}
                          </button>
                        </form>
                      ) : !otpVerified ? (
                        <form onSubmit={handleVerifyOtp}>
                          <div className="login-form-group">
                            <label htmlFor="otp" className="login-form-label">
                              Enter OTP *
                            </label>
                            <input
                              type="text"
                              id="otp"
                              name="otp"
                              className="login-form-input otp-input"
                              placeholder="Enter 6-digit OTP"
                              value={loginData.otp}
                              onChange={handleInputChange}
                              required
                              maxLength="6"
                            />
                            <div className="login-otp-timer">
                              {timer > 0 ? (
                                <span className="login-timer-text">
                                  Resend OTP in {formatTimer(timer)}
                                </span>
                              ) : (
                                <button 
                                  type="button" 
                                  className="login-resend-btn"
                                  onClick={handleResendOtp}
                                  disabled={loading}
                                >
                                  Resend OTP
                                </button>
                              )}
                            </div>
                            <small className="login-form-help">
                              OTP sent to {loginData.mobile} and {loginData.email}
                            </small>
                          </div>

                          <button 
                            type="submit" 
                            className="login-submit-btn"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                <span className="login-btn-text">Verifying...</span>
                              </>
                            ) : (
                              <span className="login-btn-text">Verify OTP</span>
                            )}
                          </button>
                        </form>
                      ) : (
                        <div className="login-success-message">
                          <div className="login-success-icon">
                            ✓
                          </div>
                          <h3>Login Successful!</h3>
                          <p>Redirecting to dashboard...</p>
                          <button 
                            className="login-submit-btn"
                            onClick={resetForm}
                          >
                            Login Again
                          </button>
                        </div>
                      )}
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
                    <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('register'); resetForm(); }} className="login-switch-link">Sign up here</a></p>
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
                        <p className="login-form-subtitle">Sign up with OTP verification</p>
                      </div>
                      
                      {!otpSent ? (
                        <form onSubmit={handleSendOtp}>
                          <div className="login-form-row">
                            <div className="login-form-group">
                              <label htmlFor="firstName" className="login-form-label">
                                <UserIcon className="login-form-icon" /> First Name *
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
                                <UserIcon className="login-form-icon" /> Last Name *
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

                          <div className="login-form-row">
                            <div className="login-form-group">
                              <label htmlFor="mobile" className="login-form-label">
                                <PhoneIcon className="login-form-icon" /> Mobile Number *
                              </label>
                              <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                className="login-form-input"
                                placeholder="Enter 10-digit mobile number"
                                value={registerData.mobile}
                                onChange={handleInputChange}
                                required
                                maxLength="10"
                              />
                            </div>

                            <div className="login-form-group">
                              <label htmlFor="email" className="login-form-label">
                                <EnvelopeIcon className="login-form-icon" /> Email Address *
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className="login-form-input"
                                placeholder="Enter your email address"
                                value={registerData.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>

                          <button 
                            type="submit" 
                            className="login-submit-btn"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                <span className="login-btn-text">Sending OTP...</span>
                              </>
                            ) : (
                              <span className="login-btn-text">Send OTP</span>
                            )}
                          </button>
                        </form>
                      ) : !otpVerified ? (
                        <form onSubmit={handleVerifyOtp}>
                          <div className="login-form-group">
                            <label htmlFor="otp" className="login-form-label">
                              Enter OTP *
                            </label>
                            <input
                              type="text"
                              id="otp"
                              name="otp"
                              className="login-form-input otp-input"
                              placeholder="Enter 6-digit OTP"
                              value={registerData.otp}
                              onChange={handleInputChange}
                              required
                              maxLength="6"
                            />
                            <div className="login-otp-timer">
                              {timer > 0 ? (
                                <span className="login-timer-text">
                                  Resend OTP in {formatTimer(timer)}
                                </span>
                              ) : (
                                <button 
                                  type="button" 
                                  className="login-resend-btn"
                                  onClick={handleResendOtp}
                                  disabled={loading}
                                >
                                  Resend OTP
                                </button>
                              )}
                            </div>
                            <small className="login-form-help">
                              OTP sent to {registerData.mobile} and {registerData.email}
                            </small>
                          </div>

                          <button 
                            type="submit" 
                            className="login-submit-btn"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                <span className="login-btn-text">Creating Account...</span>
                              </>
                            ) : (
                              <span className="login-btn-text">Create Account</span>
                            )}
                          </button>
                        </form>
                      ) : (
                        <div className="login-success-message">
                          <div className="login-success-icon">
                            ✓
                          </div>
                          <h3>Account Created Successfully!</h3>
                          <p>Welcome {registerData.firstName} {registerData.lastName}</p>
                          <p>Redirecting to dashboard...</p>
                          <button 
                            className="login-submit-btn"
                            onClick={resetForm}
                          >
                            Create Another Account
                          </button>
                        </div>
                      )}
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
                    <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('login'); resetForm(); }} className="login-switch-link">Sign in here</a></p>
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