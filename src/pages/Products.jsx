// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { SkeletonLoader } from '../components/LoadingSpinner';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredProducts, filterProducts, categories } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize filters from URL
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const wishlist = searchParams.get('wishlist');

    const initialFilters = {
      category: category || '',
      search: search || '',
      wishlist: wishlist === 'true'
    };

    if (search) setSearchQuery(search);
    
    filterProducts(initialFilters);
  }, [searchParams]);

  const handleFilterChange = (filters) => {
    setLoading(true);
    
    // Update URL with filters
    const newParams = new URLSearchParams();
    if (filters.category) newParams.set('category', filters.category);
    if (filters.search) newParams.set('search', filters.search);
    
    setSearchParams(newParams);
    
    // Apply filters
    setTimeout(() => {
      filterProducts(filters);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleFilterChange({ search: searchQuery });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
    handleFilterChange({ search: '' });
  };

  const activeFiltersCount = Object.values({
    category: searchParams.get('category'),
    search: searchParams.get('search'),
    priceRange: searchParams.get('priceRange'),
    rating: searchParams.get('rating')
  }).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              All Products
            </h1>
            <p className="text-gray-600">
              Discover {filteredProducts.length} amazing products
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-4 lg:mt-0 lg:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                🔍
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Filter Bar */}
        <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 lg:hidden">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter size={20} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onApplyFilters={handleFilterChange}
            />
            
            {/* Desktop Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="hidden lg:flex items-center space-x-2 w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors mb-6"
            >
              <SlidersHorizontal size={20} />
              <span className="font-semibold">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold ml-auto">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Desktop Categories */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleFilterChange({ category: category.id })}
                    className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors ${
                      searchParams.get('category') === category.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                    <span className="text-xs text-gray-500 ml-auto">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="hidden lg:flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {filteredProducts.length} products
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">View:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <SkeletonLoader count={8} />
            ) : filteredProducts.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-4 sm:gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleFilterChange({});
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;