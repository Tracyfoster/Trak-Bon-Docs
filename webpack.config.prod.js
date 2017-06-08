const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: `${__dirname}/client`,
  entry: {
    bundle: path.resolve(__dirname, 'client/index.js'),
    html: path.resolve(__dirname, 'client/index.html'),
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist/client`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.json$/,
        loader: ['json-loader'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: ['url-loader']
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss']
  },
  devtool: 'cheap-source-map',
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        pure_funcs: ['console.log', 'window.console.log.apply']
      },
      comments: false
    })
  ],
  node: {
    net: 'empty',
    dns: 'empty',
  },
};