const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
      { from: './images', to: 'images' }
    ]),
  ]
};