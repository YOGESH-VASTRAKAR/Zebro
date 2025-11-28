import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import './FAQ.css';

const FAQ = ({ onBack }) => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const faqItems = [
    {
      question: "What age group are your toys suitable for?",
      answer: "Our toys are carefully designed for children aged 0-12 years. We have specific categories for different age groups: 0-2 years (sensory toys), 3-5 years (educational toys), 6-8 years (creative toys), and 9-12 years (STEM learning kits). Each product page clearly indicates the recommended age range."
    },
    {
      question: "Are Zebro Kids toys safe and non-toxic?",
      answer: "Absolutely! All Zebro Kids toys are made from 100% child-safe, non-toxic materials that are BPA-free and phthalate-free. We comply with international safety standards (ASTM F963, EN71) and each product undergoes rigorous safety testing before reaching your little ones."
    },
    {
      question: "What is your delivery time and shipping policy?",
      answer: "We offer free shipping on orders above ₹999. Standard delivery takes 3-5 business days within metro cities and 5-7 days for other locations. Express delivery (1-2 days) is available at an additional charge. You'll receive tracking information once your order is shipped."
    },
    {
      question: "Can I return or exchange a product?",
      answer: "Yes, we offer a 7-day easy return policy. If your child doesn't connect with the toy or there's any manufacturing defect, you can return it in original packaging. Personalized items and opened educational kits cannot be returned for hygiene reasons."
    },
    {
      question: "Do you offer wholesale or bulk orders for schools?",
      answer: "Certainly! We have special educational packages for schools, preschools, and daycare centers. Contact our business team at schools@zebrokids.com for bulk pricing, custom requirements, and educational institution discounts."
    },
    {
      question: "How do I clean and maintain the toys?",
      answer: "Most of our plastic toys can be wiped with a damp cloth and mild soap. Fabric toys are machine washable (check care labels). Wooden toys should be wiped dry. Avoid submerging electronic toys in water. Detailed cleaning instructions are provided with each product."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-content-section">
        <div className="faq-header">
          <h1 className="faq-heading">FAQ</h1>
          <button className="faq-back-button" onClick={onBack}>
            <ChevronLeftIcon className="faq-back-icon" />
            Back
          </button>
        </div>
        <div className="faq-content-scrollable">
          <div className="faq-container">
            <div className="faq-content">
              <div className="faq-accordion">
                {faqItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${openAccordion === index ? 'faq-active' : ''}`}
                  >
                    <div 
                      className="faq-question" 
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="faq-question-text">{item.question}</span>
                      <span className="faq-icon">
                        {openAccordion === index ? (
                          <ChevronUpIcon className="faq-accordion-icon" />
                        ) : (
                          <ChevronDownIcon className="faq-accordion-icon" />
                        )}
                      </span>
                    </div>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;