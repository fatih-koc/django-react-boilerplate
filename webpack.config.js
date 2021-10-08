const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
  console.log('Starting Development Server @3000')
    module.exports = require('./webpack.dev.config.js');
} else {
  console.log('Building Bundled Files')
    module.exports = require('./webpack.prod.config.js');
}