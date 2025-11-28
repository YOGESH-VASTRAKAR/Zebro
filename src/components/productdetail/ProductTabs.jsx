import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { 
  CheckBadgeIcon,
  StarIcon,
  PencilSquareIcon
} from '@heroicons/react/24/solid';
import './ProductTabs.css';
import AdditionalDetails from './product_tab/AdditionalDetails';
import CustomerReviews from './product_tab/CustomerReviews';
import AddReview from './product_tab/AddReview';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sample product details
  const productDetails = {
    specifications: [
      { label: 'Brand', value: 'TechKids' },
      { label: 'Material', value: 'High-Quality Plastic' },
      { label: 'Age Range', value: '3-8 Years' },
      { label: 'Battery Type', value: 'Rechargeable Li-ion' },
      { label: 'Battery Life', value: '4-6 Hours' },
      { label: 'Charging Time', value: '2 Hours' },
      { label: 'Product Dimensions', value: '15 x 10 x 8 cm' },
      { label: 'Weight', value: '450 grams' }
    ],
    features: [
      'Educational Programming Modes',
      'Voice Interaction',
      'LED Light Effects',
      'Obstacle Avoidance',
      'Mobile App Control',
      'Multiple Language Support',
      'Durable Construction',
      'Child-Safe Materials'
    ],
    included: [
      'Educational Robot x1',
      'USB Charging Cable x1',
      'Instruction Manual x1',
      'Sticker Sheet x1',
      'Remote Control x1'
    ]
  };

  // Sample reviews data
  const customerReviews = [
    {
      id: 1,
      user: 'Parent123',
      rating: 5,
      date: '2024-01-15',
      title: 'Amazing Educational Toy!',
      comment: 'My 5-year-old loves this robot! It teaches basic programming concepts in a fun way. The build quality is excellent and it has survived many drops.',
      verified: true
    },
    {
      id: 2,
      user: 'TechMom',
      rating: 4,
      date: '2024-01-10',
      title: 'Great for STEM Learning',
      comment: 'Good product for introducing kids to technology. The app is easy to use and the robot responds well. Battery life could be better though.',
      verified: true
    },
    {
      id: 3,
      user: 'TeacherPro',
      rating: 5,
      date: '2024-01-05',
      title: 'Perfect for Classroom Use',
      comment: 'I use this in my kindergarten class. The kids are engaged and learning problem-solving skills. Highly recommended for educational purposes.',
      verified: true
    }
  ];

  // Handle review submission
  const handleReviewSubmit = (reviewData) => {
    console.log('Review submitted:', reviewData);
    alert('Thank you for your review! It will be published after verification.');
  };

  // Tab items for horizontal navigation
  const tabItems = [
    {
      id: 'details',
      icon: CheckBadgeIcon,
      title: 'Additional Details',
      color: '#0662aa'
    },
    {
      id: 'reviews',
      icon: StarIcon,
      title: 'Customer Reviews',
      color: '#37aa50'
    },
    {
      id: 'add-review',
      icon: PencilSquareIcon,
      title: 'Add Review',
      color: '#e65c52'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <AdditionalDetails productDetails={productDetails} />;
      case 'reviews':
        return <CustomerReviews customerReviews={customerReviews} />;
      case 'add-review':
        return (
          <AddReview 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            onReviewSubmit={handleReviewSubmit}
          />
        );
      default:
        return <AdditionalDetails productDetails={productDetails} />;
    }
  };

  return (
    <div className="product-tabs-section">
      <Container>
        {/* Horizontal Tabs Navigation */}
        <div className="product-tabs-horizontal-nav">
          <div className="product-tabs-nav-container">
            {tabItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  className={`product-tabs-tab-btn ${isActive ? 'product-tabs-active' : ''}`}
                  style={{ '--product-tabs-accent-color': item.color }}
                  onClick={() => setActiveTab(item.id)}
                >
                  <div className="product-tabs-btn-icon">
                    <IconComponent className="product-tabs-btn-icon-svg" />
                  </div>
                  <span className="product-tabs-btn-text">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="product-tabs-content">
          {renderTabContent()}
        </div>
      </Container>
    </div>
  );
};

export default ProductTabs;