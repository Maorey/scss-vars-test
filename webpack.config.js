const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV
const isProd = mode === 'production'

const entry = {
  index: path.resolve('src/pages/index'),
  home: path.resolve('src/pages/home'),
}

/// ↓ inject scss variables ↓ ///
const SCSS_PATH = 'scss/var.scss'
const cache = {}
function exists(key, rootDir) {
  let result = cache[key]
  if (result === undefined) {
    result = cache[key] = fs.existsSync(path.join(rootDir, SCSS_PATH))
    setTimeout(() => (cache[key] = undefined), 20000)
  }

  return result
}
function includes(module, entry) {
  return (
    !!module &&
    (module.context.includes(entry) || includes(module.issuer, entry))
  )
}
/** auto inject scss variables
 */
function data(loaderContext) {
  let scss = `@import "~@/${SCSS_PATH}";`

  // entry variables(cover global variables)
  let key
  let rootDir
  for (key in entry) {
    rootDir = entry[key]
    if (exists(key, rootDir) && includes(loaderContext._module, rootDir)) {
      scss += `@import "~@/pages/${key}/${SCSS_PATH}";`
    }
  }
  loaderContext.cacheable(false) // useless

  return scss
}
/// ↑ inject scss variables ↑ ///

module.exports = {
  mode,
  context: path.resolve(),
  devtool: !isProd && 'eval',
  entry,
  output: {
    publicPath: '',
    path: path.resolve('dist'),
    filename: isProd ? 'js/[name].[chunkhash:3].js' : 'js/[name].js',
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      '@com': path.resolve('src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          isProd
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: { hmr: false, publicPath: '../' },
              }
            : {
                loader: 'style-loader',
              },
          {
            loader: 'css-loader',
            options: { sourceMap: false },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: false },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: false, data },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [path.resolve('node_modules')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['index'],
      minify: isProd,
    }),
    new HtmlWebpackPlugin({
      template: 'public/home.html',
      filename: 'home.html',
      chunks: ['home'],
      minify: isProd,
    }),
    isProd
      ? new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:3].css',
          chunkFilename: 'css/[name].[contenthash:3].css',
        })
      : new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 9000,
    hot: true,
    open: true,
    compress: true,
    overlay: { errors: true },
  },
}
