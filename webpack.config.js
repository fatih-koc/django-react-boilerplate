var path = require("path");
var BundleTracker = require('webpack-bundle-tracker');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: './frontend/js/index',

  output: {
    path: path.resolve('./static/bundles/'),
    publicPath: 'http://localhost:3000/dist/',
    filename: "[name]-[hash].js",
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
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[hash].css',
    }),
  ],

  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loaders: ['babel-loader'],
      // },
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
      // }

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
      {
        test: /\.(css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      //LESS
      {
        test: /\.(less)$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ]

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

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },

  // Runs a server
  devServer: {
    watchContentBase: true,
    contentBase: __dirname + '/public',
    hot: true,
    compress: false,
    historyApiFallback: true,
    port: 3000
  },
}
