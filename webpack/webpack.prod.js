const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const path = require('path');
const sass = require('sass');
// const nodeExternals = require('webpack-node-externals');


const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'production';

module.exports = webpackMerge(commonConfig({ env: ENV }), {
  // devtool: 'source-map', // Enable source maps. Please note that this will slow down the build
  mode: ENV,
  // target: 'node', // in order to ignore built-in modules like path, fs, etc.
  // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  entry: {
    main: './src/main/webapp/app/index'
  },
  output: {
    path: utils.root('target/classes/static/'),
    filename: 'app/[name].[hash].bundle.js',
    chunkFilename: 'app/[name].[hash].chunk.js'
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.s?css$/,
      //   loader: 'stripcomment-loader'
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { implementation: sass }
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "vendor"
        }
      }
      // cacheGroups: {
      //
      //   commons: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: "vendors",
      //     chunks: "all"
      //   }
      // }
    },
    minimize: true,
    minimizer: [

      new TerserPlugin({
        cache: true,
        parallel: true,
        // sourceMap: true, // Enable source maps. Please note that this will slow down the build
        // terserOptions: {
        //   ecma: 6,
        //   toplevel: true,
        //   module: true,
        //   beautify: false,
        //   comments: false,
        //   compress: {
        //     warnings: false,
        //     ecma: 6,
        //     module: true,
        //     toplevel: true
        //   },
        //   output: {
        //     comments: false,
        //     beautify: false,
        //     indent_level: 2,
        //     ecma: 6
        //   },
        //   mangle: {
        //     keep_fnames: true,
        //     module: true,
        //     toplevel: true
        //   }
        // }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    concatenateModules: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: 'content/[name].[hash].css',
      chunkFilename: 'content/[name].[hash].css'
    }),
    new MomentLocalesPlugin({
      localesToKeep: [
        'en',
        'th',
        'vi'
        // jhipster-needle-i18n-language-moment-webpack - JHipster will add/remove languages in this array
      ]
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin(),
    // new BundleAnalyzerPlugin(),
    // new webpack.optimize.AggressiveSplittingPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin()
  ]
});
