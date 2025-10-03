// src/components/FilterSidebar.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Filter, Star, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSidebar = ({ isOpen, onClose, onApplyFilters }) => {
  const { categories, currentFilters } = useApp();
  const [filters, setFilters] = useState({
    category: '',
    priceRange: 500,
    rating: 0,
    inStock: false,
    sortBy: ''
  });

  useEffect(() => {
    if (currentFilters) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      priceRange: 500,
      rating: 0,
      inStock: false,
      sortBy: ''
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onClose();
  };

  const priceRanges = [
    { label: 'Under $25', value: 25 },
    { label: '$25 - $50', value: 50 },
    { label: '$50 - $100', value: 100 },
    { label: '$100 - $200', value: 200 },
    { label: 'Over $200', value: 500 }
  ];

  const sortOptions = [
    { value: '', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:relative lg:z-auto lg:w-64 lg:flex-shrink-0 shadow-xl lg:shadow-none"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Sort By */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
                  <div className="space-y-2">
                    {sortOptions.map(option => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          value={option.value}
                          checked={filters.sortBy === option.value}
                          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={filters.category === category.id}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex items-center space-x-2 text-sm text-gray-700">
                          <span>{category.icon}</span>
                          <span>{category.name} ({category.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Max: ${filters.priceRange}</span>
                      <DollarSign className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$10</span>
                      <span>$500+</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {priceRanges.map(range => (
                        <button
                          key={range.value}
                          onClick={() => handleFilterChange('priceRange', range.value)}
                          className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                            filters.priceRange === range.value
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating}
                          onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm text-gray-700">In Stock Only</span>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 space-y-3">
                <button
                  onClick={handleApplyFilters}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleClearFilters}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
};

export default FilterSidebar;