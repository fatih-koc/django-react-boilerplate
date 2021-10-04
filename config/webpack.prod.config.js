const {merge} = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const webpackBaseConfig = require('./webpack.common.config.js');


module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    
    watch: false,

    watchOptions: {
      ignored: '/node_modules/',
    },

    optimization: {
        minimize: true,

        minimizer: [
            new UglifyJsPlugin(),


            new CssMinimizerPlugin({
                // parallel: true,
                minify: CssMinimizerPlugin.cssnanoMinify,
                minimizerOptions: {
                    preset: [
                      "default",
                      {
                        discardComments: { removeAll: true },
                      },
                    ],
                  },
            }),
        ]
    }
})