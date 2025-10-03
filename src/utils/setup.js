import fs from 'fs';
import path from 'path';

const files = {
  // App.jsx and other main files (use the code from previous responses)
  // Add all the file contents here...
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join('src', filePath);
  const dir = path.dirname(fullPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write file
  fs.writeFileSync(fullPath, content);
  console.log(`Created: ${fullPath}`);
});

console.log('✅ Project setup complete!');
console.log('Run: npm run dev');