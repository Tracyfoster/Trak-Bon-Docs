import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'client/index')
  ],
  target: 'web',
  output: {
    // These files are only output by the production build task `npm run build`.
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  module: {
    rules: [
      { test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      { test: /\.css$/,
        loaders: ['css-loader'],
      },
      { test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192' },
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
