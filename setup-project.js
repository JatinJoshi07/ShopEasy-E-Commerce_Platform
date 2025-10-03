const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Setting up Modern E-Commerce Project...');

// Create basic file structure
const directories = [
  'src/components',
  'src/pages',
  'src/context',
  'src/data',
  'src/utils',
  'public'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

console.log('✅ Project structure created!');
console.log('📦 Now run these commands:');
console.log('1. npm install');
console.log('2. npm install react-router-dom lucide-react framer-motion');
console.log('3. npm install -D tailwindcss postcss autoprefixer');
console.log('4. npx tailwindcss init -p');
console.log('5. Copy all the file contents into their respective locations');
console.log('6. npm run dev');