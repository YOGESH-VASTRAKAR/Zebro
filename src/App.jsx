import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './components/CartContext';
import Home from './pages/Home';
import LoginRegistration from './components/login_registration/LoginRegistration';
import Dashboard from './components/myaccount/Dashboard';
import Products from './components/products/Products';
import ProductDetails from './components/productdetail/ProductDetails';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import AllOffers from './components/alloffers/AllOffers';
import AllBestSeller from './components/allbestsellers/AllBestSeller';
import NewArrival from './components/newarrival/NewArrival';
import Order from './components/order/Order';
import AdvertisementPopup from './components/AdvertisementPopup'; 

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <ScrollToTop />
          
          <AdvertisementPopup />
          
          <Header />
          <CartSidebar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<LoginRegistration />} />
              <Route path="/my_account" element={<Dashboard />} />              
              <Route path="/products" element={<Products />} /> 
              <Route path="/productdetails" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} /> 
              <Route path="/checkout" element={<Checkout />} /> 
              <Route path="/alloffer" element={<AllOffers />} />
              <Route path="/bestseller" element={<AllBestSeller />} />
              <Route path="/newarrival" element={<NewArrival />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;