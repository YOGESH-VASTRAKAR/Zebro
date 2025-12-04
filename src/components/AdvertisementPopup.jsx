import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import './AdvertisementPopup.css';

const AdvertisementPopup = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  // Single offer/image
  const offer = {
    id: 1,
    image: "/advertisement.jpg", // यहाँ अपनी image का path दें
    accentColor: 'rgb(60 138 197)',
    category: "Toys & Games",
  };

  const handleOfferClick = () => {
    const categorySlug = offer.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    navigate(`/products?category=${categorySlug}`);
    setIsVisible(false); // Click करने पर close हो जाए
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Card click event को stop करने के लिए
    setIsVisible(false);
  };

  // Popup hide ho gaya hai toh kuch bhi mat show karo
  if (!isVisible) {
    return null;
  }

  return (
    <div className="ad-popup-overlay">
      <Container fluid className="ad-popup-container">
        <div className="ad-popup-content">
          <section className="ad-popup-offers-container">
            <article 
              className="ad-popup-offer-card" 
              style={{ '--ad-popup-accent-color': offer.accentColor }}
              onClick={handleOfferClick}
            >
              {/* Close Button - Card के अंदर Top Right */}
              <button 
                className="ad-popup-close-btn"
                onClick={handleClose}
                aria-label="Close advertisement"
              >
                <XMarkIcon className="ad-close-icon" />
              </button>
              
              <div className="ad-popup-card-content">
                <img 
                  src={offer.image} 
                  alt={`Special Offer - ${offer.category}`} 
                  className="ad-popup-offer-image"
                />
              </div>
            </article>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default AdvertisementPopup;