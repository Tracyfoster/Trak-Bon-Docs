const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    // 'eventsource-polyfill',
    'webpack-hot-middleware/client?reaload=true',
    path.join(__dirname, '/client/index'),
  ],

  output: {
    // path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    sourceMapFilename: 'source.map',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.(css|scss)?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg)?$/,
        loader: 'url-loader?limit=8192'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss'],
  },
  devtool: 'cheap-module-eval-source-map', // enum
  target: 'web', // enum
  // externals: ['react'],
  stats: 'errors-only',
  devServer: {
    proxy: {
      '/api': 'http://localhost:8080'
    },
    contentBase: path.join(__dirname), // boolean | string | array, static file location
    // compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
    stats: 'minimal',
    publicPath: '/',
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ],
  node: {
    net: 'empty',
    dns: 'empty',
  },
};