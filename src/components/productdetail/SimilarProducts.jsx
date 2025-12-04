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
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './SimilarProducts.css';

// Import Cart Context
import { useCart } from '../CartContext';

gsap.registerPlugin(ScrollTrigger);

const SimilarProducts = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Use Cart Context
  const { addItemToCart, toggleCart } = useCart();

  const similarProducts = [
    {
      id: 1,
      image: "RC Car.jpg",
      title: "Educational Robot Toy",
      price: 1299,
      originalPrice: 2499,
      discount: "48% OFF",
      rating: 4.5,
      reviews: 125,
      category: "Educational",
      age: "3-8 Years"
    },
    {
      id: 2,
      image: "bg (4).jpg",
      title: "Building Blocks Set",
      price: 899,
      originalPrice: 1799,
      discount: "50% OFF",
      rating: 4.8,
      reviews: 89,
      category: "Construction",
      age: "4-10 Years"
    },
    {
      id: 3,
      image: "bg (3).jpg",
      title: "Remote Control Car",
      price: 1599,
      originalPrice: 2999,
      discount: "47% OFF",
      rating: 4.4,
      reviews: 156,
      category: "Remote Control",
      age: "5-12 Years"
    },
    {
      id: 4,
      image: "bg.jpg",
      title: "Doll House Set",
      price: 2499,
      originalPrice: 4999,
      discount: "50% OFF",
      rating: 4.6,
      reviews: 78,
      category: "Dolls",
      age: "3-8 Years"
    },
    {
      id: 5,
      image: "Building Blocks.jpg",
      title: "Musical Instrument Set",
      price: 699,
      originalPrice: 1399,
      discount: "50% OFF",
      rating: 4.3,
      reviews: 92,
      category: "Musical",
      age: "2-6 Years"
    },
    {
      id: 6,
      image: "Art Kit.jpg",
      title: "Science Experiment Kit",
      price: 1199,
      originalPrice: 2399,
      discount: "50% OFF",
      rating: 4.7,
      reviews: 64,
      category: "Educational",
      age: "8-14 Years"
    },
    {
      id: 7,
      image: "bg (4).jpg",
      title: "Art & Craft Kit",
      price: 799,
      originalPrice: 1599,
      discount: "50% OFF",
      rating: 4.7,
      reviews: 93,
      category: "Arts",
      age: "5-12 Years"
    },
    {
      id: 8,
      image: "bg (3).jpg",
      title: "Kids Story Books Pack",
      price: 499,
      originalPrice: 999,
      discount: "50% OFF",
      rating: 4.3,
      reviews: 67,
      category: "Books",
      age: "3-10 Years"
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
            end: "bottom 20%",
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

  // Mobile view ke liye breakpoints
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

  // Render card function
  const renderCard = (product) => (
    <div 
      className="similar-products-card"
      onClick={() => handleCardClick(product.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="similar-products-card-inner" style={{"--clr": "#fff"}}>
        <div className="similar-products-box">
          {/* Product Image */}
          <div className="similar-products-imgBox">
            <img 
              src={product.image}
              className="similar-products-image"
              alt={product.title}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200x200/F8F1E5/0D5BCF?text=Zebro+Kids";
              }}
            />
          </div>

          {/* Hover Overlay with Details and Wishlist Icons */}
          <div className="similar-products-hover-overlay">
            <div className="similar-products-hover-icons">
              <button 
                className={`similar-products-details-btn ${viewedProducts.includes(product.id) ? 'clicked-hover-effect' : ''}`}
                onClick={(e) => handleDetailsClick(product.id, e)}
                title="View Details"
              >
                <InformationCircleIcon className="similar-products-details-icon" />
              </button>
              <button 
                className={`similar-products-wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                onClick={(e) => toggleWishlist(product.id, e)}
                title={wishlist.includes(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <HeartIcon className="similar-products-wishlist-icon" />
              </button>
            </div>
          </div>

          {/* Category and Age Badges */}
          <div className="similar-products-category-badge">
            {product.category}
          </div>

          <div className="similar-products-age-badge">
            {product.age}
          </div>

          {/* Shopping Cart Icon */}
          <div className="similar-products-icon">
            <a 
              href="#" 
              className="similar-products-iconBox"
              onClick={(e) => handleAddToCart(product, e)}
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

      {/* Card Content */}
      <div className="similar-products-content">
        <h3 className="similar-products-title-text">{product.title}</h3>
        
        <div className="similar-products-rating-price-container">
          {/* Rating */}
          <div className="similar-products-rating">
            <div className="similar-products-stars">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i}
                  style={{
                    width: '14px',
                    height: '14px',
                    fill: i < Math.floor(product.rating) ? '#F2BB13' : 'none',
                    stroke: i < product.rating ? '#F2BB13' : '#BFBFBF'
                  }}
                />
              ))}
            </div>
            <span className="similar-products-rating-text">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="similar-products-price">
            <span className="similar-products-current-price">{formatPrice(product.price)}</span>
            <span className="similar-products-original-price">{formatPrice(product.originalPrice)}</span>
            <span className="similar-products-discount">{product.discount}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="similar-products-section" ref={sectionRef}>
      <Container fluid>
        {/* Section Header */}
        <div className="similar-products-header" ref={titleRef}>
          <div className="similar-products-header-wrapper">
            <div className="similar-products-header-content">
              <div className="similar-products-header-left">
                <h2 className="similar-products-title">
                  Similar Products
                </h2>
                <p className="similar-products-subtitle">You might also like these products</p>
              </div>
              
              {/* Desktop View More Button */}
              {!isMobile && (
                <div className="similar-products-header-right">
                  <button className="similar-products-view-all-btn">
                    View All Similar Products
                  </button>
                </div>
              )}

              {/* Mobile Navigation in Header */}
              {isMobile && (
                <div className="similar-products-header-navigation">
                  <button 
                    className="similar-products-mobile-header-nav-btn"
                    onClick={() => swiperRef.current?.slidePrev()}
                  >
                    <ChevronLeftIcon className="similar-products-nav-icon" />
                  </button>
                  <button 
                    className="similar-products-mobile-header-nav-btn"
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <ChevronRightIcon className="similar-products-nav-icon" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Swiper Slider with Side Navigation */}
        <div className="similar-products-swiper-container">
          {/* Left Navigation Arrow - Desktop view के लिए */}
          {!isMobile && (
            <div 
              className="similar-products-swiper-button-prev-custom similar-products-side-nav similar-products-left-nav"
              ref={navigationPrevRef}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={4}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            breakpoints={swiperBreakpoints}
            loop={true}
            onSwiper={handleSwiperInit}
            onInit={handleSwiperInit}
            className="similar-products-swiper"
          >
            {similarProducts.map((product) => (
              <SwiperSlide key={product.id}>
                {renderCard(product)}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Navigation Arrow - Desktop view के लिए */}
          {!isMobile && (
            <div 
              className="similar-products-swiper-button-next-custom similar-products-side-nav similar-products-right-nav"
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
        <div className="similar-products-mobile-view-all-container">
          <button className="similar-products-mobile-view-all-btn">
            View All Similar Products
          </button>
        </div>
      </Container>
    </div>
  );
};

export default SimilarProducts;