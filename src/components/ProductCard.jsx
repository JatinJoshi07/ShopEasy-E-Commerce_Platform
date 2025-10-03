// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Star, ShoppingCart, Heart, Zap, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-gray-100 aspect-square">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}

            {/* Image Navigation */}
            {product.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col space-y-1 sm:space-y-2">
              {discount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap"
                >
                  -{discount}%
                </motion.span>
              )}
              {product.tags.includes('bestseller') && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap"
                >
                  🔥 Bestseller
                </motion.span>
              )}
              {!product.inStock && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap"
                >
                  Out of Stock
                </motion.span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col space-y-1 sm:space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={toggleWishlist}
                className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart size={14} className="sm:w-4 sm:h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
              <button className="p-1.5 sm:p-2 rounded-full bg-white/90 text-gray-600 backdrop-blur-md hover:bg-blue-500 hover:text-white transition-all duration-300">
                <Eye size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Quick Add to Cart */}
            {product.inStock && (
              <motion.button
                onClick={handleAddToCart}
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg text-xs sm:text-sm whitespace-nowrap"
              >
                <ShoppingCart size={12} className="sm:w-4 sm:h-4" />
                <span>Quick Add</span>
              </motion.button>
            )}
          </div>

          {/* Product Info */}
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 text-sm sm:text-base leading-tight">
                {product.name}
              </h3>
              <button
                onClick={toggleWishlist}
                className={`p-1 flex-shrink-0 ml-2 ${
                  isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart size={14} className="sm:w-4 sm:h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 flex-1">
              {product.description}
            </p>

            {/* Rating and Brand */}
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviews})
                </span>
              </div>
              {product.tags.includes('trending') && (
                <div className="flex items-center space-x-1 text-orange-500 text-xs sm:text-sm">
                  <Zap size={12} className="sm:w-3 sm:h-3 fill-current" />
                  <span>Trending</span>
                </div>
              )}
            </div>

            {/* Brand */}
            <div className="mb-2 sm:mb-3">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.brand}
              </span>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through hidden sm:block">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                whileHover={{ scale: product.inStock ? 1.05 : 1 }}
                whileTap={{ scale: product.inStock ? 0.95 : 1 }}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                  product.inStock
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center space-x-1 mt-2 sm:mt-3">
                <span className="text-xs text-gray-500 mr-1 hidden sm:block">Colors:</span>
                {product.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"
                    style={{ 
                      backgroundColor: color === 'white' ? '#ffffff' : 
                                    color === 'black' ? '#000000' :
                                    color === 'red' ? '#ef4444' :
                                    color === 'blue' ? '#3b82f6' :
                                    color === 'green' ? '#10b981' :
                                    color === 'yellow' ? '#f59e0b' :
                                    color === 'purple' ? '#8b5cf6' :
                                    color === 'pink' ? '#ec4899' :
                                    color === 'gray' ? '#6b7280' : '#6b7280'
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;