const path = require("path");
const webpack = require("webpack");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const currentYear = new Date().getFullYear();

const DEBUG =
  process.env.NODE_ENV === "development" || !!process.env.WEBPACK_HOT_RELOAD;

const plugins = [
  new webpack.ProvidePlugin({
    process: 'process/browser.js',
    Buffer: ['buffer', 'Buffer'],
  }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
    "process.env.PHONE_NUMBER_COUNTRY": `"${process.env.PHONE_NUMBER_COUNTRY ||
      "US"}"`
  }),
    new MomentTimezoneDataPlugin({
      matchZones: 'America/New_York',
      startYear: currentYear - 1,
      endYear: currentYear
  })
]

const jsxLoaders = [{ loader: "babel-loader" }];
const assetsDir = process.env.ASSETS_DIR || "./build/client/assets";
const assetMapFile = process.env.ASSETS_MAP_FILE || "assets.json";
const outputFile = DEBUG ? "[name].js" : "[name].[fullhash].js";
console.log("Configuring Webpack with", {
  assetsDir,
  assetMapFile,
  outputFile
});

if (!DEBUG) {
  plugins.push(
    new WebpackManifestPlugin({
      fileName: assetMapFile,
      publicPath: ""
    })
  );
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

const config = {
  mode: ["development", "production"].includes(process.env.NODE_ENV) ? process.env.NODE_ENV : "none",
  entry: {
    bundle: ["babel-polyfill", "./src/client/index.jsx"]
  },
  module: {
    loaders: [
      
    ],
    rules: [
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        options: {
          esModule: true,
        },
        type: 'javascript/auto',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        options: {
          esModule: true,
        },
        type: 'javascript/auto'
      },
      {
        test: /\.m?js$/,
        type: "javascript/auto",
      },
      {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false
          },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.jsx?$/,
        use: jsxLoaders,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      buffer: require.resolve('buffer'),
      asset: require.resolve('assert')
    },
    mainFields: ["browser", "main", "module"],
    extensions: [".js", ".jsx", ".json"]
  },
  plugins,
  output: {
    filename: outputFile,
    path: path.resolve(DEBUG ? __dirname : assetsDir)
  },
  optimization: {
    minimize: !DEBUG,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false
        }
      })
    ]
  }
};

if (DEBUG) {
  config.devtool = "inline-source-map";
  config.output.sourceMapFilename = `${outputFile}.map`;
}

module.exports = config;