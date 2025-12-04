import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCartIcon,
  InformationCircleIcon,
  HeartIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './BestSellers.css';

// Import Cart Context
import { useCart } from './CartContext';

gsap.registerPlugin(ScrollTrigger);

const BestSellerStationary = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Use Cart Context
  const { addItemToCart, toggleCart } = useCart();

  const stationary = [
    {
      id: 1,
      image: "bg.jpg",
      title: "Art Supplies Kit",
      price: 899,
      originalPrice: 1799,
      discount: "50% OFF",
      rating: 4.7,
      reviews: 134,
      category: "Art Supplies",
      pieces: "50 Pieces"
    },
    {
      id: 2,
      image: "bg.jpg",
      title: "School Stationary Set",
      price: 499,
      originalPrice: 999,
      discount: "50% OFF",
      rating: 4.5,
      reviews: 89,
      category: "School Set",
      pieces: "25 Pieces"
    },
    {
      id: 3,
      image: "bg.jpg",
      title: "Drawing Sketchbook Set",
      price: 699,
      originalPrice: 1399,
      discount: "50% OFF",
      rating: 4.8,
      reviews: 67,
      category: "Drawing",
      pieces: "3 Books + Colors"
    },
    {
      id: 4,
      image: "bg.jpg",
      title: "Educational Sticker Pack",
      price: 299,
      originalPrice: 599,
      discount: "50% OFF",
      rating: 4.4,
      reviews: 156,
      category: "Stickers",
      pieces: "100+ Stickers"
    },
    {
      id: 5,
      image: "bg.jpg",
      title: "Kids Writing Desk",
      price: 2999,
      originalPrice: 5999,
      discount: "50% OFF",
      rating: 4.6,
      reviews: 45,
      category: "Furniture",
      pieces: "Study Table"
    },
    {
      id: 6,
      image: "bg.jpg",
      title: "Color Pencil Set",
      price: 399,
      originalPrice: 799,
      discount: "50% OFF",
      rating: 4.9,
      reviews: 178,
      category: "Colors",
      pieces: "36 Colors"
    }
  ];

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Card click handler
  const handleCardClick = (productId) => {
    navigate(`/productdetails?id=${productId}`);
    
    if (!viewedProducts.includes(productId)) {
      setViewedProducts([...viewedProducts, productId]);
    }
  };

  // Add to Cart Function
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItemToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    toggleCart();
    
    console.log(`Added ${product.title} to cart`);
  };

  // View Details Function
  const handleDetailsClick = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigate(`/productdetails?id=${productId}`);
    
    if (!viewedProducts.includes(productId)) {
      setViewedProducts([...viewedProducts, productId]);
    }
  };

  const toggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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
            toggleActions: "play none none reverse"
          }
        }
      );

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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Initialize navigation when swiper is ready
  useEffect(() => {
    if (swiperReady && swiperRef.current) {
      const swiper = swiperRef.current;
      
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
      
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiperReady]);

  // Swiper breakpoints for 2 grid layout
  const swiperBreakpoints = {
    320: { 
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 15,
      grid: {
        rows: 2,
        fill: 'row'
      }
    },
    480: { 
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 15,
      grid: {
        rows: 2,
        fill: 'row'
      }
    },
    576: { 
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
      grid: {
        rows: 2,
        fill: 'row'
      }
    },
    768: { 
      slidesPerView: 2,
      spaceBetween: 25,
      grid: {
        rows: 2,
        fill: 'row'
      }
    },
    992: { 
      slidesPerView: 3,
      spaceBetween: 30,
      grid: false
    },
    1200: { 
      slidesPerView: 4,
      spaceBetween: 30,
      grid: false
    }
  };

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    setSwiperReady(true);
  };

  return (
    <div className="bestseller-section bestseller-stationary-section" ref={sectionRef}>
      <Container fluid>
        {/* Section Header */}
        <div className="bestseller-header" ref={titleRef}>
          <div className="bestseller-header-wrapper">
            <div className="bestseller-header-content">
              <div className="bestseller-header-left">
                <h2 className="bestseller-title">
                  <span className="bestseller-title-word bestseller-title-word-1">Best</span>
                  <span className="bestseller-title-word bestseller-title-word-2">Seller</span>
                  <span className="bestseller-title-word bestseller-title-word-3">Stationary</span>
                </h2>
                <p className="bestseller-subtitle">Creative tools for young minds</p>
              </div>
              
              {/* Desktop View More Button */}
              {!isMobile && (
                <div className="bestseller-header-right">
                  <button className="bestseller-view-all-btn">
                    View All Stationary
                  </button>
                </div>
              )}

              {/* Mobile Navigation in Header */}
              {isMobile && (
                <div className="bestseller-header-navigation">
                  <button 
                    className="bestseller-mobile-header-nav-btn"
                    onClick={() => swiperRef.current?.slidePrev()}
                  >
                    <ChevronLeftIcon className="bestseller-nav-icon" />
                  </button>
                  <button 
                    className="bestseller-mobile-header-nav-btn"
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <ChevronRightIcon className="bestseller-nav-icon" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Swiper Slider with Side Navigation */}
        <div className="bestseller-swiper-container">
          {/* Left Navigation Arrow - Desktop view के लिए */}
          {!isMobile && (
            <div 
              className="bestseller-swiper-button-prev-custom bestseller-side-nav bestseller-left-nav"
              ref={navigationPrevRef}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

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
            className="bestseller-swiper"
          >
            {stationary.map((item) => (
              <SwiperSlide key={item.id}>
                <div 
                  className="bestseller-card"
                  onClick={() => handleCardClick(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bestseller-card-inner" style={{"--clr": "#fff"}}>
                    <div className="bestseller-box">
                      <div className="bestseller-imgBox">
                        <img 
                          src={item.image}
                          className="bestseller-image"
                          alt={item.title}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x200/F8F1E5/0D5BCF?text=Zebro+Stationary";
                          }}
                        />
                      </div>

                      {/* Hover Overlay with Details and Wishlist Icons */}
                      <div className="bestseller-hover-overlay">
                        <div className="bestseller-hover-icons">
                          <button 
                            className={`bestseller-details-btn ${viewedProducts.includes(item.id) ? 'clicked-hover-effect' : ''}`}
                            onClick={(e) => handleDetailsClick(item.id, e)}
                            title="View Details"
                          >
                            <InformationCircleIcon className="bestseller-details-icon" />
                          </button>
                          <button 
                            className={`bestseller-wishlist-btn ${wishlist.includes(item.id) ? 'active' : ''}`}
                            onClick={(e) => toggleWishlist(item.id, e)}
                            title={wishlist.includes(item.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                          >
                            <HeartIcon className="bestseller-wishlist-icon" />
                          </button>
                        </div>
                      </div>

                      <div className="bestseller-category-badge">
                        {item.category}
                      </div>

                      <div className="bestseller-age-badge bestseller-pieces-badge">
                        {item.pieces}
                      </div>

                      {/* Shopping Cart Icon */}
                      <div className="bestseller-icon">
                        <a 
                          href="#" 
                          className="bestseller-iconBox"
                          onClick={(e) => handleAddToCart(item, e)}
                        > 
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

                  <div className="bestseller-content">
                    <h3 className="bestseller-title-text">{item.title}</h3>
                    
                    <div className="bestseller-rating-price-container">
                      <div className="bestseller-rating">
                        <div className="bestseller-stars">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              style={{
                                width: '14px',
                                height: '14px',
                                fill: i < Math.floor(item.rating) ? '#F2BB13' : 'none',
                                stroke: i < item.rating ? '#F2BB13' : '#BFBFBF'
                              }}
                            />
                          ))}
                        </div>
                        <span className="bestseller-rating-text">({item.reviews})</span>
                      </div>

                      {/* Price display */}
                      <div className="bestseller-price">
                        <span className="bestseller-current-price">{formatPrice(item.price)}</span>
                        <span className="bestseller-original-price">{formatPrice(item.originalPrice)}</span>
                        <span className="bestseller-discount">{item.discount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Navigation Arrow - Desktop view के लिए */}
          {!isMobile && (
            <div 
              className="bestseller-swiper-button-next-custom bestseller-side-nav bestseller-right-nav"
              ref={navigationNextRef}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* Mobile View All Button - Cards ke niche */}
        <div className="bestseller-mobile-view-all-container">
          <button className="bestseller-mobile-view-all-btn">
            View All Stationary
          </button>
        </div>
      </Container>
    </div>
  );
};

export default BestSellerStationary;