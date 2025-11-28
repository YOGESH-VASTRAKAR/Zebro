import React from 'react';
import { 
  Offcanvas, 
  Button, 
  Row, 
  Col,
  Badge
} from 'react-bootstrap';
import { 
  XMarkIcon,
  ShoppingCartIcon,
  TrashIcon,
  FaceFrownIcon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './CartSidebar.css';

const CartSidebar = () => {
  const { 
    items, 
    totalAmount, 
    totalItems, 
    isCartOpen, 
    toggleCart, 
    updateItemQuantity, 
    removeItemFromCart,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  const handleRemoveItem = (productId) => {
    removeItemFromCart(productId);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleViewCart = () => {
    toggleCart(); // Close sidebar first
    navigate('/cart'); // Redirect to cart page
  };

  const handleCheckout = () => {
    toggleCart(); // Close sidebar first
    navigate('/checkout'); // Redirect to checkout page
  };

  return (
    <>
      <Offcanvas 
        show={isCartOpen} 
        onHide={toggleCart} 
        placement="end"
        className="cart-sidebar"
      >
        <Offcanvas.Header className="cart-sidebar-header">
          <div className="cart-sidebar-header-content">
            <div className="cart-sidebar-title">
              <ShoppingCartIcon className="cart-sidebar-title-icon" />
              <h4>Shopping Cart</h4>
              {totalItems > 0 && (
                <Badge bg="primary" className="cart-sidebar-count-badge">
                  {totalItems}
                </Badge>
              )}
            </div>
            <Button 
              variant="link" 
              className="cart-sidebar-close-btn"
              onClick={toggleCart}
            >
              <XMarkIcon />
            </Button>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body className="cart-sidebar-body">
          {items.length === 0 ? (
            // Empty Cart State
            <div className="cart-sidebar-empty-cart">
              <div className="cart-sidebar-empty-cart-icon">
                <FaceFrownIcon />
              </div>
              <h5>Your cart is empty</h5>
              <p>Add some amazing products to get started!</p>
            </div>
          ) : (
            // Cart with Items
            <div className="cart-sidebar-with-items">
              {/* Cart Items List */}
              <div className="cart-sidebar-items">
                {items.map(item => (
                  <div key={item.id} className="cart-sidebar-item">
                    <Row className="align-items-center">
                      <Col xs={4} sm={3}>
                        <div className="cart-sidebar-item-image">
                          <img 
                            src={item.image || `/images/product${item.id}.jpg`} 
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80x80/f5f5f5/666666?text=Product';
                            }}
                          />
                        </div>
                      </Col>
                      <Col xs={6} sm={7}>
                        <div className="cart-sidebar-item-details">
                          <h6 className="cart-sidebar-item-name">{item.name}</h6>
                          <div className="cart-sidebar-item-meta">
                            <p className="cart-sidebar-item-price">{formatPrice(item.price)}</p>
                            <p className="cart-sidebar-item-quantity">Quantity: {item.quantity}</p>
                            <p className="cart-sidebar-item-total">
                              Total: {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xs={2} sm={2}>
                        <div className="cart-sidebar-item-actions">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="cart-sidebar-remove-btn"
                            onClick={() => handleRemoveItem(item.id)}
                            title="Remove item"
                          >
                            <TrashIcon className="cart-sidebar-btn-icon" />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>

              {/* Bottom Action Buttons - Side by Side */}
              <div className="cart-sidebar-bottom-actions">
                <Button 
                  variant="outline-primary" 
                  className="cart-sidebar-view-cart-btn"
                  onClick={handleViewCart}
                >
                  <ShoppingCartIcon className="cart-sidebar-btn-icon" />
                  VIEW CART
                </Button>
                
                <Button 
                  variant="primary" 
                  className="cart-sidebar-checkout-btn"
                  onClick={handleCheckout}
                >
                  CHECKOUT NOW
                </Button>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CartSidebar;