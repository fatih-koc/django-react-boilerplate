const {merge} = require('webpack-merge')

const webpackBaseConfig = require('./webpack.common.config.js')

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    
    devtool: 'source-map',

    output: {
      publicPath: 'http://localhost:3000/',
    },

    watch: true,
    watchOptions: {
      ignored: '/node_modules/',
    },

    
})
