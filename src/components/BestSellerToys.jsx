import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
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

  const toys = [
    {
      id: 1,
      image: "bg.jpg",
      title: "Educational Robot Toy",
      price: "₹1,299",
      originalPrice: "₹2,499",
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
      price: "₹899",
      originalPrice: "₹1,799",
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
      price: "₹1,599",
      originalPrice: "₹2,999",
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
      price: "₹2,499",
      originalPrice: "₹4,999",
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
      price: "₹699",
      originalPrice: "₹1,399",
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
      price: "₹1,199",
      originalPrice: "₹2,399",
      discount: "50% OFF",
      rating: 4.7,
      reviews: 64,
      category: "Educational",
      age: "8-14 Years"
    }
  ];

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
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
        { opacity: 0, scale: 0.8 },
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

      gsap.fromTo('.bestseller-card',
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
            trigger: '.bestseller-swiper-container',
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

                      <div className="bestseller-icon">
                        <a href="#" className="bestseller-iconBox"> 
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

                      <div className="bestseller-price">
                        <span className="bestseller-current-price">{toy.price}</span>
                        <span className="bestseller-original-price">{toy.originalPrice}</span>
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