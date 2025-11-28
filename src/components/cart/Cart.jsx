import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  HomeIcon,
  ChevronRightIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/solid';
import './Cart.css';
import CartDetails from './CartDetails';

const Cart = () => {
  // Calculate cart stats based on actual cart items from CartDetails
  const calculateCartStats = () => {
    const cartItems = [
      {
        id: 1,
        name: "Educational Programming Robot",
        category: "STEM Toy",
        originalPrice: 1599.00,
        discountedPrice: 799.00,
        quantity: 2,
        maxAllowed: 5,
        image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300"
      },
      {
        id: 2,
        name: "Building Blocks Creative Set",
        category: "Construction Toy",
        originalPrice: 2499.00,
        discountedPrice: 1899.00,
        quantity: 1,
        maxAllowed: 3,
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300"
      }
    ];

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = cartItems.reduce((total, item) => 
      total + (item.discountedPrice * item.quantity), 0
    );

    return {
      itemCount: cartItems.length,
      totalQuantity: totalQuantity,
      totalAmount: `₹ ${totalAmount.toLocaleString('en-IN')}`
    };
  };

  const cartStats = calculateCartStats();

  return (
    <div className="cart-section">
      {/* Cart Banner Section */}
      <div className="cart-banner-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Side - Cart Title */}
            <Col lg={6} md={12} className="cart-title-col">
              <div className="cart-title-content">
                <h1 className="cart-main-title">
                  <span className="cart-title-text">
                    <span className="cart-title-word cart-title-word-1">Shopping</span>
                    {' '}
                    <span className="cart-title-word cart-title-word-2">Cart</span>
                  </span>
                </h1>
                <div className="cart-breadcrumb">
                  <a href="/" className="cart-breadcrumb-link">
                    <HomeIcon className="cart-breadcrumb-icon" />
                    <span className="breadcrumb-text">Home</span>
                  </a>
                  <ChevronRightIcon className="cart-breadcrumb-separator" />
                  <a href="/products" className="cart-breadcrumb-link">
                    Products
                  </a>
                  <ChevronRightIcon className="cart-breadcrumb-separator" />
                  <span className="cart-breadcrumb-current">
                    Shopping Cart
                  </span>
                </div>
              </div>
            </Col>
            
            {/* Right Side - Cart Stats */}
            <Col lg={6} md={12} className="cart-stats-col">
              <div className="cart-stats-card">
                <div className="cart-stats-icon">
                  <ShoppingBagIcon className="cart-stats-icon-svg" />
                </div>
                <div className="cart-stats-info">
                  <h3 className="cart-stats-count">
                    {cartStats.itemCount} {cartStats.itemCount === 1 ? 'Item' : 'Items'}
                  </h3>
                  <p className="cart-stats-text">
                    {cartStats.totalQuantity} {cartStats.totalQuantity === 1 ? 'Product' : 'Products'} • {cartStats.totalAmount}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Rest of the cart content will go here */}     
        <CartDetails />
    </div>
  );
};

export default Cart;