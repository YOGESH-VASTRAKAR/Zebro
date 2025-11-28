import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCartIcon,
  InformationCircleIcon,
  HeartIcon,
  StarIcon
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

const BestSellerToys = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);
  const navigate = useNavigate();

  // Use Cart Context
  const { addItemToCart, toggleCart } = useCart();

  const toys = [
    {
      id: 1,
      image: "bg.jpg",
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
      image: "bg.jpg",
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
      image: "bg.jpg",
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
      image: "bg.jpg",
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
      image: "bg.jpg",
      title: "Science Experiment Kit",
      price: 1199,
      originalPrice: 2399,
      discount: "50% OFF",
      rating: 4.7,
      reviews: 64,
      category: "Educational",
      age: "8-14 Years"
    }
  ];

  // Add to Cart Function
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add product to cart
    addItemToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    // Open cart sidebar
    toggleCart();
    
    // Optional: Show success feedback
    console.log(`Added ${product.title} to cart`);
  };

  // View Details Function
  const handleDetailsClick = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // ProductDetails page par navigate karein with product ID
    navigate(`/productdetails?id=${productId}`);
    
    // Add to viewed products if not already there
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

  // GSAP Animations - ONLY HEADING ANIMATION RETAINED
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation - RETAINED
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

      // Title animation - RETAINED
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

      // Card stagger animation - REMOVED
      // Cards will load instantly without animation

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

  const swiperBreakpoints = {
    320: { slidesPerView: 1, spaceBetween: 20 },
    480: { slidesPerView: 1, spaceBetween: 20 },
    576: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 25 },
    992: { slidesPerView: 3, spaceBetween: 30 },
    1200: { slidesPerView: 4, spaceBetween: 30 }
  };

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    setSwiperReady(true);
  };

  return (
    <div className="bestseller-section" ref={sectionRef}>
      <Container fluid>
        {/* Section Header with Colorful Text and View More Button */}
        <div className="bestseller-header" ref={titleRef}>
          <div className="bestseller-header-content">
            <div className="bestseller-header-left">
              <h2 className="bestseller-title">
                <span className="bestseller-title-word bestseller-title-word-1">Best</span>
                <span className="bestseller-title-word bestseller-title-word-2">Seller</span>
                <span className="bestseller-title-word bestseller-title-word-3">Toys</span>
              </h2>
              <p className="bestseller-subtitle">Most popular toys loved by kids</p>
            </div>
            
            {/* View More Button - Top Right */}
            <div className="bestseller-header-right">
              <button className="bestseller-view-all-btn">
                View All Toys
              </button>
            </div>
          </div>
        </div>

        {/* Swiper Slider with Side Navigation */}
        <div className="bestseller-swiper-container">
          {/* Left Navigation Arrow */}
          <div 
            className="bestseller-swiper-button-prev-custom bestseller-side-nav bestseller-left-nav"
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
            className="bestseller-swiper"
          >
            {toys.map((toy) => (
              <SwiperSlide key={toy.id}>
                <div className="bestseller-card">
                  <div className="bestseller-card-inner" style={{"--clr": "#fff"}}>
                    <div className="bestseller-box">
                      <div className="bestseller-imgBox">
                        <img 
                          src={toy.image}
                          className="bestseller-image"
                          alt={toy.title}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x200/F8F1E5/0D5BCF?text=Zebro+Kids";
                          }}
                        />
                      </div>

                      {/* Hover Overlay with Details and Wishlist Icons */}
                      <div className="bestseller-hover-overlay">
                        <div className="bestseller-hover-icons">
                          <button 
                            className={`bestseller-details-btn ${viewedProducts.includes(toy.id) ? 'active' : ''}`}
                            onClick={(e) => handleDetailsClick(toy.id, e)}
                            title="View Details"
                          >
                            <InformationCircleIcon className="bestseller-details-icon" />
                          </button>
                          <button 
                            className={`bestseller-wishlist-btn ${wishlist.includes(toy.id) ? 'active' : ''}`}
                            onClick={(e) => toggleWishlist(toy.id, e)}
                            title={wishlist.includes(toy.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                          >
                            <HeartIcon className="bestseller-wishlist-icon" />
                          </button>
                        </div>
                      </div>

                      <div className="bestseller-category-badge">
                        {toy.category}
                      </div>

                      <div className="bestseller-age-badge">
                        {toy.age}
                      </div>

                      {/* Shopping Cart Icon */}
                      <div className="bestseller-icon">
                        <a 
                          href="#" 
                          className="bestseller-iconBox"
                          onClick={(e) => handleAddToCart(toy, e)}
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
                    <h3 className="bestseller-title-text">{toy.title}</h3>
                    
                    <div className="bestseller-rating-price-container">
                      <div className="bestseller-rating">
                        <div className="bestseller-stars">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              style={{
                                width: '14px',
                                height: '14px',
                                fill: i < Math.floor(toy.rating) ? '#F2BB13' : 'none',
                                stroke: i < toy.rating ? '#F2BB13' : '#BFBFBF'
                              }}
                            />
                          ))}
                        </div>
                        <span className="bestseller-rating-text">({toy.reviews})</span>
                      </div>

                      {/* Price display */}
                      <div className="bestseller-price">
                        <span className="bestseller-current-price">{formatPrice(toy.price)}</span>
                        <span className="bestseller-original-price">{formatPrice(toy.originalPrice)}</span>
                        <span className="bestseller-discount">{toy.discount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Navigation Arrow */}
          <div 
            className="bestseller-swiper-button-next-custom bestseller-side-nav bestseller-right-nav"
            ref={navigationNextRef}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Mobile View All Button - Cards ke niche */}
        <div className="bestseller-mobile-view-all-container">
          <button className="bestseller-mobile-view-all-btn">
            View All Toys
          </button>
        </div>
      </Container>
    </div>
  );
};

export default BestSellerToys;