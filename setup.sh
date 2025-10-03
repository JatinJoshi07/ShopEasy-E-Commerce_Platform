#!/bin/bash

echo "🚀 Setting up Modern E-Commerce Project..."

# Create project
npm create vite@latest modern-ecommerce -- --template react
cd modern-ecommerce

# Install dependencies
npm install
npm install lucide-react framer-motion
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

# Create folder structure
mkdir -p src/{components,pages,context,data,utils}

echo "✅ Project structure created!"
echo "📁 Now copy the file contents from the provided code"
echo "🚀 Then run: npm run dev"