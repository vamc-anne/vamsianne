var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  output: {
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'ts-loader',
            // options: {   configFileName: helpers.root('src', 'tsconfig.json') }
          },
          'angular2-template-loader'
        ]
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      // {   test: /\.css$/,   use: [     {       loader: "style-loader"     }, {
      // loader: "css-loader"     }   ] },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
      }
    ]
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/, helpers.root('./src'), { // location of your src
      } // a map of your routes
    ),
    new ExtractTextPlugin("styles.css"),
    new webpack
      .optimize
      .CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CopyWebpackPlugin([{ from: helpers.root('src', 'assets/imgz'), to: 'assets/imgz' }, { from: helpers.root('src', 'fav.ico'), to: '' },
    ])
  ]
};