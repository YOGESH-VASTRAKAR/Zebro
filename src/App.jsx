import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './components/CartContext';
import Home from './pages/Home';
import LoginRegistration from './components/LoginRegistration';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';

// ScrollToTop Component - Har route change par top par scroll karega
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <ScrollToTop /> {/* Add this component */}
          <Header />
          <CartSidebar />
          
          <main className="main-content">
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<LoginRegistration />} />
              <Route path="/my_account" element={<Dashboard />} />
              
              <Route path="/products" element={<Products />} /> 
             <Route path="/productdetails" element={<ProductDetails />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;