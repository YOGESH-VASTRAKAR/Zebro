import React, { useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  PuzzlePieceIcon,
  GiftIcon,
  AcademicCapIcon,
  BookOpenIcon,
  PaintBrushIcon,
  CubeIcon,
  HeartIcon,
  RocketLaunchIcon,
  MusicalNoteIcon,
  TruckIcon,
  StarIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

import './AllCategories.css';

const AllCategories = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      icon: <PuzzlePieceIcon />,
      title: "Toys & Games"
    },
    {
      id: 2,
      icon: <GiftIcon />,
      title: "Gifting"
    },
    {
      id: 3,
      icon: <AcademicCapIcon />,
      title: "Stationery"
    },
    {
      id: 4,
      icon: <BookOpenIcon />,
      title: "Books & Learning"
    },
    {
      id: 5,
      icon: <PaintBrushIcon />,
      title: "Art & Craft"
    },
    {
      id: 6,
      icon: <CubeIcon />,
      title: "Building Blocks"
    },
    {
      id: 7,
      icon: <HeartIcon />,
      title: "Soft Toys"
    },
    {
      id: 8,
      icon: <RocketLaunchIcon />,
      title: "Science Kits"
    },
    {
      id: 9,
      icon: <MusicalNoteIcon />,
      title: "Musical Toys"
    },
    {
      id: 10,
      icon: <TruckIcon />,
      title: "Remote Control"
    },
    {
      id: 11,
      icon: <StarIcon />,
      title: "Puzzle Games"
    },
    {
      id: 12,
      icon: <BuildingStorefrontIcon />,
      title: "Role Play"
    }
  ];

  const handleCategoryClick = (categoryTitle) => {
    // Convert category title to URL-friendly format
    const categorySlug = categoryTitle.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    navigate(`/products?category=${categorySlug}`);
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
            end: "bottom 20%",
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

      // Card stagger animation - REMOVED (commented out)
      /*
      gsap.fromTo('.categories-category-card',
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
            trigger: '.categories-categories-grid',
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
      */

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="categories-wrapper categories-all-categories-section" ref={sectionRef}>
      <Container fluid>
        {/* Section Header with Colorful Text and View More Button */}
        <div className="categories-categories-header" ref={titleRef}>
          <div className="categories-header-content">
            <div className="categories-header-left">
              <h2 className="categories-categories-title">
                <span className="categories-title-word categories-title-word-1">Shop</span>
                <span className="categories-title-word categories-title-word-2">By</span>
                <span className="categories-title-word categories-title-word-3">Categories</span>
              </h2>
              <p className="categories-categories-subtitle">Explore our wide range of products for kids</p>
            </div>
            
            {/* View More Button - Top Right (Desktop only) */}
            <div className="categories-header-right">
              <button className="categories-view-all-btn">
                View All Categories
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="categories-categories-grid-container">
          <Row className="categories-categories-grid">
            {categories.map((category, index) => (
              <Col 
                key={category.id} 
                xs={4}  
                sm={3}  
                md={3}  
                lg={2} 
                xl={2} 
                className="categories-category-col"
              >
                <div 
                  className={`categories-category-item categories-category-item-${(index % 6) + 1}`}
                  onClick={() => handleCategoryClick(category.title)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="categories-category-card">
                    <div className="categories-icon">{category.icon}</div>
                  </div>
                  <div className="categories-category-text-container">
                    <div className="categories-title">{category.title}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Mobile View All Button */}
        <div className="categories-mobile-view-all-container">
          <button className="categories-mobile-view-all-btn">
            View All Categories
          </button>
        </div>
      </Container>
    </div>
  );
};

export default AllCategories;