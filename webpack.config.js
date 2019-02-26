const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'kubernetesui-devopsextension': './src/index.ts',
    'kubernetesui-devopsextension.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'kubernetesui-devopsextension',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        include: /\.min\.js$/,
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  externals: {
    "@azurepipelines/azdevops-kube-summary": "@azurepipelines/azdevops-kube-summary"
  }
}