const {merge} = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.common.config.js');


module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    
    watch: false,

    watchOptions: {
      ignored: '/node_modules/',
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin()
        ]
    }
})