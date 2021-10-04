const {merge} = require('webpack-merge')
const webpackBaseConfig = require('./webpack.common.config.js')

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    
    devtool: 'source-map',

    watch: true,
    watchOptions: {
      ignored: '/node_modules/',
    },

        // Runs a server
    devServer: {
      watchContentBase: true,
      contentBase: __dirname + '/builds/',
      hot: true,
      compress: true,
      historyApiFallback: true,
      port: 3000,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
    
})
