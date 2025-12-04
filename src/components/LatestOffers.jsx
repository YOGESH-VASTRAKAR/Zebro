import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LatestOffers.css';

const LatestOffers = () => {
  const navigate = useNavigate();

  const offers = [
    {
      id: 1,
      image: "/latestadd1.jpg",
      accentColor: 'rgb(60 138 197)',
      category: "Toys & Games",
    },
    {
      id: 2,
      image: "/latestadd2.jpg",
      accentColor: 'rgb(9 118 37)',
      category: "Gifting",
    }
  ];

  const handleOfferClick = (category) => {
    const categorySlug = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    navigate(`/products?category=${categorySlug}`);
  };

  return (
    <Container fluid className="latest-offers-latest-offers-section">
      <section className="latest-offers-offers-container">
        {offers.map((offer) => (
          <article 
            key={offer.id}
            className="latest-offers-offer-card" 
            style={{ '--latest-offers-accent-color': offer.accentColor }}
            onClick={() => handleOfferClick(offer.category)}
          >
            <div className="latest-offers-card-content">
              <img 
                src={offer.image} 
                alt={`Special Offer ${offer.id}`} 
                className="latest-offers-offer-image"
              />
            </div>
          </article>
        ))}
      </section>
    </Container>
  );
};

export default LatestOffers;