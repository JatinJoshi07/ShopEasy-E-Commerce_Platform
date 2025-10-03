// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import LoadingSpinner from '/src/components/LoadingSpinner.jsx';
import { 
  Star, ShoppingCart, Heart, Truck, Shield, 
  ArrowLeft, Check, Minus, Plus,
  Share2, RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
      if (foundProduct && foundProduct.colors) {
        setSelectedColor(foundProduct.colors[0]);
      }
    }, 1000);
  }, [id, products]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    addToCart(product);
    setAddingToCart(false);
  };

  const toggleWishlist = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (product?.stockCount || 10)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonLoader type="product" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('/products')}
            className="hover:text-blue-600 transition-colors"
          >
            Products
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-blue-600' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 pr-4">
                    {product.name}
                  </h1>
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                      isWishlisted
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Brand */}
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {product.brand}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                        Save {discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Color: <span className="capitalize">{selectedColor}</span>
                  </h3>
                  <div className="flex space-x-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === color ? 'border-blue-600' : 'border-gray-300'
                        }`}
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
                      >
                        {selectedColor === color && (
                          <Check size={16} className="text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 min-w-12 text-center font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stockCount} available
                  </span>
                </div>
              </div>

              {/* Features */}
              {product.features && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check size={16} className="text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addingToCart}
                  whileHover={{ scale: product.inStock && !addingToCart ? 1.02 : 1 }}
                  whileTap={{ scale: product.inStock && !addingToCart ? 0.98 : 1 }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {addingToCart ? (
                    <LoadingSpinner size="sm" text="" />
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      <span>
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </span>
                    </>
                  )}
                </motion.button>

                <button className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck size={18} />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <RotateCcw size={18} />
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield size={18} />
                  <span>2-year warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div className="border-t border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;