const webpack = require('webpack');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const path = require('path');

const utils = require('./utils.js');

const getTsLoaderRule = env => {
  const rules = [
    {
      loader: 'cache-loader',
      options: {
        cacheDirectory: path.resolve('target/cache-loader')
      }
    },
    {
      loader: 'thread-loader',
      options: {
        // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
        // The value may need to be adjusted (e.g. to 1) in some CI environments,
        // as cpus() may report more cores than what are available to the build.
        workers: require('os').cpus().length - 1
      }
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        happyPackMode: true
      }
    }
  ];
  if (env === 'development') {
    rules.unshift({
      loader: 'react-hot-loader/webpack'
    });
  }
  return rules;
};

module.exports = options => ({
  cache: options.env !== 'production',
  resolve: {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx', '.json'
    ],
    modules: ['node_modules'],
    alias: {
      app: utils.root('src/main/webapp/app/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js|jsx)$/,
        use: getTsLoaderRule(options.env),
        include: [utils.root('./src/main/webapp/app')],
        exclude: [utils.root('node_modules')]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        loader: 'file-loader',
        options: {
          digest: 'hex',
          hash: 'sha512',
          name: 'content/[hash].[ext]'
        }
      },
      {
        enforce: 'pre',
        test: /\.(tsx?|js|jsx)$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(tsx?|js|jsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: [utils.root('node_modules')]
      }
    ]
  },
  stats: {
    children: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${options.env}'`,
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        // VERSION: `'${utils.parseVersion()}'`,
        DEBUG_INFO_ENABLED: options.env !== 'production',
        SERVER_API_URL: options.env === 'production' ? `'http://api.izziplatform.com/'` : `'http://171.244.40.91:8088/'`
      }
    }),
    new ForkTsCheckerWebpackPlugin({ tslint: true }),
    new CopyWebpackPlugin([
      // { from: './node_modules/swagger-ui/dist/css', to: 'swagger-ui/dist/css' },
      // { from: './node_modules/swagger-ui/dist/lib', to: 'swagger-ui/dist/lib' },
      // { from: './node_modules/swagger-ui/dist/swagger-ui.min.js', to: 'swagger-ui/dist/swagger-ui.min.js' },
      // { from: './src/main/webapp//swagger-ui/', to: 'swagger-ui' },
      { from: './src/main/webapp/static/', to: 'content' },
      { from: './src/main/webapp/favicon.ico', to: 'favicon.ico' },
      { from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp' },
      // jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
      { from: './src/main/webapp/robots.txt', to: 'robots.txt' }
    ]),
    new HtmlWebpackPlugin({
      template: './src/main/webapp/index.html',
      chunksSortMode: 'dependency',
      inject: 'body'
    }),
    new BaseHrefWebpackPlugin({ baseHref: '/' }),
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/th/*.json", fileName: "./i18n/th.json" },
                    { pattern: "./src/main/webapp/i18n/vi/*.json", fileName: "./i18n/vi.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                ]
      }
    }),
  ]
});
