const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    background: './src/background/index.js',
    contentScript: './src/contentScript/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
      { from: './images', to: 'images' }
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react',
              'stage-0',
            ],
            plugins: [
              'transform-decorators-legacy',
            ],
          }
        },
      },
    ],
  },
};
