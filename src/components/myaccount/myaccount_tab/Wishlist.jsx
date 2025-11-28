import React from 'react';
import { 
  StarIcon,
  ShoppingCartIcon,
  XMarkIcon,
  HeartIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid 
} from '@heroicons/react/24/solid';
import './Wishlist.css';

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Educational Robot Toy",
      category: "Robotics",
      price: "₹1,299.00",
      originalPrice: "₹1,599.00",
      discount: "19% off",
      image: "RC Car.jpg",
      inStock: true,
      rating: 4.5,
      reviews: 128,
      isLiked: true
    },
    {
      id: 2,
      name: "Building Blocks Set",
      category: "Construction",
      price: "₹2,499.00",
      originalPrice: "₹3,199.00",
      discount: "22% off",
      image: "Building Blocks.jpg",
      inStock: true,
      rating: 4.8,
      reviews: 89,
      isLiked: true
    },
    {
      id: 3,
      name: "Art & Craft Kit",
      category: "Creative",
      price: "₹899.00",
      originalPrice: "₹1,199.00",
      discount: "25% off",
      image: "Art Kit.jpg",
      inStock: false,
      rating: 4.3,
      reviews: 204,
      isLiked: true
    }
  ];

  const handleRemoveFromWishlist = (itemId) => {
    console.log('Removing item:', itemId);
    // Add your remove logic here
  };

  const handleAddToCart = (item) => {
    if (item.inStock) {
      console.log('Adding to cart:', item.id);
      // Add your cart logic here
    }
  };

  const handleToggleLike = (itemId) => {
    console.log('Toggling like for:', itemId);
    // Add your like/unlike logic here
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-content-section">
        <h3 className="wishlist-content-title">Wishlist</h3>
        <div className="wishlist-content-scrollable">
          <div className="wishlist-container">
            <div className="wishlist-header">
              <div className="wishlist-header-content">
                <HeartIconSolid className="wishlist-header-icon" />
                <span className="wishlist-items-count">{wishlistItems.length} items in wishlist</span>
              </div>
            </div>
            
            <div className="wishlist-items-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  {/* Like Button - Top Right */}
                  <button 
                    className="wishlist-like-btn"
                    onClick={() => handleToggleLike(item.id)}
                  >
                    {item.isLiked ? (
                      <HeartIconSolid className="wishlist-like-icon wishlist-like-icon-filled" />
                    ) : (
                      <HeartIcon className="wishlist-like-icon" />
                    )}
                  </button>

                  {/* Image Section */}
                  <div className="wishlist-item-image-section">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="wishlist-product-image"
                    />
                    {!item.inStock && (
                      <div className="wishlist-out-of-stock-badge">
                        <ArchiveBoxIcon className="wishlist-stock-icon" />
                        <span>Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details Section */}
                  <div className="wishlist-item-details-section">
                    <h4 className="wishlist-product-category">{item.category}</h4>
                    <h3 className="wishlist-product-name">{item.name}</h3>
                    
                    <div className="wishlist-product-rating">
                      <div className="wishlist-stars">
                        {[...Array(5)].map((_, index) => (
                          index < Math.floor(item.rating) ? (
                            <StarIconSolid key={index} className="wishlist-star-icon wishlist-star-icon-filled" />
                          ) : (
                            <StarIcon key={index} className="wishlist-star-icon" />
                          )
                        ))}
                      </div>
                      <span className="wishlist-rating-text">({item.reviews} reviews)</span>
                    </div>
                    
                    <div className="wishlist-price-section">
                      <span className="wishlist-current-price">{item.price}</span>
                      <span className="wishlist-original-price">{item.originalPrice}</span>
                      <span className="wishlist-discount-badge">{item.discount}</span>
                    </div>
                  </div>
                  
                  {/* Actions Section */}
                  <div className="wishlist-item-actions-section">
                    <div className="wishlist-action-buttons">
                      <button 
                        className={`wishlist-add-to-cart-btn ${!item.inStock ? 'wishlist-disabled' : ''}`}
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                      >
                        <ShoppingCartIcon className="wishlist-cart-icon" />
                        {item.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                      </button>
                      <button 
                        className="wishlist-remove-btn"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <XMarkIcon className="wishlist-remove-icon" />
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {wishlistItems.length === 0 && (
              <div className="wishlist-empty-state">
                <HeartIcon className="wishlist-empty-icon" />
                <p className="wishlist-empty-text">Your wishlist is empty</p>
                <button className="wishlist-continue-shopping-btn">
                  <ShoppingCartIcon className="wishlist-continue-shopping-icon" />
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;