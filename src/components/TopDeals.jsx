import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { 
  StarIcon, 
  ShoppingCartIcon,
  HeartIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './TopDeals.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const TopDeals = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);

  // Sample deals data
  const deals = [
    {
      id: 1,
      image: "RC Car.jpg",
      title: "Educational Robot Toy",
      price: "₹1,299",
      originalPrice: "₹2,499",
      discount: "48% OFF",
      rating: 4.5,
      reviews: 125,
    },
    {
      id: 2,
      image: "bg (4).jpg",
      title: "Building Blocks Set",
      price: "₹899",
      originalPrice: "₹1,799",
      discount: "50% OFF",
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      image: "bg (3).jpg",
      title: "Kids Story Books Pack",
      price: "₹499",
      originalPrice: "₹999",
      discount: "50% OFF",
      rating: 4.3,
      reviews: 67,
    },
    {
      id: 4,
      image: "bg.jpg",
      title: "Puzzle Game Collection",
      price: "₹699",
      originalPrice: "₹1,399",
      discount: "50% OFF",
      rating: 4.6,
      reviews: 42,
    },
    {
      id: 5,
      image: "Building Blocks.jpg",
      title: "Remote Control Car",
      price: "₹1,599",
      originalPrice: "₹2,999",
      discount: "47% OFF",
      rating: 4.4,
      reviews: 156,
    },
    {
      id: 6,
      image: "Art Kit.jpg",
      title: "Art & Craft Kit",
      price: "₹799",
      originalPrice: "₹1,599",
      discount: "50% OFF",
      rating: 4.7,
      reviews: 93,
    },
    {
      id: 7,
      image: "bg (4).jpg",
      title: "Science Experiment Kit",
      price: "₹1,199",
      originalPrice: "₹2,199",
      discount: "45% OFF",
      rating: 4.9,
      reviews: 78,
    },
    {
      id: 8,
      image: "bg (3).jpg",
      title: "Musical Toys Set",
      price: "₹599",
      originalPrice: "₹1,199",
      discount: "50% OFF",
      rating: 4.2,
      reviews: 54,
    }
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(sectionRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Card stagger animation
      gsap.fromTo('.top-deals-deal-card',
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.top-deals-swiper-container',
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Initialize navigation when swiper is ready
  useEffect(() => {
    if (swiperReady && swiperRef.current) {
      const swiper = swiperRef.current;
      
      // Update navigation parameters
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
      
      // Re-init navigation
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiperReady]);

  const toggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handleDetailsClick = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('View details for product:', productId);
    
    // Add to viewed products if not already there
    if (!viewedProducts.includes(productId)) {
      setViewedProducts([...viewedProducts, productId]);
    }
  };

  // Swiper breakpoints for responsive design
  const swiperBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 25
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  };

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    setSwiperReady(true);
  };

  return (
    <div className="top-deals-section" ref={sectionRef}>
      <Container fluid>
        {/* Section Header with Colorful Text and View More Button */}
        <div className="top-deals-header" ref={titleRef}>
          <div className="top-deals-header-content">
            <div className="top-deals-header-left">
              <h2 className="top-deals-title">
                <span className="top-deals-title-word top-deals-title-word-1">Today's</span>
                <span className="top-deals-title-word top-deals-title-word-2">Top</span>
                <span className="top-deals-title-word top-deals-title-word-3">Deals</span>
              </h2>
              <p className="top-deals-subtitle">Don't miss out on these amazing offers!</p>
            </div>
            
            {/* View More Button - Top Right */}
            <div className="top-deals-header-right">
              <button className="top-deals-view-all-btn">
                View More Deals
              </button>
            </div>
          </div>
        </div>

        {/* Swiper Slider with Side Navigation */}
        <div className="top-deals-swiper-container">
          {/* Left Navigation Arrow */}
          <div 
            className="top-deals-swiper-button-prev-custom top-deals-side-nav top-deals-left-nav"
            ref={navigationPrevRef}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={swiperBreakpoints}
            loop={true}
            onSwiper={handleSwiperInit}
            onInit={handleSwiperInit}
            className="top-deals-swiper"
          >
            {deals.map((deal) => (
              <SwiperSlide key={deal.id}>
                <div className="top-deals-deal-card">
                  <div className="top-deals-card-inner" style={{"--clr": "#fff"}}>
                    <div className="top-deals-box">
                      {/* Product Image */}
                      <div className="top-deals-imgBox">
                        <img 
                          src={deal.image}
                          className="top-deals-deal-image"
                          alt={deal.title}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x200/F8F1E5/0D5BCF?text=Zebro+Kids";
                          }}
                        />
                      </div>

                      {/* Hover Overlay with Details and Wishlist Icons */}
                      <div className="top-deals-hover-overlay">
                        <div className="top-deals-hover-icons">
                          <button 
                            className={`top-deals-details-btn ${viewedProducts.includes(deal.id) ? 'active' : ''}`}
                            onClick={(e) => handleDetailsClick(deal.id, e)}
                            title="View Details"
                          >
                            <InformationCircleIcon className="top-deals-details-icon" />
                          </button>
                          <button 
                            className={`top-deals-wishlist-btn ${wishlist.includes(deal.id) ? 'active' : ''}`}
                            onClick={(e) => toggleWishlist(deal.id, e)}
                            title={wishlist.includes(deal.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                          >
                            <HeartIcon className="top-deals-wishlist-icon" />
                          </button>
                        </div>
                      </div>

                      {/* Original Shopping Cart Icon (Bottom Right) */}
                      <div className="top-deals-icon">
                        <a href="#" className="top-deals-iconBox"> 
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

                  {/* Card Content */}
                  <div className="top-deals-content">
                    <h3 className="top-deals-deal-title">{deal.title}</h3>
                    
                    {/* Rating and Price Container */}
                    <div className="top-deals-rating-price-container">
                      {/* Rating */}
                      <div className="top-deals-deal-rating">
                        <div className="top-deals-stars">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              style={{
                                width: '14px',
                                height: '14px',
                                fill: i < Math.floor(deal.rating) ? '#F2BB13' : 'none',
                                stroke: i < deal.rating ? '#F2BB13' : '#BFBFBF'
                              }}
                            />
                          ))}
                        </div>
                        <span className="top-deals-rating-text">({deal.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="top-deals-deal-price">
                        <span className="top-deals-current-price">{deal.price}</span>
                        <span className="top-deals-original-price">{deal.originalPrice}</span>
                        <span className="top-deals-discount">{deal.discount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Navigation Arrow */}
          <div 
            className="top-deals-swiper-button-next-custom top-deals-side-nav top-deals-right-nav"
            ref={navigationNextRef}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Mobile View All Button - Cards ke niche */}
        <div className="top-deals-mobile-view-all-container">
          <button className="top-deals-mobile-view-all-btn">
            View More Deals
          </button>
        </div>
      </Container>
    </div>
  );
};

export default TopDeals;