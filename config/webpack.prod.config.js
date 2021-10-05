const {merge} = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');


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
    },


    // Copies Bundles into Static File
    plugins: [
      new FileManagerPlugin({
        events: {
          onEnd: {
            copy: [
              { source: '../builds/', destination: '../static/' },
            ],
          },
        },
      }),
    ],

})