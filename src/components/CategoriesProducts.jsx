import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { 
  ShoppingCartIcon,
  InformationCircleIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/solid';
import CategoriesPagination from './CategoriesPagination';
import './CategoriesProducts.css';

const CategoriesProducts = ({ gridView, isMobile }) => {
  const [wishlist, setWishlist] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [localIsMobile, setLocalIsMobile] = useState(false);
  const productsGridRef = useRef(null);

  // Mobile detection with backup
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setLocalIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Use prop isMobile or local detection
  const actualIsMobile = isMobile !== undefined ? isMobile : localIsMobile;

  // Calculate products per page based on grid view and screen size
  const productsPerPage = useMemo(() => {
    if (actualIsMobile) {
      // Mobile view - only 2x2 and 1x1
      if (gridView === '1x1') return 4;
      if (gridView === '2x2') return 8;
      return 8; // default for mobile (2x2)
    } else {
      // Desktop view - only 4x4 and 3x3
      if (gridView === '4x4') return 12;
      if (gridView === '3x3') return 9;
      return 9; // default for desktop (3x3)
    }
  }, [gridView, actualIsMobile]);

  const products = [
    {
      id: 1,
      image: "RC Car.jpg",
      title: "Educational Robot Toy",
      price: "₹1,299",
      originalPrice: "₹2,499",
      discount: "48% OFF",
      rating: 4.5,
      reviews: 125,
    },
    {
      id: 2,
      image: "bg (4).jpg",
      title: "Building Blocks Set",
      price: "₹899",
      originalPrice: "₹1,799",
      discount: "50% OFF",
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      image: "bg (3).jpg",
      title: "Kids Story Books Pack",
      price: "₹499",
      originalPrice: "₹999",
      discount: "50% OFF",
      rating: 4.3,
      reviews: 67,
    },
    {
      id: 4,
      image: "bg.jpg",
      title: "Puzzle Game Collection",
      price: "₹699",
      originalPrice: "₹1,399",
      discount: "50% OFF",
      rating: 4.6,
      reviews: 42,
    },
    {
      id: 5,
      image: "Building Blocks.jpg",
      title: "Remote Control Car",
      price: "₹1,599",
      originalPrice: "₹2,999",
      discount: "47% OFF",
      rating: 4.4,
      reviews: 156,
    },
    {
      id: 6,
      image: "Art Kit.jpg",
      title: "Art & Craft Kit",
      price: "₹799",
      originalPrice: "₹1,599",
      discount: "50% OFF",
      rating: 4.7,
      reviews: 93,
    },
    {
      id: 7,
      image: "bg (4).jpg",
      title: "Science Experiment Kit",
      price: "₹1,199",
      originalPrice: "₹2,199",
      discount: "45% OFF",
      rating: 4.9,
      reviews: 78,
    },
    {
      id: 8,
      image: "bg (3).jpg",
      title: "Musical Toys Set",
      price: "₹599",
      originalPrice: "₹1,199",
      discount: "50% OFF",
      rating: 4.2,
      reviews: 54,
    },
    {
      id: 9,
      image: "RC Car.jpg",
      title: "Kids Tablet Educational",
      price: "₹2,499",
      originalPrice: "₹4,999",
      discount: "50% OFF",
      rating: 4.6,
      reviews: 203,
    },
    {
      id: 10,
      image: "Building Blocks.jpg",
      title: "Doll House Set",
      price: "₹1,899",
      originalPrice: "₹3,499",
      discount: "46% OFF",
      rating: 4.7,
      reviews: 89,
    },
    {
      id: 11,
      image: "Art Kit.jpg",
      title: "Kids Basketball Set",
      price: "₹1,299",
      originalPrice: "₹2,299",
      discount: "43% OFF",
      rating: 4.3,
      reviews: 67,
    },
    {
      id: 12,
      image: "bg.jpg",
      title: "Water Color Paint Set",
      price: "₹399",
      originalPrice: "₹799",
      discount: "50% OFF",
      rating: 4.5,
      reviews: 124,
    },
    {
      id: 13,
      image: "bg (4).jpg",
      title: "Kids Tricycle",
      price: "₹2,999",
      originalPrice: "₹4,999",
      discount: "40% OFF",
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 14,
      image: "bg (3).jpg",
      title: "Building Train Set",
      price: "₹1,499",
      originalPrice: "₹2,999",
      discount: "50% OFF",
      rating: 4.4,
      reviews: 78,
    },
    {
      id: 15,
      image: "RC Car.jpg",
      title: "Kids Smart Watch",
      price: "₹1,799",
      originalPrice: "₹3,199",
      discount: "44% OFF",
      rating: 4.2,
      reviews: 92,
    },
    {
      id: 16,
      image: "Building Blocks.jpg",
      title: "Play Doh Set",
      price: "₹599",
      originalPrice: "₹1,099",
      discount: "45% OFF",
      rating: 4.6,
      reviews: 145,
    }
  ];

  // Calculate pagination data
  const paginationData = useMemo(() => {
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

    return {
      totalProducts,
      totalPages,
      currentProducts
    };
  }, [currentPage, productsPerPage]);

  const toggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handleDetailsClick = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to viewed products if not already there
    if (!viewedProducts.includes(productId)) {
      setViewedProducts([...viewedProducts, productId]);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    // Smooth scroll to products grid with better timing
    setTimeout(() => {
      if (productsGridRef.current) {
        const gridTop = productsGridRef.current.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: gridTop - 100,
          behavior: 'smooth'
        });
      } else {
        // Fallback to top scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  // Determine grid class based on view and screen size
  const getGridClass = () => {
    if (actualIsMobile) {
      // Mobile pe sirf 2x2 aur 1x1 allow karo
      if (gridView === '1x1') return 'categories-products-grid-1x1';
      if (gridView === '2x2') return 'categories-products-grid-2x2';
      // Agar koi aur view hai mobile pe, to force 2x2
      return 'categories-products-grid-2x2';
    } else {
      // Desktop pe sirf 4x4 aur 3x3 allow karo
      if (gridView === '4x4') return 'categories-products-grid-4x4';
      if (gridView === '3x3') return 'categories-products-grid-3x3';
      // Agar koi aur view hai desktop pe, to force 3x3
      return 'categories-products-grid-3x3';
    }
  };

  return (
    <div className="categories-products-page">
      <div className="categories-products-content-section">
        <div className="categories-products-section">
          <Container className="categories-products-container">
            {/* Products Grid - Dynamic based on gridView and screen size */}
            <div 
              ref={productsGridRef}
              className={`categories-products-grid ${getGridClass()}`}
            >
              {paginationData.currentProducts.map((product) => (
                <div key={product.id} className="categories-products-deal-card">
                  <div className="categories-products-card-inner" style={{"--clr": "#fff"}}>
                    <div className="categories-products-box">
                      {/* Product Image */}
                      <div className="categories-products-imgBox">
                        <img 
                          src={product.image}
                          className="categories-products-deal-image"
                          alt={product.title}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x200/F8F1E5/0D5BCF?text=Zebro+Kids";
                          }}
                        />
                      </div>

                      {/* Hover Overlay with Details and Wishlist Icons */}
                      <div className="categories-products-hover-overlay">
                        <div className="categories-products-hover-icons">
                          <button 
                            className={`categories-products-details-btn ${viewedProducts.includes(product.id) ? 'active' : ''}`}
                            onClick={(e) => handleDetailsClick(product.id, e)}
                            title="View Details"
                          >
                            <InformationCircleIcon className="categories-products-details-icon" />
                          </button>
                          <button 
                            className={`categories-products-wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                            onClick={(e) => toggleWishlist(product.id, e)}
                            title={wishlist.includes(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                          >
                            <HeartIcon className="categories-products-wishlist-icon" />
                          </button>
                        </div>
                      </div>

                      {/* Original Shopping Cart Icon (Bottom Right) */}
                      <div className="categories-products-icon">
                        <a href="#" className="categories-products-iconBox"> 
                          <ShoppingCartIcon 
                            style={{
                              width: actualIsMobile ? '20px' : '24px',
                              height: actualIsMobile ? '20px' : '24px',
                              color: '#fff'
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="categories-products-content">
                    <h3 className="categories-products-deal-title">{product.title}</h3>
                    
                    {/* Rating and Price Container */}
                    <div className="categories-products-rating-price-container">
                      {/* Rating */}
                      <div className="categories-products-deal-rating">
                        <div className="categories-products-stars">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              style={{
                                width: actualIsMobile ? '12px' : '14px',
                                height: actualIsMobile ? '12px' : '14px',
                                fill: i < Math.floor(product.rating) ? '#F2BB13' : 'none',
                                stroke: i < product.rating ? '#F2BB13' : '#BFBFBF'
                              }}
                            />
                          ))}
                        </div>
                        <span className="categories-products-rating-text">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="categories-products-deal-price">
                        <span className="categories-products-current-price">{product.price}</span>
                        <span className="categories-products-original-price">{product.originalPrice}</span>
                        <span className="categories-products-discount">{product.discount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Component */}
            <CategoriesPagination
              currentPage={currentPage}
              totalPages={paginationData.totalPages}
              totalProducts={paginationData.totalProducts}
              productsPerPage={productsPerPage}
              onPageChange={handlePageChange}
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CategoriesProducts;