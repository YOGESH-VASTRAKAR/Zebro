import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { gsap } from 'gsap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './ParallaxSlider.css';

const ParallaxSlider = () => {
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide data with image paths
  const slides = [
    { id: 1, image: '/slider1.jpg', alt: 'Kids Toys Collection' },
    { id: 2, image: '/slider2.jpg', alt: 'Educational Games' },
    { id: 3, image: '/slider3.jpg', alt: 'Fun Activities' },
    { id: 4, image: '/slider4.jpg', alt: 'Creative Play' },
    { id: 5, image: '/slider5.jpg', alt: 'Learning Materials' },
    { id: 6, image: '/slider6.jpg', alt: 'Kids Accessories' }
  ];

  // Add to refs array
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  // Initialize GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for all slides
      slidesRef.current.forEach((slide, index) => {
        if (slide) {
          gsap.set(slide, { 
            opacity: index === 0 ? 1 : 0,
            zIndex: index === 0 ? 10 : 1
          });
        }
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  // Smooth slide change animation
  const goToSlide = (index) => {
    if (index === currentSlide) return;
    
    const nextIndex = (index + slides.length) % slides.length;
    const currentSlideEl = slidesRef.current[currentSlide];
    const nextSlideEl = slidesRef.current[nextIndex];
    
    if (!currentSlideEl || !nextSlideEl) return;

    // Set z-index for proper stacking
    gsap.set(nextSlideEl, { zIndex: 20 });
    gsap.set(currentSlideEl, { zIndex: 15 });

    // Smooth crossfade transition
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(nextIndex);
        // Reset z-index after transition
        gsap.set(currentSlideEl, { zIndex: 1 });
        gsap.set(nextSlideEl, { zIndex: 10 });
      }
    });

    // Crossfade animation with overlap
    tl.to(currentSlideEl, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    })
    .to(nextSlideEl, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.7"); // Overlap for smooth transition
  };

  // Next slide
  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  // Previous slide  
  const prevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  // Auto play with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="parallax-slider-parallax-slider-section" ref={sliderRef}>
      <div className="parallax-slider-parallax-slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="parallax-slider-parallax-slide"
            ref={el => addToRefs(el, slidesRef)}
          >
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="parallax-slider-slide-image"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>
        ))}

        {/* Navigation Arrows - Bottom Right */}
        <div className="parallax-slider-slider-nav-arrows-bottom">
          <button className="parallax-slider-nav-arrow parallax-slider-prev-arrow" onClick={prevSlide} aria-label="Previous slide">
            <FaArrowLeft />
          </button>
          <button className="parallax-slider-nav-arrow parallax-slider-next-arrow" onClick={nextSlide} aria-label="Next slide">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSlider;