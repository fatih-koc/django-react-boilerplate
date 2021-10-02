const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.js');

const options = {
  publicPath: config.output.publicPath,
  port: 3000,
  hot: true,
  inline: true,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
};

webpackDevServer.addDevServerEntrypoints(config, options);


const compiler = webpack(config);

const server = new webpackDevServer(compiler, options);

server.listen(3000, 'localhost', () => {
  console.log('dev server listening on port 3000');
});


// const webpack = require('webpack');
// const DevServer = require('webpack-dev-server');

// const config = {
//   entry: [
//     // Runtime code for hot module replacement
//     'webpack/hot/dev-server.js',
//     // Dev server client for web socket transport, hot and live reload logic
//     'webpack-dev-server/client/index.js?hot=true&live-reload=true',
//     // Your entry
//     './src/entry.js',
//   ],
//   plugin: [
//     // Plugin for hot module replacement
//     new webpack.HotModuleReplacementPlugin(),
//   ],
// };

// const compiler = webpack(config);

// // `hot` and `client` options are disabled because we added them manually

// const server = new DevServer({ hot: false, client: false }, compiler);

// (async () => {
//   await server.start();
//   console.log('dev server is running');
// })();
