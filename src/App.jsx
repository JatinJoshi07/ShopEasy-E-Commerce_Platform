// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from "./pages/Profile";
import Checkout from './pages/Checkout';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
                <Route path="/products" element={<AnimatedPage><Products /></AnimatedPage>} />
                <Route path="/product/:id" element={<AnimatedPage><ProductDetail /></AnimatedPage>} />
                <Route path="/cart" element={<AnimatedPage><Cart /></AnimatedPage>} />
                <Route path="/checkout" element={<AnimatedPage><Checkout /></AnimatedPage>} />
                <Route path="/auth" element={<AnimatedPage><Auth /></AnimatedPage>} />
                <Route path="/profile" element={<AnimatedPage><UserProfile /></AnimatedPage>} />
                <Route path="/admin" element={<AnimatedPage><AdminDashboard /></AnimatedPage>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;