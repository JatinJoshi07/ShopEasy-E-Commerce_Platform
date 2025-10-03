// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialUsers, initialProducts, categories, orders } from '../data/database';

const AppContext = createContext();

// Local storage keys
const STORAGE_KEYS = {
  USER: 'ecommerce_user',
  CART: 'ecommerce_cart',
  WISHLIST: 'ecommerce_wishlist'
};

// Reducers
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case 'LOGOUT':
      localStorage.removeItem(STORAGE_KEYS.USER);
      return { ...state, user: null };
    case 'REGISTER':
      const newUser = action.payload;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      return { 
        ...state, 
        user: newUser, 
        users: [...state.users, newUser] 
      };
    case 'UPDATE_PROFILE':
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      return { ...state, user: updatedUser };
    default:
      return state;
  }
};

const cartReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_TO_CART':
      const existing = state.items.find(item => item.id === action.payload.id);
      newState = {
        ...state,
        items: existing
          ? state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.items, { ...action.payload, quantity: 1 }]
      };
      break;
    
    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      break;
    
    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
      break;
    
    case 'CLEAR_CART':
      newState = { ...state, items: [] };
      break;
    
    case 'LOAD_CART':
      newState = { ...state, items: action.payload };
      break;
    
    default:
      return state;
  }
  
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(newState.items));
  return newState;
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, filteredProducts: action.payload };
    case 'FILTER_PRODUCTS':
      return { ...state, filteredProducts: action.payload, currentFilters: action.filters };
    case 'ADD_PRODUCT':
      const newProduct = { ...action.payload, id: Date.now() };
      return { 
        ...state, 
        products: [...state.products, newProduct],
        filteredProducts: [...state.filteredProducts, newProduct]
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p),
        filteredProducts: state.filteredProducts.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
        filteredProducts: state.filteredProducts.filter(p => p.id !== action.payload)
      };
    default:
      return state;
  }
};

const wishlistReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      newState = state.includes(action.payload) ? state : [...state, action.payload];
      break;
    case 'REMOVE_FROM_WISHLIST':
      newState = state.filter(id => id !== action.payload);
      break;
    case 'LOAD_WISHLIST':
      newState = action.payload;
      break;
    default:
      return state;
  }
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(newState));
  return newState;
};

// Combined initial state
const initialState = {
  user: null,
  users: initialUsers,
  products: initialProducts,
  filteredProducts: initialProducts,
  currentFilters: {},
  categories,
  orders,
  cart: {
    items: [],
    discount: 0,
    shipping: 5.99
  },
  wishlist: []
};

// Root Reducer
const rootReducer = (state, action) => {
  return {
    ...state,
    user: authReducer({ user: state.user, users: state.users }, action).user,
    users: authReducer({ user: state.user, users: state.users }, action).users,
    products: productReducer({ 
      products: state.products, 
      filteredProducts: state.filteredProducts,
      currentFilters: state.currentFilters 
    }, action).products,
    filteredProducts: productReducer({ 
      products: state.products, 
      filteredProducts: state.filteredProducts,
      currentFilters: state.currentFilters 
    }, action).filteredProducts,
    currentFilters: productReducer({ 
      products: state.products, 
      filteredProducts: state.filteredProducts,
      currentFilters: state.currentFilters 
    }, action).currentFilters,
    cart: cartReducer(state.cart, action),
    wishlist: wishlistReducer(state.wishlist, action)
  };
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);

  // Load persisted data
  useEffect(() => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    const wishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);

    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
    if (cart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(cart) });
    }
    if (wishlist) {
      dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(wishlist) });
    }
  }, []);

  // Auth Actions
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = state.users.find(u => u.email === email && u.password === password);
        if (user) {
          dispatch({ type: 'LOGIN', payload: user });
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state.users.find(u => u.email === email)) {
          reject(new Error('User already exists with this email'));
        } else {
          const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role: 'user',
            avatar: '👤',
            joined: new Date().toISOString().split('T')[0],
            orders: 0
          };
          dispatch({ type: 'REGISTER', payload: newUser });
          resolve(newUser);
        }
      }, 1000);
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (updates) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: updates });
  };

  // Cart Actions
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Product Actions
  const filterProducts = (filters = {}) => {
    let filtered = state.products;
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        product.brand?.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(product => product.price <= filters.priceRange);
    }
    
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }
    
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Sort products
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }
    }
    
    dispatch({ type: 'FILTER_PRODUCTS', payload: filtered, filters });
  };

  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const updateProduct = (product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const deleteProduct = (productId) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: productId });
  };

  // Wishlist Actions
  const addToWishlist = (productId) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const isInWishlist = (productId) => {
    return state.wishlist.includes(productId);
  };

  // Order Actions
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      userId: state.user?.id,
      items: [...state.cart.items],
      total: getCartTotal() + state.cart.shipping,
      status: 'processing',
      date: new Date().toISOString().split('T')[0],
      trackingNumber: `TRK${Date.now()}`,
      ...orderData
    };
    
    // For now, we'll just return the order
    // In a real app, you would dispatch an action to add it to orders
    console.log('Order created:', newOrder);
    return newOrder;
  };

  const value = {
    ...state,
    // Auth
    login,
    register,
    logout,
    updateProfile,
    // Cart
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    // Products
    filterProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    // Wishlist
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    // Orders
    createOrder
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};