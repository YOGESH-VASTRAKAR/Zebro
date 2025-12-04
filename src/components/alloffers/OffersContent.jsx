import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './OffersContent.css';

const OffersContent = () => {
  const navigate = useNavigate();

  const offerCards = [
    {
      id: 1,
      image: "/1.jpg",
      alt: "Special Offer 1",
      accentColor: "rgb(60 138 197)",
      category: "Toys & Games"
    },
    {
      id: 2,
      image: "/2.jpg", 
      alt: "Special Offer 2",
      accentColor: "rgb(9 118 37)",
      category: "Gifting"
    },
    {
      id: 3,
      image: "/3.jpg",
      alt: "Special Offer 3", 
      accentColor: "rgb(230 92 82)",
      category: "Stationery"
    },
    {
      id: 4,
      image: "/4.jpg",
      alt: "Special Offer 4",
      accentColor: "rgb(245 198 98)",
      category: "Books & Learning"
    },
    {
      id: 5,
      image: "/5.jpg",
      alt: "Special Offer 5",
      accentColor: "rgb(174 120 203)",
      category: "Art & Craft"
    },
    {
      id: 6,
      image: "/6.jpg",
      alt: "Special Offer 6",
      accentColor: "rgb(255 126 95)",
      category: "Building Blocks"
    }
  ];

  const handleCardClick = (category) => {
    const categorySlug = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    navigate(`/products?category=${categorySlug}`);
  };

  return (
    <div className="offers-content-section">
      <Container>
        <Row>
          <Col>
            <div className="offers-grid-container">
              <div className="offers-container">
                {offerCards.map((card) => (
                  <article 
                    key={card.id}
                    className={`offers-card ${card.id === 3 || card.id === 4 ? 'offers-featured-card' : ''}`}
                    style={{ '--offers-accent-color': card.accentColor }}
                    onClick={() => handleCardClick(card.category)}
                  >
                    <div className="offers-card-content">
                      <img 
                        src={card.image} 
                        alt={card.alt}
                        className="offers-image"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OffersContent;