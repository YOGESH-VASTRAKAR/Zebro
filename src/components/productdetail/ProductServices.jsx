import React from 'react';
import { Container } from 'react-bootstrap';
import { 
  TruckIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import './ProductServices.css';

const ProductServices = () => {
  const services = [
    {
      icon: TruckIcon,
      title: "Next Day Shipping",
      description: "All orders are dispatched a day of the order date subjected to availability of our courier partners.",
      color: "#60c5a6"
    },
    {
      icon: GlobeAltIcon,
      title: "Shipping All Over India",
      description: "We ship all over India through our courier partners. Shipping Charges applicable.",
      color: "#FCBA35"
    }
  ];

  return (
    <Container className="product-services-section">
      <ul className="product-services-list">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <li key={index} style={{ '--product-services-accent-color': service.color }}>
              <div className="product-services-icon">
                <IconComponent />
              </div>
              <div className="product-services-content">
                <div className="product-services-title">{service.title}</div>
                <div className="product-services-descr">{service.description}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default ProductServices;