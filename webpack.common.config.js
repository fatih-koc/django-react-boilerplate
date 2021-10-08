const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');


module.exports = {
  context: __dirname,

  entry: './frontend/js/index',

  output: {
    path: path.resolve('./builds/'),
    filename:  'assets/js/' + "[name]-[hash].js",
    chunkFilename: "[name]-[hash].js"
  },

  // Resolve paths
  resolve: {
    extensions: ['.js', '.jsx', '.less'],

    alias: {
      '@less': path.resolve(__dirname, '../frontend/less/'),
      '@img': path.resolve(__dirname, '../frontend/images/'),
      '@': path.resolve(__dirname, '../frontend'),
      '../../theme.config$': path.join(__dirname, '../frontend/semantic-ui/theme.config')


    },
    modules: [
      'node_modules',
      path.resolve(__dirname, 'frontend')
    ],
  },


  plugins: [


    new BundleTracker({ filename: './webpack-stats.json' }),
    
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'assets/css/' +  '[name]-[hash].css',
      chunkFilename: 'assets/css/' + '[name]-[hash].css',
    }),


    new HtmlWebpackPlugin({
      template: './frontend/theme.html',
      inject: true,
      filename: 'theme.html',
      minify:{
          removeComments: true,
          collapseWhitespace: false
      }
    }),



  ],

  module: {
    rules: [

      {
        // load babel & and transpile js, jsx
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      //CSS
       //CSS
       {
        test: /\.(css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
        ]
      },
      //LESS
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, "node_modules")],
                math: 'always',

              },
            },
          },
        ],
      },
      // this handles images
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
              publicPath: '../',
              useRelativePaths: true
            }
          }
        ]
      },
      // this handles fonts
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader?limit=10000&mimetype=application/font-woff',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
              publicPath: '../',
              useRelativePaths: true,
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
              publicPath: '../',
              useRelativePaths: true,
            }
          }
        ]
      },
      {
        test: /\.otf(\?.*)?$/,
        use: [
          {
            loader: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
              publicPath: '../',
              useRelativePaths: true,
            }
          }
        ]
      },


    ],
  },

  // Runs a server
  devServer: {
    watchContentBase: true,
    contentBase: __dirname + './builds/',
    hot: true,
    compress: false,
    historyApiFallback: true,
    port: 3000
  },


}
