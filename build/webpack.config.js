var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var aliasConfig = require('./aliasConfig.js')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: 'development', // 设置mode
  entry: {
    index: './src/index'
  },
  output: {
    path: path.join(__dirname, '..', './dist'),
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
      chunks: ['index']
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules'),
    ],
    alias: aliasConfig
  },
  module: {
    // loaders: [
    //   {
    //     test: /\.css$/,
    //     loaders: ['style', 'css']
    //   },
    //   {
    //     test: /\.vue$/,
    //     loader: 'vue-loader',
    //   },
    //   {
    //     test: /\.scss/,
    //     loaders: ["style", "css", "sass"]
    //   },
    //   {
    //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    //     loader: 'url-loader',
    //     /*query: {
    //      limit: 10000,
    //      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    //      }*/
    //   }
    // ],
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      // '/api': 'http://localhost:7001'
    },
  },
}