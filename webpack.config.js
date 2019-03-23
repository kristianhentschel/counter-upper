const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env, { mode = 'development' }) => ({
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|eot|ttf|woff|woff2|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
        },
      },
      {
        test: [/\.jsx?$/],
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/favicon.png'),
      background: '#000000',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        favicons: true,
        firefox: true,
      },
      title: 'Counter-Upper',
    }),
    new OfflinePlugin({
      responseStrategy: 'network-first',
      autoUpdate: true,
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: mode === 'development',
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
});
