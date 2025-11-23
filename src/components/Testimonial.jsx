import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { StarIcon } from '@heroicons/react/24/solid';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonial.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  
  const testimonials = [
    {
      id: 1,
      name: "Alexander Miller",
      role: "Parent",
      rating: 5,
      text: "The educational toys from Zebro Kids have transformed my daughter's learning experience. She's more engaged and creative than ever before! The quality is exceptional.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Mother",
      rating: 5,
      text: "Amazing quality and fast delivery! The kids' clothing is durable and comfortable. My son loves his new outfits from Zebro Kids. Highly recommended!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Father",
      rating: 5,
      text: "The STEM learning kits are fantastic! My children are learning while having fun. The customer service is excellent and shipping was super fast.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Priya Sharma",
      role: "Mother of Two",
      rating: 5,
      text: "Best educational toys store in India! The products are safe, certified, and help in cognitive development. My kids absolutely love them!",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
      gsap.fromTo('.testimonial-testimonial-card',
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
            trigger: '.testimonial-testimonial-carousel',
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after manual interaction
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="testimonial-testimonial-star-rating">
        {[...Array(5)].map((_, index) => (
          <StarIcon 
            key={index}
            className={`testimonial-testimonial-star ${index < rating ? 'testimonial-filled' : ''}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="testimonial-zebro-testimonial-section" ref={sectionRef}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="testimonial-testimonial-wrapper">
              
              {/* Section Header with Colorful Text */}
              <div className="testimonial-testimonial-header text-center mb-5" ref={titleRef}>
                <h2 className="testimonial-testimonial-title">
                  <span className="testimonial-title-word testimonial-title-word-1">Happy</span>
                  <span className="testimonial-title-word testimonial-title-word-2">Parents</span>
                  <span className="testimonial-title-word testimonial-title-word-3">Feedback</span>
                </h2>
                <p className="testimonial-testimonial-subtitle">
                  Don't just take our word for it - hear what parents have to say!
                </p>
              </div>

              {/* Testimonial Carousel */}
              <div className="testimonial-testimonial-carousel">
                <div className="testimonial-carousel-container">
                  <div 
                    className="testimonial-carousel-track"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`
                    }}
                  >
                    {testimonials.map((testimonial, index) => (
                      <div key={testimonial.id} className="testimonial-carousel-slide">
                        <div className="testimonial-testimonial-card">
                          {/* Quote Icon */}
                          <div className="testimonial-quote-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="51" viewBox="0 0 64 51" fill="none">
                              <path d="M3.94088 50.6011V39.8819H10.0887C14.9228 39.8819 17.3399 37.4648 17.3399 32.6306V27.5863H14.6601C10.4565 27.5863 6.98851 26.3252 4.25615 23.803C1.41872 21.2809 0 18.0756 0 14.1873C0 9.98367 1.41872 6.56823 4.25615 3.94097C6.98851 1.31371 10.4565 8.01086e-05 14.6601 8.01086e-05C18.9688 8.01086e-05 22.4893 1.31371 25.2217 3.94097C27.954 6.67332 29.3202 10.2989 29.3202 14.8178V32.9459C29.3202 44.716 23.4351 50.6011 11.665 50.6011H3.94088ZM38.6207 50.6011V39.8819H44.7685C49.6026 39.8819 52.0197 37.4648 52.0197 32.6306V27.5863H49.3399C45.1363 27.5863 41.6683 26.3252 38.936 23.803C36.0985 21.2809 34.6798 18.0756 34.6798 14.1873C34.6798 9.98367 36.0985 6.56823 38.936 3.94097C41.6683 1.31371 45.1363 8.01086e-05 49.3399 8.01086e-05C53.6486 8.01086e-05 57.1691 1.31371 59.9015 3.94097C62.6338 6.67332 64 10.2989 64 14.8178V32.9459C64 44.716 58.1149 50.6011 46.3448 50.6011H38.6207Z" fill="#21AC94"/>
                            </svg>
                          </div>
                          
                          {/* Testimonial Content */}
                          <div className="testimonial-testimonial-content">
                            <p className="testimonial-testimonial-text">
                              "{testimonial.text}"
                            </p>
                            
                            {/* User Info */}
                            <div className="testimonial-testimonial-user">
                              <div className="testimonial-user-avatar-container">
                                <img 
                                  src={testimonial.image} 
                                  alt={testimonial.name}
                                  className="testimonial-user-avatar"
                                  onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face";
                                  }}
                                />
                              </div>
                              <div className="testimonial-user-details">
                                <h4 className="testimonial-user-name">{testimonial.name}</h4>
                                <p className="testimonial-user-role">{testimonial.role}</p>
                                <div className="testimonial-rating-display">
                                  <StarRating rating={testimonial.rating} />
                                  <span className="testimonial-rating-score">5.0</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="testimonial-carousel-controls">
                  <button 
                    className="testimonial-carousel-btn testimonial-prev-btn"
                    onClick={prevSlide}
                    aria-label="Previous testimonial"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {/* Dots Indicator */}
                  <div className="testimonial-carousel-dots">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`testimonial-dot ${index === currentSlide ? 'testimonial-active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className="testimonial-carousel-btn testimonial-next-btn"
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonial;