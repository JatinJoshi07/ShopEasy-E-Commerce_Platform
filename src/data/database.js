// src/data/database.js
export const initialUsers = [
  {
    id: 1,
    name: 'JJ Admin',
    email: 'jatinjoshi9527@gmail.com',
    password: 'JJ9527',
    role: 'admin',
    avatar: '👨‍💼',
    joined: '2024-01-15',
    orders: 47
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password',
    role: 'user',
    avatar: '👤',
    joined: '2024-02-20',
    orders: 12
  }
];

export const initialProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones Pro",
    price: 129.99,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality for an immersive audio experience.",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    stockCount: 25,
    features: ["Active Noise Cancellation", "30hr Battery Life", "Quick Charge", "Voice Assistant"],
    tags: ["bestseller", "wireless", "audio", "trending"],
    colors: ["black", "silver", "blue"],
    specifications: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g",
      "Charging Time": "2 hours"
    },
    brand: "AudioPro"
  },
  {
    id: 2,
    name: "Smart Fitness Watch Series X",
    price: 249.99,
    originalPrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    description: "Advanced fitness tracking smartwatch with heart rate monitoring, GPS, sleep tracking, and 50m water resistance.",
    rating: 4.3,
    reviews: 89,
    inStock: true,
    stockCount: 18,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "Sleep Analysis"],
    tags: ["smart", "fitness", "wearable", "bestseller"],
    colors: ["black", "blue", "red", "green"],
    specifications: {
      "Display": "1.3\" AMOLED",
      "Battery": "7 days",
      "Water Resistance": "50m",
      "Compatibility": "iOS & Android"
    },
    brand: "FitTech"
  },
  {
    id: 3,
    name: "Organic Cotton Premium T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=600&fit=crop"
    ],
    category: "clothing",
    description: "Ultra-comfortable organic cotton t-shirt made from sustainable materials. Perfect for everyday wear with a modern fit.",
    rating: 4.2,
    reviews: 256,
    inStock: true,
    stockCount: 100,
    features: ["100% Organic Cotton", "Machine Washable", "Sustainable", "Multiple Colors"],
    tags: ["organic", "casual", "cotton", "sustainable"],
    colors: ["white", "black", "gray", "navy", "green"],
    specifications: {
      "Material": "100% Organic Cotton",
      "Care": "Machine Washable",
      "Fit": "Regular",
      "Origin": "India"
    },
    brand: "EcoWear"
  },
  {
    id: 4,
    name: "Professional Gaming Mechanical Keyboard",
    price: 89.99,
    originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    description: "RGB mechanical gaming keyboard with customizable keys, anti-ghosting, and dedicated media controls for professional gamers.",
    rating: 4.7,
    reviews: 312,
    inStock: true,
    stockCount: 32,
    features: ["RGB Lighting", "Mechanical Switches", "Programmable Keys", "Anti-Ghosting"],
    tags: ["gaming", "rgb", "mechanical", "trending"],
    colors: ["black", "white", "rgb"],
    specifications: {
      "Switch Type": "Mechanical Blue",
      "Backlight": "16.8M RGB",
      "Connection": "USB-C",
      "Keycaps": "Double-shot ABS"
    },
    brand: "GameMaster"
  },
  {
    id: 5,
    name: "Wireless Ergonomic Mouse",
    price: 39.99,
    originalPrice: 49.99,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    description: "Ergonomic wireless mouse with precision tracking, long battery life, and comfortable design for extended use.",
    rating: 4.4,
    reviews: 203,
    inStock: false,
    stockCount: 0,
    features: ["2.4GHz Wireless", "Ergonomic Design", "Long Battery", "Precision Tracking"],
    tags: ["wireless", "ergonomic", "office"],
    colors: ["black", "white", "gray"],
    specifications: {
      "DPI": "16000",
      "Battery": "12 months",
      "Connection": "2.4GHz Wireless",
      "Weight": "98g"
    },
    brand: "ComfortClick"
  },
  {
    id: 6,
    name: "Modern LED Desk Lamp Pro",
    price: 45.99,
    originalPrice: 59.99,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600&h=600&fit=crop"
    ],
    category: "home",
    description: "Smart LED desk lamp with adjustable brightness, color temperature control, and USB charging port.",
    rating: 4.1,
    reviews: 94,
    inStock: true,
    stockCount: 45,
    features: ["Adjustable Brightness", "Color Temperature", "USB Charging", "Touch Control"],
    tags: ["home", "lighting", "smart"],
    colors: ["white", "black", "silver"],
    specifications: {
      "Brightness": "600 lumens",
      "Color Temp": "2700K-6500K",
      "Power": "USB-C",
      "Warranty": "2 years"
    },
    brand: "LumiHome"
  },
  {
    id: 7,
    name: "Premium Laptop Backpack",
    price: 59.99,
    originalPrice: 79.99,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&h=600&fit=crop"
    ],
    category: "accessories",
    description: "Durable laptop backpack with dedicated compartments, USB charging port, and water-resistant material.",
    rating: 4.6,
    reviews: 167,
    inStock: true,
    stockCount: 28,
    features: ["Laptop Compartment", "USB Port", "Water Resistant", "Multiple Pockets"],
    tags: ["laptop", "travel", "waterproof"],
    colors: ["black", "blue", "gray", "green"],
    specifications: {
      "Capacity": "30L",
      "Laptop Size": "Up to 17\"",
      "Material": "Nylon",
      "Waterproof": "IPX4"
    },
    brand: "UrbanGear"
  },
  {
    id: 8,
    name: "Wireless Earbuds Sport",
    price: 79.99,
    originalPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1590658165737-15a047b8b5e3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop"
    ],
    category: "electronics",
    description: "True wireless earbuds with secure fit for sports, sweat resistance, and crystal clear audio quality.",
    rating: 4.3,
    reviews: 189,
    inStock: true,
    stockCount: 60,
    features: ["True Wireless", "Sweat Resistant", "Secure Fit", "Crystal Clear Audio"],
    tags: ["wireless", "sports", "audio"],
    colors: ["black", "white", "blue", "red"],
    specifications: {
      "Battery": "6 hours",
      "Case Battery": "24 hours",
      "Bluetooth": "5.2",
      "Waterproof": "IPX7"
    },
    brand: "SoundFit"
  }
];

export const categories = [
  { id: 'all', name: 'All Products', count: initialProducts.length, icon: '🛍️' },
  { id: 'electronics', name: 'Electronics', count: initialProducts.filter(p => p.category === 'electronics').length, icon: '📱' },
  { id: 'clothing', name: 'Clothing', count: initialProducts.filter(p => p.category === 'clothing').length, icon: '👕' },
  { id: 'accessories', name: 'Accessories', count: initialProducts.filter(p => p.category === 'accessories').length, icon: '🕶️' },
  { id: 'home', name: 'Home & Living', count: initialProducts.filter(p => p.category === 'home').length, icon: '🏠' }
];

export const orders = [
  {
    id: 1001,
    userId: 1,
    items: [initialProducts[0], initialProducts[2]],
    total: 159.98,
    status: 'delivered',
    date: '2024-03-15',
    trackingNumber: 'TRK123456789'
  }
];