import React from 'react';
import { 
  Offcanvas, 
  Button, 
  Row, 
  Col,
  Badge,
  Container
} from 'react-bootstrap';
import { 
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
  TrashIcon,
  FaceFrownIcon
} from '@heroicons/react/24/outline';
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

  // Sample product data (in real app, this would come from your products)
  const sampleProducts = [
    {
      id: 1,
      name: "Educational Building Blocks",
      price: 1299,
      image: "/images/product1.jpg",
      category: "Building Blocks"
    },
    {
      id: 2,
      name: "Art & Craft Kit",
      price: 899,
      image: "/images/product2.jpg",
      category: "Art & Craft"
    },
    {
      id: 3,
      name: "Science Experiment Kit",
      price: 1599,
      image: "/images/product3.jpg",
      category: "Science Kits"
    }
  ];

  const handleAddSampleProduct = (product) => {
    updateItemQuantity(product.id, 1);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0) {
      updateItemQuantity(productId, newQuantity);
    }
  };

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

  return (
    <>
      <Offcanvas 
        show={isCartOpen} 
        onHide={toggleCart} 
        placement="end"
        className="cart-sidebar"
      >
        <Offcanvas.Header className="cart-sidebar-header">
          <div className="cart-header-content">
            <div className="cart-title">
              <ShoppingCartIcon className="cart-title-icon" />
              <h4>Shopping Cart</h4>
              {totalItems > 0 && (
                <Badge bg="primary" className="cart-count-badge">
                  {totalItems}
                </Badge>
              )}
            </div>
            <Button 
              variant="link" 
              className="cart-close-btn"
              onClick={toggleCart}
            >
              <XMarkIcon />
            </Button>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body className="cart-sidebar-body">
          {items.length === 0 ? (
            // Empty Cart State
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <FaceFrownIcon />
              </div>
              <h5>Your cart is empty</h5>
              <p>Add some amazing products to get started!</p>
              
              {/* Sample Products to Add */}
              <div className="sample-products">
                <h6>Quick Add:</h6>
                <div className="sample-products-grid">
                  {sampleProducts.map(product => (
                    <div key={product.id} className="sample-product-card">
                      <div className="sample-product-info">
                        <h6>{product.name}</h6>
                        <p className="sample-product-price">{formatPrice(product.price)}</p>
                        <p className="sample-product-category">{product.category}</p>
                      </div>
                      <Button
                        size="sm"
                        className="add-sample-btn"
                        onClick={() => handleAddSampleProduct(product)}
                      >
                        <PlusIcon className="btn-icon" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Cart with Items
            <div className="cart-with-items">
              {/* Cart Items List */}
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <div className="cart-item-image">
                          <img 
                            src={item.image || `/images/product${item.id}.jpg`} 
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80x80/f5f5f5/666666?text=Product';
                            }}
                          />
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="cart-item-details">
                          <h6 className="cart-item-name">{item.name}</h6>
                          <p className="cart-item-price">{formatPrice(item.price)}</p>
                        </div>
                      </Col>
                      <Col xs={3}>
                        <div className="cart-item-actions">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="remove-btn"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <TrashIcon className="btn-icon" />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    
                    <div className="quantity-controls">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="btn-icon" />
                      </Button>
                      
                      <span className="quantity-display">{item.quantity}</span>
                      
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <PlusIcon className="btn-icon" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>{totalAmount > 999 ? 'FREE' : formatPrice(99)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatPrice(totalAmount + (totalAmount > 999 ? 0 : 99))}</span>
                </div>

                {/* Action Buttons */}
                <div className="cart-actions">
                  <Button 
                    variant="outline-danger" 
                    className="clear-cart-btn"
                    onClick={clearCart}
                  >
                    <TrashIcon className="btn-icon" />
                    Clear Cart
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    className="checkout-btn"
                    onClick={() => {
                      // Handle checkout logic here
                      console.log('Proceed to checkout');
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>

                {/* Free Shipping Message */}
                {totalAmount < 999 && (
                  <div className="free-shipping-message">
                    <Badge bg="success" className="shipping-badge">
                      🚚 Add {formatPrice(999 - totalAmount)} more for FREE shipping!
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CartSidebar;