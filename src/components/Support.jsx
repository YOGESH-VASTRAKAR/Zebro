import React, { useState } from 'react';
import { 
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/solid';
import FAQ from './FAQ';
import './Support.css';
import Contact from './Contact';
import BusinessInquiries from './BusinessInquiries';

const Support = () => {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'faq', 'contact', 'business'

  const supportOptions = [
    {
      id: 'faqs',
      icon: QuestionMarkCircleIcon,
      title: 'FAQs',
      color: '#0662aa',
      link: '/faqs'
    },
    {
      id: 'contact',
      icon: ChatBubbleLeftRightIcon,
      title: 'Contact us',
      color: '#37aa50',
      link: '/contact'
    },
    {
      id: 'business',
      icon: BuildingStorefrontIcon,
      title: 'Business Inquiries',
      color: '#e65c52',
      link: '/business-inquiries'
    }
  ];

  const handleSupportClick = (optionId) => {
    console.log('Selected support option:', optionId);
    setCurrentView(optionId);
  };

  const handleBackClick = () => {
    setCurrentView('main');
  };

  if (currentView === 'faqs') {
    return <FAQ onBack={handleBackClick} />;
  }
   if (currentView === 'contact') {
    return <Contact onBack={handleBackClick} />;
  }
  if (currentView === 'business') {
      return <BusinessInquiries onBack={handleBackClick} />;
  }
  return (
    <div className="support-page">
      <div className="support-content-section">
        <h3 className="support-content-title">Support Centre</h3>
        <div className="support-content-scrollable">
          <div className="support-container">
            <div className="support-options-vertical">
              {supportOptions.map((option) => {
                const IconComponent = option.icon;
                
                return (
                  <div 
                    key={option.id}
                    className="support-option-item"
                    style={{ '--accent-color': option.color }}
                    onClick={() => handleSupportClick(option.id)}
                  >
                    <div className="support-item-left">
                      <div className="support-icon-container">
                        <IconComponent className="support-icon" />
                      </div>
                    </div>
                    
                    <div className="support-item-right">
                      <h4 className="support-option-title">{option.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;