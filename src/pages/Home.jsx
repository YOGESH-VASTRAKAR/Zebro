import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParallaxSlider from '../components/ParallaxSlider';
import AllCategories from '../components/AllCategories';
import TopDeals from '../components/TopDeals';
import LatestOffers from '../components/LatestOffers';
import BestSellerToys from '../components/BestSellerToys';
import BestSellerGifting from '../components/BestSellerGifting';
import BestSellerStationary from '../components/BestSellerStationary';
import Offers from '../components/Offers';
import WhyChooseUs from '../components/WhyChooseUs';

// GSAP ScrollTrigger register karein
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Home = () => {
  useEffect(() => {
    // Section animations
    const sections = gsap.utils.toArray('.home-section');
    
    sections.forEach(section => {
      gsap.fromTo(section, 
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section with Parallax Slider */}
      <section className="hero-section">
        <ParallaxSlider />
      </section>

      {/* All Categories Section */}
      <section className="categories-section home-section">
        <AllCategories />
      </section>

      {/* Top Deals Section */}
      <section className="deals-section home-section">
        <TopDeals />
      </section>

      {/* Latest Offers Section */}
      <section className="offers-section home-section">
        <LatestOffers />
      </section>

      {/* Best Seller Sections */}
      <section className="best-sellers-section home-section">
        <BestSellerToys />
        <BestSellerGifting />
        <BestSellerStationary />
      </section>

      {/* Special Offers Section */}
      <section className="special-offers-section home-section">
        <Offers />
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section home-section">
        <WhyChooseUs />
      </section>
    </div>
  );
};

export default Home;