import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import './ThreeCardsLayout.css';

const ThreeCardsLayout = () => {
  // TopDeals se similar data with reference design
  const dealsData = [
    {
      id: 1,
      title: "Educational Robot Toy",
      price: "₹1,299",
      originalPrice: "₹2,499",
      discount: "48% OFF",
      rating: 4.5,
      reviews: 125,
      image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      title: "Building Blocks Set",
      price: "₹899",
      originalPrice: "₹1,799",
      discount: "50% OFF",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1516220362602-dba5272034e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      title: "Art & Craft Kit",
      price: "₹799",
      originalPrice: "₹1,599",
      discount: "50% OFF",
      rating: 4.7,
      reviews: 93,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <section className="skin-ambitions">
      <Container fluid>
        <div className="skin-header">
          <h2>Today's Special Deals</h2>
          <p>Don't miss out on these amazing offers!</p>
        </div>

        <div className="skin-container">
          <Row className="skin-row">
            {/* Left Side - 50% width, 100% height */}
            <Col lg={6} className="skin-left-col">
              <div className="skin-card">
                <div className="skin-card-inner" style={{"--clr": "#fff"}}>
                  <div className="skin-box">
                    <div className="skin-imgBox">
                      <img 
                        src={dealsData[0].image}
                        alt={dealsData[0].title}
                      />
                    </div>

                    <div className="skin-icon">
                      {/* Shopping cart icon instead of checkbox */}
                      <a href="#" className="skin-cart-icon"> 
                        <ShoppingCartIcon 
                          style={{
                            width: '24px',
                            height: '24px',
                            color: '#fff'
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* TopDeals style content */}
                <div className="skin-content">
                  <h3 className="skin-title">{dealsData[0].title}</h3>
                  
                  <div className="skin-rating-price">
                    <div className="skin-rating">
                      <div className="skin-stars">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i}
                            className={`skin-star ${i < Math.floor(dealsData[0].rating) ? 'skin-filled' : ''}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="skin-rating-text">({dealsData[0].reviews})</span>
                    </div>

                    <div className="skin-price">
                      <span className="skin-current-price">{dealsData[0].price}</span>
                      <span className="skin-original-price">{dealsData[0].originalPrice}</span>
                      <span className="skin-discount">{dealsData[0].discount}</span>
                    </div>
                  </div>

                  <button className="skin-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Col>

            {/* Right Side - 50% width, divided into top and bottom */}
            <Col lg={6} className="skin-right-col">
              {/* Top Card - 50% height */}
              <div className="skin-card skin-top-card">
                <div className="skin-card-inner" style={{"--clr": "#fff"}}>
                  <div className="skin-box">
                    <div className="skin-imgBox">
                      <img 
                        src={dealsData[1].image}
                        alt={dealsData[1].title}
                      />
                    </div>

                    <div className="skin-icon">
                      <a href="#" className="skin-cart-icon"> 
                        <ShoppingCartIcon 
                          style={{
                            width: '20px',
                            height: '20px',
                            color: '#fff'
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="skin-content">
                  <h3 className="skin-title">{dealsData[1].title}</h3>
                  
                  <div className="skin-rating-price">
                    <div className="skin-rating">
                      <div className="skin-stars">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i}
                            className={`skin-star ${i < Math.floor(dealsData[1].rating) ? 'skin-filled' : ''}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="skin-rating-text">({dealsData[1].reviews})</span>
                    </div>

                    <div className="skin-price">
                      <span className="skin-current-price">{dealsData[1].price}</span>
                      <span className="skin-original-price">{dealsData[1].originalPrice}</span>
                      <span className="skin-discount">{dealsData[1].discount}</span>
                    </div>
                  </div>

                  <button className="skin-btn">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Bottom Card - 50% height */}
              <div className="skin-card skin-bottom-card">
                <div className="skin-card-inner" style={{"--clr": "#fff"}}>
                  <div className="skin-box">
                    <div className="skin-imgBox">
                      <img 
                        src={dealsData[2].image}
                        alt={dealsData[2].title}
                      />
                    </div>

                    <div className="skin-icon">
                      <a href="#" className="skin-cart-icon"> 
                        <ShoppingCartIcon 
                          style={{
                            width: '20px',
                            height: '20px',
                            color: '#fff'
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="skin-content">
                  <h3 className="skin-title">{dealsData[2].title}</h3>
                  
                  <div className="skin-rating-price">
                    <div className="skin-rating">
                      <div className="skin-stars">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i}
                            className={`skin-star ${i < Math.floor(dealsData[2].rating) ? 'skin-filled' : ''}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="skin-rating-text">({dealsData[2].reviews})</span>
                    </div>

                    <div className="skin-price">
                      <span className="skin-current-price">{dealsData[2].price}</span>
                      <span className="skin-original-price">{dealsData[2].originalPrice}</span>
                      <span className="skin-discount">{dealsData[2].discount}</span>
                    </div>
                  </div>

                  <button className="skin-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ThreeCardsLayout;