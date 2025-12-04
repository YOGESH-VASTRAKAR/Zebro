import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button,
  InputGroup
} from 'react-bootstrap';
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  ArrowRightIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  PuzzlePieceIcon,
  AcademicCapIcon,
  CubeIcon,
  RocketLaunchIcon,
  PaintBrushIcon,
  ArrowPathIcon,
  MapIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,        
  BriefcaseIcon       
} from '@heroicons/react/24/solid';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube 
} from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const toggleAccordion = (accordionName) => {
    setActiveAccordion(activeAccordion === accordionName ? null : accordionName);
  };

  const quickLinks = [
    { name: 'Contact Us', href: '/my_account?tab=support', icon: ChatBubbleLeftRightIcon },
    { name: 'Setting', href: '/my_account?tab=setting', icon: Cog6ToothIcon }, 
    { name: 'Privacy Policy', href: '/my_account?tab=support', icon: ShieldCheckIcon },
    { name: 'Terms & Conditions', href: '/my_account?tab=support', icon: CreditCardIcon },
    { name: 'Return Policy', href: '/my_account?tab=support', icon: TruckIcon }
  ];

  const categories = [
    { name: 'Educational Toys', href: '/products?category=educational-toys', icon: PuzzlePieceIcon },
    { name: 'Building Blocks', href: '/products?category=building-blocks', icon: CubeIcon },
    { name: 'Remote Control', href: '/products?category=remote-control', icon: RocketLaunchIcon },
    { name: 'Art & Craft', href: '/products?category=art-craft', icon: PaintBrushIcon },
    { name: 'School Supplies', href: '/products?category=school-supplies', icon: AcademicCapIcon },
  ];

  const customerService = [
    { name: 'Shipping Info', href: '/my_account', icon: TruckIcon },
    { name: 'Returns & Exchanges', href: '/my_account', icon: ArrowPathIcon },
    { name: 'Track Your Order', href: '/my_account', icon: MapIcon },
    { name: 'FAQ', href: '/my_account?tab=support', icon: QuestionMarkCircleIcon },
    { name: 'Business Inquiries', href: '/my_account?tab=support', icon: BriefcaseIcon }
  ];

  const renderMobileLink = (link, index) => {
    const IconComponent = link.icon;
    return (
      <div key={index} className="mobile-footer-link">
        <IconComponent className="mobile-footer-link-icon" />
        <a href={link.href} className="mobile-footer-link-text">
          {link.name}
        </a>
        <ArrowRightIcon className="mobile-footer-link-arrow" />
      </div>
    );
  };

  return (
    <footer className="modern-footer">
      {/* Main Footer Section */}
      <div className="footer-main">
        <Container>
          {/* Desktop View */}
          <div className="footer-desktop-view">
            <Row className="g-4 gy-5">
              {/* Brand Column */}
              <Col xl={4} lg={6} md={12} className="footer-brand-col">
                <div className="footer-brand">
                  <div className="footer-logo">
                    <img 
                      src="./logo.png" 
                      alt="Zebro Kids" 
                      className="footer-logo-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  </div>
                  <p className="footer-description">
                    Making childhood magical with premium toys, educational materials, 
                    and creative stationary. We believe in quality, safety, and endless fun 
                    for your little ones.
                  </p>
                  
                  {/* Trust Badges */}
                  <div className="trust-badges">
                    <div className="trust-badge">
                      <ShieldCheckIcon className="trust-icon" />
                      <span>100% Safe</span>
                    </div>
                    <div className="trust-badge">
                      <TruckIcon className="trust-icon" />
                      <span>Free Shipping</span>
                    </div>
                    <div className="trust-badge">
                      <CreditCardIcon className="trust-icon" />
                      <span>Secure Payment</span>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Quick Links Column */}
              <Col xl={2} lg={3} md={4} sm={6} className="footer-links-col">
                <h6 className="footer-title">Quick Links</h6>
                <ul className="footer-links">
                  {quickLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={index}>
                        <a href={link.href} className="footer-link">
                          <IconComponent className="link-icon" />
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Col>

              {/* Categories Column */}
              <Col xl={2} lg={3} md={4} sm={6} className="footer-links-col">
                <h6 className="footer-title">Categories</h6>
                <ul className="footer-links">
                  {categories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <li key={index}>
                        <a href={category.href} className="footer-link">
                          <IconComponent className="link-icon" />
                          {category.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Col>

              {/* Customer Service Column */}
              <Col xl={2} lg={3} md={4} sm={6} className="footer-links-col">
                <h6 className="footer-title">Customer Service</h6>
                <ul className="footer-links">
                  {customerService.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <li key={index}>
                        <a href={service.href} className="footer-link">
                          <IconComponent className="link-icon" />
                          {service.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Col>

              {/* Newsletter Column */}
              <Col xl={2} lg={3} md={12} sm={6} className="footer-newsletter-col">
                <h6 className="footer-title">Stay Updated</h6>
                <div className="newsletter-section">
                  <p className="newsletter-text">
                    Get the latest updates on new products and upcoming sales
                  </p>
                  
                  {!isSubscribed ? (
                    <Form onSubmit={handleSubscribe} className="newsletter-form">
                      <InputGroup className="newsletter-input-group">
                        <Form.Control
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="newsletter-input"
                          required
                        />
                        <Button type="submit" className="newsletter-btn">
                          <PaperAirplaneIcon className="send-icon" />
                        </Button>
                      </InputGroup>
                    </Form>
                  ) : (
                    <div className="subscription-success">
                      <HeartIcon className="success-icon" />
                      <span>Thank you for subscribing!</span>
                    </div>
                  )}

                  {/* Social Links - Updated with Fa icons */}
                  <div className="social-links">
                    <h6 className="social-title">Follow Us</h6>
                    <div className="social-icons">
                      <a href="#" className="social-link facebook">
                        <FaFacebookF className="social-icon" />
                      </a>
                      <a href="#" className="social-link instagram">
                        <FaInstagram className="social-icon" />
                      </a>
                      <a href="#" className="social-link twitter">
                        <FaTwitter className="social-icon" />
                      </a>
                      <a href="#" className="social-link youtube">
                        <FaYoutube className="social-icon" />
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Mobile View */}
          <div className="footer-mobile-view">
            <div className="mobile-footer-accordions">
              {/* Brand Section - Always Visible */}
              <div className="mobile-footer-brand">
                <div className="footer-logo">
                  <img 
                    src="./logo.png" 
                    alt="Zebro Kids" 
                    className="footer-logo-img"
                  />
                </div>
                <p className="footer-description">
                  Making childhood magical with premium toys, educational materials, 
                  and creative stationary.
                </p>
              </div>

              {/* Quick Links Accordion */}
              <div className="mobile-footer-accordion">
                <div 
                  className="mobile-footer-accordion-header"
                  onClick={() => toggleAccordion('quickLinks')}
                >
                  <h6 className="mobile-footer-accordion-title">
                    <InformationCircleIcon className="accordion-title-icon" />
                    Quick Links
                  </h6>
                  <ChevronDownIcon className={`mobile-accordion-toggle ${activeAccordion === 'quickLinks' ? 'active' : ''}`} />
                </div>
                <div className={`mobile-footer-accordion-content ${activeAccordion === 'quickLinks' ? 'active' : ''}`}>
                  {quickLinks.map(renderMobileLink)}
                </div>
              </div>

              {/* Categories Accordion */}
              <div className="mobile-footer-accordion">
                <div 
                  className="mobile-footer-accordion-header"
                  onClick={() => toggleAccordion('categories')}
                >
                  <h6 className="mobile-footer-accordion-title">
                    <PuzzlePieceIcon className="accordion-title-icon" />
                    Categories
                  </h6>
                  <ChevronDownIcon className={`mobile-accordion-toggle ${activeAccordion === 'categories' ? 'active' : ''}`} />
                </div>
                <div className={`mobile-footer-accordion-content ${activeAccordion === 'categories' ? 'active' : ''}`}>
                  {categories.map(renderMobileLink)}
                </div>
              </div>

              {/* Customer Service Accordion */}
              <div className="mobile-footer-accordion">
                <div 
                  className="mobile-footer-accordion-header"
                  onClick={() => toggleAccordion('customerService')}
                >
                  <h6 className="mobile-footer-accordion-title">
                    <ShieldCheckIcon className="accordion-title-icon" />
                    Customer Service
                  </h6>
                  <ChevronDownIcon className={`mobile-accordion-toggle ${activeAccordion === 'customerService' ? 'active' : ''}`} />
                </div>
                <div className={`mobile-footer-accordion-content ${activeAccordion === 'customerService' ? 'active' : ''}`}>
                  {customerService.map(renderMobileLink)}
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="mobile-newsletter-section">
                <div className="mobile-newsletter-header">
                  <EnvelopeIcon className="accordion-title-icon" />
                  <h6 className="mobile-footer-accordion-title">Stay Updated</h6>
                </div>
                <p className="newsletter-text">
                  Get the latest updates on new products and exclusive sales
                </p>
                
                {!isSubscribed ? (
                  <Form onSubmit={handleSubscribe} className="newsletter-form">
                    <InputGroup className="newsletter-input-group mobile-newsletter-input-group">
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="newsletter-input mobile-newsletter-input"
                        required
                      />
                      <Button type="submit" className="newsletter-btn mobile-newsletter-btn">
                        <PaperAirplaneIcon className="send-icon" />
                        <span className="btn-text">Subscribe</span>
                      </Button>
                    </InputGroup>
                  </Form>
                ) : (
                  <div className="subscription-success mobile-subscription-success">
                    <HeartIcon className="success-icon" />
                    <span>Thank you for subscribing!</span>
                    <small>You'll hear from us soon.</small>
                  </div>
                )}

                {/* Social Links - Updated with Fa icons */}
                <div className="social-links mobile-social-links">
                  <h6 className="social-title">Follow Us</h6>
                  <div className="social-icons">
                    <a href="#" className="social-link facebook" aria-label="Facebook">
                      <FaFacebookF className="social-icon" />
                    </a>
                    <a href="#" className="social-link instagram" aria-label="Instagram">
                      <FaInstagram className="social-icon" />
                    </a>
                    <a href="#" className="social-link twitter" aria-label="Twitter">
                      <FaTwitter className="social-icon" />
                    </a>
                    <a href="#" className="social-link youtube" aria-label="YouTube">
                      <FaYoutube className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mobile-trust-badges">
                <div className="trust-badge">
                  <ShieldCheckIcon className="trust-icon" />
                  <span>100% Safe</span>
                </div>
                <div className="trust-badge">
                  <TruckIcon className="trust-icon" />
                  <span>Free Shipping</span>
                </div>
                <div className="trust-badge">
                  <CreditCardIcon className="trust-icon" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Contact Bar */}
      <div className="footer-contact-bar">
        <Container>
          <Row className="g-3 gy-4">
            <Col lg={4} md={12}>
              <div className="contact-item">
                <PhoneIcon className="contact-bar-icon" />
                <div className="contact-info">
                  <span className="contact-label">Call Us</span>
                  <span className="contact-value">+91 98765 43210</span>
                </div>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div className="contact-item">
                <EnvelopeIcon className="contact-bar-icon" />
                <div className="contact-info">
                  <span className="contact-label">Email Us</span>
                  <span className="contact-value">hello@zebrokids.com</span>
                </div>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div className="contact-item">
                <MapPinIcon className="contact-bar-icon" />
                <div className="contact-info">
                  <span className="contact-label">Visit Us</span>
                  <span className="contact-value">Store Locator</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center gy-3">
            <Col lg={6} md={12}>
              <p className="copyright text-center text-lg-start">
                © 2025 <strong>Zebro Kids</strong>. All rights reserved. 
                Made with ❤️ for happy childhoods.
              </p>
            </Col>
            <Col lg={6} md={12}>
              <div className="payment-methods justify-content-center justify-content-lg-end">
                <span className="payment-text">We Accept:</span>
                <div className="payment-icons">
                  <div className="payment-icon">💳</div>
                  <div className="payment-icon">📱</div>
                  <div className="payment-icon">🏦</div>
                  <div className="payment-icon">🔒</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;