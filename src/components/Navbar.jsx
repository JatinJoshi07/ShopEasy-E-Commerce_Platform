// src/components/Navbar.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Search, ShoppingCart, User, Menu, X, LogOut, 
  ChevronDown, Sparkles, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, getCartItemsCount, categories, wishlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const quickCategories = categories.filter(cat => cat.id !== 'all').slice(0, 4);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
{/* Logo */}
<Link to="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
  <div className="relative">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden border-2 border-gray-200">
      <img 
        src="/src/assets/Logo.png" 
        alt="ShopEasy Logo" 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
  </div>
  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    ShopEasy
  </span>
</Link>          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`font-medium transition-all duration-300 hover:text-blue-600 px-2 py-1 ${
                  location.pathname === link.path 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Quick Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-1">
                <span>Categories</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                {quickCategories.map(category => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.id}`}
                    className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Search size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigate('/products?wishlist=true')}
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Heart size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              {getCartItemsCount() > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs"
                >
                  {getCartItemsCount()}
                </motion.span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                    {user.avatar}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-20 truncate">
                    {user.name}
                  </span>
                  <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Sparkles size={16} />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4"
              onClick={() => setIsSearchOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
                ref={searchRef}
              >
                <form onSubmit={handleSearch} className="p-3 sm:p-4">
                  <div className="relative">
                    <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search products, brands, categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-24 sm:pr-28 py-3 sm:py-4 text-base sm:text-lg border-0 focus:ring-0 bg-gray-50 rounded-xl"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base whitespace-nowrap"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="py-3 sm:py-4 space-y-2 sm:space-y-3">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className="block px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Categories */}
                <div className="px-3 sm:px-4 pt-2 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-500 mb-2 sm:mb-3">Categories</p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {quickCategories.map(category => (
                      <Link
                        key={category.id}
                        to={`/products?category=${category.id}`}
                        className="flex items-center space-x-2 p-2 sm:p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-sm sm:text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;