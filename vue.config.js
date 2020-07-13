const webpack = require('webpack');

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: true,
  configureWebpack: {
    plugins: [new webpack.DefinePlugin({})]
  },
  devServer: {}
};
