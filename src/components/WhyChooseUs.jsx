import React from 'react';
import { Container } from 'react-bootstrap';
import { 
  TruckIcon,
  ArrowPathIcon,
  ShoppingCartIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      icon: ShoppingCartIcon,
      title: "Easy to Shop",
      description: "Simple and secure shopping experience",
      color: "#FCBA35"
    },
    {
      icon: TruckIcon,
      title: "Free Shipping",
      description: "Free shipping on all orders above ₹499",
      color: "#60c5a6"
    },
    {
      icon: ArrowPathIcon,
      title: "Easy Return",
      description: "30 days hassle free return policy",
      color: "#f20071"
    },
    {
      icon: PhoneIcon,
      title: "24/7 Support",
      description: "Round the clock customer support",
      color: "#DAE438"
    }
  ];

  return (
    <Container className="why-choose-us-section">
      <ul className="why-choose-us-features-list">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <li key={index} style={{ '--why-choose-us-accent-color': feature.color }}>
              <div className="why-choose-us-icon">
                <IconComponent />
              </div>
              <div className="why-choose-us-title">{feature.title}</div>
              <div className="why-choose-us-descr">{feature.description}</div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default WhyChooseUs;