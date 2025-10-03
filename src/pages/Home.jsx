// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { 
  ArrowRight, Truck, Shield, Headphones, Award, 
  Sparkles, TrendingUp, Star, Zap, ShoppingBag
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const { products, categories } = useApp();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(products.slice(0, 4));
    setTrendingProducts(products.filter(p => p.tags.includes('bestseller') || p.rating >= 4.5));
  }, [products]);

  const features = [
    {
      icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Secure Payment',
      description: '100% secure payment processing',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Headphones className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Quality Guarantee',
      description: '30-day money back guarantee',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '50+', label: 'Brands' },
    { number: '24/7', label: 'Support' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo Section */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6 sm:mb-8"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl">
                <img 
                  src="src\assets\logo.png" 
                  alt="ShopEasy Logo" 
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-xl object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8"
            >
              
              <span className="text-sm sm:text-base font-semibold">Welcome to ShopEasy</span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Discover
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-2">
                Amazing Products
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
              Experience the future of shopping with curated collections, exclusive deals, and seamless delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                to="/products"
                className="group relative bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Start Shopping</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <button className="group border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center">
                <span className="flex items-center justify-center space-x-2">
                  <span>Learn More</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 w-5 h-5" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 sm:p-6"
              >
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-500 border border-gray-100"
              >
                <div className={`inline-flex p-3 sm:p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 lg:mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-4 sm:mb-6 shadow-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Trending Now</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Hot Products</h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Discover what everyone is talking about
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {trendingProducts.slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-4 sm:mb-6">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="font-semibold text-blue-700 text-sm sm:text-base">Featured Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Popular Products</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Carefully curated selection of our best-selling items
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12 lg:mt-16"
          >
            <Link
              to="/products"
              className="group inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Explore All Products</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Shop by Category</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">Find exactly what you're looking for</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.filter(cat => cat.id !== 'all').map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  to={`/products?category=${category.id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-500 border border-gray-100">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{category.count} products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;