const path = require('path');

module.exports = {
  distDir: '../../dist/functions/.next',
  
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    };
    
    return config;
  },
};